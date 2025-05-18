import { Venda } from "@/types";
import { formatarData } from "@/utils/formatarData";
import { FaUserCircle } from "react-icons/fa";
import { MdHistory } from "react-icons/md";

type Props = {
  vendas: Venda[];
  pagina: number;
  setPagina: (p: number | ((prev: number) => number)) => void;
  itensPorPagina?: number;
};

export default function UltimasVendas({ vendas, pagina, setPagina, itensPorPagina = 10 }: Props) {
  const vendasPaginadas = vendas.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);

  

  return (
    <>
      <h2 className="text-xl font-semibold mb-4"><MdHistory className="inline-block mr-2 text-black text-2xl" /> Últimas Vendas</h2>

      <ul className="space-y-2 mb-6">
        {vendasPaginadas.map((v) => (
          <li
            key={v.id}
            className="bg-gray-100 px-4 py-3 rounded flex flex-col md:flex-row md:items-center text-sm"
          >
            <span className="flex items-center">
              <FaUserCircle className="mr-2 text-base"/> {v.clientes?.nome ?? 'Cliente removido'} - {formatarData(v.data_venda)}
            </span>
            <span className="ml-auto">
              R$ {v.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex justify-center space-x-2">
        <button
          onClick={() => setPagina((p: number) => Math.max(1, p - 1))}
          className={`px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 ${
            pagina === 1 ? 'opacity-0 pointer-events-none' : ''
          }`}
        >
          Anterior
        </button>
        <span className="px-4 py-2 text-gray-600">Página {pagina}</span>
        <button
          onClick={() =>
            setPagina((p: number) => (p * itensPorPagina < vendas.length ? p + 1 : p))
          }
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Próxima
        </button>
      </div>
    </>
  );
}