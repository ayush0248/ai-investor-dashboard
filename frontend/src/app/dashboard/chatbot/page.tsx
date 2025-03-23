"use client" 
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

const API_KEY = "AIzaSyCK2BQA2qCN8JnGKZQU98hJovhyF82ogvE";
const MODEL = "gemini-1.5-pro";

export default function FinanceChatbot() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    const prompt = `You are a finance assistant. Provide clear and structured advice for finance-related questions.\n\n**User Query:** ${input}`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await res.json();
      setResponse(
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received."
      );
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Failed to generate response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue to-blue-100">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold text-blue-600">
            Fin-advisor Chatbot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Input
              type="text"
              placeholder="Ask your finance question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Generating..." : "Ask AI"}
            </Button>
          </div>

          {loading && <p className="text-gray-500 text-center">Loading your response...</p>}

          {response && (
            <div className="p-4 border rounded-lg bg-black">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}