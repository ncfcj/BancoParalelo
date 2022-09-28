import { Transacao } from './../../transacao';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransacaoServiceService {

  private API = "http://localhost:3001/transacoes";
  constructor(private http: HttpClient) { }

  salvar(transacao: Transacao): Observable<Transacao>{
    return this.http.post<Transacao>(this.API, transacao);
  }

  consultar(): Observable<Transacao[]>{
    return this.http.get<Transacao[]>(this.API);
  }
}
