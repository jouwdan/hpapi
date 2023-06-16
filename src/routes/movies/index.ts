import { FastifyPluginAsync } from "fastify"
import { MoviesQuerystring } from "./types"

const movies: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{
    Querystring: MoviesQuerystring;
  }>('/', async (req, res) => {
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
  
    let query = fastify.supabase.from('movies').select('*');
  
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
}

export default movies;
