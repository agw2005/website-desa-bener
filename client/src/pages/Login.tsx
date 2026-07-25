import { useState } from "react";
import Button from "../components/reusable/Button.tsx";
import Primitive from "../components/reusable/Primitive.tsx";
import TextInput from "../components/reusable/inputs/TextInput.tsx";
import NumberInput from "../components/reusable/inputs/NumberInput.tsx";
import PasswordInput from "../components/reusable/inputs/PasswordInput.tsx";
import { useNavigate } from "react-router";
import type { LoginInfo } from "../types/Login.d.ts";

const Login = () => {
  const navigate = useNavigate();
  const [nik, setNik] = useState("");
  const [passwordUmum, setPasswordUmum] = useState("");
  const [nama, setNama] = useState("");
  const [passwordAparatur, setPasswordAparatur] = useState("");

  const [aparaturInputIsEmpty, setAparaturInputIsEmpty] = useState(false);
  const [aparaturInputIsWrong, setAparaturInputIsWrong] = useState(false);
  const [umumInputIsEmpty, setUmumInputIsEmpty] = useState(false);
  const [umumInputIsWrong, setUmumInputIsWrong] = useState(false);

  const handleLogin = async (type: "aparatur" | "umum") => {
    setAparaturInputIsEmpty(false);
    setAparaturInputIsWrong(false);
    setUmumInputIsEmpty(false);
    setUmumInputIsWrong(false);

    const identifier = type === "aparatur" ? nama : nik;
    const password = type === "aparatur" ? passwordAparatur : passwordUmum;

    if (identifier === "" || password === "") {
      if (type === "aparatur") setAparaturInputIsEmpty(true);
      else setUmumInputIsEmpty(true);
    } else {
      const payload: LoginInfo = {
        identifier: identifier,
        kata_sandi: password,
      };
      try {
        const response = await fetch(
          `http://${globalThis.location.hostname}:8000/${type}/login`,
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
          localStorage.setItem("local_token", responseBody.jwt);
          navigate("/");
        } else {
          if (type === "aparatur") setAparaturInputIsWrong(true);
          else setUmumInputIsWrong(true);
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

            <div className="flex gap-2">
              <Button
                className="w-max"
                onClick={() => {
                  handleLogin("umum");
                }}
                variant="black"
              >
                Login
              </Button>
              {umumInputIsEmpty && (
                <div className="w-max rounded-2xl bg-red-500 px-4 py-2 text-white font-bold">
                  NIK dan kata sandi tidak boleh kosong
                </div>
              )}
              {umumInputIsWrong && (
                <div className="w-max rounded-2xl bg-red-500 px-4 py-2 text-white font-bold">
                  NIK atau kata sandi yang anda masukan salah
                </div>
              )}
            </div>
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
                onClick={() => {
                  handleLogin("aparatur");
                }}
                variant="black"
              >
                Login
              </Button>
              {aparaturInputIsEmpty && (
                <div className="w-max rounded-2xl bg-red-500 px-4 py-2 text-white font-bold">
                  Nama dan kata sandi tidak boleh kosong
                </div>
              )}
              {aparaturInputIsWrong && (
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
