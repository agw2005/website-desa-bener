import Primitive from "../components/reusable/Primitive.tsx";
import { serverApi } from "../helpers/serverApi.ts";
import useFetch from "../hooks/useFetch.tsx";
import type { Profil } from "../types/Profil.d.ts";

const Kalender = () => {
  const { data: tautanKalender } = useFetch<Pick<Profil, "tautan_kalender">>(
    serverApi.get.profil.calendar(),
  );

  const kalenderId = tautanKalender?.[0]?.tautan_kalender;
  const hasValidKalender = typeof kalenderId === "string" &&
    kalenderId.trim() !== "";

  return (
    <Primitive>
      <div className="flex w-view h-256">
        {hasValidKalender
          ? (
            <iframe
              className="w-full"
              src={`https://calendar.google.com/calendar/embed?src=${
                encodeURIComponent(kalenderId)
              }&ctz=Asia/Jakarta`}
            >
            </iframe>
          )
          : (
            <div className="flex flex-col items-center justify-center gap-4 w-full text-center px-8">
              <h2 className="text-2xl font-bold">Kalender Belum Tersedia</h2>
              <p className="text-gray-600 max-w-md">
                Kalender kegiatan desa belum diatur oleh admin. Silakan hubungi
                perangkat desa untuk informasi jadwal kegiatan.
              </p>
            </div>
          )}
      </div>
    </Primitive>
  );
};

export default Kalender;
