import { render, screen, fireEvent } from '@testing-library/react';
import ClienteCard from '../../components/ClienteCard';

const cliente = {
  id: '1',
  nome: 'João',
  email: 'joao@example.com',
  nascimento: '1990-01-01',
  letraFaltante: 'z',
};

describe('ClienteCard', () => {
  it('deve exibir nome, email e nascimento', () => {
    render(<ClienteCard cliente={cliente} onDelete={() => {}} onEdit={() => {}} />);
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText(/joao@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/1990-01-01/)).toBeInTheDocument();
  });

  it('deve chamar onDelete ao clicar em excluir', () => {
    const onDelete = jest.fn();
    render(<ClienteCard cliente={cliente} onDelete={onDelete} onEdit={() => {}} />);
    fireEvent.click(screen.getByText(/Excluir/));
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
