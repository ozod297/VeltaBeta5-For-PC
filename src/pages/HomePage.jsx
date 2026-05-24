import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { translations } from "../i18n";
import { drugs, testimonials, certifications } from "../data";
import DrugCard from "../components/DrugCard";
import SEO from "../components/SEO";
import Form from '../components/Form';


function StatCard({ val, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="stat-val">{val}</div>
      <div style={{ fontSize: "0.78rem", color: "var(--text3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div style={{ background: "var(--card)", borderRadius: 14, padding: "22px 20px", border: "1px solid var(--border)", transition: "box-shadow 0.2s" }}
      onMouseOver={e => e.currentTarget.style.boxShadow = "var(--shadow)"}
      onMouseOut={e => e.currentTarget.style.boxShadow = "none"}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(59,130,246,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
        {icon}
      </div>
      <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text1)", marginBottom: 6 }}>{title}</h3>
      <p style={{ fontSize: "0.82rem", color: "var(--text2)", lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

export default function HomePage() {
  const { lang } = useApp();
  const t = translations[lang];

  return (
    <>
      <SEO
        title={lang === "uz" ? "Salomatlik sari ishonchli yo'l" : "Надёжный путь к здоровью"}
        description={lang === "uz" ? "Velta — GMP va ISO sertifikatlangan O'zbekistonning yetakchi farmatsevtika kompaniyasi. 150+ sifatli dori-darmonlar." : "Velta — ведущая фармацевтическая компания Узбекистана с сертификатами GMP и ISO. 150+ качественных препаратов."}
        keywords="velta pharmaceutical, dori uzbekistan, GMP sertifikat, farmatsevtika, paracetamol, ibuprofen, antibiotik"
        url="/"
      />

      {/* ═══ HERO ═══ */}
      <section className="hero-bg" style={{ padding: "90px 0 70px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div className="anim-fade-up">
              <span className="pill pill-green" style={{ marginBottom: 20, display: "inline-flex" }}>
                <svg width="7" height="7" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="4"/></svg>
                {t.hero.badge}
              </span>
              <h1 className="font-display" style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 600, color: "white", lineHeight: 1.12, marginBottom: 20 }}>
                {t.hero.title}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", lineHeight: 1.75, marginBottom: 36, maxWidth: 460 }}>
                {t.hero.subtitle}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link to="/drugs" className="btn btn-white" style={{ textDecoration: "none" }}>
                  {t.hero.catalog}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <Link to="/company" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 22px", borderRadius: 999, border: "1.5px solid rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.82)", fontSize: "0.875rem", fontWeight: 600, transition: "all 0.2s" }}>
                  {t.hero.about}
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            {/* <div className="desktop-only" style={{ display: "flex", justifyContent: "center" }}>
              <div className="anim-float" style={{ position: "relative" }}>
                <div style={{ width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
                    <rect x="8" y="32" width="80" height="32" rx="16" fill="white" opacity="0.9"/>
                    <rect x="8" y="32" width="40" height="32" rx="16" fill="rgba(59,130,246,0.7)"/>
                    <line x1="48" y1="34" x2="48" y2="62" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                {[
                  { top: -20, right: -60, label: "GMP", sub: lang === "uz" ? "Sertifikatlangan" : "Сертифицировано" },
                  { bottom: -10, left: -70, label: lang === "uz" ? "Zavod" : "Завод", sub: "Samarqand" },
                ].map((f, i) => (
                  <div key={i} style={{ position: "absolute", ...{ top: f.top, bottom: f.bottom, right: f.right, left: f.left }, background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 12, padding: "10px 14px", minWidth: 130 }}>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.65rem", marginBottom: 2 }}>{f.label}</p>
                    <p style={{ color: "white", fontSize: "0.82rem", fontWeight: 600 }}>{f.sub}</p>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
        <style>{`@media(max-width:768px){.hero-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ═══ STATS ═══ */}
      <section style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)", padding: "36px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            <StatCard val={t.hero.stats.drugsVal} label={t.hero.stats.drugs}/>
            <StatCard val={t.hero.stats.patientsVal} label={t.hero.stats.patients}/>
            <StatCard val={t.hero.stats.productsVal} label={t.hero.stats.products}/>
            <StatCard val={t.hero.stats.yearsVal} label={t.hero.stats.years}/>
          </div>
        </div>
        <style>{`@media(max-width:600px){.stats-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            {/* Left card */}
            <div style={{ background: "linear-gradient(135deg, var(--navy) 0%, #2d5282 100%)", borderRadius: 24, padding: "44px 36px", color: "white", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(244,196,48,0.08)" }}/>
              <span className="pill" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", marginBottom: 20, display: "inline-flex" }}>{t.about.badge}</span>
              <div style={{ fontSize: "5.5rem", fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.12)", lineHeight: 1, fontWeight: 700 }}>{t.about.year}</div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", marginBottom: 28 }}>{t.about.yearLabel}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: "🏭", label: "Samarqand" },
                  { icon: "🏢", label: "Toshkent" },
                  { icon: "🚚", label: lang === "uz" ? "60+ tarqatish nuqtasi" : "60+ точек дистрибуции" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "10px 14px" }}>
                    <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                    <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.78)" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div>
              <span className="pill" style={{ marginBottom: 14, display: "inline-flex" }}>{t.about.badge}</span>
              <h2 className="font-display" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "var(--text1)", marginBottom: 18, lineHeight: 1.2 }}>{t.about.title}</h2>
              <p style={{ color: "var(--text2)", lineHeight: 1.75, marginBottom: 32, fontSize: "0.95rem" }}>{t.about.desc}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {t.about.features.map((f, i) => (
                  <FeatureCard key={i} title={f.title} desc={f.desc} icon={
                    [
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 10h8M8 14h5"/></svg>,
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>,
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
                    ][i]
                  }/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
            <div>
              <span className="pill" style={{ marginBottom: 10, display: "inline-flex" }}>{t.products.badge}</span>
              <h2 className="font-display" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "var(--text1)" }}>{t.products.title}</h2>
            </div>
            <Link to="/drugs" className="btn btn-ghost" style={{ textDecoration: "none" }}>
              {t.products.viewAll}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 16 }}>
            {drugs.slice(0, 8).map(d => <DrugCard key={d.id} drug={d}/>)}
          </div>
        </div>
      </section>

      {/* ═══ CERTIFICATIONS ═══ */}
      <section style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2d5282 100%)", padding: "80px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="pill" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", marginBottom: 14, display: "inline-flex" }}>{t.certs.badge}</span>
            <h2 className="font-display" style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "white", marginBottom: 12 }}>{t.certs.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto", fontSize: "0.9rem" }}>{t.certs.subtitle}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {certifications.map(c => (
              <div key={c.id} className="cert-card">
                <div style={{ fontSize: "1.6rem", fontFamily: "'Playfair Display',serif", color: "#93c5fd", marginBottom: 8, fontWeight: 600 }}>{c.name}</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "white", marginBottom: 4 }}>{lang === "uz" ? c.fullUz : c.fullRu}</div>
                <div style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.4)" }}>{lang === "uz" ? c.yearUz : c.yearRu}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span className="pill" style={{ marginBottom: 12, display: "inline-flex" }}>{lang === "uz" ? "Mijozlar" : "Клиенты"}</span>
            <h2 className="font-display" style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "var(--text1)" }}>{t.testimonials.title}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 22 }}>
            {testimonials.map(item => (
              <div key={item.id} className="card" style={{ padding: 28 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
                  {[1,2,3,4,5].map(s => <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                </div>
                <p style={{ color: "var(--text2)", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: 22, fontStyle: "italic" }}>"{lang === "uz" ? item.textUz : item.textRu}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0 }}>{item.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text1)" }}>{lang === "uz" ? item.nameUz : item.nameRu}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text3)" }}>{lang === "uz" ? item.roleUz : item.roleRu}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT CTA ═══ */}
      {/* <ContactPage /> */}
      <Form />


      <style>{`
        @media(max-width:768px) {
          .hero-two-col, .about-two-col, .contact-two-col { grid-template-columns: 1fr !important; }
          .stat-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </>
  );
}
