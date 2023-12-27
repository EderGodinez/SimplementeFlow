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
          return false;
        }
      return Guard.checkAuthStatus().pipe(
        map(({ User }) => {
          // Realizar la verificación y devolver un Observable<boolean> en función de la condición
          return User.UserRole === 'Admin';
        }),
        tap(IsAdmin=>{
          if (!IsAdmin) {
            router.navigateByUrl('Admin/login')
          }
        }),
        catchError(err => {
          console.error(err);
          router.navigateByUrl('Admin/login')
          return of(false);
        })

      );

};
export const AdminLogoutGuard: CanActivateFn = () => {
  //No permitira cargar la pagina o modulo si hay una sesion de administrador
  const router=inject(Router)
  if(!localStorage.getItem('Token'))
  return true
else{
  router.navigateByUrl('Admin/dashboard')
  return false
}
};

