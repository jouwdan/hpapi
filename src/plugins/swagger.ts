import fp from 'fastify-plugin'

export interface SwaggerPluginOptions {
}

export default fp<SwaggerPluginOptions>(async function (fastify, opts) {
  fastify.register(require('@fastify/swagger'), {
    routePrefix: '/docs',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Harry Potter API',
        description: 'Harry Potter API documentation',
        version: '0.1.0'
      },
    }
  })
})