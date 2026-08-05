import { Link, useParams } from "react-router";
import Primitive from "../components/reusable/Primitive.tsx";
import useUmkm from "../hooks/useUmkm.tsx";
import Button from "../components/reusable/Button.tsx";
import useFetch from "../hooks/useFetch.tsx";
import type { Dusun } from "../types/Dusun.d.ts";
import { serverApi } from "../helpers/serverApi.ts";
import TextInput from "../components/reusable/inputs/TextInput.tsx";
import { useState } from "react";
import { authFetch } from "../helpers/authFetch.ts";
import OneFileInput from "../components/reusable/inputs/OneFileInput.tsx";
import DropdownInput from "../components/reusable/inputs/DropdownInput.tsx";
import useAuth from "../hooks/useAuth.tsx";

const Umkm = () => {
  const params = useParams();
  const { isLoggedIn } = useAuth();

  const [newKontakJenis, setNewKontakJenis] = useState("");
  const [newKontakIsi, setNewKontakIsi] = useState("");
  const [newKontakTautan, setNewKontakTautan] = useState("");
  const [newUmkmFoto, setNewUmkmFoto] = useState<File | null>(null);

  const [namaUmkmBaru, setNamaUmkmBaru] = useState("");
  const [deskripsiUmkmBaru, setDeskripsiUmkmBaru] = useState("");
  const [dusunUmkmBaru, setDusunUmkmBaru] = useState<number | "">("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { data, refetch } = useUmkm(Number(params.id));
  const { data: dusun } = useFetch<Dusun>(
    serverApi.get.dusun.all(),
    data?.dusun_id,
  );

  const {
    data: namaDusun,
  } = useFetch<Pick<Dusun, "dusun_id" | "nama">>(
    serverApi.get.dusun.names(),
  );

  const handleAddKontak = async (id: number) => {
    setLoading(true);
    setMessage("");

    if (
      newKontakJenis.trim() === "" ||
      newKontakIsi.trim() === "" ||
      newKontakTautan.trim() === ""
    ) {
      setMessage("Jenis kontak, isi, dan tautan perlu diisi");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("jenis_kontak", newKontakJenis);
    formData.append("isi_kontak", newKontakIsi);
    formData.append("tautan_kontak", newKontakTautan);

    try {
      const response = await authFetch(
        serverApi.post.umkm.button(id),
        { method: "POST", body: formData },
      );

      if (response.ok) {
        setMessage("Tombol kontak baru berhasil disimpan.");
        setNewKontakJenis("");
        setNewKontakIsi("");
        setNewKontakTautan("");
        refetch();
      } else {
        setMessage("Gagal menyimpan tombol kontak baru.");
        console.error(await response.json());
      }
    } catch (err) {
      console.error(err);
      setMessage("Gagal menyimpan UMKM.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUmkm = async (id: number) => {
    setLoading(true);
    setMessage("");

    if (
      namaUmkmBaru.trim() === "" &&
      deskripsiUmkmBaru.trim() === "" &&
      dusunUmkmBaru === "" &&
      !newUmkmFoto
    ) {
      setMessage("Isi setidaknya satu bidang untuk diperbarui.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    if (namaUmkmBaru.trim() !== "") {
      formData.append("nama", namaUmkmBaru);
    }
    if (deskripsiUmkmBaru.trim() !== "") {
      formData.append("deskripsi", deskripsiUmkmBaru);
    }
    if (dusunUmkmBaru !== "") {
      formData.append("dusun_id", String(dusunUmkmBaru));
    }
    if (newUmkmFoto) {
      formData.append("foto", newUmkmFoto);
    }

    try {
      const response = await authFetch(
        serverApi.patch.umkm(id),
        { method: "PATCH", body: formData },
      );

      if (response.ok) {
        setMessage("Data UMKM berhasil diperbarui.");
        setNamaUmkmBaru("");
        setDeskripsiUmkmBaru("");
        setDusunUmkmBaru("");
        setNewUmkmFoto(null);
        refetch();
      } else {
        setMessage("Gagal memperbarui data UMKM.");
        console.error(await response.json());
      }
    } catch (err) {
      console.error(err);
      setMessage("Gagal memperbarui data UMKM.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Primitive>
      <div className="flex flex-col gap-8 px-32">
        {data && (
          <div className="bg-amber-300 p-8 rounded-3xl flow-root">
            <img
              src={serverApi.get.umkm.photo(`${data.umkm_id}?cb=${Date.now()}`)}
              alt={`Gambar UMKM dengan ID ${data.umkm_id}`}
              className="h-max w-max max-h-128 max-w-1/2 float-left mr-4 rounded-2xl"
              onError={(e) => {
                e.currentTarget.src = "/tidak-ada-gambar-box.png";
                e.currentTarget.onerror = null;
              }}
            />
            <div className="flex flex-col gap-4">
              <Link to="/wisata">
                <Button variant="black" className="w-max">Kembali</Button>
              </Link>
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
              </ul>
              {isLoggedIn && (
                <>
                  <div className="border-3 rounded-2xl p-4 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">
                      Tambah Tombol Tautan Baru
                    </h2>
                    <TextInput
                      label="Jenis"
                      name={`jenis-kontak-baru`}
                      id={`jenis-kontak-baru`}
                      value={newKontakJenis}
                      onChangeHandler={(e) => setNewKontakJenis(e.target.value)}
                      placeholder="WhatsApp, Instagram, dll."
                    />
                    <TextInput
                      label="Isi"
                      name={`isi-kontak-baru`}
                      id={`isi-kontak-baru`}
                      value={newKontakIsi}
                      onChangeHandler={(e) => setNewKontakIsi(e.target.value)}
                      placeholder="Nama tampilan / nomor"
                    />
                    <TextInput
                      label="Tautan"
                      name={`tautan-kontak-baru`}
                      id={`tautan-kontak-baru`}
                      value={newKontakTautan}
                      onChangeHandler={(e) =>
                        setNewKontakTautan(e.target.value)}
                      placeholder="https://wa.me/..."
                    />
                    <Button
                      variant="black"
                      disabled={loading}
                      onClick={async () => {
                        if (!data) return;
                        await handleAddKontak(data.umkm_id);
                      }}
                    >
                      {loading ? "Mohon ditunggu..." : "Tambah Tombol"}
                    </Button>
                  </div>
                  <div className="border-3 rounded-2xl p-4 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">
                      Perbarui Data UMKM
                    </h2>
                    <TextInput
                      label="Nama UMKM"
                      name={`nama-umkm-baru`}
                      id={`nama-umkm-baru`}
                      value={namaUmkmBaru}
                      onChangeHandler={(e) => setNamaUmkmBaru(e.target.value)}
                      placeholder="Kerupuk Ibu Ninik"
                    />
                    <TextInput
                      label="Deskripsi Singkat"
                      name={`deskripsi-singkat-umkm-baru`}
                      id={`deskripsi-singkat-umkm-baru`}
                      value={deskripsiUmkmBaru}
                      onChangeHandler={(e) =>
                        setDeskripsiUmkmBaru(e.target.value)}
                      placeholder="Kerupuk Ceriping"
                    />
                    {namaDusun && (
                      <DropdownInput
                        label="Dusun"
                        name="selected-dusun"
                        id="selected-dusun"
                        value={dusunUmkmBaru}
                        options={namaDusun}
                        getId={(dusun) => dusun.dusun_id}
                        getLabel={(dusun) => dusun.nama}
                        onChangeHandler={setDusunUmkmBaru}
                        placeholder="Pilih Dusun"
                      />
                    )}
                    <OneFileInput
                      label="Ubah Foto UMKM"
                      name="foto-umkm-baru"
                      id="foto-umkm-baru"
                      onChangeHandler={(
                        e: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        const file = e.target.files?.[0];
                        if (file) setNewUmkmFoto(file);
                        else setNewUmkmFoto(null);
                      }}
                      accept="*.jpg,*.jpeg,*.png"
                      fileName={newUmkmFoto?.name}
                      placeholder="png, jpg, jpeg"
                    />
                    <Button
                      variant="black"
                      disabled={loading}
                      onClick={async () => {
                        if (!data) return;
                        await handleUpdateUmkm(data.umkm_id);
                      }}
                    >
                      {loading ? "Mohon ditunggu..." : "Perbarui"}
                    </Button>
                  </div>
                </>
              )}
              {isLoggedIn && message !== "" && (
                <p className="font-bold">{message}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </Primitive>
  );
};

export default Umkm;
