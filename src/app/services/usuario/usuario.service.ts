import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable, of } from "rxjs";
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { Buffer } from 'buffer';
const apiUrl = environment.apiUrl + 'usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  logar(usuario: IUsuario) : Observable<any> {
    return this.mockUsuarioLogin(usuario).pipe(tap((response) => {
      if(!response.sucesso) return;
      //decoding
      var token = Buffer.from(JSON.stringify('TokenQueSeriaGeradoPelaAPI')).toString('base64');
      var usuarioBase64 = Buffer.from(JSON.stringify(usuario)).toString('base64');

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', usuarioBase64);
      setTimeout(() => {
        this.router.navigate(['']);
      }, 1000);

    }))
  }

  private mockUsuarioLogin(usuario: IUsuario): Observable<any> {
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

  deslogar() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get obterUsuarioLogado() : IUsuario {
    var usuarioLogadoLocalStorage = localStorage.getItem('usuario')?.toString();
    var usuarioLogado = Buffer.from(JSON.stringify(usuarioLogadoLocalStorage), 'base64').toString('utf-8');
    return localStorage.getItem('usuario')
    ? JSON.parse(usuarioLogado)
    : null
  }

  get obterIdUsuarioLogado() : string {
    var usuario : IUsuario;
    var usuarioLogado = Buffer.from(JSON.stringify(localStorage.getItem('usuario')?.toString()), 'base64').toString('utf-8');
    if(localStorage.getItem('usuario')){
      usuario = JSON.parse(usuarioLogado);
      return usuario.id;
    }
    return "";
  }

  get obterTokenUsuario(): string {
    var token = Buffer.from(JSON.stringify(localStorage.getItem('token')?.toString()), 'base64').toString('utf-8');
    if(localStorage.getItem('token')){
      return JSON.parse(token);
    }
    return "";
  }

  get logado() : boolean{
    return localStorage.getItem('token') ? true : false;
  }
}
