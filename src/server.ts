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
  Querystring: {
    id?: string;
    name?: string;
    gender?: string;
    born?: string;
    died?: string;
    species?: string;
    height?: string;
    weight?: string;
    hair_color?: string;
    eye_color?: string;
    skin_color?: string;
    blood_status?: string;
    marital_status?: string;
    nationality?: string;
    animagus?: string;
    boggart?: string;
    house?: string;
    patronus?: string;
    alias_names?: string;
    jobs?: string;
    family_members?: string;
    romances?: string;
    wands?: string;
    image?: string;
    wiki?: string;
    titles?: string;
    sort?: string;
    order?: string;
    page?: number;
    size?: number;
  };
}>('/characters', async (req, res) => {
  const {
    id,
    name,
    gender,
    born,
    died,
    species,
    height,
    weight,
    hair_color,
    eye_color,
    skin_color,
    blood_status,
    marital_status,
    nationality,
    animagus,
    boggart,
    house,
    patronus,
    alias_names,
    jobs,
    family_members,
    romances,
    wands,
    image,
    wiki,
    titles,
    sort = 'name',
    order = 'asc',
    page,
    size,
  } = req.query;

  let query = supabase.from('characters').select('*');

  if (id) {
    query = query.filter('id', 'ilike', `%${id}%`);
  }

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

  if (height) {
    query = query.filter('height', 'ilike', `%${height}%`);
  }

  if (weight) {
    query = query.filter('weight', 'ilike', `%${weight}%`);
  }

  if (hair_color) {
    query = query.filter('hair_color', 'ilike', `%${hair_color}%`);
  }

  if (eye_color) {
    query = query.filter('eye_color', 'ilike', `%${eye_color}%`);
  }

  if (skin_color) {
    query = query.filter('skin_color', 'ilike', `%${skin_color}%`);
  }

  if (blood_status) {
    query = query.filter('blood_status', 'ilike', `%${blood_status}%`);
  }

  if (marital_status) {
    query = query.filter('marital_status', 'ilike', `%${marital_status}%`);
  }

  if (nationality) {
    query = query.filter('nationality', 'ilike', `%${nationality}%`)
  }

  if (animagus) {
    query = query.filter('animagus', 'ilike', `%${animagus}%`);
  }

  if (boggart) {
    query = query.filter('boggart', 'ilike', `%${boggart}%`);
  }

  if (house) {
    query = query.filter('house', 'ilike', `%${house}%`);
  }

  if (patronus) {
    query = query.filter('patronus', 'ilike', `%${patronus}%`);
  }

  if (alias_names) {
    query = query.filter('alias_names', 'ilike', `%${alias_names}%`);
  }

  if (jobs) {
    query = query.filter('jobs', 'ilike', `%${jobs}%`);
  }

  if (family_members) {
    query = query.filter('family_members', 'ilike', `%${family_members}%`);
  }

  if (romances) {
    query = query.filter('romances', 'ilike', `%${romances}%`);
  }

  if (wands) {
    query = query.filter('wands', 'ilike', `%${wands}%`);
  }

  if (image) {
    query = query.filter('image', 'ilike', `%${image}%`);
  }

  if (wiki) {
    query = query.filter('wiki', 'ilike', `%${wiki}%`);
  }

  if (titles) {
    query = query.filter('titles', 'ilike', `%${titles}%`);
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

