import { useState } from "react";
import Button from "../components/reusable/Button.tsx";
import Primitive from "../components/reusable/Primitive.tsx";
import TextInput from "../components/reusable/inputs/TextInput.tsx";
import PasswordInput from "../components/reusable/inputs/PasswordInput.tsx";
import { useNavigate } from "react-router";
import type { LoginInfo } from "../types/Login.d.ts";
import { serverApi } from "../helpers/serverApi.ts";
import RoundedSection from "../components/reusable/RoundedSection.tsx";

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
      <div className="self-center min-w-1/2 max-w-7/8">
        <RoundedSection
          title="Sebagai apartur desa"
          titleClassName="w-full"
          contentClassName="gap-4"
        >
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
            onChangeHandler={(e) => setPasswordAparatur(e.currentTarget.value)}
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
        </RoundedSection>
      </div>
    </Primitive>
  );
};

export default Login;
