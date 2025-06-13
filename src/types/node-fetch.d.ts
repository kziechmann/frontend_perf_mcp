declare module 'node-fetch' {
  import { Request, RequestInit, Response } from 'node-fetch';
  export default function fetch(url: string, init?: RequestInit): Promise<Response>;
  export { Request, RequestInit, Response };
}
