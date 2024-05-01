import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';


export const accountCreatedGuard: CanActivateFn = (route, state) => {
  const numPages=history.length
  const router=inject(Router)
  if (numPages===1) {
    return true
  }
  else{
    // Navegar a la siguiente ruta
    router.navigateByUrl('/NewUser/register')
 return false
  }

};
