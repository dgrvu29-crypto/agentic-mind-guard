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

    // Anonymize audit logs (hash user_id for retention)
    const userIdHash = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(user.id + Deno.env.get('SECRET_KEY'))
    );
    const hashHex = Array.from(new Uint8Array(userIdHash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Get assessments to anonymize audit logs
    const { data: assessments } = await supabase
      .from('assessments')
      .select('id')
      .eq('user_id', user.id);

    if (assessments) {
      // Create audit log entries before deletion
      for (const assessment of assessments) {
        await supabase.from('audit_logs').insert({
          user_id_hash: hashHex,
          action: 'account_deleted',
          resource_type: 'assessment',
          resource_id: assessment.id,
          metadata: { deleted_at: new Date().toISOString() },
        });
      }
    }

    // Delete user data (CASCADE will handle related records)
    await supabase.from('profiles').delete().eq('id', user.id);

    // Delete auth user
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
    if (deleteError) {
      throw deleteError;
    }

    return new Response(JSON.stringify({
      message: 'Account deleted successfully',
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
