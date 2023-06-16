import { FastifyPluginAsync } from "fastify"
import { BooksQuerystring } from "./types"

const books: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{
    Querystring: BooksQuerystring;
  }>('/', async (req, res) => {
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
        query = query.range(page - 1, page * size - 1);
      } else {
        throw new Error('page and size must be provided together');
      }
    }
  
    const { data: books, error } = await query;
    return { data: books, error };
  });
}

export default books;
