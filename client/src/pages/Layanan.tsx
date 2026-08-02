import Primitive from "../components/reusable/Primitive.tsx";
import RoundedSection from "../components/reusable/RoundedSection.tsx";
import useFetch from "../hooks/useFetch.tsx";
import type { PelayananDetail } from "../types/Pelayanan.d.ts";

const Layanan = () => {
  const { data: pelayananList } = useFetch<PelayananDetail>(
    `http://${globalThis.location.hostname}:8000/pelayanan/lengkap`,
  );

  return (
    <Primitive>
      <div className="grid grid-cols-3 gap-8 px-32">
        {pelayananList?.map((pelayanan) => (
          <RoundedSection key={pelayanan.pelayanan_id} title={pelayanan.judul}>
            {pelayanan.syarat.length > 0
              ? (
                <ol>
                  {pelayanan.syarat.map((s, i) => (
                    <li key={s.syarat_pelayanan_id} className="flex gap-2">
                      {s.tautan
                        ? (
                          <>
                            <span className="shrink-0 text-right">
                              {i + 1}.
                            </span>
                            <span>
                              <a
                                href={s.tautan}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-800 hover:text-blue-950 underline"
                              >
                                {s.isi}
                              </a>
                            </span>
                          </>
                        )
                        : (
                          <>
                            <span className="shrink-0 text-right">
                              {i + 1}.
                            </span>
                            <span>{s.isi}</span>
                          </>
                        )}
                    </li>
                  ))}
                </ol>
              )
              : (
                <p className="text-gray-600">
                  Belum ada syarat untuk pelayanan ini.
                </p>
              )}
          </RoundedSection>
        ))}

        {pelayananList && pelayananList.length === 0 && (
          <p className="col-span-3 text-center text-gray-500">
            Belum ada informasi pelayanan.
          </p>
        )}
      </div>
    </Primitive>
  );
};

export default Layanan;
