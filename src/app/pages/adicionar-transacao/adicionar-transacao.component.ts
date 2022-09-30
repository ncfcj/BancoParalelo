import { Router } from '@angular/router';
import { TransacaoService } from './../../services/transacao/transacao.service';
import { ITransacao } from '../../interfaces/ITransacao';
import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-adicionar-transacao',
  templateUrl: './adicionar-transacao.component.html',
  styleUrls: ['./adicionar-transacao.component.css']
})
export class AdicionarTransacaoComponent implements OnInit {

  constructor(
    private service: TransacaoService,
    private route: Router) { }

  ngOnInit(): void {
  }

  transacao: ITransacao = {
    Quantidade: "",
    ContaDestino: ""
  }

  //Font Awesome icons
  faCheck = faCheck;
  faXmark = faXmark;

  salvarTransacao(): void{
    alert(this.transacao.ContaDestino);
    this.service.salvar(this.transacao).subscribe(() => {
      this.route.navigate(["listarTransacoes"]);
    });
  }

  cancelar(): void{
    this.route.navigate(["listarTransacoes"]);
  }

}
