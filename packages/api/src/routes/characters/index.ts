import { FastifyPluginAsync } from "fastify"
import { CharactersQuerystring } from "./types"

const characters: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{
    Querystring: CharactersQuerystring;
  }>('/', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          gender: { type: 'string' },
          born: { type: 'string' },
          died: { type: 'string' },
          species: { type: 'string' },
          height: { type: 'string' },
          weight: { type: 'string' },
          hair_color: { type: 'string' },
          eye_color: { type: 'string' },
          skin_color: { type: 'string' },
          blood_status: { type: 'string' },
          marital_status: { type: 'string' },
          nationality: { type: 'string' },
          animagus: { type: 'string' },
          boggart: { type: 'string' },
          house: { type: 'string' },
          patronus: { type: 'string' },
          alias_names: { type: 'string' },
          jobs: { type: 'string' },
          family_members: { type: 'string' },
          romances: { type: 'string' },
          wands: { type: 'string' },
          image: { type: 'string' },
          wiki: { type: 'string' },
          titles: { type: 'string' },
          sort: { type: 'string' },
          order: { type: 'string' },
          page: { type: 'number' },
          size: { type: 'number' },
        },
      },
    },
  },async (req, res) => {
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
  
    let query = fastify.supabase.from('characters').select('*', { count: 'exact' });
  
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
        const startIndex = (page - 1) * size;
        query = query.range(startIndex, startIndex + size - 1);
      } else {
        throw new Error('page and size must be provided together');
      }
    }
  
    const { data, count, error } = await query;
    return { data, count, error };
  });
}

export default characters;
