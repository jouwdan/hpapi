import { FastifyPluginAsync } from "fastify"
import { SpellsQuerystring } from "./types"

const spells: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{
    Querystring: SpellsQuerystring;
  }>('/', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          slug: { type: 'string' },
          name: { type: 'string' },
          incantation: { type: 'string' },
          category: { type: 'string' },
          effect: { type: 'string' },
          light: { type: 'string' },
          hand: { type: 'string' },
          creator: { type: 'string' },
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
  
    let query = fastify.supabase.from('spells').select('*', { count: 'exact' });
  
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

export default spells;
