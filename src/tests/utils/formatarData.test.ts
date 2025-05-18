import { formatarData } from '../../utils/formatarData';

describe('formatarData', () => {
  it('deve formatar corretamente a data yyyy-mm-dd para dd/mm/yyyy', () => {
    expect(formatarData('2025-05-18')).toBe('18/05/2025');
    expect(formatarData('2000-01-01')).toBe('01/01/2000');
  });

  it('deve retornar "???" se a string for inválida', () => {
    expect(formatarData('2025/05/18')).toBe('???');
    expect(formatarData('')).toBe('???');
  });
});
