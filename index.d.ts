/// <reference types="node" />

import { FastifyPluginCallback } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    /**
     * Current request id
     */
    reqID: string;
    /**
     * Current session id
     */
    sesID: string;
    /**
     * ID collection
     */
    ids: FastifyRequestIDS;
  }
}

export interface FastifyRequestIDS {
  reqID: string;
  sesID: string;
}

export interface FastifyRequestIDOptions {
    /**
     * Generate hash
     */
    generateHash?: (type: "requestID" | "sessionID") => string;
    /**
     * Add custom request id name to header.
     */
     requestIDName?: string;
    /**
     * Add custom session id name to header.
     */
     sessionIDName?: string;
}

declare const fastifyRequestID: FastifyPluginCallback<FastifyRequestIDOptions>;
export default fastifyRequestID;
