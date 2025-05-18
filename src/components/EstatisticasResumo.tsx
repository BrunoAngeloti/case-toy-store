import { MdStars } from "react-icons/md";

type Props = {
  stats: any;
};

export default function EstatisticasResumo({ stats }: Props) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        <MdStars className="inline-block mr-2 text-yellow-500" />
         Destaques
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Maior volume de vendas', info: stats.maior_volume },
          { title: 'Maior média por venda', info: stats.maior_media },
          { title: 'Maior frequência de compras', info: stats.maior_frequencia },
        ].map(({ title, info }, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="font-semibold text-gray-700 mb-1">{title}</h3>
            <p className="text-gray-800 text-lg">{info?.nome ?? 'Nenhum dado'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
