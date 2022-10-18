import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  ApiUrl = environment.apiUrl + "emails";
  constructor(
    private http : HttpClient
  ) { }

  verificarEmailConfirmado(email : string) : Observable<any>{
    return this.http.get(this.ApiUrl + `/emailEstaConfirmado?email=${email}`);
  }

  enviarConfirmacaoEmail(email : string, signalrId: string) : Observable<any>{
    return this.http.post(this.ApiUrl + `/enviarConfirmacaoEmail?email=${email}&signalrid=${signalrId}`, {});
  }

  confirmarEmail(email: string, userId: string, token: string, signalrId: string): Observable<any>{
    return this.http.post(this.ApiUrl + `/confirmarEmail?email=${email}&userid=${userId}&token=${token}&signalrid=${signalrId}`, {});
  }


}
