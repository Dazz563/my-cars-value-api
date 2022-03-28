import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

// Adds the currentUser to the express requests object so typescript won't moan!
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersSerrvice: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersSerrvice.findOne(userId);
      req.currentUser = user;
    }

    next();
  }
}
