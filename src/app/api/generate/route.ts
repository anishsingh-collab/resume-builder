import { NextResponse } from 'next/server';
import { generateLatex } from '@/lib/latexTemplate';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const templateId = data.templateId || 'classic';
    const latexCode = generateLatex(data, templateId);

    return NextResponse.json({ tex: latexCode });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Failed to generate LaTeX' }, { status: 500 });
  }
}

