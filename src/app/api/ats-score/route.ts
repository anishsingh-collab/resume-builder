import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { resumeData, jobDescription } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server is missing API key' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    const hasJD = Boolean(jobDescription && jobDescription.trim().length > 15);

    const prompt = `
You are a senior Applicant Tracking System (ATS) algorithm and executive tech recruiter for software engineering roles.
Analyze the following candidate resume data ${hasJD ? 'against the provided Target Job Description' : 'against general modern software engineering fresher/entry-level ATS benchmarks'}.

Resume Data:
${JSON.stringify(resumeData, null, 2)}

${hasJD ? `Target Job Description:\n${jobDescription}\n` : 'No specific Job Description provided. Evaluate against standard modern Software Engineering requirements.'}

Perform a rigorous evaluation:
1. overallScore: integer from 0 to 100.
2. matchRate: ${hasJD ? 'integer percentage from 0 to 100 representing keyword and skill overlap with the Job Description' : 'null'}.
3. breakdown: 4 categories with integer score (0 to 25) and brief 1-sentence feedback:
   - impactAndMetrics: Checks for quantifiable achievements, KPIs, numbers, % improvements.
   - technicalSkills: Evaluation of languages, frameworks, tools, CS fundamentals.
   - actionVerbs: Usage of strong, concise action verbs vs passive phrases.
   - completeness: Contact links, education clarity, project depth.
4. matchedSkills: array of strings of technical skills present in the resume ${hasJD ? 'that match the JD' : 'that are high value for software engineers'}.
5. missingSkills: array of strings of technical skills/keywords ${hasJD ? 'explicitly or implicitly required by the JD that are missing from the resume' : 'recommended for this candidate profile that are currently missing'}.
6. strengths: array of 2 to 4 concise bullet points highlighting the strongest aspects.
7. criticalFixes: array of 2 to 4 actionable, high-impact suggestions to boost their ATS score immediately.
8. Output plain text only. Do NOT include any emojis or conversational filler in any string or field.

Return ONLY a valid JSON object matching this schema (no markdown blocks, no commentary outside the JSON):
{
  "overallScore": number,
  "matchRate": ${hasJD ? 'number' : 'null'},
  "breakdown": {
    "impactAndMetrics": { "score": number, "max": 25, "feedback": "string" },
    "technicalSkills": { "score": number, "max": 25, "feedback": "string" },
    "actionVerbs": { "score": number, "max": 25, "feedback": "string" },
    "completeness": { "score": number, "max": 25, "feedback": "string" }
  },
  "matchedSkills": ["string"],
  "missingSkills": ["string"],
  "strengths": ["string"],
  "criticalFixes": ["string"]
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanedText = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const evaluation = JSON.parse(cleanedText);

    return NextResponse.json(evaluation);
  } catch (error: any) {
    console.error('ATS Score calculation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to calculate ATS score' }, { status: 500 });
  }
}

