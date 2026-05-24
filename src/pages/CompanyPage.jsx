import { useApp } from "../context/AppContext";
import { translations } from "../i18n";
import { certifications } from "../data";
import SEO from "../components/SEO";

const timeline = [
  { year: "2020", uz: "Velta kompaniyasi Samarqandda tashkil etildi", ru: "Компания Velta основана в Самарканде" },
  { year: "2021", uz: "GMP sertifikati olindi, birinchi mahsulotlar chiqarildi", ru: "Получен GMP, выпущены первые продукты" },
  { year: "2022", uz: "ISO 9001 sertifikati, Toshkentda ofis ochildi", ru: "ISO 9001, открыт офис в Ташкенте" },
  { year: "2023", uz: "150+ nomenklatura, 2M+ mijozga xizmat", ru: "150+ номенклатура, 2М+ клиентов" },
  { year: "2024", uz: "ISO 13485 sertifikati olindi", ru: "Получен сертификат ISO 13485" },
  { year: "2026", uz: "WHO-PQ prekvlifikatsiyasi muvaffaqiyatli olindi", ru: "Успешно получена преквалификация ВОЗ" },
];

const team = [
  { a: "UA", bg: "#3b82f6", uz: "Umarova Olesya", ru: "Умарова Олеся", rUz: "Bosh direktor", rRu: "Генеральный директор" },
  { a: "YS", bg: "#10b981", uz: "Yuldasheva Soliya", ru: "Юлдашева Солия", rUz: "Menejer", rRu: "Менеджер" },
  { a: "SM", bg: "#f59e0b", uz: "Safoyeva Mavzuna", ru: "Сафоева Мавзуна", rUz: "Menejer", rRu: "Менеджер" },
  { a: "RS", bg: "#8b5cf6", uz: "Raximova Sevara", ru: "Рахимова Севара", rUz: "Menejer", rRu: "Менеджер" },
  { a: "GO", bg: "#06b6d4", uz: "Ganiyeva Oliya", ru: "Ганиева Олия", rUz: "Menejer", rRu: "Менеджер" },
  { a: "ZH", bg: "#ef4444", uz: "", ru: "Зульфия Хасанова", rUz: "Menejer", rRu: "Менеджер" },
];

export default function CompanyPage() {
  const { lang } = useApp();
  const t = translations[lang].companyPage;
  const tc = translations[lang].certs;

  return (
    <>
      <SEO
        title={lang === "uz" ? "Kompaniya haqida" : "О компании"}
        description={lang === "uz" ? "Velta Pharmaceutical — 2020-yildan O'zbekistonda sifatli dori ishlab chiqaruvchi kompaniya. GMP, ISO 9001, ISO 13485, WHO-PQ sertifikatlari." : "Velta Pharmaceutical — производитель качественных лекарств в Узбекистане с 2020 года. GMP, ISO 9001, ISO 13485, WHO-PQ."}
        url="/company"
      />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2d5282 100%)", padding: "80px 0 64px", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(244,196,48,0.06)" }}/>
        <div className="container">
          <span className="pill" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", marginBottom: 16, display: "inline-flex" }}>{t.badge}</span>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", color: "white", fontWeight: 600, maxWidth: 600 }}>{t.title}</h1>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-sm" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ background: "var(--bg2)", borderRadius: 18, padding: 36, border: "1px solid var(--border)" }}>
              <span className="pill" style={{ marginBottom: 16, display: "inline-flex" }}>{t.missionBadge}</span>
              <p style={{ fontSize: "1.08rem", fontWeight: 700, color: "var(--text1)", lineHeight: 1.65,  }}>{t.mission}</p>
            </div>
            <div style={{ background: "linear-gradient(135deg,#1e3a5f,#2d5282)", borderRadius: 18, padding: 36 }}>
              <span className="pill" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", marginBottom: 16, display: "inline-flex" }}>{t.vision}</span>
              <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "rgba(255,255,255,0.9)", lineHeight: 1.65 }}>{t.visionText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-sm" style={{ background: "var(--bg2)" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <span className="pill" style={{ marginBottom: 12, display: "inline-flex" }}>{t.history}</span>
          <h2 className="font-display" style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", color: "var(--text1)", marginBottom: 44 }}>{lang === "uz" ? "Kompaniya tarixi" : "История компании"}</h2>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 85, top: 0, bottom: 0, width: 2, background: "var(--border)" }}/>
            {timeline.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 28, paddingBottom: 30, position: "relative" }}>
                <div style={{ width: 86, textAlign: "right", paddingTop: 2, flexShrink: 0 }}>
                  <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--accent)" }}>{item.year}</span>
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ width: 13, height: 13, borderRadius: "50%", background: "var(--accent)", border: "3px solid var(--bg2)", marginTop: 3, marginLeft: -6.5 }}/>
                </div>
                <div style={{ flex: 1, paddingTop: 1 }}>
                  <p style={{ fontSize: "0.9rem", color: "var(--text2)", lineHeight: 1.55 }}>{lang === "uz" ? item.uz : item.ru}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-sm" style={{ background: "var(--bg)" }}>
        <div className="container">
          <span className="pill" style={{ marginBottom: 12, display: "inline-flex" }}>{t.team}</span>
          <h2 className="font-display" style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", color: "var(--text1)", marginBottom: 36 }}>{lang === "uz" ? "Bizning jamoamiz" : "Наша команда"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 18 }}>
            {team.map((m, i) => (
              <div key={i} className="card" style={{ padding: 22, textAlign: "center" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1rem", fontWeight: 700, margin: "0 auto 14px" }}>{m.a}</div>
                <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text1)", marginBottom: 4 }}>{lang === "uz" ? m.uz : m.ru}</div>
                <div style={{ fontSize: "0.74rem", color: "var(--text3)" }}>{lang === "uz" ? m.rUz : m.rRu}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certs */}
      <section style={{ background: "linear-gradient(135deg,#1e3a5f,#2d5282)", padding: "64px 0" }}>
        <div className="container">
          <span className="pill" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", marginBottom: 14, display: "inline-flex" }}>{tc.badge}</span>
          <h2 className="font-display" style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", color: "white", marginBottom: 32 }}>{tc.title}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14 }}>
            {certifications.map(c => (
              <div key={c.id} className="cert-card">
                <div style={{ fontSize: "1.5rem", fontFamily: "'Playfair Display',serif", color: "#93c5fd", marginBottom: 6, fontWeight: 600 }}>{c.name}</div>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "white", marginBottom: 3 }}>{lang === "uz" ? c.fullUz : c.fullRu}</div>
                <div style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.4)" }}>{lang === "uz" ? c.yearUz : c.yearRu}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`@media(max-width:768px){.mv-grid{grid-template-columns:1fr!important}}`}</style>
    </>
  );
}
