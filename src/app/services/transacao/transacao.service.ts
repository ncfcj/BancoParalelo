import { Transacao } from '../../interfaces/Transacao';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  constructor(
    private http: HttpClient
  ) { }
  API = environment.apiUrl + 'Transacoes';

  salvar(transacao: Transacao): Observable<Transacao>{
    return this.http.post<Transacao>(this.API, transacao);
  }

  consultar(): Observable<Transacao[]>{
    return this.http.get<Transacao[]>(this.API);
  }

  excluir(id: number): Observable<Transacao>{
    let URL = `${this.API}/${id}`
    return this.http.delete<Transacao>(URL);
  }

}
