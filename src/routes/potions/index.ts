import { FastifyPluginAsync } from "fastify"
import { PotionsQuerystring } from "./types"

const potions: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{
    Querystring: PotionsQuerystring;
  }>('/', async (req, res) => {
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
        query = query.range(page - 1, page * size - 1);
      } else {
        throw new Error('page and size must be provided together');
      }
    }
  
    const { data: potions, error } = await query;
    return { data: potions, error };
  });
}

export default potions;
