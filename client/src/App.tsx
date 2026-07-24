import { createBrowserRouter } from "react-router";
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

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/profil", element: <Profil /> },
  { path: "/data", element: <Data /> },
  { path: "/layanan", element: <Layanan /> },
  { path: "/pengumuman", element: <Pengumuman /> },
  { path: "/wisata", element: <Wisata /> },
  { path: "/kontak", element: <Kontak /> },
  { path: "/kalender", element: <Kalender /> },
  { path: "/login", element: <Login />, loader: loginLoader },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
