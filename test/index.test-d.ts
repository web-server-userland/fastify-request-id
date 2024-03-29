import fastify from 'fastify'
import fastifyRequestID from '..'

const app = fastify()

app.register(fastifyRequestID)

app.register(fastifyRequestID, {
  generateHash: () => ''
})

app.register(fastifyRequestID, {
  requestIDName: 'x-request-id-v2',
  sessionIDName: 'x-ses-id-v2'
})

app.get('/', (req, reply) => {
  console.log(req.reqID)
  console.log(req.sesID)
  reply.send(req.ids)
})
