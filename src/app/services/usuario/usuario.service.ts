import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Usuario } from 'src/app/interfaces/Usuario';
import { ToolsService } from './../tools/tools.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private tools: ToolsService
  ) { }
  APIUrl = environment.apiUrl + "Usuarios"

  cadastrarUsuario(usuario : Usuario): Observable<any>{
    return this.http.post<any>(this.APIUrl, usuario);
  }
}
