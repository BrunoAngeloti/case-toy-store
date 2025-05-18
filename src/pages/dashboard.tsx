import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import VendasChart from '../components/VendasChart';
import EstatisticasResumo from '../components/EstatisticasResumo';
import { Title } from '@/components/Title';

export default function DashboardPage() {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchSales();
    fetchStats();
    document.title = 'Toy Store - Dashboard de Vendas';
  }, []);

  const fetchSales = async () => {
    const { data } = await supabase.from('vendas_por_dia').select('*');
    setSalesData(data || []);
  };

  const fetchStats = async () => {
    const { data } = await supabase.rpc('estatisticas_clientes');
    setStats(data);
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <Title title="Dashboard de Vendas" />

      <div className="bg-white rounded-lg shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Vendas por dia</h2>
        <VendasChart data={salesData} />
      </div>

      {stats && <EstatisticasResumo stats={stats} />}
    </main>
  );
}
