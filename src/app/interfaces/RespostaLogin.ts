export interface RespostaLogin{
  token: string,
  usuario: string,
  statusCode: number,
  emailConfirmado: boolean,
  email: string
}
