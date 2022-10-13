import { ConfiguracaoModal } from './../../interfaces/ConfiguracaoModal';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfiguracaoAlerta } from '../../interfaces/ConfiguracaoAlerta';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(
    private alerta : MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) { }

  mostrarAlerta(configuracao : ConfiguracaoAlerta){
    this.alerta.open(`${configuracao.mensagem}`, `${configuracao.mensagemBotao}`, {
      duration: configuracao.duracao || 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: [`${configuracao.tipoAlerta == "erro" ? "erro-snackbar" : configuracao.tipoAlerta == "sucesso" ? "sucesso-snackbar" : ""}`],
    });
  }

  criptografar(texto : any){
    return Buffer.from(JSON.stringify(`${texto}`)).toString('base64');
  }

  descriptografar(texto : any){
    return Buffer.from(JSON.stringify(`${texto}`), 'base64').toString('utf-8');
  }

  redirecionar(rota : string = ""){
    this.router.navigate([`${rota}`]);
  }

  chamarModal(Modal: ComponentType<any>, configuracao : ConfiguracaoModal): MatDialogRef<any, any> {
    let modal = this.dialog.open(Modal, {
      class: configuracao.class || 'custom-dialog-container',
      height: configuracao.height ||'300px',
      width: configuracao.width || '250px',
      maxHeight: configuracao.maxHeight || '400px',
      maxWidth: configuracao.maxWidth || '300px',
      data : configuracao.data || ""
    } as MatDialogConfig);
    return modal;
  }

  validarCPF(cpf : string){
    var Soma;
    var Resto;
    Soma = 0;
    if (cpf == "00000000000") return false;

    for (let i=1; i<=9; i++)
    Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(cpf.substring(9, 10)) ) return false;

    Soma = 0;
      for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;
      return true;
  }

}
