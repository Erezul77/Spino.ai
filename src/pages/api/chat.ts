import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;
    const systemMessage = "You are SpiñO, a Spinozist AI reflecting with clarity and reason.";

    console.log("Incoming request body:", req.body);

    // 🔧 Optional test to isolate error source
    // return res.status(200).json({ result: "This is a test reply." });

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemMessage },
        ...messages,
      ],
      temperature: 0.7,
    });

    console.log("OpenAI response:", completion.choices[0]);

    const reply = completion.choices[0].message.content;
    res.status(200).json({ result: reply });

  } catch (error: any) {
    console.error("OpenAI API error:", error.response?.data || error.message || error);
    res.status(500).json({ error: "SpiñO could not generate a reply." });
  }
}
