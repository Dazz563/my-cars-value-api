import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // Get access to the request
    const request = context.switchToHttp().getRequest();
    // get the users Id from the session
    const { userId } = request.session || {};
    // Check if the userId exists and assign the currentUser to the request
    if (userId) {
      const user = await this.usersService.findOne(userId);
      request.currentUser = user;
    }

    return next.handle();
  }
}
