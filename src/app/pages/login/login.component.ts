import { EmailService } from './../../services/email/email.service';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { ToolsService } from './../../services/tools/tools.service';
import { Component, OnInit } from '@angular/core';
import { faSackDollar, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { Usuario } from '../../interfaces/Usuario';
import { AutenticacaoService } from '../../services/autenticacao/autenticacao.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private formularioBuilder: FormBuilder,
    private service: AutenticacaoService,
    private tools: ToolsService,
    private email: EmailService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  aparecerSenha : boolean = false;

  formulario = new FormGroup ({
    email: new FormControl(),
    senha: new FormControl()
  });

  criarFormulario(): void {
    this.formulario = this.formularioBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  logar() : void {
    if(this.formulario.invalid) return;
    var usuario = this.formulario.getRawValue() as Usuario;
    this.service.logar(usuario)
    .pipe(
      catchError(err => {
        this.tools.mostrarAlerta({
          mensagem : `Email ou Senha Incorretos`,
          mensagemBotao : "",
          tipoAlerta : "erro"
        });
        return throwError(err);
      })
    ).subscribe((resposta) => {
        this.tools.mostrarAlerta({
          mensagem : `Seja Bem vindo(a) ${resposta.usuario}`,
          mensagemBotao : "",
          tipoAlerta : "sucesso"
        });
        setTimeout(() => {
          if(resposta.emailConfirmado){
            this.tools.redirecionar("listarTransacoes");
          }else{
            this.router.navigate(['confirmarEmail']);
          }
        });
    });
  }

  cadastrar() : void {
    this.tools.redirecionar("cadastrarUsuario");
  }

  mostrarSenha() : boolean{
    this.aparecerSenha = !this.aparecerSenha;
    return this.aparecerSenha;
  }

  recuperarSenha(): void{
    this.tools.redirecionar("recuperarSenha");
  }

  //FA icons
  faSackDollar = faSackDollar;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
}
