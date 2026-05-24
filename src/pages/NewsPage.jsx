import { useApp } from "../context/AppContext";
import { translations } from "../i18n";
import { newsItems } from "../data";
import SEO from "../components/SEO";

export default function NewsPage() {
  const { lang } = useApp();
  const t = translations[lang].newsPage;
  return (
    <>
      <SEO title={lang === "uz" ? "Yangiliklar" : "Новости"} description={lang === "uz" ? "Velta Pharmaceutical so'nggi yangiliklari, yangi mahsulotlar, sertifikatlar va tadbirlar." : "Последние новости Velta Pharmaceutical — новые продукты, сертификаты и мероприятия."} url="/news"/>
      <section style={{ background: "linear-gradient(135deg,#1e3a5f,#2d5282)", padding: "80px 0 60px" }}>
        <div className="container">
          <span className="pill" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", marginBottom: 14, display: "inline-flex" }}>{t.badge}</span>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "white", fontWeight: 600 }}>{t.title}</h1>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
            {newsItems.map(item => (
              <article key={item.id} className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ height: 6, background: item.tagColor === "tag-blue" ? "var(--accent)" : item.tagColor === "tag-green" ? "#10b981" : item.tagColor === "tag-amber" ? "#f59e0b" : "#8b5cf6" }}/>
                <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span className={`tag ${item.tagColor}`}>{item.tag}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text3)" }}>{new Date(item.date).toLocaleDateString(lang === "uz" ? "uz-UZ" : "ru-RU", { year: "numeric", month: "long", day: "numeric" })}</span>
                  </div>
                  <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text1)", lineHeight: 1.4, marginBottom: 10 }}>{lang === "uz" ? item.titleUz : item.titleRu}</h2>
                  <p style={{ fontSize: "0.85rem", color: "var(--text2)", lineHeight: 1.65, flex: 1, marginBottom: 20 }}>{lang === "uz" ? item.excerptUz : item.excerptRu}</p>
                  <button className="btn btn-ghost" style={{ alignSelf: "flex-start", fontSize: "0.8rem" }}>
                    {t.readMore}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
