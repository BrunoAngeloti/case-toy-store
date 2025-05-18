import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClienteForm from '../../components/ClienteForm';

describe('ClienteForm', () => {
  it('deve renderizar inputs e botão', () => {
    render(
      <ClienteForm
        nome=""
        email=""
        nascimento=""
        setNome={() => {}}
        setEmail={() => {}}
        setNascimento={() => {}}
        onSubmit={() => {}}
      />
    );

    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Adicionar');
  });
});
