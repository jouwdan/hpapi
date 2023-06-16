import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import Swagger from '@fastify/swagger'
import SwaggerUI from '@fastify/swagger-ui'

export type AppOptions = {} & Partial<AutoloadPluginOptions>;

const options: AppOptions = {}

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  void fastify.register(Swagger, {
    swagger: {
      info: {
        title: 'Harry Potter API',
        description: 'Harry Potter API documentation',
        version: '0.1.0'
      },
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'characters', description: 'Character related end-points' },
        { name: 'potions', description: 'Potion related end-points' },
        { name: 'spells', description: 'Spell related end-points' },
        { name: 'books', description: 'Book related end-points' },
        { name: 'movies', description: 'Movie related end-points' }
      ],
    },
  })

  void fastify.register(SwaggerUI, {
    routePrefix: '/'
  })

  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })
};

export default app;
export { app, options }
