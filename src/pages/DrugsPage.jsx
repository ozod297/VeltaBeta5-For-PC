import { useState, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { translations } from "../i18n";
import { drugs, saveDrugImage, removeDrugImage, getDrugImages } from "../data";
import DrugCard from "../components/DrugCard";
import SEO from "../components/SEO";

const CATS = ["all","painkillers","antibiotics","vitamins","cardio","allergy","gastro"];

export default function DrugsPage() {
  const { lang } = useApp();
  const t = translations[lang].products;
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState(searchParams.get("cat") || "all");
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editDrug, setEditDrug] = useState(null);
  const [imgMap, setImgMap] = useState(getDrugImages);
  const fileRef = useRef();

  const filtered = useMemo(() => drugs.filter(d => {
    const mc = active === "all" || d.category === active;
    const q = search.toLowerCase();
    const ms = !q || d.name.toLowerCase().includes(q) || (d.tagUz||"").toLowerCase().includes(q) || (d.tagRu||"").toLowerCase().includes(q);
    return mc && ms;
  }), [active, search]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || !editDrug) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      saveDrugImage(editDrug.id, ev.target.result);
      setImgMap(getDrugImages());
      setEditDrug(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (drugId) => {
    removeDrugImage(drugId);
    setImgMap(getDrugImages());
  };

  return (
    <>
      <SEO
        title={lang === "uz" ? "Dorilar katalogi" : "Каталог препаратов"}
        description={lang === "uz" ? "Velta dorilar katalogi — 150+ sifatli farmatsevtika mahsulotlari. Kategoriya va nom bo'yicha qidiring." : "Каталог препаратов Velta — 150+ качественных фармацевтических продуктов."}
        keywords="dori katalogi, farmatsevtika uzbekistan, paracetamol, ibuprofen, antibiotik, vitamin, velta"
        url="/drugs"
      />

      {/* Header */}
      <div style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)", padding: "44px 0 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
            <div>
              <span className="pill" style={{ marginBottom: 10, display: "inline-flex" }}>{t.badge}</span>
              <h1 className="font-display" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "var(--text1)" }}>{t.title}</h1>
            </div>
            {/* <button
              onClick={() => setEditMode(!editMode)}
              className={`btn ${editMode ? "btn-accent" : "btn-ghost"}`}
              style={{ alignSelf: "flex-end" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              {editMode ? (lang === "uz" ? "Tahrirlash yoqilgan" : "Редактирование вкл.") : (lang === "uz" ? "Rasm qo'shish" : "Добавить фото")}
            </button> */}
          </div>

          {editMode && (
            <div style={{ background: "rgba(59,130,246,0.06)", border: "1.5px solid rgba(59,130,246,0.2)", borderRadius: 12, padding: "14px 18px", marginBottom: 20, fontSize: "0.84rem", color: "var(--accent)", display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {lang === "uz" ? "Dori rasmini o'zgartirish uchun kartochkadagi kamera tugmasini bosing." : "Нажмите кнопку камеры на карточке, чтобы изменить фото препарата."}
            </div>
          )}

          {/* Search */}
          <div style={{ maxWidth: 440, marginBottom: 24, position: "relative" }}>
            <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text3)", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input className="input" style={{ paddingLeft: 44 }} placeholder={lang === "uz" ? "Dori nomini qidiring..." : "Поиск препарата..."} value={search} onChange={e => setSearch(e.target.value)}/>
          </div>

          {/* Category tabs */}
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 1, scrollbarWidth: "none" }}>
            {CATS.map((cat, i) => (
              <button key={cat} className={`filter-tab ${active === cat ? "active" : ""}`} onClick={() => setActive(cat)}>
                {t.categories[i]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container" style={{ paddingTop: 36, paddingBottom: 60 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--text3)" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: 14, opacity: 0.35 }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <p>{lang === "uz" ? "Hech narsa topilmadi" : "Ничего не найдено"}</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 16 }}>
            {filtered.map(drug => (
              <div key={drug.id} style={{ position: "relative" }}>
                <DrugCard drug={drug}/>
                {editMode && (
                  <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6, zIndex: 10 }}>
                    <button
                      onClick={() => { setEditDrug(drug); fileRef.current.click(); }}
                      style={{ width: 30, height: 30, borderRadius: 8, background: "var(--accent)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white", boxShadow: "0 2px 8px rgba(59,130,246,0.4)" }}
                      title={lang === "uz" ? "Rasm qo'shish" : "Добавить фото"}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                    </button>
                    {imgMap[drug.id] && (
                      <button
                        onClick={() => handleRemove(drug.id)}
                        style={{ width: 30, height: 30, borderRadius: 8, background: "#ef4444", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}
                        title={lang === "uz" ? "Rasmni o'chirish" : "Удалить фото"}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange}/>
    </>
  );
}
