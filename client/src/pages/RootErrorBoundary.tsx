import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import Primitive from "../components/reusable/Primitive.tsx";
import Button from "../components/reusable/Button.tsx";
import type { ReactNode } from "react";

const PrimitiveError = (
  { title, children }: { title: string; children: ReactNode },
) => {
  return (
    <Primitive>
      <div className="flex justify-center items-center border-3 max-w-7/8 self-center rounded-2xl">
        <img src="/reject.webp" className="w-1/2" alt="Error" />
        <div className="flex flex-col gap-4 mx-4 my-2">
          <h3 className="font-bold text-lg sm:text-4xl">
            {title}
          </h3>
          {children}
          <Link to="/">
            <Button variant="black">Beranda</Button>
          </Link>
        </div>
      </div>
    </Primitive>
  );
};

const RootErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <PrimitiveError title="Tautan Tidak Valid">
        <p>Laman yang anda coba buka tidak ada.</p>
      </PrimitiveError>
    );
  } else if (error instanceof Error) {
    return (
      <PrimitiveError title="Telah terjadi kesalahan">
        <p className="text-blue-900">{error.name}</p>
        <p className="text-red-900">{error.message}</p>
        <p>{error.stack}</p>
      </PrimitiveError>
    );
  } else {
    return (
      <PrimitiveError title="Telah terjadi kesalahan">
        <p>
          Telah terjadi error yang tidak diketahui penyebabnya.
        </p>
      </PrimitiveError>
    );
  }
};

export default RootErrorBoundary;
