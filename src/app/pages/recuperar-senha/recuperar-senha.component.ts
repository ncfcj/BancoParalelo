import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  constructor(
    private fb : FormBuilder,
  ) { }

  campoSenha : boolean = false;
  campoEmail : boolean = true;
  aparecerSenha : boolean = false;

  //FormGroup
  recuperarSenha = new FormGroup ({
    email : new FormControl(),
    groupSenha : new FormGroup({
      senha : new FormControl(),
      confirmarSenha : new FormControl()
    })
  });

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.recuperarSenha = this.fb.group({
      email : ["", [Validators.required, Validators.email]],
      groupSenha : this.fb.group({
        senha : ["", [Validators.required]],
        confirmarSenha: ["", [Validators.required]],
      })
    });
  }

  mostrarCamposSenha(){
    return this.campoSenha;
  }

  mostrarCampoEmail(){
    return this.campoEmail;
  }

  mostrarSenha(){
    this.aparecerSenha = !this.aparecerSenha;
  }

  buscarEmail(){
    console.log('buscar');
  }

  alterarSenha(){
    console.log('Mudar senha');
  }

  //FA icons
  faEyeSlash = faEyeSlash;
  faEye = faEye;
}
