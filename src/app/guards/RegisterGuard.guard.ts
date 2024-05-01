import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../account/services/Account.service';

export const registerGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const Auth=inject(AuthService)
  const IsComplete:boolean=Auth.isValidRegister
  if (!IsComplete) {
    router.navigateByUrl('/NewUser/register')
    return IsComplete;
  }
  else{
    return IsComplete;
  }
};
