import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ClienteForm from '../components/ClienteForm';
import ClienteCard from '../components/ClienteCard';
import { Title } from '@/components/Title';
import { toast } from 'react-toastify';
import { getLetraFaltante } from '@/utils/getLetraFaltante';

export default function ClientesPage() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [editandoId, setEditandoId] = useState<string | null>(null);

  useEffect(() => {
    fetchClientes();
    document.title = 'Toy Store - Gerenciar Clientes';
  }, []);

  const fetchClientes = async () => {
    const { data } = await supabase.from('clientes').select('*');
    setClientes((data || []).map(cli => ({
      ...cli,
      letraFaltante: getLetraFaltante(cli.nome)
    })));
  };

  

  const handleSubmit = async () => {
    if (!nome || !email || !nascimento) {
      toast.error('Preencha todos os campos');
      return;
    }

    if (editandoId) {
      await supabase.from('clientes').update({ nome, email, nascimento }).eq('id', editandoId);
      toast.success('Cliente editado com sucesso!');
    } else {
      await supabase.from('clientes').insert({ nome, email, nascimento });
      toast.success('Cliente criado com sucesso!');
    }

    resetForm();
    fetchClientes();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja excluir este cliente?')) {
      await supabase.from('clientes').delete().eq('id', id);
      toast.success('Cliente excluído!');
      fetchClientes();
    }
  };

  const handleEdit = (cliente: any) => {
    setEditandoId(cliente.id);
    setNome(cliente.nome);
    setEmail(cliente.email);
    setNascimento(cliente.nascimento);
  };

  const resetForm = () => {
    setEditandoId(null);
    setNome('');
    setEmail('');
    setNascimento('');
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <Title title="Gerenciar Clientes" />

      <ClienteForm
        nome={nome}
        email={email}
        nascimento={nascimento}
        setNome={setNome}
        setEmail={setEmail}
        setNascimento={setNascimento}
        onSubmit={handleSubmit}
        editando={!!editandoId}
        onCancelEdit={resetForm}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {clientes.map(cli => (
          <ClienteCard key={cli.id} cliente={cli} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </div>
    </main>
  );
}
