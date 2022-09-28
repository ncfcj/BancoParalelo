import { ModalExcluirTransacaoComponent } from './../modal-excluir-transacao/modal-excluir-transacao.component';
import { Transacao } from './../../transacao';
import { TransacaoServiceService } from './../service/transacao-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-listar-transacao',
  templateUrl: './listar-transacao.component.html',
  styleUrls: ['./listar-transacao.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListarTransacaoComponent implements OnInit{

  constructor(
    private service: TransacaoServiceService,
    public dialog : MatDialog
    ) { }

  confirmaExclusao : boolean = false;
  transacoes : Transacao[] = [];
  dataSource = new MatTableDataSource<Transacao>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.buscarTransacoes();
  }

  buscarTransacoes(): void{
    this.service.consultar().subscribe((listaTransacoes) => {
      this.transacoes = listaTransacoes;
      this.dataSource = new MatTableDataSource<Transacao>(listaTransacoes);
      this.dataSource.paginator = this.paginator;
    });
  }

  ExcluirTransacao(Id :number): void {
    let transacao = this.transacoes.find(x => x.id == Id);
    let dialogRef = this.dialog.open(ModalExcluirTransacaoComponent, {
      panelClass: 'custom-dialog-container',
      height: '300px',
      width: '250px',
      maxHeight: '400px',
      maxWidth: '300px',
      data: { id : transacao?.id,
              Quantidade: transacao?.Quantidade,
              ContaDestino: transacao?.ContaDestino}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Modal foi fechado");
      this.confirmaExclusao = result;
    });
  }


  //Colunas exibidas no Mat-Table
  displayedColumns = ['Id', 'Valor', 'Conta', 'Acoes'];

  //FA icons
  faTimes = faTimes;
}
