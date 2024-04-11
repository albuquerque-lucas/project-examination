export const translateHttpToMessage = (code: number): string => {
  switch (code) {
    case 400:
      return 'Requisição inválida';
    case 401:
      return 'Não autorizado';
    case 403:
      return 'Acesso negado';
    case 404:
      return 'Não encontrado';
    case 409:
      return 'Os dados informados já existem no banco de dados.';
    case 500:
      return 'Erro interno do servidor';
    default:
      return 'Erro desconhecido';
  }
}