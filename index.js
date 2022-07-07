'use strict'

const fp = require('fastify-plugin')
const { customAlphabet } = require('nanoid')

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const defaultOptions = {
  generateHash: customAlphabet(alphabet, 15),
  findRequestHeader: 'x-request-id',
  addResponseHeader: 'x-request-id'
}

function fastifyRequestID (fastify, opts, done) {
  fastify.decorateRequest('reqID', '')

  const options = Object.assign({}, defaultOptions, opts)

  fastify.addHook('onRequest', (request, _reply, next) => {
    request.reqID = request.headers[options.findRequestHeader] || options.generateHash()
    next()
  })

  if (options.addResponseHeader) {
    fastify.addHook('onSend', (request, reply, _payload, next) => {
      reply.header(options.addResponseHeader, request.reqID)
      next()
    })
  }

  done()
}

module.exports = fp(fastifyRequestID, {
  fastify: '4.x',
  name: '@fastify-userland/request-id'
})
