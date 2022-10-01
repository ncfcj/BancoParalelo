import { ConfiguracaoModal } from './../../interfaces/ConfiguracaoModal';
import { ToolsService } from './../../services/tools/tools.service';
import { Transacao } from './../../interfaces/Transacao';
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
    public dialog : MatDialog,
    private tools : ToolsService
  ) { }

  confirmaExclusao : boolean = false;
  transacoes : Transacao[] = [];
  dadosTabela = new MatTableDataSource<Transacao>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.buscarTransacoes();
  }

  buscarTransacoes(): void {
    this.service.consultar().subscribe((transacoes) => {
      this.atribuirTransacoes(transacoes);
    });
  }

  excluirTransacao(Id :number): void {
    let transacao = this.transacoes.find(x => x.id == Id);
    this.tools.chamarModal(ModalExcluirTransacaoComponent, {
      class: 'custom-dialog-container',
      height: '300px',
      width: '250px',
      maxHeight: '400px',
      maxWidth: '300px',
      data : transacao
    });
  }

  atribuirTransacoes(transacoes : Transacao[]): void {
    this.transacoes = transacoes;
    this.dadosTabela = new MatTableDataSource<Transacao>(transacoes);
    this.dadosTabela.paginator = this.paginator;
  }

  //Colunas exibidas no Mat-Table
  colunas = ['Id', 'Valor', 'Conta', 'Acoes'];

  //FA icons
  faTimes = faTimes;
}
