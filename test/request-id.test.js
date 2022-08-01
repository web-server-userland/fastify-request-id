const test = require('ava')
const Fastify = require('fastify')
const fastifyRequestID = require('..')

test('Use default options', async t => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(fastifyRequestID)

  fastify.get('/', (req, reply) => {
    t.truthy(req.reqID)
    t.truthy(req.sesID)
    reply.send('ok')
  })

  const resp = await fastify.inject({
    method: 'GET',
    url: '/'
  })

  t.truthy(resp.headers['x-request-id'])
  t.truthy(resp.headers['x-session-id'])
})

test('Custom generateHash options', async t => {
  t.plan(5)

  const fastify = Fastify()
  fastify.register(fastifyRequestID, {
    generateHash: (type) => {
      return type === 'requestID' ? 'custom-req-hash' : 'custom-ses-hash'
    }
  })

  fastify.get('/', (req, reply) => {
    t.truthy(req.reqID)
    t.is(req.reqID, 'custom-req-hash')
    t.is(req.sesID, 'custom-ses-hash')
    reply.send('ok')
  })

  const resp = await fastify.inject({
    method: 'GET',
    url: '/'
  })

  t.is(resp.headers['x-request-id'], 'custom-req-hash')
  t.is(resp.headers['x-session-id'], 'custom-ses-hash')
})

test('Custom requestIDName options', async t => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(fastifyRequestID, {
    requestIDName: 'x-custom-request-id'
  })

  fastify.get('/', (req, reply) => {
    t.truthy(req.reqID)
    t.is(req.reqID, req.headers['x-custom-request-id'])
    reply.send('ok')
  })

  const resp = await fastify.inject({
    method: 'GET',
    url: '/',
    headers: {
      'x-custom-request-id': 'custom-hash'
    }
  })

  t.is(resp.headers['x-custom-request-id'], 'custom-hash')
})

test('not found requestIDName header name', async t => {
  t.plan(2)

  const fastify = Fastify()
  fastify.register(fastifyRequestID, {
    requestIDName: 'x-custom-request-id'
  })

  fastify.get('/', (req, reply) => {
    t.truthy(req.reqID)
    reply.send('ok')
  })

  const resp = await fastify.inject({
    method: 'GET',
    url: '/',
    headers: {
      'x-request-id': 'custom-hash'
    }
  })

  t.not(resp.headers['x-request-id'], 'custom-hash')
})

test('Custom sessionIDName options', async t => {
  t.plan(2)

  const fastify = Fastify()
  fastify.register(fastifyRequestID, {
    sessionIDName: 'x-custom-session-id-response'
  })

  fastify.get('/', (req, reply) => {
    t.truthy(req.sesID)
    reply.send('ok')
  })

  const resp = await fastify.inject({
    method: 'GET',
    url: '/'
  })

  t.truthy(resp.headers['x-custom-session-id-response'])
})
