import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import * as memoryCache from 'memory-cache';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrowserIntercepterService implements HttpInterceptor {

  private cachedData = new Map<string, any>();
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('request url: ' + request.url);
    const cachedData = memoryCache.get(request.url);
    console.log('cacheData ', cachedData);
    if (cachedData) {
      return of(new HttpResponse({ body: cachedData, status: 200 }));
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          memoryCache.put(event.url, event.body);
          console.log('freshedData ', event.body);
        }
        return event;
      }));
  }
}
export const BrowserInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BrowserIntercepterService, multi: true }
];
