import { AdicionarTransacaoComponent } from './componentes/adicionar-transacao/adicionar-transacao.component';
import { ListarTransacaoComponent } from './componentes/listar-transacao/listar-transacao.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
