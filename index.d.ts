/// <reference types="node" />

import { FastifyPluginCallback } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    /**
     * current request id
     */
    reqID: string;
  }
}

export interface FastifyRequestIDOptions {
    /**
     * Generate x-request-id hash
     */
    generateHash?: () => string;
    /**
     * Find request id in header.
     * If found, the hash in the request header is used first.
     */
    findRequestHeader?: string;
    /**
     * Add request id to header.
     * If it is undefined, it will not be added.
     */
    addResponseHeader?: string;
}

declare const fastifyRequestID: FastifyPluginCallback<FastifyRequestIDOptions>;
export default fastifyRequestID;
