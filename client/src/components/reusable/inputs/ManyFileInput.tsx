import Button from "../Button.tsx";
import OneFileInput from "./OneFileInput.tsx";

interface ManyFileInputProps {
  label: string;
  name: string;
  id: string;
  files: File[];
  onAdd: (file: File) => void;
  onRemove: (index: number) => void;
  accept?: string;
  placeholder?: string;
}

const ManyFileInput = (
  {
    label,
    name,
    id,
    files,
    onAdd,
    onRemove,
    accept,
    placeholder = "Unggah lampiran",
  }: ManyFileInputProps,
) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onAdd(file);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-2">
      <OneFileInput
        label={label}
        name={name}
        id={id}
        onChangeHandler={handleChange}
        accept={accept}
        placeholder={placeholder}
      />
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((file, index) => (
            <span
              key={index}
              className="flex items-center gap-2 border border-black bg-black text-white rounded-full px-3 py-1 text-sm select-none"
            >
              {file.name}

              <Button
                type="button"
                onClick={() => onRemove(index)}
                className="leading-none hover:text-red-400"
                aria-label={`Hapus lampiran ${file.name}`}
                variant="red"
              >
                Hapus
              </Button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManyFileInput;
