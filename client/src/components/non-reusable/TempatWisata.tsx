import React, { useState } from "react";
import RoundedSection from "../reusable/RoundedSection.tsx";
import TextInput from "../reusable/inputs/TextInput.tsx";
import OneFileInput from "../reusable/inputs/OneFileInput.tsx";
import Button from "../reusable/Button.tsx";
import type { Wisata } from "../../types/Wisata.d.ts";
import useFetch from "../../hooks/useFetch.tsx";
import { authFetch } from "../../helpers/authFetch.ts";
import { serverApi } from "../../helpers/serverApi.ts";
import Carousel from "../reusable/Carousel.tsx";
import Card from "../reusable/Card.tsx";

interface TempatWisataProps {
  isLoggedIn: boolean;
}

const TempatWisata = ({ isLoggedIn }: TempatWisataProps) => {
  const [inputNamaTempatWisata, setInputNamaTempatWisata] = useState("");
  const [inputDeskripsiTempatWisata, setInputDeskripsiTempatWisata] = useState(
    "",
  );
  const [inputFotoTempatWisata, setInputFotoTempatWisata] = useState<
    File | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [wisataPostMessage, setWisataPostMessage] = useState("");

  const {
    data: wisata,
    refetch: refetchWisata,
  } = useFetch<Omit<Wisata, "foto">>(
    serverApi.get.wisata.all(),
  );

  const handleDeleteWisata = async (id: number) => {
    const response = await authFetch(
      serverApi.delete.wisata(id),
      { method: "DELETE" },
    );
    if (!response.ok) console.error(await response.json());
    refetchWisata();
  };

  const handleAddTempatWisata = async () => {
    setIsLoading(true);
    setWisataPostMessage(null);

    if (
      inputNamaTempatWisata.trim() === "" ||
      inputDeskripsiTempatWisata.trim() === "" ||
      inputFotoTempatWisata === null
    ) {
      setWisataPostMessage("Nama, Deskripsi, dan Foto perlu diisi");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("nama", inputNamaTempatWisata);
    formData.append("deskripsi", inputDeskripsiTempatWisata);
    formData.append("foto", inputFotoTempatWisata);

    try {
      const response = await authFetch(
        serverApi.post.wisata(),
        { method: "POST", body: formData },
      );

      if (response.ok) {
        setWisataPostMessage("Tempat wisata berhasil disimpan.");
        setInputFotoTempatWisata(null);
        setInputNamaTempatWisata("");
        setInputDeskripsiTempatWisata("");
        refetchWisata();
      } else {
        setWisataPostMessage("Gagal menyimpan tempat wisata.");
        console.error(await response.json());
      }
    } catch (err) {
      console.error(err);
      setWisataPostMessage("Gagal menyimpan tempat wisata.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RoundedSection
      title="TEMPAT WISATA"
      contentClassName="flex flex-col gap-8"
    >
      {wisata && (
        <Carousel cardWidthClassName="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
          {wisata.map((w) => (
            <Card
              key={w.wisata_id}
              image={serverApi.get.wisata.photo(w.wisata_id)}
              alt={w.deskripsi}
              title={w.nama}
              aspect="box"
            >
              <p>{w.deskripsi}</p>
              {isLoggedIn && (
                <Button
                  className="mt-auto"
                  variant="red"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteWisata(w.wisata_id);
                  }}
                >
                  Hapus
                </Button>
              )}
            </Card>
          ))}
        </Carousel>
      )}
      {isLoggedIn && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-xl">TAMBAH TEMPAT WISATA BARU</h2>
          <TextInput
            label="Nama"
            name="nama-tempat-wisata-baru"
            id="nama-tempat-wisata-baru"
            value={inputNamaTempatWisata}
            onChangeHandler={(e) => {
              setInputNamaTempatWisata(e.target.value);
            }}
            placeholder="Pondok Al-Manar"
          />
          <TextInput
            label="Deskripsi Pendek"
            name="deskripsi-tempat-wisata-baru"
            id="deskripsi-tempat-wisata-baru"
            value={inputDeskripsiTempatWisata}
            onChangeHandler={(e) => {
              setInputDeskripsiTempatWisata(e.target.value);
            }}
            placeholder="Pondok Pesantren"
          />
          <OneFileInput
            label="Foto"
            name="foto-tempat-wisata-baru"
            id="foto-tempat-wisata-baru"
            onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) setInputFotoTempatWisata(file);
              else setInputFotoTempatWisata(null);
            }}
            accept="*.jpg,*.jpeg,*.png"
            fileName={inputFotoTempatWisata?.name}
            placeholder="png, jpg, jpeg"
          />
          <div className="flex gap-4 items-center">
            <Button
              variant="black"
              onClick={handleAddTempatWisata}
              disabled={isLoading}
              className="w-max"
            >
              {isLoading ? "Mohon ditunggu..." : "Tambah Tempat Wisata Baru"}
            </Button>
            {wisataPostMessage && (
              <p className="font-semibold">{wisataPostMessage}</p>
            )}
          </div>
        </div>
      )}
    </RoundedSection>
  );
};

export default TempatWisata;
