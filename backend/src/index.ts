import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Dummy Data
const summaryData = {
  totalBalance: "₹12,45,000",
  monthlyIncome: "₹1,85,000",
  monthlyExpenses: "₹65,400",
  totalInvestments: "₹8,50,000",
};

const goalsData = [
  { id: 1, name: "Dream Home Downpayment", target: 2500000, current: 850000, deadline: "Dec 2026", suggestedSip: 45000, icon: "🏠", color: "blue" },
  { id: 2, name: "Europe Vacation", target: 400000, current: 120000, deadline: "Jun 2025", suggestedSip: 18000, icon: "✈️", color: "purple" },
  { id: 3, name: "Emergency Fund", target: 600000, current: 550000, deadline: "Dec 2024", suggestedSip: 8000, icon: "🛡️", color: "green" }
];

const insightsData = [
  { id: 1, type: "alert", title: "High Dining Expenses Detected", description: "You've spent ₹14,500 on dining out this month, which is 45% higher than average. Consider cooking at home.", actionText: "Review Budget", icon: "🍽️", color: "red" },
  { id: 2, type: "opportunity", title: "Tax Saving Opportunity", description: "Investing ₹45,000 more in ELSS can save you up to ₹14,040 in taxes this financial year.", actionText: "Explore ELSS Funds", icon: "💰", color: "green" },
  { id: 3, type: "achievement", title: "Emergency Fund On Track", description: "Great job! You are consistently saving ₹8,000 per month towards your Emergency Fund.", actionText: "View Goals", icon: "⭐", color: "yellow" },
  { id: 4, type: "insight", title: "Subscription Audit", description: "We noticed you are paying for 3 streaming services but haven't used Netflix in 45 days. Canceling could save you ₹7,800 annually.", actionText: "Manage Subscriptions", icon: "📺", color: "purple" }
];

// Routes
app.get("/api/summary", (req, res) => {
  res.json(summaryData);
});

app.get("/api/goals", (req, res) => {
  res.json(goalsData);
});

app.get("/api/insights", (req, res) => {
  res.json(insightsData);
});

app.post("/api/chat", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Simple mock AI response logic based on keywords
  let responseText = "I'm analyzing your request. Try checking the insights tab for more features!";
  const msgLower = message.toLowerCase();

  if (msgLower.includes("dining") || msgLower.includes("spend")) {
    responseText = "You've spent ₹14,500 on dining out so far this month. This is 45% higher than your usual monthly average. Would you like me to set a dining budget alert for you?";
  } else if (msgLower.includes("yes") || msgLower.includes("alert")) {
    responseText = "Done! ✅ I've set a dining budget limit. I'll notify you when you reach 80% of this limit.";
  }

  res.json({
    text: responseText,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
