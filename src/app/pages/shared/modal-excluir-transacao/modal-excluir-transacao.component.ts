import { ToolsService } from './../../../services/tools/tools.service';
import { TransacaoService } from './../../../services/transacao/transacao.service';
import { Transacao } from '../../../interfaces/Transacao';
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
    private tools: ToolsService,
    @Inject(MAT_DIALOG_DATA) public data: Transacao
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
      this.tools.mostrarAlerta({
        mensagem: `Transacao ${id} excluida com sucesso !`,
        tipoAlerta: "sucesso"
      });
    });
  }

  fecharModal(): void {
    this.dialogRef.close('');
  }

  //Fa icons
  faXmark = faXmark;
  faCheck = faCheck;

}
