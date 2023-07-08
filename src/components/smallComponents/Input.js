import { dateInputFormat } from "@/lib/helpers/formatters";
export default function Input({ type, values, setValues, name }) {
  return (
    <div className="relative z-0 w-full mb-6 group">
      <input
        type={type}
        name={name}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        value={type === "date" ? dateInputFormat(values[name]) : values[name]}
        onChange={(e) =>
          setValues({
            ...values,
            [e.target.name]:
              type === "date" ? new Date(e.target.value) : e.target.value,
          })
        }
      />
      <label
        htmlFor={name}
        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {name}
      </label>
    </div>
  );
}
