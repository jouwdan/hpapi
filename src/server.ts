import fastify from 'fastify';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import { BooksQuerystring, CharacterQuerystring, MoviesQuerystring, PotionsQuerystring } from './types';

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

  const { data: books, error } = await query;
  return { data: books, error };
});

server.get<{
  Querystring: BooksQuerystring;
}>('/books', async (req, res) => {
  const {
    id,
    title,
    summary,
    author,
    release_date,
    dedication,
    pages,
    cover,
    wiki,
    chapters,
    sort = 'title',
    order = 'asc',
    page,
    size,
  } = req.query;

  let query = supabase.from('books').select('*');

  const filterField = (field: any, value: any) => {
    if (value) {
      query = query.filter(field, 'ilike', `%${value}%`);
    }
  };

  filterField('id', id);
  filterField('title', title);
  filterField('summary', summary);
  filterField('author', author);
  filterField('release_date', release_date);
  filterField('dedication', dedication);
  filterField('pages', pages);
  filterField('cover', cover);
  filterField('wiki', wiki);
  filterField('chapters', chapters);

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

  const { data: books, error } = await query;
  return { data: books, error };
});

server.get<{
  Querystring: MoviesQuerystring;
}>('/movies', async (req, res) => {
  const {
    id,
    title,
    summary,
    directors,
    screenwriters,
    producers,
    cinematographers,
    editors,
    distributors,
    music_composers,
    release_date,
    running_time,
    budget,
    box_office,
    rating,
    trailer,
    poster,
    wiki,
    sort = 'title',
    order = 'asc',
    page,
    size,
  } = req.query;

  let query = supabase.from('movies').select('*');

  const filterField = (field: any, value: any) => {
    if (value) {
      query = query.filter(field, 'ilike', `%${value}%`);
    }
  };

  filterField('id', id);
  filterField('title', title);
  filterField('summary', summary);
  filterField('directors', directors);
  filterField('screenwriters', screenwriters);
  filterField('producers', producers);
  filterField('cinematographers', cinematographers);
  filterField('editors', editors);
  filterField('distributors', distributors);
  filterField('music_composers', music_composers);
  filterField('release_date', release_date);
  filterField('running_time', running_time);
  filterField('budget', budget);
  filterField('box_office', box_office);
  filterField('rating', rating);
  filterField('trailer', trailer);
  filterField('poster', poster);
  filterField('wiki', wiki);

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

  const { data: movies, error } = await query;
  return { data: movies, error };
});

server.get<{
  Querystring: PotionsQuerystring;
}>('/potions', async (req, res) => {
  const {
    id,
    name,
    effect,
    side_effects,
    characteristics,
    time,
    difficulty,
    ingredients,
    inventors,
    manufacturers,
    image,
    wiki,
    sort = 'title',
    order = 'asc',
    page,
    size,
  } = req.query;

  let query = supabase.from('potions').select('*');

  const filterField = (field: any, value: any) => {
    if (value) {
      query = query.filter(field, 'ilike', `%${value}%`);
    }
  };

  filterField('id', id);
  filterField('name', name);
  filterField('effect', effect);
  filterField('side_effects', side_effects);
  filterField('characteristics', characteristics);
  filterField('time', time);
  filterField('difficulty', difficulty);
  filterField('ingredients', ingredients);
  filterField('inventors', inventors);
  filterField('manufacturers', manufacturers);
  filterField('image', image);
  filterField('wiki', wiki);

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

  const { data: potions, error } = await query;
  return { data: potions, error };
});

const port = process.env.NODE_ENV === 'prod' ? 443 : 8080;
server.listen({ port, host: '0.0.0.0' }).then((address) => {
  console.log(`server listening on ${address}`);
});