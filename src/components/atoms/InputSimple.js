import { isEmpty } from "lodash";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IoAlertCircleOutline } from "react-icons/io5";

export default function InputSimple(props) {
  const { label, name, type = "text", error, ...rest } = props;
  const status = isEmpty(error) ? "ready" : "error";
  return (
    <div className="flex-1">
      {!isEmpty(label) && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-slate-900"
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <input
          {...rest}
          id={name}
          name={name}
          className="bg-white border border-slate-300 text-slate-900 text-sm rounded-sm focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5"
        />
      </div>
      {status === "error" && (
        <Alert>
          <IoAlertCircleOutline className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
