import { useState } from "react";
import Button from "../components/reusable/Button.tsx";
import Primitive from "../components/reusable/Primitive.tsx";
import TextInput from "../components/reusable/inputs/TextInput.tsx";
import PasswordInput from "../components/reusable/inputs/PasswordInput.tsx";
import { useNavigate } from "react-router";
import type { LoginInfo } from "../types/Login.d.ts";
import { serverApi } from "../helpers/serverApi.ts";

const Login = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [passwordAparatur, setPasswordAparatur] = useState("");

  const [aparaturInputIsEmpty, setAparaturInputIsEmpty] = useState(false);
  const [aparaturInputIsWrong, setAparaturInputIsWrong] = useState(false);

  const handleLogin = async () => {
    setAparaturInputIsEmpty(false);
    setAparaturInputIsWrong(false);

    if (nama === "" || passwordAparatur === "") {
      setAparaturInputIsEmpty(true);
    } else {
      const payload: LoginInfo = {
        identifier: nama,
        kata_sandi: passwordAparatur,
      };
      try {
        const response = await fetch(
          serverApi.post.aparatur.login(),
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
          setAparaturInputIsWrong(true);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Primitive>
      <div className="flex gap-16">
        <div className="flex-1"></div>
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
                  handleLogin();
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
        <div className="flex-1"></div>
      </div>
    </Primitive>
  );
};

export default Login;
