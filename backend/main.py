from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import datetime
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip("\"'")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    # Using gemini-1.5-pro or gemini-pro
    model = genai.GenerativeModel('gemini-1.5-pro')
else:
    model = None

# Dummy Data matching the frontend UI
summary_data = {
    "totalBalance": "₹12,45,000",
    "monthlyIncome": "₹1,85,000",
    "monthlyExpenses": "₹65,400",
    "totalInvestments": "₹8,50,000",
}

goals_data = [
    {"id": 1, "name": "Dream Home Downpayment", "target": 2500000, "current": 850000, "deadline": "Dec 2026", "suggestedSip": 45000, "icon": "🏠", "color": "blue"},
    {"id": 2, "name": "Europe Vacation", "target": 400000, "current": 120000, "deadline": "Jun 2025", "suggestedSip": 18000, "icon": "✈️", "color": "purple"},
    {"id": 3, "name": "Emergency Fund", "target": 600000, "current": 550000, "deadline": "Dec 2024", "suggestedSip": 8000, "icon": "🛡️", "color": "green"}
]

insights_data = [
    {"id": 1, "type": "alert", "title": "High Dining Expenses Detected", "description": "You've spent ₹14,500 on dining out this month, which is 45% higher than average. Consider cooking at home.", "actionText": "Review Budget", "icon": "🍽️", "color": "red"},
    {"id": 2, "type": "opportunity", "title": "Tax Saving Opportunity", "description": "Investing ₹45,000 more in ELSS can save you up to ₹14,040 in taxes this financial year.", "actionText": "Explore ELSS Funds", "icon": "💰", "color": "green"},
    {"id": 3, "type": "achievement", "title": "Emergency Fund On Track", "description": "Great job! You are consistently saving ₹8,000 per month towards your Emergency Fund.", "actionText": "View Goals", "icon": "⭐", "color": "yellow"},
    {"id": 4, "type": "insight", "title": "Subscription Audit", "description": "We noticed you are paying for 3 streaming services but haven't used Netflix in 45 days. Canceling could save you ₹7,800 annually.", "actionText": "Manage Subscriptions", "icon": "📺", "color": "purple"}
]

transactions_data = []

class ChatMessage(BaseModel):
    message: str

class Transaction(BaseModel):
    type: str
    amount: float
    category: str
    date: str
    note: str = ""

@app.get("/api/summary")
def get_summary():
    # Update total balance based on simulated transactions
    expenses = sum(t.amount for t in transactions_data if t.type == "Expense")
    incomes = sum(t.amount for t in transactions_data if t.type == "Income")
    return {
        "totalBalance": f"₹{1245000 + incomes - expenses:,}",
        "monthlyIncome": f"₹{185000 + incomes:,}",
        "monthlyExpenses": f"₹{65400 + expenses:,}",
        "totalInvestments": "₹8,50,000",
    }

@app.post("/api/transactions")
def add_transaction(transaction: Transaction):
    transactions_data.append(transaction)
    return {"status": "success", "message": "Transaction added successfully"}

@app.get("/api/goals")
def get_goals():
    return goals_data

@app.get("/api/insights")
def get_insights():
    return insights_data

@app.post("/api/chat")
def process_chat(chat: ChatMessage):
    if not chat.message:
        raise HTTPException(status_code=400, detail="Message is required")
    
    msg_lower = chat.message.lower()
    
    # Try using Gemini if API key is provided
    if model:
        try:
            prompt = f"You are MoneyMitra, an expert AI financial advisor from a premium Indian fintech app. Respond concisely in 1 short paragraph to: '{chat.message}'"
            response = model.generate_content(prompt)
            response_text = response.text
        except Exception as e:
            print(f"Gemini API Error: {e}")
            response_text = f"API Error: {str(e)[:150]}. Please verify your GEMINI_API_KEY in the .env file is exactly correct and has billing/quota enabled."
    else:
        # Fallback to local hardcoded mock logic if no API key
        response_text = "I'm analyzing your request. I cannot access the internet right now because you have not provided a GEMINI_API_KEY in the backend `.env` file!"
        
        if "hello" in msg_lower or "hi" in msg_lower:
            response_text = "Hello! Please add your GEMINI_API_KEY in the backend `.env` file to unlock my full conversational potential!"
        elif "dining" in msg_lower or "spend" in msg_lower:
            response_text = "You've spent ₹14,500 on dining out so far this month. This is 45% higher than your usual monthly average."
        elif "alert" in msg_lower or "yes" in msg_lower:
            response_text = "Done! ✅ I've set a dining budget limit. I'll notify you when you reach 80% of this limit."
            
    return {
        "text": response_text,
        "time": datetime.datetime.now().strftime("%I:%M %p")
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
