import { Router, type CanActivateFn } from '@angular/router';
import { GuardsService } from '../services/Guards.service';
import { inject } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
export const AdminGuard: CanActivateFn = () => {
  const Guard=inject(GuardsService)
  const router=inject(Router)
      const token = localStorage.getItem('Token');
        if ( !token ) {
          router.navigateByUrl('Admin/login')
          localStorage.clear()
          return false
        }
      return Guard.checkAuthStatus().pipe(
        map(({ User }) => {
          return User.UserRole === 'Admin';
        }),
        tap(IsAdmin=>{
          if (!IsAdmin) {
            router.navigateByUrl('Admin/login')
            return false
          }
          return true
        }),
        catchError(err => {
          localStorage.clear()
            router.navigateByUrl('Admin/login')
          return of(false);
        })

      );

};
export const AdminLogoutGuard: CanActivateFn = () => {
  const router=inject(Router)
  if(!localStorage.getItem('AdminAccess')){
    localStorage.removeItem('Token')
    return true
  }
else{
  router.navigateByUrl('Admin/dashboard')
  return false
}
};

