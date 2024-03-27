import { Textarea } from "@/components/ui/textarea";

export default function TextArea(props) {
  const { name, label, ...rest } = props;
  return (
    <div className="flex-1">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-900 "
      >
        {label}
      </label>
      <Textarea
        id={name}
        name={name}
        rows="3"
        className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 focus:ring-zinc-500 focus:border-zinc-500 "
        {...rest}
      ></Textarea>
    </div>
  );
}
