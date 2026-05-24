import { useApp } from "../context/AppContext";
import { translations } from "../i18n";
import SEO from "../components/SEO";

const benefits = [
  { icon: "💰", uz: "Maxsus narxlar", ru: "Специальные цены", dUz: "Hamkorlar uchun alohida chegirmalar va qulay narx shartlari.", dRu: "Специальные скидки и выгодные ценовые условия для партнёров." },
  { icon: "📢", uz: "Marketing yordami", ru: "Маркетинговая поддержка", dUz: "Reklama materiallari va brendlash bo'yicha to'liq yordam.", dRu: "Полная поддержка рекламными материалами и брендингом." },
  { icon: "👤", uz: "Shaxsiy metpristavitel", ru: "Персональный менеджер", dUz: "Har bir hamkorga shaxsiy metpristavitel tayinlanadi.", dRu: "Каждому партнёру назначается персональный менеджер." },
  { icon: "🚚", uz: "Tezkor yetkazish", ru: "Быстрая доставка", dUz: "O'zbekiston bo'ylab 24-48 soat ichida yetkazib berish.", dRu: "Доставка по всему Узбекистану за 24-48 часов." },
];

const partners = [
  { n: "Doridarmon", t: "pharmacy", city: "Toshkent", icon: "💊", bg: "#eff6ff" },
  { n: "Hayot Apteka", t: "pharmacy", city: "Samarqand", icon: "🏥", bg: "#f0fdf4" },
  { n: "MedLife Klinika", t: "clinic", city: "Toshkent", icon: "🏨", bg: "#fffbeb" },
  { n: "Pharmatech Uz", t: "distributor", city: "Buxoro", icon: "🚚", bg: "#fff1f2" },
  { n: "Salomatlik Plus", t: "clinic", city: "Namangan", icon: "⚕️", bg: "#faf5ff" },
  { n: "Global Pharma", t: "distributor", city: "Toshkent", icon: "🌍", bg: "#ecfeff" },
  { n: "Shifobaxsh", t: "pharmacy", city: "Andijon", icon: "💉", bg: "#fef9c3" },
  { n: "Med Center Pro", t: "clinic", city: "Farg'ona", icon: "🩺", bg: "#f0fdf4" },
];

export default function PartnersPage() {
  const { lang } = useApp();
  const t = translations[lang].partnersPage;
  return (
    <>
      <SEO title={lang === "uz" ? "Hamkorlar" : "Партнёры"} description={lang === "uz" ? "Velta bilan hamkorlik — maxsus narxlar, marketing yordami, tezkor yetkazib berish." : "Партнёрство с Velta — специальные цены, маркетинговая поддержка, быстрая доставка."} url="/partners"/>

      <section style={{ background: "linear-gradient(135deg,#1e3a5f,#2d5282)", padding: "80px 0 60px", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", bottom: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(244,196,48,0.07)" }}/>
        <div className="container">
          <span className="pill" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", marginBottom: 14, display: "inline-flex" }}>{t.badge}</span>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "white", fontWeight: 600, marginBottom: 10 }}>{t.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 500, fontSize: "0.95rem" }}>{t.subtitle}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <span className="pill" style={{ marginBottom: 12, display: "inline-flex" }}>{lang === "uz" ? "Afzalliklar" : "Преимущества"}</span>
          <h2 className="font-display" style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", color: "var(--text1)", marginBottom: 36 }}>{lang === "uz" ? "Nima uchun Velta bilan?" : "Почему именно Velta?"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18 }}>
            {benefits.map((b, i) => (
              <div key={i} className="card" style={{ padding: 26 }}>
                <div style={{ fontSize: "2rem", marginBottom: 14 }}>{b.icon}</div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text1)", marginBottom: 8 }}>{lang === "uz" ? b.uz : b.ru}</h3>
                <p style={{ fontSize: "0.82rem", color: "var(--text2)", lineHeight: 1.6 }}>{lang === "uz" ? b.dUz : b.dRu}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners grid */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <span className="pill" style={{ marginBottom: 12, display: "inline-flex" }}>{lang === "uz" ? "Hamkorlarimiz" : "Наши партнёры"}</span>
          <h2 className="font-display" style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", color: "var(--text1)", marginBottom: 32 }}>{lang === "uz" ? "Biz bilan ishlayotganlar" : "Работают с нами"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
            {partners.map((p, i) => (
              <div key={i} className="card" style={{ padding: 18, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0 }}>{p.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text1)" }}>{p.n}</div>
                  <div style={{ fontSize: "0.74rem", color: "var(--text3)" }}>{p.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", color: "var(--text1)", marginBottom: 14 }}>{lang === "uz" ? "Hamkor bo'lishni xohlaysizmi?" : "Хотите стать партнёром?"}</h2>
          <p style={{ color: "var(--text2)", marginBottom: 30, lineHeight: 1.7 }}>{lang === "uz" ? "Velta bilan hamkorlik qiling va biznesningizni yangi bosqichga olib chiqing." : "Сотрудничайте с Velta и выведите свой бизнес на новый уровень."}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/contact" className="btn btn-accent" style={{ textDecoration: "none" }}>{t.becomePartner} <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            <a href="tel:+998712001212" className="btn btn-ghost" style={{ textDecoration: "none" }}>+998 71 200 12 12</a>
          </div>
        </div>
      </section>
    </>
  );
}
