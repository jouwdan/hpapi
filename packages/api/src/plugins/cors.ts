import fp from 'fastify-plugin'
import fastifyCors = require('@fastify/cors')

export interface CorsPluginOptions {
}

export default fp<CorsPluginOptions>(async (fastify, opts) => {
  fastify.register(fastifyCors, {
    origin: '*',
    methods: ['GET'],
  })
})