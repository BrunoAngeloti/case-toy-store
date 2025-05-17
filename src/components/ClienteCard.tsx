type Props = {
  cliente: {
    id: string;
    nome: string;
    email: string;
    nascimento: string;
    letraFaltante: string;
  };
  onDelete: (id: string) => void;
};

export default function ClienteCard({ cliente, onDelete }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{cliente.nome}</h2>
      <p className="text-sm text-gray-600 mb-1">📧 {cliente.email}</p>
      <p className="text-sm text-gray-600 mb-1">🎂 {cliente.nascimento}</p>
      <p className="text-sm text-gray-600 mb-4">🔤 Letra faltante: <strong>{cliente.letraFaltante}</strong></p>
      <button
        onClick={() => onDelete(cliente.id)}
        className="text-sm text-red-600 hover:underline"
      >
        Excluir
      </button>
    </div>
  );
}
