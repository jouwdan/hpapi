import fp from 'fastify-plugin'
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

export interface SupabasePluginOptions {
}

export default fp<SupabasePluginOptions>(async (fastify, opts) => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    throw new Error('Supabase credentials not found in environment variables');
  }
  
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseKey);

  fastify.decorate('supabase', supabase);
})

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    supabase: any;
  }
}
