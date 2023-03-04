import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../models/user-file';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}


export const protect = async (request: Request, response: Response, next: () => void) => {
  try {
    let token;

    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
      try {
        token = request.headers.authorization.split(' ')[1];

        const user = jwt.verify(token, `${process.env.JWT_SECRET_TOKEN}`) as { _id: any; id: string };

          if (user) {
            request.user = await User.findById(user?._id).select('-password');

            console.log(user)
          }


        next();
      } catch (error) {
        response.status(401).json({ msg: 'Not Authorized' });
      }
    }

    if (!token) {
      response.status(401);
      throw new Error('Not Authorized, And Token Not Found');
    }
  } catch (error) {
    response.status(401).json({ msg: 'Not Authorized, And Token Not Found' });
  }
};
