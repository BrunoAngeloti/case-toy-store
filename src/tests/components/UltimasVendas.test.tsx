import { render, screen, fireEvent } from '@testing-library/react';
import UltimasVendas from '../../components/UltimasVendas';

const vendasMock = Array.from({ length: 15 }).map((_, i) => ({
  id: `v${i + 1}`,
  valor: 100 + i,
  data_venda: `2025-05-${(i + 1).toString().padStart(2, '0')}`,
  cliente_id: `c${i + 1}`,
  clientes: { nome: `Cliente ${i + 1}` },
}));

describe('UltimasVendas', () => {
  it('deve renderizar as 10 primeiras vendas', () => {
    render(<UltimasVendas vendas={vendasMock} pagina={1} setPagina={() => {}} />);
    expect(screen.getAllByText(/Cliente/i)).toHaveLength(10);
  });

  it('deve exibir paginação e chamar setPagina ao clicar em próxima', () => {
    const setPagina = jest.fn((cb) => cb(2));
    render(<UltimasVendas vendas={vendasMock} pagina={1} setPagina={setPagina} />);
    fireEvent.click(screen.getByText('Próxima'));
    expect(setPagina).toHaveBeenCalledWith(expect.any(Function));
  });

  it('deve não permitir voltar da página 1', () => {
    render(<UltimasVendas vendas={vendasMock} pagina={1} setPagina={() => {}} />);
    expect(screen.getByText('Anterior')).toHaveClass('opacity-0');
  });
});
