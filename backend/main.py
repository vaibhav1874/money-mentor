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
    # Trying the least-cost model to bypass free-tier Quota limits
    model = genai.GenerativeModel('gemini-flash-lite-latest')
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

# New Models for Advanced Features
class FIREInput(BaseModel):
    age: int
    retirementAge: int
    monthlyIncome: float
    monthlyExpenses: float
    existingInvestments: float
    riskProfile: str = "moderate" # low, moderate, high

class HealthScoreInput(BaseModel):
    emergencyFundMonths: float
    insuranceCoverage: bool
    isDebtFree: bool
    isInvesting: bool
    taxEfficiencyScore: int # 1-10
    retirementPlanned: bool

class LifeEventInput(BaseModel):
    event: str # bonus, inheritance, marriage, new baby
    amount: float = 0
    details: str = ""

class TaxInput(BaseModel):
    salaryStructure: dict # basic, hra, lta, etc.
    deductions: dict # 80C, 80D, etc.
    regime: str = "auto" # old, new, auto

class CoupleInput(BaseModel):
    partner1: dict
    partner2: dict
    goals: list[str]

class PortfolioInput(BaseModel):
    holdings: list[dict] # scheme name, amount, category
    rawText: str = ""

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

import json

class TransactionsPayload(BaseModel):
    transactions: list[dict]

@app.post("/api/generate-insights")
def generate_insights(payload: TransactionsPayload):
    if not model or not payload.transactions:
        # Fallback to local hardcoded mock logic if no API key or no transactions
        return insights_data
        
    try:
        # Prepare context payload
        context_data = json.dumps(payload.transactions[:50]) # Limit to last 50 for token limits
        prompt = f"""
        You are MoneyMitra, an expert AI financial advisor. 
        Analyze the user's recent transactions: {context_data}
        
        Generate exactly 4 personalized financial insights in strict JSON array format.
        Return ONLY the raw JSON array string. Do not use Markdown code blocks (no ```json).
        
        Required schema for each object:
        - "id": integer
        - "type": string (must be one of: "alert", "opportunity", "achievement", "insight")
        - "title": string (catchy, 3-5 words)
        - "description": string (detailed financial observation and advice based on their specific transaction amounts/categories)
        - "actionText": string (short CTA, 2-3 words)
        - "icon": string (only 1 relevant emoji)
        - "color": string (must be "red" for alert, "green" for opportunity, "yellow" for achievement, "purple" for insight)
        """
        
        response = model.generate_content(prompt)
        text = response.text.strip()
        
        # Strip markdown syntax if Gemini hallucinated it
        if text.startswith("```json"):
            text = text[7:-3].strip()
        elif text.startswith("```"):
            text = text[3:-3].strip()
            
        return json.loads(text)
    except Exception as e:
        print(f"Gemini Insights Error: {e}")
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

# --- Advanced Financial Feature Endpoints ---

@app.post("/api/fire-planner")
def get_fire_plan(input: FIREInput):
    if not model:
        return {"error": "AI Model not configured"}
    
    prompt = f"""
    Generate a complete, month-by-month financial roadmap to Financial Independence (FIRE) for the user:
    - Age: {input.age}, Retirement Age: {input.retirementAge}
    - Monthly Income: ₹{input.monthlyIncome}, Expenses: ₹{input.monthlyExpenses}
    - Existing Investments: ₹{input.existingInvestments}, Risk Profile: {input.riskProfile}
    
    Include:
    1. Specific SIP amounts calculated for their income/expenses.
    2. Asset allocation shifts over time.
    3. Insurance gaps (Life, Health).
    4. Tax-saving moves (ELSS, NPS, etc.).
    5. Emergency fund targets.
    
    IMPORTANT: You must explicitly mention the user's age ({input.age}) and income (₹{input.monthlyIncome}) in the 'overallAdvice' or 'details' to make it personalized.
    Return ONLY raw JSON in a structured format with 'roadmap' (list of milestones/months) and a 'summary'.
    """
    default_plan = {
        "roadmap": [
            {"month": "Month 1", "action": "Increase SIP", "details": "Start by increasing your current SIP by 10% to accelerate corpus building."},
            {"month": "Month 6", "action": "Rebalance Portfolio", "details": "Shift 5% from Debt to Equity if market conditions allow."},
            {"milestone": "Year 2", "action": "Insurance Review", "details": "Add Term Insurance of at least 20x annual income."}
        ],
        "summary": {
            "totalCorpusNeeded": "₹4.5 Cr",
            "yearsToFire": "15 Years",
            "monthlySipRequired": "₹45,000",
            "overallAdvice": "Your current savings rate is good. Focus on aggressive equity allocation in the initial 5 years."
        }
    }
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        # More robust JSON cleaning
        if "```" in text:
            text = text.split("```")[1]
            if text.startswith("json"): text = text[4:]
        elif "[" in text or "{" in text:
            # Try to find the start of JSON if it's buried in text
            start = text.find("{")
            end = text.rfind("}") + 1
            if start != -1 and end != 0:
                text = text[start:end]
        return json.loads(text)
    except Exception as e:
        print(f"FIRE Planner Error: {e}")
        return default_plan

@app.post("/api/money-health-score")
def get_money_health_score(input: HealthScoreInput):
    # Logic to calculate score across 6 dimensions
    dimensions = {
        "emergency": min(input.emergencyFundMonths * 16.6, 100),
        "insurance": 100 if input.insuranceCoverage else 30,
        "debt": 100 if input.isDebtFree else 40,
        "investment": 100 if input.isInvesting else 20,
        "tax": input.taxEfficiencyScore * 10,
        "retirement": 100 if input.retirementPlanned else 25
    }
    score = sum(dimensions.values()) // 6
    return {"score": score, "dimensions": dimensions}

@app.post("/api/life-event-advisor")
def get_life_event_advice(input: LifeEventInput):
    if not model: return {"error": "AI Model not configured"}
    
    prompt = f"""
    Provide financial advice for a life event: {input.event}
    Amount (if applicable): ₹{input.amount}
    Details: {input.details}
    
    Consider Indian tax laws and investment options (NPS, VPF, MF, etc.).
    Respond concisely with key action points. 
    IMPORTANT: Explicitly mention the amount ₹{input.amount} in your advice.
    Return JSON with 'advice' and 'actions'.
    """
    default_advice = {
        "advice": "General financial prudence suggests diversifying this windfall across debt and equity.",
        "actions": ["Park in Liquid Fund for 3 months", "Start a Weekly Systematic Transfer Plan (STP)", "Check 80C limits"]
    }
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        if "```" in text:
            text = text.split("```")[1]
            if text.startswith("json"): text = text[4:]
        return json.loads(text)
    except Exception as e:
        print(f"Advice Error: {e}")
        return default_advice

@app.post("/api/tax-wizard")
def get_tax_wizard(input: TaxInput):
    if not model: return {"error": "AI Model not configured"}
    
    prompt = f"""
    Analyze salary and deductions: {json.dumps(input.salaryStructure)}, {json.dumps(input.deductions)}
    Compare Old vs New Tax Regime for the current Indian FY.
    Suggest missing deductions and tax-saving investments.
    IMPORTANT: The input salary is {input.salaryStructure.get('basic', 0) + input.salaryStructure.get('hra', 0)}. Use these actual numbers in your 'recommendation'.
    Return JSON with 'oldRegimeTax', 'newRegimeTax', 'recommendation', and 'tips'.
    """
    default_tax = {
        "oldRegimeTax": 125000,
        "newRegimeTax": 115000,
        "recommendation": "The New Regime appears better. Switch if you don't have large 80C/HRA deductions.",
        "tips": ["Invest in NPS for extra 50k deduction", "Check health insurance for parents (80D)"]
    }
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        if "```" in text:
            text = text.split("```")[1]
            if text.startswith("json"): text = text[4:]
        return json.loads(text)
    except Exception as e:
        print(f"Tax Error: {e}")
        return default_tax

@app.post("/api/couple-planner")
def get_couple_plan(input: CoupleInput):
    if not model: return {"error": "AI Model not configured"}
    
    prompt = f"""
    Indian Joint Financial Planning:
    Partner 1: {json.dumps(input.partner1)}
    Partner 2: {json.dumps(input.partner2)}
    Goals: {input.goals}
    
    Optimize HRA, NPS matching, and SIP splits across both incomes for max tax efficiency.
    Track combined net worth.
    IMPORTANT: Mention both partners' names or profiles ({json.dumps(input.partner1.get('name', 'Partner 1'))} and {json.dumps(input.partner2.get('name', 'Partner 2'))}) in the 'optimizationStrategy' to show it's personalized.
    Return JSON with 'optimizationStrategy', 'sipSplits', and 'jointNetWorth'.
    """
    default_couple = {
        "optimizationStrategy": "Claim HRA on Partner 1's income (higher bracket). Partner 2 should maximize NPS matching.",
        "jointNetWorth": "₹28.5L",
        "sipSplits": [
            {"scheme": "Nifty 50 Index", "partner1": "₹15,000", "partner2": "₹10,000"},
            {"scheme": "Midcap Fund", "partner1": "₹5,000", "partner2": "₹5,000"}
        ]
    }
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        if "```" in text:
            text = text.split("```")[1]
            if text.startswith("json"): text = text[4:]
        return json.loads(text)
    except Exception as e:
        print(f"Couple Planner Error: {e}")
        return default_couple

@app.post("/api/mf-xray")
def get_mf_xray(input: PortfolioInput):
    if not model: return {"error": "AI Model not configured"}
    
    prompt = f"""
    Analyze Mutual Fund Portfolio: {json.dumps(input.holdings or input.rawText)}
    Identify:
    - Portfolio reconstruction (sector/cap distribution)
    - True XIRR (simulated based on market current levels)
    - Overlap analysis between funds
    - Expense ratio drag
    - AI-generated rebalancing plan
    
    IMPORTANT: You must analyze the specific funds provided: {json.dumps(input.holdings[:3])}. Mention at least one fund name in the 'overlap' or 'rebalancePlan'.
    Return JSON with 'portfolioBreakdown', 'overlap', 'xirr', 'rebalancePlan'.
    """
    default_xray = {
        "portfolioBreakdown": [{"name": "Large Cap", "value": 45}, {"name": "Mid Cap", "value": 30}, {"name": "Small Cap", "value": 15}, {"name": "Debt", "value": 10}],
        "overlap": "High overlap (42%) found between your Flexi Cap and Bluechip funds.",
        "xirr": "18.4%",
        "rebalancePlan": ["Reduce exposure to overvalued mid-caps", "Increase debt allocation to 15%", "Consolidate index funds"]
    }
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        if "```" in text:
            text = text.split("```")[1]
            if text.startswith("json"): text = text[4:]
        return json.loads(text)
    except Exception as e:
        print(f"MF X-ray Error: {e}")
        return default_xray

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
