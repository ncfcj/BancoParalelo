import { UsuarioService } from './../usuario/usuario.service';
import { ToolsService } from './../tools/tools.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioNaoAutenticadoGuard implements CanActivate {
  constructor(
    private tools: ToolsService,
    private usuario: UsuarioService
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    if(this.usuario.logado){
      this.tools.redirecionar();
      return false;
    }
    return true;
  }

}
