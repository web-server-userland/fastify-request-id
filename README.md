# @web-server-userland/fastify-request-id

![CI](https://github.com/web-server-userland/request-id/workflows/CI/badge.svg)
[![NPM version](https://img.shields.io/npm/v/@web-server-userland/fastify-request-id.svg?style=flat)](https://www.npmjs.com/package/@web-server-userland/fastify-request-id)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)
[![NPM size](https://img.shields.io/bundlephobia/min/@web-server-userland/fastify-request-id)](https://www.npmjs.com/package/@web-server-userland/fastify-request-id)
[![Coverage Status](https://coveralls.io/repos/github/web-server-userland/fastify-request-id/badge.svg?branch=main)](https://coveralls.io/github/web-server-userland/fastify-request-id?branch=main)

A plugin for Fastify that adds support for `request-id` and `session-id`.

Supports Fastify versions 4.x.

> Support TypeScript

## Install

```shell
# npm
npm i @web-server-userland/fastify-request-id

# pnpm
pnpm add @web-server-userland/fastify-request-id

# yarn
yarn add @web-server-userland/fastify-request-id
```

## Usage

```JavaScript
const fastify = require('fastify')()

fastify.register(require('@web-server-userland/fastify-request-id'), {
  // put your options here
})

fastify.get('/', (req, reply) => {
  console.log(req.reqID, req.sesID, req.ids)
  reply.send({ hello: 'world' }) // => response header has `x-request-id` and `x-session-id`
})

fastify.listen(3000)
```

You can use it as is without passing any option or you can configure it as explained below.

### Options

* `generateHash`: Generate hash. For example:

```javascript
/**
 * @params {"requestID" | "sessionID"} type - will generate type hash
 */
generateHash: (type) => {
  if (type === "requestID") {
    return `req${uuidv4()}`
  }
  if (type === "sessionID") {
    return `ses${uuidv4()}`
  }
}
```

* `requestIDName`: request id name - *default: `x-request-id`*

* `sessionIDName`: session id name - *default: `x-session-id`*

## License

Licensed under [MIT](./LICENSE).
