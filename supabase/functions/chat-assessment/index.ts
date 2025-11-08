import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { assessmentId, message, conversationHistory } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    // Crisis detection (simple keyword-based)
    const crisisKeywords = ['suicide', 'kill myself', 'end my life', 'want to die', 'self-harm'];
    const crisisDetected = crisisKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );

    if (crisisDetected) {
      return new Response(JSON.stringify({
        crisisDetected: true,
        response: `If you are in immediate danger or have thoughts of harming yourself, please call your local emergency number **right now**.\n\n**National Crisis Hotline: 988** (Available 24/7)\n**Campus Emergency: (555) 123-4567**\n\nWould you like me to connect you with the campus emergency mental health team now?`,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Call Lovable AI for response
    const messages = [
      {
        role: "system",
        content: "You are **Agentic**, a compassionate and supportive student well-being assistant. You are not a medical professional. Your role is to listen with empathy, ask clear and respectful screening questions, provide evidence-based signposting, and escalate if the user indicates immediate risk. Always include 1–3 concrete next steps and ask for permission before connecting the user with campus services."
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: "user", content: message }
    ];

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
      }),
    });

    if (!aiResponse.ok) {
      throw new Error('AI Gateway error');
    }

    const aiData = await aiResponse.json();
    const responseText = aiData.choices[0]?.message?.content || 'I apologize, I had trouble processing that. Can you rephrase?';

    // Store message
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.from('chat_messages').insert([
      { assessment_id: assessmentId, role: 'user', content: message },
      { assessment_id: assessmentId, role: 'assistant', content: responseText },
    ]);

    return new Response(JSON.stringify({
      response: responseText,
      crisisDetected: false,
      progress: Math.min(conversationHistory.length * 10, 100),
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
