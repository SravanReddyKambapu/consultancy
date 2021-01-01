import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  constructor(public loderService: LoaderService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.loderService.show();
      return next.handle(req).pipe(
          finalize(() => this.loderService.hide())
      );
  }
}
