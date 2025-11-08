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
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get user from JWT
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch user data
    const [profileData, assessmentsData, bookingsData, messagesData] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.from('assessments').select('*').eq('user_id', user.id),
      supabase.from('bookings').select('*').eq('user_id', user.id),
      supabase.from('chat_messages').select('*, assessments!inner(user_id)').eq('assessments.user_id', user.id),
    ]);

    const exportData = {
      profile: profileData.data,
      assessments: assessmentsData.data,
      bookings: bookingsData.data,
      messages: messagesData.data,
      exported_at: new Date().toISOString(),
    };

    // Store export in storage bucket
    const exportJson = JSON.stringify(exportData, null, 2);
    const fileName = `${user.id}/export_${Date.now()}.json`;
    
    const { error: uploadError } = await supabase.storage
      .from('exports')
      .upload(fileName, exportJson, {
        contentType: 'application/json',
      });

    if (uploadError) {
      throw uploadError;
    }

    // Generate signed URL
    const { data: signedData } = await supabase.storage
      .from('exports')
      .createSignedUrl(fileName, 3600); // 1 hour

    return new Response(JSON.stringify({
      message: 'Export created successfully',
      downloadUrl: signedData?.signedUrl,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
