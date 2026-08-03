import Primitive from "../components/reusable/Primitive.tsx";
import { useNavigate, useParams } from "react-router";
import useArticle from "../hooks/useArticle.tsx";
import { dateToText } from "../helpers/dateToText.ts";
import Button from "../components/reusable/Button.tsx";
import useAuth from "../hooks/useAuth.tsx";
import { authFetch } from "../helpers/authFetch.ts";
import { serverApi } from "../helpers/serverApi.ts";

const Artikel = () => {
  const { isLoggedIn } = useAuth();
  const params = useParams();
  const { data } = useArticle(Number(params.id));
  const nav = useNavigate();

  console.log(data);

  return (
    <Primitive>
      {data && (
        <div className="flex justify-center">
          <div className="flex flex-col gap-4 bg-amber-400 rounded-2xl p-8 max-w-4xl">
            <img
              className="rounded-2xl"
              src={serverApi.get.artikel.thumbnail(data.artikel_id)}
              alt={`thumbnail-artikel-${data.artikel_id}`}
              onError={(e) => {
                e.currentTarget.src = "/tidak-ada-gambar-box.png";
                e.currentTarget.onerror = null;
              }}
            />
            <h2 className="font-bold text-4xl">{data.judul}</h2>
            {data.labels.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.labels.map((l) => (
                  <span
                    key={l.label_id}
                    className="flex items-center gap-2 border border-black bg-black text-white rounded-full px-3 py-1 text-sm select-none"
                  >
                    {l.nama}
                  </span>
                ))}
              </div>
            )}
            <h3 className="text-black hover:text-blue-900 active:text-blue-800 | text-xs">
              {dateToText(new Date(data.waktu_upload * 1000))}
            </h3>
            <p className="text-justify whitespace-pre-line">
              {data.isi}
            </p>
            <h3 className="font-bold text-3xl">Lampiran</h3>
            {data.lampiran.map((l) => {
              return (
                <img
                  key={l.lampiran_artikel_id}
                  className="rounded-2xl"
                  src={serverApi.get.artikel.attachment(l.lampiran_artikel_id)}
                  alt={`thumbnail-artikel-${l.lampiran_artikel_id}`}
                  onError={(e) => {
                    e.currentTarget.src = "/tidak-ada-gambar-box.png";
                    e.currentTarget.onerror = null;
                  }}
                />
              );
            })}
            {isLoggedIn && (
              <Button
                variant="red"
                onClick={async () => {
                  await authFetch(
                    serverApi.delete.artikel(data.artikel_id),
                    { method: "DELETE" },
                  );
                  nav("/pengumuman");
                }}
              >
                Hapus Artikel
              </Button>
            )}
          </div>
        </div>
      )}
    </Primitive>
  );
};

export default Artikel;
