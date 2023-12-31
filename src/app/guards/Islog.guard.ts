import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { GuardsService } from '../admin/services/Guards.service';
import { catchError, map, of, tap } from 'rxjs';

export const islogGuard: CanActivateFn = (route, state) => {
  const Guard=inject(GuardsService)
  const router=inject(Router)
      const token = localStorage.getItem('Token');
        if ( !token ) {
          router.navigateByUrl('SimplementeFlow/login')
          return false;
        }
      return Guard.checkAuthStatus().pipe(
        map(({ User }) => {
          // Realizar la verificación y devolver un Observable<boolean> en función de la condición
          return User.UserRole === 'User'||User.UserRole === 'Admin';
        }),
        tap(IsAuthenticated=>{
          if (!IsAuthenticated) {
            router.navigateByUrl('SimplementeFlow/login')
          }
        }),
        catchError((error) => {
          return of(false)
          })

      );
};
export const UserLogoutGuard: CanActivateFn = () => {
  //No permitira cargar la pagina o modulo si hay una sesion de administrador
  const router=inject(Router)
  if(!localStorage.getItem('Token'))
  return true
else{
  console.log('hay una sesion abierta')
  router.navigateByUrl('SimplementeFlow/Home')
  return false
}
};

