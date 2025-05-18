import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export function ValidationItem({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-2 ${ok ? 'text-green-600' : 'text-gray-400'}`}>
      {ok ? <FaCheckCircle /> : <FaTimesCircle />}
      <span>{label}</span>
    </div>
  );
}