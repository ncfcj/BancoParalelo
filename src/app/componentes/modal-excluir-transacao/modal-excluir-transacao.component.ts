import { Transacao } from './../../transacao';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-excluir-transacao',
  templateUrl: './modal-excluir-transacao.component.html',
  styleUrls: ['./modal-excluir-transacao.component.css']
})
export class ModalExcluirTransacaoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalExcluirTransacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Transacao
  ) { }

  ngOnInit(): void {
  }

  DialogAfterOpen() : void {
    this.dialogRef.afterOpened().subscribe(x => {
      console.log(this.data);
    });
  }

  closeDialog(): void {
    this.dialogRef.close('Pizza!');
  }

  //Fa icons
  faXmark = faXmark;
  faCheck = faCheck;

}
