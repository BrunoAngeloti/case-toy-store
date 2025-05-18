import Link from 'next/link';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useEffect } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  useEffect(() => {
    document.title = 'Toy Store - Painel de Controle';
  }, []);
  
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Painel de Controle</h1>
        <p className="text-gray-600">Escolha uma seção para continuar</p>
        <div className="space-y-4">
          <Link href="/clientes" className="block bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            👥 Clientes
          </Link>
          <Link href="/dashboard" className="block bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
            📊 Dashboard
          </Link>
          <Link href="/vendas" className="block bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
            🧾 Nova Venda
          </Link>
        </div>
      </div>
    </main>
  );
}
