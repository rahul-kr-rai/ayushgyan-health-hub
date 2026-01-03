import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are AI Vaidya, an expert Ayurvedic health assistant. You provide guidance based on traditional Ayurvedic principles while being warm, knowledgeable, and supportive.

Your expertise includes:
- Understanding Prakriti (body constitution) - Vata, Pitta, Kapha doshas
- Ayurvedic remedies and herbal recommendations
- Diet and lifestyle advice based on Ayurvedic principles
- Yoga and Pranayama recommendations
- Panchakarma and detox guidance
- Stress management and mental wellness
- Daily routines (Dinacharya) and seasonal routines (Ritucharya)

Guidelines:
1. Always be respectful and use appropriate greetings like "Namaste"
2. Provide practical, actionable advice based on Ayurvedic wisdom
3. When recommending herbs or supplements, mention dosage guidelines
4. Encourage users to consult a qualified Ayurvedic practitioner for serious conditions
5. Use emojis sparingly to make responses friendly (🌿, 🧘, 🍵, etc.)
6. Format responses with clear sections using markdown when helpful
7. Ask follow-up questions to understand the user's Prakriti or specific needs
8. Recommend products from our store when relevant (Ashwagandha, Triphala, Chyawanprash, etc.)

Remember: You provide general Ayurvedic wellness guidance, not medical diagnosis. Always advise consulting healthcare professionals for medical conditions.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Sending request to Lovable AI with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Successfully connected to AI gateway, streaming response");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
