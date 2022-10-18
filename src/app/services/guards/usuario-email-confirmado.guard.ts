import { ToolsService } from './../tools/tools.service';
import { AutenticacaoService } from './../autenticacao/autenticacao.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioEmailConfirmadoGuard implements CanActivate {
  constructor(
    private usuario: AutenticacaoService,
    private tools: ToolsService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    if(this.usuario.emailConfirmado){
      return true;
    }
    this.tools.redirecionar('confirmarEmail');
    return false;
  }

}
