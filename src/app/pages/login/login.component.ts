import { ToolsService } from './../../services/tools/tools.service';
import { ConfiguracaoAlerta } from './../../interfaces/ConfiguracaoAlerta';
import { Component, OnInit } from '@angular/core';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../interfaces/Usuario';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private formularioBuilder: FormBuilder,
    private service: UsuarioService,
    private tools: ToolsService
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

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
    this.service.logar(usuario).subscribe((resposta) => {
      if(!resposta.sucesso){
        this.tools.mostrarAlerta({
          mensagem : "Falha no Login",
          mensagemBotao : "Usuario ou Senha Incorretos",
          tipoAlerta : "erro"
        });
      }else{
        this.tools.mostrarAlerta({
          mensagem : `Seja Bem vindo(a) ${resposta.nome}`,
          mensagemBotao : "",
          tipoAlerta : "sucesso"
        });
      }
    });
  }


  //FA icons
  faSackDollar = faSackDollar;
}
