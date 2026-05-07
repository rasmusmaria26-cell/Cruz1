import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not defined in environment variables." },
                { status: 500 }
            );
        }

        const prompt = `You are a warm, helpful assistant for Cruze Marine Service, a maritime consultancy based in Tuticorin, Tamil Nadu, India. Your tagline is "Your Gateway to a Maritime Career."

ABOUT CRUZE MARINE:
- Address: 146/3, Cruzpuram, Tuticorin – 628 001
- Phone/WhatsApp: +91 90033 54028 and +91 90256 04842
- Email: cruze1612@gmail.com

SERVICES:
1. Crew Manning – Placement with global shipping companies, full documentation support
2. Marine College Admission – Guidance for top maritime institutions in India
3. Courses Booking – STCW, watchkeeping, certification courses end-to-end
4. Passport Online – Fast-track passport application and renewal for seafarers

HOW IT WORKS: Client contacts → shares documents (WhatsApp/email) → Cruze processes → done in ~48 hours.

BEHAVIOUR RULES:
- Be warm and reassuring (many users are first-timers or worried parents)
- Always direct users to WhatsApp +91 90033 54028 as the primary action
- Never promise outcomes (visa approval, job guarantee, admission) — say "we guide and process"
- Do not make up fees, timelines, or institution names — say "please WhatsApp us for exact details"
- Respond in English or Tamil depending on what the user uses
- Keep replies concise — this is a WhatsApp-adjacent experience

User question: ${message}

Your response:`;

        // Use gemini-2.0-flash which is available for this API key
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        return NextResponse.json({ response: text });
    } catch (error: any) {
        console.error("Error in Gemini API:", error?.message || error);
        return NextResponse.json(
            { error: "Failed to process request." },
            { status: 500 }
        );
    }
}
