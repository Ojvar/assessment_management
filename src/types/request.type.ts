import { DecodedJwtPayload } from 'src/auth/types';

export class RequestWithUser extends Request {
  user?: DecodedJwtPayload;
}
