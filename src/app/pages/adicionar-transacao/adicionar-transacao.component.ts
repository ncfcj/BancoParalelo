import { Router } from '@angular/router';
import { TransacaoService } from './../../services/transacao/transacao.service';
import { Transacao } from '../../interfaces/Transacao';
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
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  transacao: Transacao = {
    Quantidade: "",
    ContaDestino: ""
  }

  //Font Awesome icons
  faCheck = faCheck;
  faXmark = faXmark;

  salvarTransacao(): void{
    this.service.salvar(this.transacao).subscribe(() => {
      this.redirecionar("listarTransacoes");
    });
  }

  cancelar(): void{
    this.redirecionar("listarTransacoes");
  }

  redirecionar(rota : string ): void{
    this.route.navigate([`${rota}`]);
  }

}
