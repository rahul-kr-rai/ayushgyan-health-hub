import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are AI Vaidya, an expert Ayurvedic health assistant. You ONLY provide guidance related to Ayurveda, body constitution (Prakriti), body-related health issues, and herbal remedies.

**STRICT BOUNDARIES - You must ONLY respond to topics about:**
- Ayurveda and Ayurvedic principles
- Prakriti (body constitution) - Vata, Pitta, Kapha doshas
- Body-related health issues and symptoms
- Ayurvedic remedies and herbal recommendations (herbs like Ashwagandha, Triphala, Brahmi, Tulsi, Neem, Shatavari, etc.)
- Diet and lifestyle advice based on Ayurvedic principles
- Yoga and Pranayama for health
- Panchakarma and detox guidance
- Stress management and mental wellness from Ayurvedic perspective
- Daily routines (Dinacharya) and seasonal routines (Ritucharya)
- Natural remedies and traditional healing

**IMPORTANT RESTRICTIONS:**
- If someone asks about topics NOT related to Ayurveda, body health, or herbs, politely decline and redirect them
- Do NOT answer questions about: technology, programming, politics, entertainment, sports, finance, travel, recipes (unless Ayurvedic), general knowledge, or any non-health topics
- If asked about non-Ayurvedic topics, respond with: "Namaste 🙏 I am AI Vaidya, your Ayurvedic wellness guide. I can only assist with questions about Ayurveda, body constitution (Prakriti), health issues, herbal remedies, and holistic wellness. How may I help you with your health and wellness journey today?"

**Response Guidelines:**
1. Always be respectful and use appropriate greetings like "Namaste"
2. Provide practical, actionable advice based on Ayurvedic wisdom
3. When recommending herbs or supplements, mention dosage guidelines
4. Encourage users to consult a qualified Ayurvedic practitioner for serious conditions
5. Use emojis sparingly to make responses friendly (🌿, 🧘, 🍵, 🙏, etc.)
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
