import { TransacaoService } from './../../../services/transacao/transacao.service';
import { ITransacao } from '../../../interfaces/ITransacao';
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
    private service: TransacaoService,
    @Inject(MAT_DIALOG_DATA) public data: ITransacao
  ) { }

  ngOnInit(): void {
  }

  DialogAfterOpen() : void {
    this.dialogRef.afterOpened().subscribe(x => {
      console.log(this.data);
    });
  }

  excluirTransacao(id: number): void{
    this.service.excluir(id).subscribe(x => {
      alert(`Transacao ${id} excluida com sucesso !`);
    });
  }

  closeDialog(): void {
    this.dialogRef.close('Pizza!');
  }

  //Fa icons
  faXmark = faXmark;
  faCheck = faCheck;

}
