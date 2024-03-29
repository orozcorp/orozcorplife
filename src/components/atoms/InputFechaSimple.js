import { dateInputFormat } from "@/lib/helpers/formatters";

export default function InputFechaSimple({
  id,
  label,
  required,
  value,
  onChange,
}) {
  return (
    <div className="flex-1 ">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <input
        type="date"
        id={id}
        step="0.01"
        className="bg-white border border-slate-300 text-slate-900 text-sm rounded-sm focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 "
        required={required}
        value={dateInputFormat(value)}
        onChange={onChange}
      />
    </div>
  );
}
