import { useState } from "react";
import Button from "../components/reusable/Button.tsx";
import Primitive from "../components/reusable/Primitive.tsx";
import TextInput from "../components/reusable/inputs/TextInput.tsx";
import NumberInput from "../components/reusable/inputs/NumberInput.tsx";
import PasswordInput from "../components/reusable/inputs/PasswordInput.tsx";
import type { LoginInfo } from "../types/Aparatur.d.ts";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [nik, setNik] = useState("");
  const [passwordUmum, setPasswordUmum] = useState("");
  const [nama, setNama] = useState("");
  const [passwordAparatur, setPasswordAparatur] = useState("");
  const [inputIsEmpty, setInputIsEmpty] = useState(false);
  const [inputIsWrong, setInputIsWrong] = useState(false);

  const handleAparaturLogin = async () => {
    setInputIsEmpty(false);
    setInputIsWrong(false);

    if (nama === "" || passwordAparatur === "") {
      setInputIsEmpty(true);
    } else {
      const payload: LoginInfo = { nama, kata_sandi: passwordAparatur };
      try {
        const response = await fetch(
          `http://${globalThis.location.hostname}:8000/aparatur/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          },
        );

        if (response.ok) {
          const responseBody: { jwt: string } = await response.json();
          sessionStorage.setItem("session_token", responseBody.jwt);
          navigate("/");
        } else {
          setInputIsWrong(true);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

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

            <div className="flex gap-4">
              <Button
                className="w-max"
                onClick={handleAparaturLogin}
                variant="black"
              >
                Login
              </Button>
              {inputIsEmpty && (
                <div className="w-max rounded-2xl bg-red-500 px-4 py-2 text-white font-bold">
                  Nama dan kata sandi tidak boleh kosong
                </div>
              )}
              {inputIsWrong && (
                <div className="w-max rounded-2xl bg-red-500 px-4 py-2 text-white font-bold">
                  Nama atau kata sandi yang anda masukan salah
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </Primitive>
  );
};

export default Login;
