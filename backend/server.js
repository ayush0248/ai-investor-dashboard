const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Finance-related responses
const financeResponses = {
  hello: [
    "Hello! I'm your finance assistant. How can I help you today?",
    "Hi there! I can help you with financial questions. What would you like to know?"
  ],
  investment: [
    "Investing is a great way to grow your wealth over time. Consider diversifying your portfolio across different asset classes.",
    "Before investing, make sure to research thoroughly and understand your risk tolerance."
  ],
  savings: [
    "Start by creating a budget and setting aside a portion of your income regularly.",
    "Consider opening a high-yield savings account for better interest rates."
  ],
  default: [
    "I'm not sure about that. Could you please rephrase your question?",
    "I can help you with basic financial advice. Try asking about investments, savings, or budgeting."
  ]
};

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  const userMessage = message.toLowerCase();
  
  let response;
  
  if (userMessage.match(/^(hello|hi|hey)/i)) {
    response = financeResponses.hello[Math.floor(Math.random() * financeResponses.hello.length)];
  } else if (userMessage.match(/(invest|investment|stock|market)/i)) {
    response = financeResponses.investment[Math.floor(Math.random() * financeResponses.investment.length)];
  } else if (userMessage.match(/(save|saving|money|budget)/i)) {
    response = financeResponses.savings[Math.floor(Math.random() * financeResponses.savings.length)];
  } else {
    response = financeResponses.default[Math.floor(Math.random() * financeResponses.default.length)];
  }

  res.json({ response });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
