interface OneFileInputProps {
  label: string;
  name: string;
  id: string;
  onChangeHandler: (input: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  fileName?: string;
}

const OneFileInput = (
  { label, name, id, onChangeHandler, accept, fileName }: OneFileInputProps,
) => {
  return (
    <label className="flex">
      <div className="border w-max px-4 py-2 text-white font-bold border-black bg-black rounded-l-2xl select-none flex items-center">
        {label}
      </div>
      <div className="flex-1 rounded-r-2xl flex items-center px-4 border bg-white">
        {fileName ?? "Unggah lampiran"}
      </div>
      <input
        type="file"
        name={name}
        id={id}
        accept={accept}
        multiple={false}
        onChange={onChangeHandler}
        hidden
      />
    </label>
  );
};

export default OneFileInput;
