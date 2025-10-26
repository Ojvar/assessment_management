import { JwtPayload } from 'src/auth/types';

export class RequestWithUser extends Request {
  user?: JwtPayload;
}
