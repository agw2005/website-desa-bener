import Button from "../components/reusable/Button.tsx";
import Primitive from "../components/reusable/Primitive.tsx";

const Login = () => {
  return (
    <Primitive>
      <div className="flex mx-64 gap-16">
        <form className="flex-1">
          <div className="bg-amber-500 w-max px-4 py-2 rounded-t-2xl text-white font-bold text-lg">
            Sebagai warga umum
          </div>
          <div className="bg-amber-300 py-8 px-4 rounded-b-2xl rounded-tr-2xl flex flex-col gap-4">
            <label className="flex">
              <div className="border px-4 py-2 text-white font-bold border-black bg-black rounded-l-2xl select-none">
                NIK
              </div>
              <input
                className="border outline-none w-full px-4 py-2 rounded-r-2xl bg-white"
                type="text"
                name="umum"
                id="umum"
              />
            </label>
            <label className="flex">
              <div className="border px-4 py-2 text-white font-bold border-black bg-black rounded-l-2xl select-none">
                PIN
              </div>
              <input
                className="border outline-none w-full px-4 py-2 rounded-r-2xl bg-white"
                type="password"
                name="umum"
                id="umum"
              />
            </label>

            <Button className="w-max" variant="black">Login</Button>
          </div>
        </form>
        <form className="flex-1">
          <div className="bg-amber-500 w-max px-4 py-2 rounded-t-2xl text-white font-bold text-lg">
            Sebagai apartur desa
          </div>
          <div className="bg-amber-300 py-8 px-4 rounded-b-2xl rounded-tr-2xl flex flex-col gap-4">
            <label className="flex">
              <div className="border px-4 py-2 text-white font-bold border-black bg-black rounded-l-2xl select-none">
                Nama
              </div>
              <input
                className="border outline-none w-full px-4 py-2 rounded-r-2xl bg-white"
                type="text"
                name="umum"
                id="umum"
              />
            </label>
            <label className="flex">
              <div className="border px-4 py-2 text-white font-bold border-black bg-black rounded-l-2xl select-none">
                PIN
              </div>
              <input
                className="border outline-none w-full px-4 py-2 rounded-r-2xl bg-white"
                type="password"
                name="umum"
                id="umum"
              />
            </label>

            <Button className="w-max" variant="black">Login</Button>
          </div>
        </form>
      </div>
    </Primitive>
  );
};

export default Login;
