import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import StocuriPage from "./pages/StocuriPage.jsx";
import HartaPage from "./pages/HartaPage.jsx";
import ProdusDetaliuPage from "./pages/ProdusDetaliuPage.jsx";
import DesprePage from "./pages/DesprePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<StocuriPage />} />
        <Route path="/harta" element={<HartaPage />} />
        <Route path="/stocuri/:id" element={<ProdusDetaliuPage />} />
        <Route path="/despre" element={<DesprePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}