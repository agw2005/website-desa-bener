import { createBrowserRouter, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/Home.tsx";
import Profil from "./pages/Profil.tsx";
import Data from "./pages/Data.tsx";
import Layanan from "./pages/Layanan.tsx";
import Pengumuman from "./pages/Pengumuman.tsx";
import Wisata from "./pages/Wisata.tsx";
import Kontak from "./pages/Kontak.tsx";
import Kalender from "./pages/Kalender.tsx";
import Login from "./pages/Login.tsx";
import { loginLoader } from "./helpers/loginLoader.ts";
import Manajemen from "./pages/Manajemen.tsx";
import { manajemenLoader } from "./helpers/manajemenLoader.ts";
import Artikel from "./pages/Artikel.tsx";
import Umkm from "./pages/Umkm.tsx";
import RootErrorBoundary from "./pages/RootErrorBoundary.tsx";

const router = createBrowserRouter([
  { path: "/", ErrorBoundary: RootErrorBoundary, element: <Home /> },
  { path: "/profil", ErrorBoundary: RootErrorBoundary, element: <Profil /> },
  { path: "/data", ErrorBoundary: RootErrorBoundary, element: <Data /> },
  { path: "/layanan", ErrorBoundary: RootErrorBoundary, element: <Layanan /> },
  {
    path: "/pengumuman",
    ErrorBoundary: RootErrorBoundary,
    element: <Pengumuman />,
  },
  { path: "/wisata", ErrorBoundary: RootErrorBoundary, element: <Wisata /> },
  { path: "/kontak", ErrorBoundary: RootErrorBoundary, element: <Kontak /> },
  {
    path: "/kalender",
    ErrorBoundary: RootErrorBoundary,
    element: <Kalender />,
  },
  {
    path: "/manajemen",
    ErrorBoundary: RootErrorBoundary,
    element: <Manajemen />,
    loader: manajemenLoader,
  },
  {
    path: "/login",
    ErrorBoundary: RootErrorBoundary,
    element: <Login />,
    loader: loginLoader,
  },
  {
    path: "/pengumuman/:id",
    ErrorBoundary: RootErrorBoundary,
    element: <Artikel />,
  },
  { path: "/umkm/:id", ErrorBoundary: RootErrorBoundary, element: <Umkm /> },
  { path: "/umkm", loader: () => redirect("/wisata") },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
