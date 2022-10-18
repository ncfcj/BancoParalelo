import { RespostaLogin } from '../../interfaces/RespostaLogin';
import { ToolsService } from '../tools/tools.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/interfaces/Usuario';
const apiUrlLogin = environment.apiUrl + 'Authentication/login';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(
    private http: HttpClient,
    private tools: ToolsService
  ) { }

  logar(usuario: Usuario) : Observable<any> {
    return this.http.post<any>(apiUrlLogin, {
      "email" : `${usuario.email}`,
      "senha" : `${this.tools.criptografar(usuario.senha)}`
    }).pipe(tap((resposta) => {
      if(resposta.statusCode == 200){
        this.salvarSessao(resposta);
      }
    }));
  }

  private salvarSessao(login : RespostaLogin){
    var token = this.tools.criptografar(login.token);
    var usuarioCriptografado = this.tools.criptografar(login.usuario);
    var emailCriptografado = login.email;
    var emailConfirmado = login.emailConfirmado.toString();
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', usuarioCriptografado);
    localStorage.setItem('emailConfirmado', emailConfirmado);
    localStorage.setItem('email', emailCriptografado);
  }

  deslogar() {
    localStorage.clear();
    this.tools.redirecionar("login");
  }

  get obterUsuarioLogado() : Usuario {
    var temUsuarioLogado = localStorage.getItem('usuario');
    var usuarioCriptografado = temUsuarioLogado?.toString();
    var usuarioLogado = this.tools.descriptografar(usuarioCriptografado);
    return temUsuarioLogado ? JSON.parse(usuarioLogado) : null
  }

  get obterIdUsuarioLogado() : string {
    var usuario : Usuario;
    var temUsuarioLogado = localStorage.getItem('usuario');
    if(temUsuarioLogado){
      var usuarioLogado = this.tools.descriptografar(temUsuarioLogado?.toString());
      usuario = JSON.parse(usuarioLogado);
      return usuario.id!;
    }
    return "";
  }

  get obterTokenUsuario(): string {
    var tokenCriptografado = localStorage.getItem('token');
    if(tokenCriptografado){
      var token = this.tools.descriptografar(tokenCriptografado?.toString());
      return JSON.parse(token);
    }
    return "";
  }

  get logado() : boolean{
    var temUsuarioLogado = localStorage.getItem('token');
    return temUsuarioLogado ? true : false;
  }

  get emailConfirmado() : boolean{
    var emailConfirmado = localStorage.getItem('emailConfirmado');
    return emailConfirmado == 'true' ? true : false;
  }

  get email() : string {
    var email = localStorage.getItem('email')!;
    return email;
  }
}
