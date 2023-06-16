import { FastifyPluginAsync } from "fastify"
import { SpellsQuerystring } from "./types"

const spells: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{
    Querystring: SpellsQuerystring;
  }>('/', async (req, res) => {
    const {
      id,
      slug,
      name,
      incantation,
      category,
      effect,
      light,
      hand,
      creator,
      image,
      wiki,
      sort = 'name',
      order = 'asc',
      page,
      size,
    } = req.query;
  
    let query = fastify.supabase.from('spells').select('*');
  
    const filterField = (field: any, value: any) => {
      if (value) {
        query = query.filter(field, 'ilike', `%${value}%`);
      }
    };
  
    filterField('id', id);
    filterField('slug', slug);
    filterField('name', name);
    filterField('incantation', incantation);
    filterField('category', category);
    filterField('effect', effect);
    filterField('light', light);
    filterField('hand', hand);
    filterField('creator', creator);
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
  
    const { data: spells, error } = await query;
    return { data: spells, error };
  });
}

export default spells;
