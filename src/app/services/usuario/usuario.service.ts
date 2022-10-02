import { ToolsService } from './../tools/tools.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from "rxjs";
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/interfaces/Usuario';
const apiUrl = environment.apiUrl + 'usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private tools: ToolsService
  ) { }

  logar(usuario: Usuario) : Observable<any> {
    return this.mockUsuarioLogin(usuario).pipe(tap((resposta) => {
      if(!resposta.sucesso) return;
      this.salvarSessao(usuario);
    }))
  }

  private mockUsuarioLogin(usuario: Usuario): Observable<any> {
    var retornoMock: any = [];
    if(usuario.email === "teste@teste.com" && usuario.senha == "123"){
      retornoMock.sucesso = true;
      retornoMock.usuario = usuario;
      retornoMock.token = "TokenQueSeriaGeradoPelaAPI";
      retornoMock.nome = "Nilton"
      return of(retornoMock);
    }
    retornoMock.sucesso = false;
    retornoMock.usuario = usuario;
    return of(retornoMock);
  }

  private salvarSessao(usuario : Usuario){
    var token = this.tools.criptografar("TokenQueSeriaGeradoPelaAPI");
    var usuarioCriptografado = this.tools.criptografar(usuario);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', usuarioCriptografado);
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
      return usuario.id;
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
}
