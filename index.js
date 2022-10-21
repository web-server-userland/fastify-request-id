'use strict'

const fp = require('fastify-plugin')
const { customAlphabet } = require('nanoid')

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const hash = customAlphabet(alphabet, 15)

const defaultOptions = {
  generateHash: (type) => hash(),
  requestIDName: 'x-request-id',
  sessionIDName: 'x-session-id'
}

function fastifyRequestID (fastify, opts, done) {
  fastify.decorateRequest('reqID', '')
  fastify.decorateRequest('sesID', '')
  fastify.decorateRequest('ids', null)

  const options = Object.assign({}, defaultOptions, opts)

  fastify.addHook('onRequest', (request, _reply, next) => {
    request.reqID = request.headers[options.requestIDName] || options.generateHash('requestID')
    request.sesID = request.headers[options.sessionIDName] || options.generateHash('sessionID')
    request.ids = {
      reqID: request.reqID,
      sesID: request.sesID
    }
    next()
  })

  fastify.addHook('onSend', (request, reply, _payload, next) => {
    reply.header(options.requestIDName, request.reqID)
    reply.header(options.sessionIDName, request.sesID)
    next()
  })

  done()
}

module.exports = fp(fastifyRequestID, {
  fastify: '4.x',
  name: '@web-server-userland/fastify-request-id'
})
