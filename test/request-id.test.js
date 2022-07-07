const test = require('ava')
const Fastify = require('fastify')
const fastifyRequestID = require('..')

test('Use default options', async t => {
  t.plan(2)

  const fastify = Fastify()
  fastify.register(fastifyRequestID)

  fastify.get('/', (req, reply) => {
    t.truthy(req.reqID)
    reply.send('ok')
  })

  const resp = await fastify.inject({
    method: 'GET',
    url: '/'
  })

  t.truthy(resp.headers['x-request-id'])
})

test('Custom generateHash options', async t => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(fastifyRequestID, {
    generateHash: () => 'custom-hash'
  })

  fastify.get('/', (req, reply) => {
    t.truthy(req.reqID)
    t.is(req.reqID, 'custom-hash')
    reply.send('ok')
  })

  const resp = await fastify.inject({
    method: 'GET',
    url: '/'
  })

  t.is(resp.headers['x-request-id'], 'custom-hash')
})

test('Custom findRequestHeader options', async t => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(fastifyRequestID, {
    findRequestHeader: 'x-custom-request-id'
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

  t.is(resp.headers['x-request-id'], 'custom-hash')
})

test('not found findRequestHeader header name', async t => {
  t.plan(2)

  const fastify = Fastify()
  fastify.register(fastifyRequestID, {
    findRequestHeader: 'x-custom-request-id'
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

test('findRequestHeader options is undefined', async t => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(fastifyRequestID, {
    findRequestHeader: undefined
  })

  fastify.get('/', (req, reply) => {
    t.truthy(req.reqID)
    t.not(req.reqID, req.headers['x-request-id'])
    reply.send('ok')
  })

  const resp = await fastify.inject({
    method: 'GET',
    url: '/',
    headers: {
      'x-request-id': 'custom-request-id'
    }
  })

  t.not(resp.headers['x-request-id'], 'custom-request-id')
})

test('Custom addResponseHeader options', async t => {
  t.plan(2)

  const fastify = Fastify()
  fastify.register(fastifyRequestID, {
    addResponseHeader: 'x-custom-request-id-response'
  })

  fastify.get('/', (req, reply) => {
    t.truthy(req.reqID)
    reply.send('ok')
  })

  const resp = await fastify.inject({
    method: 'GET',
    url: '/'
  })

  t.truthy(resp.headers['x-custom-request-id-response'])
})

test('addResponseHeader options is undefined', async t => {
  t.plan(2)

  const fastify = Fastify()
  fastify.register(fastifyRequestID, {
    addResponseHeader: undefined
  })

  fastify.get('/', (req, reply) => {
    t.truthy(req.reqID)
    reply.send('ok')
  })

  const resp = await fastify.inject({
    method: 'GET',
    url: '/'
  })

  t.is(resp.headers['x-request-id'], undefined)
})
