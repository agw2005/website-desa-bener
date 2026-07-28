interface OneFileInputProps {
  label: string;
  name: string;
  id: string;
  onChangeHandler: (input: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  fileName?: string;
  placeholder: string;
}

const OneFileInput = (
  {
    label,
    name,
    id,
    onChangeHandler,
    accept,
    fileName,
    placeholder = "Unggah lampiran",
  }: OneFileInputProps,
) => {
  return (
    <label className="flex">
      <div className="border w-max px-4 py-2 text-white font-bold border-black bg-black rounded-l-2xl select-none flex items-center">
        {label}
      </div>
      <div
        className={`${
          !fileName ? "text-gray-500" : "text-black"
        } border-black flex-1 rounded-r-2xl flex items-center px-4 border bg-white transition duration-150 ease-in-out hover:brightness-75 active:brightness-85`}
      >
        {fileName ?? placeholder}
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
