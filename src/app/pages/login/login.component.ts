import { Component, OnInit } from '@angular/core';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons'
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUsuario } from '../../interfaces/IUsuario';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.criarForm();
  }

  formLogin = new FormGroup ({
    email: new FormControl(),
    senha: new FormControl()
  });

  criarForm(){
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  logar(){
    if(this.formLogin.invalid) return;
    var usuario = this.formLogin.getRawValue() as IUsuario;
    this.usuarioService.logar(usuario).subscribe((resposta) => {
      console.log(resposta);
      if(!resposta.sucesso){
        this.snackBar.open('Falha na autenticacao', 'Usuário ou senha incorretos.', {
          duration: 3000,
          horizontalPosition: "center",
          verticalPosition: "top",
          panelClass: ['erro-snackbar'],
        });
      }else{
        this.snackBar.open(`Seja Bem vindo(a) ${resposta.nome}`, "", {
          duration: 1000,
          horizontalPosition: "center",
          verticalPosition: "top",
          panelClass: ['sucesso-snackbar'],
        });
      }
    });
  }

  //FA icons
  faSackDollar = faSackDollar;
}
