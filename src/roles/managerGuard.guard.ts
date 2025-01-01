// ownership.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ManagerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userIdFromRequest = request.params.userId; // Get the userId from the request parameters
    const loggedInUserId = request.user.id; // The user ID from the JWT payload
    console.log(userIdFromRequest, 'userIdFromRequest', loggedInUserId);
    if (request.user.role?.id == 2) {
      return true;
    } else {
      throw new ForbiddenException(
        'You are not authorized to access this resources',
      );
    }
  }
}
