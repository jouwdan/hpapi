import fastify from 'fastify';
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error('Supabase credentials not found in environment variables');
}

const supabaseUrl: string = process.env.SUPABASE_URL;
const supabaseKey: string = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const serverOptions = {
  logger: true,
};

const server = fastify(serverOptions);

server.get<{
  Querystring: { name?: string; gender?: string, born?: string, died?: string, species?: string, sort?: string, order?: string, page?: number; size?: number };
}>('/characters', async (req, res) => {
  
  const { name, gender, born, died, species, sort = 'name', order = 'asc', page, size } = req.query;

  let query = supabase.from('characters').select('*');

  if (name) {
    query = query.filter('name', 'ilike', `%${name}%`);
  }

  if (gender) {
    query = query.filter('gender', 'ilike', `%${gender}%`);
  }

  if (born) {
    query = query.filter('born', 'ilike', `%${born}%`);
  }

  if (died) {
    query = query.filter('died', 'ilike', `%${died}%`);
  }

  if (species) {
    query = query.filter('species', 'ilike', `%${species}%`);
  }
  
  if (order) {
    if (order === 'asc') {
      query = query.order(sort);
    } else if (order === 'desc') {
      query = query.order(sort, { ascending: false });
    } else {
      throw new Error('order must be either asc or desc');
    }
  }

  if (page || size) {
    if (page && size) {
      query = query.range(page - 1, page * size - 1);
    } else {
      throw new Error('page and size must be provided together');
    }
  }

  let { data: characters, error } = await query
  return { data: characters, error };
});

if (process.env.NODE_ENV === 'dev') {
  server.listen({ port: 8080, host: '0.0.0.0' }).then((address: string) => {
    console.log(`server listening on ${address}`);
  });
} else if (process.env.NODE_ENV === 'prod') {
  server.listen({ port: 443, host: '0.0.0.0' }).then((address: string) => {
    console.log(`server listening on ${address}`);
  });
} else {
  throw new Error('NODE_ENV must be either dev or prod');
}

