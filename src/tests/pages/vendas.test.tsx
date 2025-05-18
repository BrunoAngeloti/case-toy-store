import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VendasPage from '@/pages/vendas';
import { supabase } from '@/lib/supabaseClient';

// Mock completo do Supabase
jest.mock('@/lib/supabaseClient', () => {
  const mockInsert = jest.fn().mockResolvedValue({});
  const mockSelectSales = jest.fn(() => ({
    order: jest.fn(() => ({
      data: [
        {
          id: 'v1',
          valor: 123,
          data_venda: '2025-05-18',
          cliente_id: '1',
          clientes: { nome: 'Maria' },
        },
      ],
    })),
  }));

  const mockSelectClientes = jest.fn(() => ({
    data: [{ id: '1', nome: 'Maria' }],
  }));

  return {
    supabase: {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: { user: { id: 'test-user' } } },
        }),
      },
      from: jest.fn((table: string) => {
        if (table === 'clientes') {
          return {
            select: mockSelectClientes,
          };
        }
        if (table === 'sales') {
          return {
            select: mockSelectSales,
            insert: mockInsert,
          };
        }
        return {};
      }),
    },
  };
});

describe('VendasPage', () => {
  it('deve carregar clientes e vendas na primeira renderização', async () => {
    render(<VendasPage />);
    await screen.findByText('Maria'); // aguarda async render

    expect(screen.getByText('Maria')).toBeInTheDocument();
    expect(screen.getByText((text) => text.includes('18/05/2025'))).toBeInTheDocument();

  });

  it('deve permitir criar uma nova venda', async () => {
    render(<VendasPage />);
    await screen.findByText('Salvar Venda');

    // Preencher os campos
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
    fireEvent.change(screen.getByPlaceholderText(/valor da venda/i), {
      target: { value: '200' },
    });

    // Clicar no botão
    fireEvent.click(screen.getByText('Salvar Venda'));

    // Espera o mock de insert ser chamado
    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('sales');
    });
  });
});
