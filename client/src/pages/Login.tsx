import { useState } from "react";
import Button from "../components/reusable/Button.tsx";
import Primitive from "../components/reusable/Primitive.tsx";
import TextInput from "../components/reusable/TextInput.tsx";
import NumberInput from "../components/reusable/NumberInput.tsx";
import PasswordInput from "../components/reusable/PasswordInput.tsx";

const Login = () => {
  const [nik, setNik] = useState("");
  const [passwordUmum, setPasswordUmum] = useState("");
  const [nama, setNama] = useState("");
  const [passwordAparatur, setPasswordAparatur] = useState("");

  return (
    <Primitive>
      <div className="flex mx-32 gap-16">
        <form className="flex-1">
          <div className="bg-amber-500 w-max px-4 py-2 rounded-t-2xl text-white font-bold text-lg">
            Sebagai warga umum
          </div>
          <div className="bg-amber-300 py-8 px-4 rounded-b-2xl rounded-tr-2xl flex flex-col gap-4">
            <NumberInput
              label="NIK"
              name="nik-umum"
              id="nik-umum"
              value={nik}
              onChangeHandler={(e) => setNik(e.currentTarget.value)}
            />
            <PasswordInput
              label="Kata Sandi"
              name="password-umum"
              id="password-umum"
              value={passwordUmum}
              onChangeHandler={(e) => setPasswordUmum(e.currentTarget.value)}
            />

            <Button
              className="w-max"
              onClick={() => {
                console.log({ nik, passwordUmum });
              }}
              variant="black"
            >
              Login
            </Button>
          </div>
        </form>
        <form className="flex-1">
          <div className="bg-amber-500 w-max px-4 py-2 rounded-t-2xl text-white font-bold text-lg">
            Sebagai apartur desa
          </div>
          <div className="bg-amber-300 py-8 px-4 rounded-b-2xl rounded-tr-2xl flex flex-col gap-4">
            <TextInput
              label="Nama"
              name="nama-aparatur"
              id="nama-aparatur"
              value={nama}
              onChangeHandler={(e) => setNama(e.currentTarget.value)}
            />
            <PasswordInput
              label="Kata Sandi"
              name="password-aparatur"
              id="password-aparatur"
              value={passwordAparatur}
              onChangeHandler={(e) =>
                setPasswordAparatur(e.currentTarget.value)}
            />

            <Button
              className="w-max"
              onClick={() => {
                console.log({ nama, passwordAparatur });
              }}
              variant="black"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </Primitive>
  );
};

export default Login;
