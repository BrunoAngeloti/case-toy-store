import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'react-toastify';
import Link from 'next/link';
import VendaForm from '@/components/VendaForm';

import type { Venda, Cliente } from '@/types';
import UltimasVendas from '@/components/UltimasVendas';
import { Title } from '@/components/Title';
import { useAuthGuard } from '@/hooks/useAuthGuard';

export default function VendasPage() {
  useAuthGuard();

  const [vendas, setVendas] = useState<Venda[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteId, setClienteId] = useState('');
  const [valor, setValor] = useState('');
  const [dataVenda, setDataVenda] = useState('');
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    fetchClientes();
    fetchVendas();
    setDataVenda(getHoje());
    document.title = 'Toy Store - Nova Venda';
  }, []);

  const getHoje = () => {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };


  const fetchClientes = async () => {
    const { data } = await supabase.from('clientes').select('id, nome');
    setClientes(data || []);
  };

  const fetchVendas = async () => {
    const { data } = await supabase
      .from('sales')
      .select(`
        id,
        valor,
        data_venda,
        cliente_id,
        clientes (
          nome
        )
      `)
      .order('data_venda', { ascending: false });

    setVendas(
      (data || []).map((v: any) => ({
        ...v,
        clientes: Array.isArray(v.clientes) ? v.clientes[0] : v.clientes,
      }))
    );
  };

  const novaVenda = async () => {
    if (!clienteId || !valor || !dataVenda) {
      toast.error('Preencha todos os campos');
      return;
    }

    await supabase.from('sales').insert({
      cliente_id: clienteId,
      valor: parseFloat(valor),
      data_venda: dataVenda,
    });

    setClienteId('');
    setValor('');
    setDataVenda(getHoje());
    toast.success('Venda cadastrada com sucesso!');
    fetchVendas();
  };

  return (
    <main className="max-w-5xl mx-auto p-6">
      <Title title="Nova Venda" />

      <VendaForm
        clienteId={clienteId}
        setClienteId={setClienteId}
        clientes={clientes}
        valor={valor}
        setValor={setValor}
        dataVenda={dataVenda}
        setDataVenda={setDataVenda}
        onSubmit={novaVenda}
      />

      <UltimasVendas
        vendas={vendas}
        pagina={pagina}
        setPagina={setPagina}
      />
    </main>
  );
}
