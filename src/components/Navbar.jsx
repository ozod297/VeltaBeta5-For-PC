import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { translations } from "../i18n";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const { lang, setLang, dark, setDark } = useApp();
  const t = translations[lang].nav;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const links = [
    { to: "/company", label: t.company },
    { to: "/drugs", label: t.drugs },
    { to: "/partners", label: t.partners },
    { to: "/news", label: t.news },
    { to: "/contact", label: t.contact },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav 
  className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
  style={{
    position: "sticky",     /* yoki loyihangizga qarab "fixed" */
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,           /* OpenStreetMap/Leaflet'dan baland bo'lishi uchun */
    background: scrolled ? "var(--bg-navbar-scrolled)" : "var(--card)", /* Menyu ochilganda orqa fon ko'rinishi uchun */
    transition: "all 0.3s ease"
  }}
>
  <div className="container">
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>

      {/* ── LOGO ── */}
      <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
        <img
          src={logo}
          alt="Velta Pharmaceutical"
          style={{ height: 50, width: "auto", objectFit: "contain", display: "block" }}
        />
      </Link>

      {/* ── DESKTOP LINKS ── */}
      <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: 30 }}>
        {links.map(l => (
          <Link key={l.to} to={l.to} className={`nav-link ${isActive(l.to) ? "active" : ""}`}>
            {l.label}
          </Link>
        ))}
      </div>

      {/* ── RIGHT CONTROLS ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Lang */}
        <div style={{ display: "flex", background: "var(--bg2)", borderRadius: 999, padding: "3px 4px", border: "1px solid var(--border)" }}>
          {["uz", "ru"].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding: "4px 11px", borderRadius: 999, border: "none", cursor: "pointer",
              fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em",
              background: lang === l ? "var(--navy)" : "transparent",
              color: lang === l ? "white" : "var(--text3)",
              transition: "all 0.2s"
            }}>{l}</button>
          ))}
        </div>

        {/* Dark toggle */}
        <button onClick={() => setDark(!dark)} style={{
          width: 36, height: 36, borderRadius: 9,
          border: "1.5px solid var(--border)", background: "var(--bg2)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--text2)", transition: "all 0.2s", flexShrink: 0
        }}>
          {dark
            ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          }
        </button>

        {/* CTA — desktop */}
        <Link to="/contact" className="btn btn-primary desktop-only">
          {t.buy}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Link>

        {/* Burger — mobile */}
        <button
          className="mobile-only"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu" aria-expanded={menuOpen}
          style={{
            width: 38, height: 38, borderRadius: 9,
            border: "1.5px solid var(--border)", background: "var(--bg2)",
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", flexDirection: "column", gap: 5, padding: "9px",
            flexShrink: 0
          }}
        >
          {[
            menuOpen ? "rotate(45deg) translateY(7px)" : "none",
            null,
            menuOpen ? "rotate(-45deg) translateY(-7px)" : "none"
          ].map((transform, i) => (
            <span key={i} style={{
              display: i === 1 ? (menuOpen ? "none" : "block") : "block",
              width: "100%", height: "2px",
              background: "var(--text1)", borderRadius: "2px",
              transition: "all 0.3s",
              transform: transform || "none"
            }}/>
          ))}
        </button>
      </div>
    </div>

    {/* ── MOBILE MENU ── */}
    {menuOpen && (
      <div style={{
        borderTop: "1px solid var(--border)", paddingBottom: 16,
        animation: "fadeUp 0.2s ease"
      }}>
        {links.map(l => (
          <Link key={l.to} to={l.to} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "13px 4px",
            textDecoration: "none",
            color: isActive(l.to) ? "var(--accent)" : "var(--text1)",
            fontWeight: isActive(l.to) ? 600 : 500,
            fontSize: "0.975rem",
            borderBottom: "1px solid var(--border)"
          }}>
            {isActive(l.to) && (
              <span style={{ width: 3, height: 18, borderRadius: 2, background: "var(--accent)", display: "block" }}/>
            )}
            {l.label}
          </Link>
        ))}
        <div style={{ paddingTop: 16 }}>
          <Link to="/contact" className="btn btn-accent" style={{ textDecoration: "none" }}>
            {t.buy}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    )}
  </div>
</nav>
  );
}
