import Primitive from "../components/reusable/Primitive.tsx";
import useFetch from "../hooks/useFetch.tsx";
import type { Profil } from "../types/Profil.d.ts";

const Kalender = () => {
  const { data: tautanKalender } = useFetch<Pick<Profil, "tautan_kalender">>(
    `http://${globalThis.location.hostname}:8000/profil/kalender`,
  );

  return (
    <Primitive>
      <div className="flex w-view h-256">
        {tautanKalender && tautanKalender.length > 0 && (
          <iframe
            className="w-full"
            // 1. Added src=
            // 2. Wrapped the value in encodeURIComponent()
            src={`https://calendar.google.com/calendar/embed?src=${
              encodeURIComponent(
                tautanKalender[0]?.tautan_kalender,
              )
            }&ctz=Asia/Jakarta`}
          >
          </iframe>
        )}
      </div>
    </Primitive>
  );
};

export default Kalender;
