import { ITransacao } from '../../interfaces/ITransacao';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  constructor(private http: HttpClient) { }
  API = environment.apiUrl + 'transacoes';

  salvar(transacao: ITransacao): Observable<ITransacao>{
    return this.http.post<ITransacao>(this.API, transacao);
  }

  consultar(): Observable<ITransacao[]>{
    return this.http.get<ITransacao[]>(this.API);
  }

  excluir(id: number): Observable<ITransacao>{
    let URL = `${this.API}/${id}`
    return this.http.delete<ITransacao>(URL);
  }

}
