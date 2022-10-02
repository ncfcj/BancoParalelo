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

}
