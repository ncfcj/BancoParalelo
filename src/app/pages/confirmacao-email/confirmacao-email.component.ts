import { AutenticacaoService } from './../../services/autenticacao/autenticacao.service';
import { ToolsService } from './../../services/tools/tools.service';
import { EmailService } from './../../services/email/email.service';
import { SignalrService } from './../../services/signalr/signalr.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmacao-email',
  templateUrl: './confirmacao-email.component.html',
  styleUrls: ['./confirmacao-email.component.css']
})
export class ConfirmacaoEmailComponent implements OnInit {
  title = 'signalr-demo';
  esperandoConfirmacao: boolean = true;
  emailConfirmado: boolean = false;
  email: string | undefined;
  signalrid = this.signalr.connection.connection.connectionId;

  constructor(
    private signalr: SignalrService,
    private activatedRoute: ActivatedRoute,
    private emailService: EmailService,
    private tools: ToolsService,
    private usuario: AutenticacaoService
  ){}

  enviarEmail(){
    this.emailService.enviarConfirmacaoEmail(this.email!, this.signalrid)
    .subscribe((resposta) => {
      console.log(resposta);
      this.tools.mostrarAlerta({
        mensagem: "Email enviado !",
        tipoAlerta: "sucesso",
        mensagemBotao: "",
        duracao: 1000
      });
    });
  }

  ngOnInit(): void {
    this.email = this.usuario.email;
    this.enviarEmail();
    this.signalr.emailConfirmado.subscribe((emailConfirmado: boolean) => {
      console.log(emailConfirmado);
      this.emailConfirmado = emailConfirmado;
      if(this.emailConfirmado){
        this.esperandoConfirmacao = false;
        setTimeout(() => {
          localStorage.setItem('emailConfirmado', this.emailConfirmado.toString());
          this.tools.redirecionar();
        }, 5000);
      }
    });

    if(this.signalr != null){
      this.signalr.connection
      .invoke('IsConfirmed', this.emailConfirmado)
      .catch((error: any) => {
        console.log(`${error}`);
      });
    }

  }

}
