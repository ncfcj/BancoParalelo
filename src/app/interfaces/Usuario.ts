import { Endereco } from './Endereco';
export interface Usuario {
  id?: string,
  email: string,
  senha: string,
  firstName: string,
  lastName: string,
  cpf: string,
  telefone: string,
  endereco: Endereco,
  tipoDeConta: number,
  agencia: number
}
