import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { content, type } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Server is missing API key' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    const prompt = `
      You are an expert resume writer for Software Engineering roles.
      Analyze the following ${type} description for a fresher's resume.
      If the description is extremely vague, lacking in technical details, or missing the "what, how, and why" (e.g., just "I made a website"), you must ask a single, specific follow-up question to get more context.
      If the description has enough detail, enhance it using strong action verbs and professional formatting. Focus on impact and technical skills.
      Do not include any emojis in the feedback question or bullets. Plain professional text only.
      
      Respond ONLY with a JSON object in this exact format (no markdown blocks):
      {
        "isVague": boolean,
        "feedbackQuestion": "string with follow-up question, or null",
        "bullets": ["array of enhanced bullets", "or null"]
      }
      
      Original Text: ${content}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    const cleanedText = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedText);

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Failed to enhance content' }, { status: 500 });
  }
}
