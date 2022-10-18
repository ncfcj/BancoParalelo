import { EmailService } from './../../services/email/email.service';
import { Router } from '@angular/router';
import { AgenciaService } from './../../services/agencia/agencia.service';
import { Agencia } from './../../interfaces/Agencia';
import { CPFValidator } from './../../services/validators/CPFValidator';
import { Cidade } from './../../interfaces/Cidade';
import { Estado } from './../../interfaces/Estado';
import { Pais } from './../../interfaces/Pais';
import { EnderecoService } from './../../services/endereco/endereco.service';
import { TipoDeConta } from './../../interfaces/TipoDeConta';
import { ToolsService } from './../../services/tools/tools.service';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUser, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {
  @ViewChild('Estado') estado: ElementRef<HTMLElement> | undefined;

  constructor(
    private usuarioService : UsuarioService,
    private tools : ToolsService,
    private fb : FormBuilder,
    private enderecoService : EnderecoService,
    private agenciaService: AgenciaService,
    private router: Router,
    private email: EmailService
  ) { }

  //Controladores para Senha
  progressoPasswordStrength : number = 0;
  aparecerSenha : boolean = false;

  //filtros
  filtroTipoDeConta = new FormControl();
  filtroPais = new FormControl();
  filtroEstados = new FormControl();
  filtroCidades = new FormControl();
  filtroAgencias = new FormControl();

  //listas
  tiposDeConta = [{
      Id: 1,
      Nome: 'Conta Corrente'
    },{
      Id: 2,
      Nome: 'Poupanca'
    },{
      Id: 3,
      Nome: 'Conta Corrente e Poupanca'
    },
  ]
  paises: Pais[] = [];
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  agencias: Agencia[] = [];

  //listasFiltradas
  tiposFiltrados: TipoDeConta[] = this.tiposDeConta;
  paisesFiltrados: Pais[] = [];
  estadosFiltrados: Estado[] = [];
  cidadesFiltradas: Cidade[] = [];
  agenciasFiltradas: Agencia[] = [];

  //FormGroup
  usuario = new FormGroup ({
    email : new FormControl(),
    groupSenha : new FormGroup({
      senha : new FormControl(),
      confirmarSenha : new FormControl(),
    }),
    firstName  : new FormControl(),
    lastName  : new FormControl(),
    tipoConta: new FormControl(),
    cpf: new FormControl(),
    telefone: new FormControl(),
    agencia: new FormControl(),
    endereco : new FormGroup({
      cep   : new FormControl(),
      rua   : new FormControl(),
      numero   : new FormControl(),
      complemento: new FormControl(),
      bairro: new FormControl(),
      cidade: new FormControl(),
      estado: new FormControl(),
      pais: new FormControl()
    })
  });

  ngOnInit(): void {
    this.initForm();
    this.getDadosIniciais();
    this.changeFiltros();
    this.eventos();
  }

  initForm(){
    this.usuario = this.fb.group({
      email : ["", [Validators.required, Validators.email]],
      groupSenha : this.fb.group({
        senha : ["", [Validators.required]],
        confirmarSenha: ["", [Validators.required]],
      }),
      firstName  : ["", [Validators.required]],
      lastName  : ["", [Validators.required]],
      tipoConta: ["", [Validators.required]],
      cpf: ["", [ Validators.required, CPFValidator.isValidCpf()]],
      telefone: ["", [Validators.required]],
      agencia : ["", [Validators.required]],
      endereco : this.fb.group({
        cep   : ["", [Validators.required, Validators.pattern(/[0-9]{5}[0-9]{3}$/)]],
        rua   : ["", [Validators.required]],
        numero   : ["", [Validators.required]],
        complemento: [""],
        bairro: ["", [Validators.required]],
        cidade: ["", [Validators.required]],
        estado: ["", [Validators.required]],
        pais: ["", [Validators.required]],
      })
    });
    this.usuario.get('endereco')!.get('estado')!.disable();
    this.usuario.get('endereco')!.get('cidade')!.disable();
  }

  eventos(){
    this.changeEstados();
    this.changeSenha();
  }

  changeFiltros(){
    this.changeFiltroTiposDeConta();
    this.changeFiltroPaises();
    this.changeFiltroEstados();
    this.changeFiltroCidades();
    this.changeFiltroAgencias();
  }

  changeFiltroTiposDeConta(){
    this.filtroTipoDeConta.valueChanges
    .subscribe(() => {
      this.filtrarTiposDeConta();
    });
  }

  changeFiltroPaises(){
    this.filtroPais.valueChanges
    .subscribe(() => {
      this.filtrarPaises();
    });
  }

  changeFiltroEstados(){
    this.filtroEstados.valueChanges
    .subscribe(() => {
      this.filtrarEstados();
    });
  }

  changeFiltroCidades(){
    this.filtroCidades.valueChanges
    .subscribe(() => {
      this.filtrarCidades();
    });
  }

  changeFiltroAgencias(){
    this.filtroAgencias.valueChanges
    .subscribe(() => {
      this.filtrarAgencias();
    });
  }

  changePaises(){
      this.filtrarEstadosPorPais();
      this.usuario.get('endereco')!.get('pais')!.valueChanges
      .subscribe((change) => {
        if(!this.usuario.get('endereco')!.get('pais')!.value){
          this.usuario.get('endereco')!.get('estado')!.disable();
        }else{
          this.usuario.get('endereco')!.get('estado')!.enable();
        }
      })

  }

  changeEstados(){
    this.filtrarCidadesPorEstado();
    if(!this.usuario.get('endereco')!.get('estado')!.value){
      this.usuario.get('endereco')!.get('cidade')!.disable();
    }else{
      this.usuario.get('endereco')!.get('cidade')!.enable();
    }
  }

  changeSenha(){
    this.usuario.get('groupSenha')!.get('senha')!.valueChanges
    .subscribe((senha) => {
      this.progressoPasswordStrength = 0;
      let minLength = 8;
      let regexLower = new RegExp('(?=.*[a-z])');
	    let regexUpper = new RegExp('(?=.*[A-Z])');
	    let regexDigits = new RegExp('(?=.*[0-9])');
	    let regexLength = new RegExp('(?=.{' + minLength + ',})');
      let specialChars = new RegExp(/[\u00C0-\u00ff-\`!@#$%^&*()_+\-=\[\]{}'";:\\|,.<>\/?~]+/g);
	    if (senha.match(regexLower)) { this.progressoPasswordStrength += 20; }
	    if (senha.match(regexUpper)) { this.progressoPasswordStrength += 20; }
	    if (senha.match(regexDigits)) { this.progressoPasswordStrength += 20; }
	    if (senha.match(regexLength)) { this.progressoPasswordStrength += 20; }
      if (senha.match(specialChars)) { this.progressoPasswordStrength += 20; }
    });
  }

  verificarRegraSenha(senha: string){
    let minLength = 8;
    let regexLower = new RegExp('(?=.*[a-z])');
    let regexUpper = new RegExp('(?=.*[A-Z])');
    let regexDigits = new RegExp('(?=.*[0-9])');
    let regexLength = new RegExp('(?=.{' + minLength + ',})');
    let specialChars = new RegExp(/[\u00C0-\u00ff-\`!@#$%^&*()_+\-=\[\]{}'";:\\|,.<>\/?~]+/g);
    if(senha.match(regexLower)
    && senha.match(regexUpper)
    && senha.match(regexDigits)
    && senha.match(regexLength)
    && senha.match(specialChars)) {
      return true;
    }
    return false;
  }

  getProgressoForcaSenha(): number{
    return this.progressoPasswordStrength;
  }

  blurCEP(){
    var cep = this.usuario.get('endereco')!.get('cep')!.value;
    this.getEnderecoPorCEP(cep);
  }

  filtrarTiposDeConta() : void{
    if(!this.tiposDeConta){
      return
    }
    let filtro = this.filtroTipoDeConta.value;
    if(filtro == ""){
      this.tiposFiltrados = this.tiposDeConta;
      return
    }else{
       this.tiposFiltrados = this.tiposDeConta.filter(tipo => tipo.Nome.toLowerCase().includes(filtro.toLowerCase()));
    }
  }

  filtrarPaises() : void{
    if(!this.paises){
      return
    }
    let filtro = this.filtroPais.value;
    if(filtro == ""){
      this.paisesFiltrados = this.paises;
      return
    }else{
       this.paisesFiltrados = this.paises.filter(pais => pais.nomeEmPortugues.toLowerCase().includes(filtro.toLowerCase()));
    }
  }

  filtrarEstados(): void{
    if(!this.estados){
      return
    }
    let filtro = this.filtroEstados.value;
    if(filtro == ""){
      this.estadosFiltrados = this.estados;
      return
    }else{
       this.estadosFiltrados = this.estados.filter(estado => estado.nome.toLowerCase().includes(filtro.toLowerCase()));
    }
  }

  filtrarCidades(): void{
    if(!this.cidades){
      return
    }
    let filtro = this.filtroCidades.value;
    if(filtro == ""){
      this.cidadesFiltradas = this.cidades;
      return
    }else{
       this.cidadesFiltradas = this.cidades.filter(cidade => cidade.nome.toLowerCase().includes(filtro.toLowerCase()));
    }
  }

  filtrarAgencias(): void{
    if(!this.agencias){
      return
    }
    let filtro = this.filtroAgencias.value;
    if(filtro == ""){
      this.agenciasFiltradas = this.agencias;
      return
    }else{
       this.agenciasFiltradas = this.agencias.filter(agencia => agencia.nome!.toLowerCase().includes(filtro.toLowerCase()));
    }
  }

  filtrarEstadosPorPais(): void{
    let idPais = this.usuario.get('endereco')!.get('pais')!.value;
    idPais != 1 ? idPais = 0 : "";
    this.estadosFiltrados = this.estados.filter(estado => estado.pais == idPais);
  }

  filtrarCidadesPorEstado(): void{
    let idEstado = this.usuario.get('endereco')?.get('estado')!.value;
    if(!idEstado) return
    this.getCidadesPorEstado(idEstado);
  }

  limparEstadosCidades(): void{
    this.usuario.get('endereco')!.get('estado')!.setValue("");
    this.usuario.get('endereco')!.get('cidade')!.setValue("");

    this.usuario.get('endereco')!.get('estado')!.disable({ onlySelf : true});
    this.usuario.get('endereco')!.get('cidade')!.disable({ onlySelf: true });

  }

  cadastrar(): void{
    var usuarioFormulario = this.usuario;
    var usuario = this.construirUsuario(usuarioFormulario);
    var validacao = this.validacaoCadastro();

    if(validacao.erro == true){
        this.tools.mostrarAlerta({
          mensagem : validacao.mensagem.map((mensagem : string) => `${mensagem}\n`).join(""),
          mensagemBotao: "",
          tipoAlerta: "erro",
          duracao: 2000
        });
      return;
    }


    this.usuarioService.cadastrarUsuario(usuario!)
    .subscribe({
      next : resposta => {
        console.log(resposta);
          this.tools.mostrarAlerta({
            mensagem : "Cadastrado com Sucesso",
            mensagemBotao: "",
            tipoAlerta: "sucesso",
            duracao: 1000
          });
          setTimeout(() => {
            this.router.navigate(['confirmarEmail'], { queryParams : { email : usuario?.email}});
          }, 1000);
      },
      error : erro => {
        console.log(erro);
        this.tools.mostrarAlerta({
          mensagem : `${erro.error.mensagem}`,
          mensagemBotao: "",
          tipoAlerta: "erro",
          duracao: 1000
        });
      }
    });
  }

  construirUsuario(usuarioFormulario : FormGroup){
    let pais = this.paises.find(pais => pais.id == usuarioFormulario.get('endereco')!.get('pais')!.value);
    let estado = this.estados.find(estado => estado.id == usuarioFormulario.get('endereco')!.get('estado')!.value);
    let cidade = this.cidades.find(cidade => cidade.id == usuarioFormulario.get('endereco')!.get('cidade')!.value);
    if(!pais || !estado || !cidade){
      return
    }
    var usuario = {
      email : usuarioFormulario.get('email')!.value,
      senha : this.tools.criptografar(usuarioFormulario.get('groupSenha')!.get('senha')!.value),
      cpf : this.tools.criptografar(usuarioFormulario.get('cpf')!.value),
      endereco : {
        cep: usuarioFormulario.get('endereco')!.get('cep')!.value,
        rua: usuarioFormulario.get('endereco')!.get('rua')!.value,
        numero: usuarioFormulario.get('endereco')!.get('numero')!.value,
        complemento: usuarioFormulario.get('endereco')!.get('complemento')!.value,
        bairro: usuarioFormulario.get('endereco')!.get('bairro')!.value,
        cidade: usuarioFormulario.get('endereco')!.get('cidade')!.value,
        estado: usuarioFormulario.get('endereco')!.get('estado')!.value,
        pais: usuarioFormulario.get('endereco')!.get('pais')!.value,
      },
      firstName : usuarioFormulario.get('firstName')!.value,
      lastName : usuarioFormulario.get('lastName')!.value,
      telefone : usuarioFormulario.get('telefone')!.value,
      agencia : usuarioFormulario.get('agencia')!.value,
      tipoDeConta: usuarioFormulario.get('tipoConta')!.value,
    } as Usuario;

    return usuario;
  }

  mostrarSenha(): void {
    this.aparecerSenha = !this.aparecerSenha;
  }

  voltar(): void{
    this.tools.redirecionar("login");
  }

  limparEndereco(): void{
    this.usuario.get('endereco')!.get('rua')!.setValue("");
    this.usuario.get('endereco')!.get('bairro')!.setValue("");
    this.usuario.get('endereco')!.get('pais')!.setValue("");
    this.usuario.get('endereco')!.get('estado')!.disable();
    this.usuario.get('endereco')!.get('estado')!.setValue("");
    this.usuario.get('endereco')!.get('cidade')!.disable();
  }

  getDadosIniciais(){
    this.getPaises();
    this.getEstados();
    this.getAgencias();
  }

  getPaises(): void{
    this.enderecoService.getPaises().subscribe((resposta) => {
      this.paises = resposta;
      this.paisesFiltrados = this.paises;
    });
  }

  getEstados(): void{
    this.enderecoService.getEstados()
    .subscribe((resposta) => {
      this.estados = resposta;
      this.estadosFiltrados = this.estados;
    });
  }

  getAgencias(): void{
    this.agenciaService.getAgencias()
    .subscribe((resposta) => {
      this.agencias = resposta;
      this.agenciasFiltradas = this.agencias;
    })
  }

  getCidadesPorEstado(idEstado: number): void{
    this.enderecoService.getCidadePorEstado(idEstado)
    .subscribe((resposta) => {
      this.cidades = resposta;
      this.cidadesFiltradas = this.cidades;
    });
  }

  getEnderecoPorCEP(CEP : string): void {
    this.enderecoService.getEnderecoPorVIACEP(CEP)
    .subscribe((resposta) => {
      if(resposta.erro){
        this.limparEndereco();
        return
      }
      let estadoCEP = this.estados.find(estado => estado.uf == resposta.uf);

      this.usuario.get('endereco')!.get('rua')!.setValue(resposta.logradouro);
      this.usuario.get('endereco')!.get('bairro')!.setValue(resposta.bairro);
      this.usuario.get('endereco')!.get('pais')!.setValue(1);
      this.usuario.get('endereco')!.get('estado')!.enable();
      this.usuario.get('endereco')!.get('estado')!.setValue(estadoCEP!.id);
      this.usuario.get('endereco')!.get('cidade')!.enable();

      this.getCidadesPorEstado(estadoCEP!.id);
      this.getCidadePorCEP(estadoCEP!.id, resposta.localidade);
    });
  }

  getCidadePorCEP(idEstado: number, nomeCidade: string) : void{
    this.enderecoService.getCidadePorEstado(idEstado)
    .subscribe((resposta : Cidade[]) => {
      let cidadeCEP = resposta.find(cidade => cidade.nome == nomeCidade);
      this.usuario.get('endereco')!.get('cidade')!.setValue(cidadeCEP!.id);
    });
  }

  errors(ctrl: FormControl): string[] {
    return ctrl.errors ? Object.keys(ctrl.errors) : [];
  }

  errorMessage(error: any): string{
    if(error == "mask") return "Campo Incompleto";
    if(error == "required") return "Campo Obrigatorio";
    if(error == "cpfNotValid") return "CPF Invalido";
    if(error == "pattern") return "";
    if(error == "mismatch") return "Senhas devem ser iguais";
    return error;
  }

  contemRegraSenha(nomeRegra : string): string{
    let minLength = 8;
    let regexLower = new RegExp('(?=.*[a-z])');
	  let regexUpper = new RegExp('(?=.*[A-Z])');
	  let regexDigits = new RegExp('(?=.*[0-9])');
	  let regexLength = new RegExp('(?=.{' + minLength + ',})');
    let specialChars = new RegExp(/[\u00C0-\u00ff-\`!@#$%^&*()_+\-=\[\]{}'";:\\|,.<>\/?~]+/g);

    switch (nomeRegra) {
      case 'minLength':
        if(this.usuario.get('groupSenha')!.get('senha')!.value.match(regexLength)){
          return 'senhaRegraAceita';
        }
      break;
      case 'upperLetter':
        if(this.usuario.get('groupSenha')!.get('senha')!.value.match(regexUpper)){
          return 'senhaRegraAceita';
        }
      break;
      case 'lowerLetter':
        if(this.usuario.get('groupSenha')!.get('senha')!.value.match(regexLower)){
          return 'senhaRegraAceita';
        }
      break;
      case 'specialChar':
        if(this.usuario.get('groupSenha')!.get('senha')!.value.match(specialChars)){
          return 'senhaRegraAceita';
        }
      break;
      case 'digit':
        if(this.usuario.get('groupSenha')!.get('senha')!.value.match(regexDigits)){
          return 'senhaRegraAceita';
        }
      break;
    }

    return '';
  }

  validacaoCadastro(): any{
    let senha = this.usuario.get('groupSenha')!.get('senha')!.value;
    let confirmarSenha = this.usuario.get('groupSenha')!.get('confirmarSenha')!.value;
    let mensagemErro = [];
    let erro = false;

    if(this.usuario.invalid){
        mensagemErro.push('Campo Necessario incompleto ou Invalido');
        erro = true ;
    }

    if(senha !== confirmarSenha){
      mensagemErro.push(`Senhas nao estao iguais`);
      erro = true ;
    }

    if((senha != '') && !this.verificarRegraSenha(senha)){
      mensagemErro.push('Senha Fraca, por favor insira uma senha melhor!');
      erro = true ;
    }

    if(this.usuario.errors){
      mensagemErro.push(this.usuario.errors);
      erro = true ;
    }
    console.log(mensagemErro);

    return {
      mensagem : mensagemErro,
      erro : erro
    };
  }

  //FA icons
  faUser = faUser;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
}
