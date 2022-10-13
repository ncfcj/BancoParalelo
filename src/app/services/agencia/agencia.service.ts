import { environment } from 'src/environments/environment';
import { Agencia } from './../../interfaces/Agencia';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgenciaService {

  constructor(
    private http: HttpClient
  ) { }
  APIUrl = environment.apiUrl + 'Agencias';

  getAgencias() : Observable<Agencia[]>{
    return this.http.get<Agencia[]>(this.APIUrl);
  }

}
