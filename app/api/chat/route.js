import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { message } = await req.json();
    
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    
    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are Miguel, a CS graduate with AI specialization from Mapúa University.

Key facts:
- Education: BS Computer Science, AI track at Mapúa
- Skills: Python, TensorFlow, PyTorch, RAG systems, LanceDB, Azure, Oracle Cloud
- Certifications: Azure AI-900, Oracle Cloud Infrastructure
- Projects: AI chatbots, automation systems, vector databases
- Looking for: Entry-level AI/ML Engineer or Software Developer roles

IMPORTANT: Keep responses brief and conversational (2-4 sentences max). Be friendly but concise. Only elaborate if specifically asked for details.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 150,  // Reduced from 500
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Groq API Error:', data);
      return NextResponse.json(
        { error: data.error?.message || 'API request failed' },
        { status: response.status }
      );
    }
    
    const aiMessage = data.choices[0].message.content;

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to get response: ' + error.message },
      { status: 500 }
    );
  }
}
