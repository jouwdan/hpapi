import { FastifyPluginAsync } from "fastify"
import { PotionsQuerystring } from "./types"

const potions: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{
    Querystring: PotionsQuerystring;
  }>('/', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          effect: { type: 'string' },
          side_effects: { type: 'string' },
          characteristics: { type: 'string' },
          time: { type: 'string' },
          difficulty: { type: 'string' },
          ingredients: { type: 'string' },
          inventors: { type: 'string' },
          manufacturers: { type: 'string' },
          image: { type: 'string' },
          wiki: { type: 'string' },
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
      sort = 'name',
      order = 'asc',
      page,
      size,
    } = req.query;
  
    let query = fastify.supabase.from('potions').select('*');
  
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
        const startIndex = (page - 1) * size;
        query = query.range(startIndex, startIndex + size - 1);
      } else {
        throw new Error('page and size must be provided together');
      }
    }
  
    const { data: potions, error } = await query;
    return { data: potions, error };
  });
}

export default potions;
