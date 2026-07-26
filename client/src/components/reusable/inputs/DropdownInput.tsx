interface DropdownProps<Option> {
  label: string;
  name: string;
  id: string;
  value: number | string;
  options: Option[];
  getId: (option: Option) => number;
  getLabel: (option: Option) => string;
  onChangeHandler: (id: number) => void;
  placeholder?: string;
}

const DropdownInput = <Option,>(
  {
    label,
    name,
    id,
    value,
    options,
    getId,
    getLabel,
    onChangeHandler,
    placeholder,
  }: DropdownProps<Option>,
) => {
  const hasSelection = value !== "";

  return (
    <label className="flex">
      <div className="border w-max px-4 py-2 text-white font-bold border-black bg-black rounded-l-2xl select-none">
        {label}
      </div>
      <select
        className="border flex-1 outline-none w-full px-4 py-2 rounded-r-2xl bg-white"
        name={name}
        id={id}
        value={value}
        onChange={(e) => onChangeHandler(Number(e.target.value))}
      >
        {placeholder && !hasSelection && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={getId(option)} value={getId(option)}>
            {getLabel(option)}
          </option>
        ))}
      </select>
    </label>
  );
};

export default DropdownInput;
