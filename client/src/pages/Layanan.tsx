import Primitive from "../components/reusable/Primitive.tsx";
import RoundedSection from "../components/reusable/RoundedSection.tsx";
import { serverApi } from "../helpers/serverApi.ts";
import useFetch from "../hooks/useFetch.tsx";
import type { PelayananDetail } from "../types/Pelayanan.d.ts";

const Layanan = () => {
  const { data: pelayananList } = useFetch<PelayananDetail>(
    serverApi.get.pelayanan.all(),
  );

  return (
    <Primitive>
      <div className="flex flex-col gap-8 items-center">
        {pelayananList?.map((pelayanan) => (
          <RoundedSection
            key={pelayanan.pelayanan_id}
            title={pelayanan.judul}
            titleClassName="max-w-7/8"
          >
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
