import { Link, useParams } from "react-router";
import Primitive from "../components/reusable/Primitive.tsx";
import useUmkm from "../hooks/useUmkm.tsx";
import Button from "../components/reusable/Button.tsx";
import useFetch from "../hooks/useFetch.tsx";
import type { Dusun } from "../types/Dusun.d.ts";
import { serverApi } from "../helpers/serverApi.ts";

const Umkm = () => {
  const params = useParams();
  const { data } = useUmkm(Number(params.id));
  const { data: dusun } = useFetch<Dusun>(
    serverApi.get.dusun.all(),
    data?.dusun_id,
  );

  return (
    <Primitive>
      <div className="flex flex-col gap-8 px-32">
        {data && (
          <div className="bg-amber-300 p-8 rounded-3xl flow-root">
            <img
              src={serverApi.get.umkm.photo(data.umkm_id)}
              alt={`Gambar UMKM dengan ID ${data.umkm_id}`}
              className="h-max w-max max-h-128 max-w-1/2 float-left mr-4 rounded-2xl"
              onError={(e) => {
                e.currentTarget.src = "/tidak-ada-gambar-box.png";
                e.currentTarget.onerror = null;
              }}
            />
            <div className="flex flex-col gap-4">
              <ul>
                <li>
                  <span className="font-bold">Nama UMKM :</span> {data.nama}
                </li>
                <li>
                  <span className="font-bold">Deskripsi Singkat :</span>{" "}
                  {data.deskripsi}
                </li>
                <li>
                  <span className="font-bold">Dusun :</span>{" "}
                  {dusun && dusun[0].nama}
                </li>
              </ul>
              <ul className="flex flex-col gap-2">
                {data.kontak.map((k, i) => {
                  return (
                    <li key={i}>
                      <Link to={k.tautan}>
                        <Button variant="black">
                          {k.jenis_kontak} - {k.isi}
                        </Button>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link to="/wisata">
                    <Button variant="black" className="w-max">Kembali</Button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Primitive>
  );
};

export default Umkm;
