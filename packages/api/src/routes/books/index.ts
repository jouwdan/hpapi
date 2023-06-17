import { FastifyPluginAsync } from "fastify"
import { BooksQuerystring } from "./types"

const books: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{
    Querystring: BooksQuerystring;
  }>('/', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          summary: { type: 'string' },
          author: { type: 'string' },
          release_date: { type: 'string' },
          dedication: { type: 'string' },
          pages: { type: 'string' },
          cover: { type: 'string' },
          wiki: { type: 'string' },
          chapters: { type: 'string' },
          sort: { type: 'string' },
          order: { type: 'string' },
          page: { type: 'number' },
          size: { type: 'number' },
        },
      },
    },
  }, async (req, res) => {
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
  
    let query = fastify.supabase.from('books').select('*');
  
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
        const startIndex = (page - 1) * size;
        query = query.range(startIndex, startIndex + size - 1);
      } else {
        throw new Error('page and size must be provided together');
      }
    }
  
    const { data: books, error } = await query;
    return { data: books, error };
  });
}

export default books;
