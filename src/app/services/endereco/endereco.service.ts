import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { ToolsService } from './../tools/tools.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(
    private tools : ToolsService,
    private http : HttpClient
  ) { }
  private ApiUrl = environment.apiUrl;
  private ApiUrlPais = this.ApiUrl + "Pais";
  private ApiUrlEstados = this.ApiUrl + "Estados";
  private ApiUrlCidades = this.ApiUrl + "Cidades/Estado/";
  private ViaCEPUrl = "http://viacep.com.br/ws/";

  getPaises() : Observable<any>{
    return this.http.get(this.ApiUrlPais);
  }

  getEstados() : Observable<any>{
    return this.http.get(this.ApiUrlEstados);
  }

  getCidadePorEstado(idEstado : number) : Observable<any>{
    return this.http.get(this.ApiUrlCidades + idEstado);
  }

  getEnderecoPorVIACEP(CEP : string) : Observable<any>{
    return this.http.get(this.ViaCEPUrl + CEP + '/json/');
  }

}
