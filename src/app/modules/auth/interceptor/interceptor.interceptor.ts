import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { Observable, catchError, throwError } from 'rxjs';


@Injectable()
export class Interceptor implements HttpInterceptor{

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken: any = localStorage.getItem('user');
    const decodedItem = JSON.parse(accessToken);
    if (req.headers.get('skip')) return next.handle(req);

    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('authorization', "Bearer " + decodedItem.accessToken),
      });

      return next.handle(cloned).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if(error.error.code == 401) {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
        return throwError(error);
      }));
    } else {
      return next.handle(req);
    }
  }
}