interface Props {
  className?: string;
  label: string;
  type: string;
  name: string;
  required: boolean;
  placeholder: string;
  error?: string;
  helpText: string;
  value?: string;
}

export function Input(props: Props) {
  return (
    <div className={`flex flex-col ${props.className}`}>
      <label className="font-medium">{props.label}</label>
      <input
        className="border-solid rounded-md border-2 border-gray-200 shadow p-2 w-full"
        type={props.type}
        name={props.name}
        required={props.required}
        placeholder={props.placeholder}
        defaultValue={props.value}
      />
      <span className="text-xs text-gray-400">{props.helpText}</span>
      <span className="text-red-500 m-1 text-sm">{props.error}</span>
    </div>
  );
}
