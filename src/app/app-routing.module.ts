import { HomeComponent } from './pages/home/home.component';
import { PrincipalComponent } from './pages/shared/principal/principal.component';
import { LoginComponent } from './pages/login/login.component';
import { AdicionarTransacaoComponent } from './pages/adicionar-transacao/adicionar-transacao.component';
import { ListarTransacaoComponent } from './pages/listar-transacao/listar-transacao.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'listarTransacoes',
    component: ListarTransacaoComponent
  },
  {
    path: 'adicionarTransacao',
    component: AdicionarTransacaoComponent
  },
  {
    path: "",
    redirectTo: "listarTransacoes",
    pathMatch: "full",

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
