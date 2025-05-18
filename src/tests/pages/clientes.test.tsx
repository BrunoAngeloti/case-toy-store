import { render, screen, waitFor } from '@testing-library/react';
import ClientesPage from '../../pages/clientes';
import { supabase } from '../../lib/supabaseClient';

jest.mock('../../lib/supabaseClient');

jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    insert: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockResolvedValue({}),
  }
}));

describe('ClientesPage', () => {
  it('deve carregar e exibir clientes', async () => {
    (supabase.from as any).mockReturnValue({
      select: jest.fn().mockResolvedValue({
        data: [
          { id: '1', nome: 'Ana', email: 'ana@example.com', nascimento: '1990-01-01' }
        ]
      })
    });

    render(<ClientesPage />);

    await waitFor(() => {
      expect(screen.getByText('Ana')).toBeInTheDocument();
    });
  });
});
