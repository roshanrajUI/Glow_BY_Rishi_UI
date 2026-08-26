import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../shared/services/alert-service';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertService);
  return next(req).pipe(
    catchError((error) => {
      alertService.showAlert('error', error.error.errorMessage || error.message || 'Unknown error');
      return throwError(() => error);
    }),
  );
};
