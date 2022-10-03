import { environment } from './../../../environments/environment';
import { AutenticacaoService } from '../autenticacao/autenticacao.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private service: AutenticacaoService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.service.obterTokenUsuario;
    const requestUrl: Array<any> = request.url.split("/");
    const apiUrl: Array<any> = environment.apiUrl.split("/");

    if(token && requestUrl[2] === apiUrl[2]){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          token: `${token}`
        }
      });

      return next.handle(request).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401){
          this.service.deslogar();
          throw error.message;
        }
        else{
          throw error.message;
        }
      }));
    }
    else{
      return next.handle(request);
    }
  }
}
