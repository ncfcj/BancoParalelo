import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  hubUrl: string;
  connection: any;
  emailConfirmado: BehaviorSubject<boolean>;

  constructor() {
    this.hubUrl = environment.serverUrl + 'emailHub';
    this.emailConfirmado = new BehaviorSubject<boolean>(false);
  }

  public async initiateSignalrConnection(): Promise<void> {
    try {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubUrl)
        .withAutomaticReconnect()
        .build();

      await this.connection.start();
      this.setSignalrClientMethods();

      console.log(`SignalR connection success! connectionId: ${this.connection.connectionId}`);
    }
    catch (error) {
      console.log(`SignalR connection error: ${error}`);
    }
  }

  private setSignalrClientMethods(): void {
    this.connection.on('IsConfirmed', (emailConfirmado: boolean) => {
      this.emailConfirmado.next(emailConfirmado);
    });
  }

}
