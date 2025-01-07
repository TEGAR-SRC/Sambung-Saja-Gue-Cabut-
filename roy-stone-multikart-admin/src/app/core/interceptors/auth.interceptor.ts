import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { NotificationService } from "../../shared/services/notification.service";
import { Observable, catchError, throwError } from "rxjs";
import { AuthClear } from "../../shared/store/action/auth.action";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private store: Store,
    private notificationService: NotificationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {

    const token =  this.store.selectSnapshot(state => state.auth.access_token);
    
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.notificationService.notification = false;
          this.store.dispatch(new AuthClear());
          this.router.navigate(['/auth/login']);
        }
        return throwError(() => error);
      })
    );
  }
  
}