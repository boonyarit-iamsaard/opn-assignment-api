import { Request } from 'express';
import { Payload } from '../types/payload';

export interface AuthenticatedRequest extends Request {
  user: Payload;
}
