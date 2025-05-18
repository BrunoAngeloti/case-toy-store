import { HiOutlineMail, HiOutlineCalendar, HiOutlinePencil, HiOutlineTrash, HiOutlineBadgeCheck } from 'react-icons/hi';

type Props = {
  cliente: {
    id: string;
    nome: string;
    email: string;
    nascimento: string;
    letraFaltante: string;
  };
  onDelete: (id: string) => void;
  onEdit: (cliente: Props['cliente']) => void;
};

export default function ClienteCard({ cliente, onDelete, onEdit }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{cliente.nome}</h2>

      <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
        <HiOutlineMail />
        {cliente.email}
      </p>

      <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
        <HiOutlineCalendar />
        {cliente.nascimento}
      </p>

      <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
        <HiOutlineBadgeCheck/>
        Letra faltante: <strong>{cliente.letraFaltante}</strong>
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => onEdit(cliente)}
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline cursor-pointer"
        >
          <HiOutlinePencil /> Editar
        </button>

        <button
          onClick={() => onDelete(cliente.id)}
          className="flex items-center gap-1 text-sm text-red-600 hover:underline cursor-pointer"
        >
          <HiOutlineTrash /> Excluir
        </button>
      </div>
    </div>
  );
}
