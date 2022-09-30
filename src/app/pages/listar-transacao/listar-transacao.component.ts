import { ITransacao } from '../../interfaces/ITransacao';
import { ModalExcluirTransacaoComponent } from '../shared/modal-excluir-transacao/modal-excluir-transacao.component';
import { TransacaoService } from './../../services/transacao/transacao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-listar-transacao',
  templateUrl: './listar-transacao.component.html',
  styleUrls: ['./listar-transacao.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListarTransacaoComponent implements OnInit{

  constructor(
    private service: TransacaoService,
    public dialog : MatDialog
    ) { }

  confirmaExclusao : boolean = false;
  transacoes : ITransacao[] = [];
  dataSource = new MatTableDataSource<ITransacao>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.buscarTransacoes();
  }

  buscarTransacoes(): void{
    this.service.consultar().subscribe((listaTransacoes) => {
      this.transacoes = listaTransacoes;
      this.dataSource = new MatTableDataSource<ITransacao>(listaTransacoes);
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
      this.confirmaExclusao = result;
      this.buscarTransacoes();
    });
  }


  //Colunas exibidas no Mat-Table
  displayedColumns = ['Id', 'Valor', 'Conta', 'Acoes'];

  //FA icons
  faTimes = faTimes;
}
