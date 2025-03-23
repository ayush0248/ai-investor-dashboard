import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb"; // Import MongoDB connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query; // Get user ID from request URL
  const client = await clientPromise;
  const db = client.db("yourDatabaseName"); // Replace with your actual DB name
  const collection = db.collection("portfolios");

  if (req.method === "GET") {
    // Fetch user portfolio
    const portfolio = await collection.findOne({ userId });
    res.status(200).json(portfolio);
  } else if (req.method === "POST") {
    // Save user portfolio
    const { holdings } = req.body;
    await collection.updateOne({ userId }, { $set: { holdings } }, { upsert: true });
    res.status(200).json({ message: "Portfolio saved successfully!" });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
