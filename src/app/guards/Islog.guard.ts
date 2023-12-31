import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { GuardsService } from '../admin/services/Guards.service';
import { catchError, map, of, tap } from 'rxjs';
import { AuthService } from '../account/services/Account.service';

export const islogGuard: CanActivateFn = (route, state) => {
  const Guard=inject(GuardsService)
  const router=inject(Router)
  const UserService=inject(AuthService)
      const token = localStorage.getItem('Token');
        if ( !token ) {
          router.navigateByUrl('SimplementeFlow/login')
          return false;
        }
      return Guard.checkAuthStatus().pipe(
        map(({ User }) => {
          UserService.setUser(User)
          return User.UserRole === 'User'||User.UserRole === 'Admin';
        }),
        tap(IsAuthenticated=>{
          if (!IsAuthenticated) {
            router.navigateByUrl('SimplementeFlow/login')
          }
        }),
        catchError((error) => {
          localStorage.clear()
          router.navigateByUrl('SimplementeFlow/Home')
          return of(false)
          })

      );
};
export const UserLogoutGuard: CanActivateFn = () => {
  //No permitira cargar la pagina o modulo si hay una sesion de administrador
  const router=inject(Router)
  if(!localStorage.getItem('Token')){
    return true
  }
else{
  router.navigateByUrl('SimplementeFlow/Home')
  return false
}
};

