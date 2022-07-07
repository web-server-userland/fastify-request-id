import fastify from 'fastify'
import fastifyRequestID from '..'

const app = fastify()

app.register(fastifyRequestID)

app.register(fastifyRequestID, {
  generateHash: () => '',
  findRequestHeader: undefined,
  addResponseHeader: undefined
})

app.register(fastifyRequestID, {
  findRequestHeader: 'x-request-id-v2',
  addResponseHeader: 'x-resp-id-v2'
})
