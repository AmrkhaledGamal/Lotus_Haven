import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _ToastrService = inject(ToastrService);

  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    _ToastrService.warning('سجل دخول أولاً', 'تحذير', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
    _Router.navigate(['/login']);
    return false;
  }
};
