import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';
import { UsuarioNaoAutenticadoGuard } from './services/guards/usuario-nao-autenticado.guard';
import { UsuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdicionarTransacaoComponent } from './pages/adicionar-transacao/adicionar-transacao.component';
import { ListarTransacaoComponent } from './pages/listar-transacao/listar-transacao.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UsuarioNaoAutenticadoGuard]
  },
  {
    path: 'cadastrarUsuario',
    component: CadastrarUsuarioComponent,
    canActivate: [UsuarioNaoAutenticadoGuard]
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [UsuarioAutenticadoGuard],
    children:
    [
      {
        path: 'listarTransacoes',
        component: ListarTransacaoComponent
      },
      {
        path: 'adicionarTransacao',
        component: AdicionarTransacaoComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
