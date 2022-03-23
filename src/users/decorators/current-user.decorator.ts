import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    // Getting access to the session object
    const request = context.switchToHttp().getRequest();
    // CurrentUser was assigned to the request in our current-user.interceptor.ts
    return request.currentUser;
  },
);
