import { useState } from "react";
import Button from "../components/reusable/Button.tsx";
import OneFileInput from "../components/reusable/inputs/OneFileInput.tsx";
import Primitive from "../components/reusable/Primitive.tsx";
import RoundedSection from "../components/reusable/RoundedSection.tsx";

const Layanan = () => {
  const [scanKtpSkck, setScanKtpSkck] = useState<File | null>(null);
  const [scanKkSkck, setScanKkSkck] = useState<File | null>(null);
  const [scanPasFotoSkck, setScanPasFotoSkck] = useState<File | null>(null);

  const [scanKtpSkk, setScanKtpSkk] = useState<File | null>(null);
  const [scanKkSkk, setScanKkSkk] = useState<File | null>(null);
  const [scanPasFotoSkk, setScanPasFotoSkk] = useState<File | null>(null);

  const [scanKtpSkkep, setScanKtpSkkep] = useState<File | null>(null);
  const [scanKkSkkep, setScanKkSkkep] = useState<File | null>(null);
  const [scanPasFotoSkkep, setScanPasFotoSkkep] = useState<File | null>(null);

  const [scanKtpSkp, setScanKtpSkp] = useState<File | null>(null);
  const [scanKkSkp, setScanKkSkp] = useState<File | null>(null);
  const [scanPasFotoSkp, setScanPasFotoSkp] = useState<File | null>(null);

  return (
    <Primitive>
      <div className="flex flex-col gap-8 px-32">
        <RoundedSection title="Status Pelayanan">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius fugiat
          itaque quae nobis voluptas, dignissimos neque, quas ab autem eaque
          culpa. Sapiente nulla aliquam voluptatibus architecto, labore ratione
          non consequuntur!
        </RoundedSection>
        <div className="flex gap-8">
          <RoundedSection title="Surat Pengantar SKCK">
            <form className="flex flex-col gap-4">
              <OneFileInput
                label="Scan KTP"
                name="scan-ktp-skck"
                id="scan-ktp-skck"
                fileName={scanKtpSkck?.name}
                onChangeHandler={(e) => {
                  const selected = e.target.files?.[0] ?? null;
                  setScanKtpSkck(selected);
                }}
              />
              <OneFileInput
                label="Scan KK"
                name="scan-kk-skck"
                id="scan-kk-skck"
                fileName={scanKkSkck?.name}
                onChangeHandler={(e) => {
                  const selected = e.target.files?.[0] ?? null;
                  setScanKkSkck(selected);
                }}
              />
              <OneFileInput
                label="Scan Pas Foto"
                name="scan-pas-foto-skck"
                id="scan-pas-foto-skck"
                fileName={scanPasFotoSkck?.name}
                onChangeHandler={(e) => {
                  const selected = e.target.files?.[0] ?? null;
                  setScanPasFotoSkck(selected);
                }}
              />
              <Button variant="black">Unggah</Button>
            </form>
          </RoundedSection>
          <RoundedSection title="Surat Keterangan Kelahiran/Kematian">
            <form className="flex flex-col gap-4">
              <OneFileInput
                label="Scan KTP"
                name="scan-ktp-skk"
                id="scan-ktp-skk"
                fileName={scanKtpSkk?.name}
                onChangeHandler={(e) => {
                  const selected = e.target.files?.[0] ?? null;
                  setScanKtpSkk(selected);
                }}
              />
              <OneFileInput
                label="Scan KK"
                name="scan-kk-skk"
                id="scan-kk-skk"
                fileName={scanKkSkk?.name}
                onChangeHandler={(e) => {
                  const selected = e.target.files?.[0] ?? null;
                  setScanKkSkk(selected);
                }}
              />
              <OneFileInput
                label="Scan Pas Foto"
                name="scan-pas-foto-skk"
                id="scan-pas-foto-skk"
                fileName={scanPasFotoSkk?.name}
                onChangeHandler={(e) => {
                  const selected = e.target.files?.[0] ?? null;
                  setScanPasFotoSkk(selected);
                }}
              />
              <Button variant="black">Unggah</Button>
            </form>
          </RoundedSection>
        </div>
        <div className="flex gap-8">
          <RoundedSection title="Surat Keterangan Kependudukan">
            <form className="flex flex-col gap-4">
              <OneFileInput
                label="Scan KTP"
                name="scan-ktp-skkep"
                id="scan-ktp-skkep"
                fileName={scanKtpSkkep?.name}
                onChangeHandler={(e) => {
                  const selected = e.target.files?.[0] ?? null;
                  setScanKtpSkkep(selected);
                }}
              />
              <OneFileInput
                label="Scan KK"
                name="scan-kk-skkep"
                id="scan-kk-skkep"
                fileName={scanKkSkkep?.name}
                onChangeHandler={(e) => {
                  const selected = e.target.files?.[0] ?? null;
                  setScanKkSkkep(selected);
                }}
              />
              <OneFileInput
                label="Scan Pas Foto"
                name="scan-pas-foto-skkep"
                id="scan-pas-foto-skkep"
                fileName={scanPasFotoSkkep?.name}
                onChangeHandler={(e) => {
                  const selected = e.target.files?.[0] ?? null;
                  setScanPasFotoSkkep(selected);
                }}
              />
              <Button variant="black">Unggah</Button>
            </form>
          </RoundedSection>
          <RoundedSection title="Surat Keterangan Pindah">
            <form className="flex flex-col gap-4">
              <OneFileInput
                label="Scan KTP"
                name="scan-ktp-skp"
                id="scan-ktp-skp"
                fileName={scanKtpSkp?.name}
                onChangeHandler={(e) => {
                  const selected = e.target.files?.[0] ?? null;
                  setScanKtpSkp(selected);
                }}
              />
              <OneFileInput
                label="Scan KK"
                name="scan-kk-skp"
                id="scan-kk-skp"
                fileName={scanKkSkp?.name}
                onChangeHandler={(e) => {
                  const selected = e.target.files?.[0] ?? null;
                  setScanKkSkp(selected);
                }}
              />
              <OneFileInput
                label="Scan Pas Foto"
                name="scan-pas-foto-skp"
                id="scan-pas-foto-skp"
                fileName={scanPasFotoSkp?.name}
                onChangeHandler={(e) => {
                  const selected = e.target.files?.[0] ?? null;
                  setScanPasFotoSkp(selected);
                }}
              />
              <Button variant="black">Unggah</Button>
            </form>
          </RoundedSection>
        </div>
      </div>
    </Primitive>
  );
};

export default Layanan;
