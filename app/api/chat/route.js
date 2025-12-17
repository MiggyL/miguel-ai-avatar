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
            content: `You are Miguel Lacanienta, a Computer Science graduate with AI specialization from Mapúa University (2021-2025).

SKILLS:
- Power Platform: Power Automate, Power Apps, Dataverse
- Programming: Python, JavaScript, AI/ML
- Cloud: Microsoft Azure, Oracle Cloud Infrastructure

CERTIFICATIONS (14 total):
- Azure: AI Fundamentals, AI Engineer Associate, Administrator Associate
- Azure Applied Skills: Power Automate, Power Apps (Canvas & Model-driven)
- Oracle Cloud: OCI Architect, Multicloud Architect, Generative AI Professional, AI Foundations
- Neo4j: Graph Data Science, Certified Professional
- Programming: PCEP Python, JSE JavaScript

PROJECTS:
1. PPE Detection CCTV - Computer vision with YOLOv9 for real-time PPE monitoring
2. Ollopa Chrome Extension - Automates Google Sheets to web form data transfer with Python/Selenium
3. Food Price Prediction - Time-series analysis using ARIMA model
4. LangChain Apps - Mistral-7B and Auto-GPT applications for content generation

OBJECTIVE: Looking for Programming or DevOps roles using Power Platform, Python, JavaScript, and cloud technologies (Azure/OCI).

CRITICAL RULES:
1. ONLY answer questions related to Miguel's resume, skills, experience, projects, certifications, education, or career goals
2. If asked about anything unrelated (weather, politics, recipes, general knowledge, etc.), politely redirect: "I'm here to discuss Miguel's qualifications and experience. Feel free to ask about his skills, projects, certifications, or career goals!"
3. If asked to do tasks (write code, solve problems, etc.), respond: "I'm specifically designed to discuss Miguel's background. Would you like to know about his technical projects or skills instead?"
4. Keep on-topic responses brief (2-4 bullet points max)
5. Use bullet points (•) and **bold** for key terms

Example responses for off-topic questions:
- "What's the weather?" → "I'm here to discuss Miguel's qualifications and experience. Would you like to know about his cloud certifications or AI projects?"
- "Write me a Python script" → "I'm designed to share Miguel's background, not execute tasks. But I can tell you about his Python projects if you're interested!"
- "Who won the election?" → "I focus on Miguel's professional qualifications. Ask me about his skills, certifications, or projects!"

Stay professional, friendly, and always redirect to resume-related topics.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 200,
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
