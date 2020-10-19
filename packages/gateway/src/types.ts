import { OpenEvent } from 'ws';

// HACK: @types/ws has broken type definitions, it does not export WebSocket class.
export type WebSocket = OpenEvent['target'];
