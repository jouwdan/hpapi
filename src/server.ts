import fastify from 'fastify';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import { CharacterQuerystring } from './types';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error('Supabase credentials not found in environment variables');
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const serverOptions = {
  logger: true,
};

const server = fastify(serverOptions);

server.get<{
  Querystring: CharacterQuerystring;
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

  const filterField = (field: any, value: any) => {
    if (value) {
      query = query.filter(field, 'ilike', `%${value}%`);
    }
  };

  filterField('id', id);
  filterField('name', name);
  filterField('gender', gender);
  filterField('born', born);
  filterField('died', died);
  filterField('species', species);
  filterField('height', height);
  filterField('weight', weight);
  filterField('hair_color', hair_color);
  filterField('eye_color', eye_color);
  filterField('skin_color', skin_color);
  filterField('blood_status', blood_status);
  filterField('marital_status', marital_status);
  filterField('nationality', nationality);
  filterField('animagus', animagus);
  filterField('boggart', boggart);
  filterField('house', house);
  filterField('patronus', patronus);
  filterField('alias_names', alias_names);
  filterField('jobs', jobs);
  filterField('family_members', family_members);
  filterField('romances', romances);
  filterField('wands', wands);
  filterField('image', image);
  filterField('wiki', wiki);
  filterField('titles', titles);

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

  const { data: characters, error } = await query;
  return { data: characters, error };
});

const port = process.env.NODE_ENV === 'prod' ? 443 : 8080;
server.listen({ port, host: '0.0.0.0' }).then((address) => {
  console.log(`server listening on ${address}`);
});