import { getLetraFaltante } from '../../utils/getLetraFaltante';

describe('getLetraFaltante', () => {
  it('deve retornar a primeira letra ausente', () => {
    expect(getLetraFaltante('abcxyz')).toBe('d');
  });

  it('deve retornar "-" se todas as letras existirem', () => {
    const alfabetoCompleto = 'abcdefghijklmnopqrstuvwxyz';
    expect(getLetraFaltante(alfabetoCompleto)).toBe('-');
  });
});
