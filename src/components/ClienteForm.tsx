type Props = {
  nome: string;
  email: string;
  nascimento: string;
  setNome: (v: string) => void;
  setEmail: (v: string) => void;
  setNascimento: (v: string) => void;
  onSubmit: () => void;
};

export default function ClienteForm({ nome, email, nascimento, setNome, setEmail, setNascimento, onSubmit }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow mb-10 flex flex-wrap gap-4 items-center">
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="date"
        value={nascimento}
        onChange={(e) => setNascimento(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={onSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm transition"
      >
        Adicionar
      </button>
    </div>
  );
}
