import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import ClienteCard from '../components/ClienteCard';
import ClienteForm from '../components/ClienteForm';
import EstatisticasResumo from '../components/EstatisticasResumo';
import VendasChart from '../components/VendasChart';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nascimento, setNascimento] = useState('');
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data?.session?.user) {
        router.push('/login');
      }
    });
    fetchClientes();
    fetchStats();
    fetchSalesPerDay();
  }, []);

  const fetchClientes = async () => {
    const { data } = await supabase.from('clientes').select('*');
    setClientes((data || []).map(cli => ({
      ...cli,
      letraFaltante: getLetraFaltante(cli.nome)
    })));
  };

  const getLetraFaltante = (nome: string) => {
    const letras = new Set(nome.toLowerCase().replace(/[^a-z]/g, ''));
    for (let i = 97; i <= 122; i++) {
      const letra = String.fromCharCode(i);
      if (!letras.has(letra)) return letra;
    }
    return '-';
  };

  const fetchStats = async () => {
    const { data } = await supabase.rpc('estatisticas_clientes');
    setStats(data);
  };

  const fetchSalesPerDay = async () => {
    const { data } = await supabase.from('vendas_por_dia').select('*');
    setSalesData(data || []);
  };

  const handleSubmit = async () => {
    if (!nome || !email || !nascimento) return alert('Preencha todos os campos');
    await supabase.from('clientes').insert({ nome, email, nascimento });
    setNome(''); setEmail(''); setNascimento('');
    fetchClientes();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja excluir este cliente?')) {
      await supabase.from('clientes').delete().eq('id', id);
      fetchClientes();
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">Painel de Clientes</h1>

      <ClienteForm
        nome={nome} email={email} nascimento={nascimento}
        setNome={setNome} setEmail={setEmail} setNascimento={setNascimento}
        onSubmit={handleSubmit}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {clientes.map(cli => (
          <ClienteCard key={cli.id} cliente={cli} onDelete={handleDelete} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Vendas por dia</h2>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <VendasChart data={salesData} />
      </div>

      {stats && <EstatisticasResumo stats={stats} />}
    </main>
  );
}
