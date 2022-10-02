import { ToolsService } from './../tools/tools.service';
import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate {
  constructor(
    private usuario: UsuarioService,
    private tools: ToolsService
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    if(this.usuario.logado){
      return true;
    }
    console.log("cheguei aqui");
    this.tools.redirecionar("login");
    return false;
  }

}
