import { BrowserRouter, Routes, Route, ScrollRestoration } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import DrugsPage from "./pages/DrugsPage";
import DrugDetailPage from "./pages/DrugDetailPage";
import CompanyPage from "./pages/CompanyPage";
import NewsPage from "./pages/NewsPage";
import PartnersPage from "./pages/PartnersPage";
import ContactPage from "./pages/ContactPage";
import "./index.css";

function Layout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar/>
      <main style={{ flex: 1 }}>{children}</main>
      <Footer/>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/drugs" element={<DrugsPage/>}/>
            <Route path="/drugs/:slug" element={<DrugDetailPage/>}/>
            <Route path="/company" element={<CompanyPage/>}/>
            <Route path="/news" element={<NewsPage/>}/>
            <Route path="/partners" element={<PartnersPage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
