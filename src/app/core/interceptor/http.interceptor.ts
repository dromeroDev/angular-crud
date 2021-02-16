import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  private cantReq: number;

  constructor(public spinnerService: SpinnerService) {
    this.cantReq = 0;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.cantReq++;
    this.spinnerService.show();
    return next.handle(req).pipe(
      finalize(() => {
        this.cantReq--;
        if (this.cantReq === 0) {
        }
        this.spinnerService.hide();
      })
    );
  }
}
