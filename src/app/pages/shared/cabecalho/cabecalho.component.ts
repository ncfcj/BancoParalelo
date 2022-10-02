import { UsuarioService } from './../../../services/usuario/usuario.service';
import { ToolsService } from '../../../services/tools/tools.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  constructor(
    private router: Router,
    private tools: ToolsService,
    private usuario: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  deslogar(): void{

    this.tools.mostrarAlerta({
      mensagem: "Deslogando...",
      mensagemBotao: "",
      tipoAlerta: "sucesso"
    });

    setTimeout(() => {
      this.usuario.deslogar();
    }, 1000);
  }
  //FA icons
  faSackDollar = faSackDollar;
}
