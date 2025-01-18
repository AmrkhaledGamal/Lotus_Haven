import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  // const token: any = localStorage.getItem('token');
  // const reqWithHeader = req.clone({
  //   headers: req.headers.append('token', token),
  // });
  return next(req);
};
