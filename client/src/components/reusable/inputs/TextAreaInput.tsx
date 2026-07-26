interface TextAreaInputProps {
  label: string;
  name: string;
  id: string;
  value: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

const TextAreaInput = ({
  label,
  name,
  id,
  value,
  onChangeHandler,
  placeholder,
  rows = 4,
}: TextAreaInputProps) => {
  return (
    <label className="flex flex-col">
      <div className="border w-max px-4 py-2 text-white font-bold border-black bg-black rounded-t-2xl select-none">
        {label}
      </div>
      <textarea
        className="border outline-none w-full px-4 py-2 rounded-b-2xl rounded-tr-2xl bg-white resize-y"
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        rows={rows}
      />
    </label>
  );
};

export default TextAreaInput;
