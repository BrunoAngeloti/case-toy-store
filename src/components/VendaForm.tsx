type Props = {
  clienteId: string;
  setClienteId: (v: string) => void;
  clientes: { id: string; nome: string }[];
  valor: string;
  setValor: (v: string) => void;
  dataVenda: string;
  setDataVenda: (v: string) => void;
  onSubmit: () => void;
};

export default function VendaForm({
  clienteId,
  setClienteId,
  clientes,
  valor,
  setValor,
  dataVenda,
  setDataVenda,
  onSubmit,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow mb-10 flex flex-wrap gap-4 items-center">
      <select
        value={clienteId}
        onChange={(e) => setClienteId(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Selecione um cliente</option>
        {clientes.map((cli) => (
          <option key={cli.id} value={cli.id}>
            {cli.nome}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Valor da venda"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="date"
        value={dataVenda}
        onChange={(e) => setDataVenda(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={onSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm transition cursor-pointer"
      >
        Salvar Venda
      </button>
    </div>
  );
}
