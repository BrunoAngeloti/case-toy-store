export type Cliente = {
  id: string;
  nome: string;
};

export type Venda = {
  id: string;
  valor: number;
  data_venda: string;
  cliente_id: string;
  clientes?: {
    nome: string;
  };
};