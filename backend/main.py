from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    message: str

# Simple finance-related responses
finance_responses = {
    "hello": ["Hello! I'm your finance assistant. How can I help you today?", 
              "Hi there! I can help you with financial questions. What would you like to know?"],
    "investment": ["Investing is a great way to grow your wealth over time. Consider diversifying your portfolio across different asset classes.",
                  "Before investing, make sure to research thoroughly and understand your risk tolerance."],
    "savings": ["Start by creating a budget and setting aside a portion of your income regularly.",
                "Consider opening a high-yield savings account for better interest rates."],
    "default": ["I'm not sure about that. Could you please rephrase your question?",
                "I can help you with basic financial advice. Try asking about investments, savings, or budgeting."]
}

@app.post("/api/chat")
async def chat(message: ChatMessage):
    user_message = message.message.lower()
    
    # Simple response logic
    if any(word in user_message for word in ["hello", "hi", "hey"]):
        return {"response": random.choice(finance_responses["hello"])}
    elif any(word in user_message for word in ["invest", "investment", "stock", "market"]):
        return {"response": random.choice(finance_responses["investment"])}
    elif any(word in user_message for word in ["save", "saving", "money", "budget"]):
        return {"response": random.choice(finance_responses["savings"])}
    else:
        return {"response": random.choice(finance_responses["default"])}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 