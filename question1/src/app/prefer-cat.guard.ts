import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { inject } from '@angular/core';

export const preferCatGuard: CanActivateFn = (route, state) => {
  if (!inject(UserService).preferCat())
    return createUrlTreeFromSnapshot(route, ['/dog']);
  else
    return true;
};
