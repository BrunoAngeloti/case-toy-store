import Link from "next/link";

export function Title({ title }: {title: string}) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <Link href="/" className="text-blue-600 hover:underline text-sm">
        ← Voltar à página inicial
      </Link>
    </div>
  );
}