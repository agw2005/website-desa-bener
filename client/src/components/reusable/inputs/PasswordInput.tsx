interface PasswordInputProps {
  label: string;
  name: string;
  id: string;
  value: string;
  onChangeHandler: (input: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = (
  { label, name, id, value, onChangeHandler }: PasswordInputProps,
) => {
  return (
    <label className="flex">
      <div className="border w-max px-4 py-2 text-white font-bold border-black bg-black rounded-l-2xl select-none">
        {label}
      </div>
      <input
        className="border flex-1 outline-none w-full px-4 py-2 rounded-r-2xl bg-white"
        type="password"
        name={name}
        id={id}
        value={value}
        onChange={onChangeHandler}
      />
    </label>
  );
};

export default PasswordInput;
