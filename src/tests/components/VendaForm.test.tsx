import { render, screen, fireEvent } from '@testing-library/react';
import VendaForm from '../../components/VendaForm';

describe('VendaForm', () => {
  it('deve chamar onSubmit quando clicar no botão', () => {
    const onSubmit = jest.fn();
    render(
      <VendaForm
        clienteId=""
        setClienteId={() => {}}
        clientes={[{ id: '1', nome: 'Joana' }]}
        valor="100"
        setValor={() => {}}
        dataVenda="2025-05-18"
        setDataVenda={() => {}}
        onSubmit={onSubmit}
      />
    );
    fireEvent.click(screen.getByText(/Salvar Venda/i));
    expect(onSubmit).toHaveBeenCalled();
  });
});
