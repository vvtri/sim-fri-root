import { JwtPayload } from 'jsonwebtoken';
export interface JwtAuthPayload extends JwtPayload {
  userId: number;
}
