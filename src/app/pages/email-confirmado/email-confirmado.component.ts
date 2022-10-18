import { SignalrService } from './../../services/signalr/signalr.service';
import { EmailService } from './../../services/email/email.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-email-confirmado',
  templateUrl: './email-confirmado.component.html',
  styleUrls: ['./email-confirmado.component.css']
})
export class EmailConfirmadoComponent implements OnInit {
  esperandoConfirmacao: boolean = true;
  emailConfirmado: boolean = false;
  email: string | undefined;
  userId: string | undefined;
  token: string | undefined;
  signalrid: string | undefined;

  constructor(
    private route : ActivatedRoute,
    private emailService : EmailService
  ) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      this.email = params['email'];
      this.userId = params['userid'];
      this.token = params['token'];
      this.signalrid = params['signalrid'];
      console.log(this.email);
      console.log(this.userId);
      console.log(this.token);
      console.log(this.signalrid);
    });
    this.enviarConfirmacao();
  }

  enviarConfirmacao(){
    this.emailService.confirmarEmail(this.email!, this.userId!, this.token!, this.signalrid!)
    .subscribe((resposta) => {
      console.log(resposta);
    });
  }
}
