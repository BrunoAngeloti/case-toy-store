import { Bar } from 'react-chartjs-2';

type Props = {
  data: { data_venda: string; total: number }[];
};

export default function VendasChart({ data }: Props) {
  return (
    <Bar
      data={{
        labels: data.map((s) => s.data_venda),
        datasets: [{
          label: 'Total Vendido',
          data: data.map((s) => s.total),
          backgroundColor: 'rgba(59, 130, 246, 0.6)',
        }],
      }}
    />
  );
}
