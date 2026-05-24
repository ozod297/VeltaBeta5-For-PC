import { useEffect } from "react";

export default function SEO({ title, description, keywords, image, url, type = "website" }) {
  const siteName = "Velta Pharmaceutical";
  const defaultDesc = "Velta — O'zbekistonning yetakchi farmatsevtika kompaniyasi. GMP va ISO sertifikatlangan sifatli dori-darmonlar.";
  const defaultKeywords = "velta pharmaceutical, dori, farmatsevtika, uzbekistan, GMP, ISO, paracetamol, ibuprofen, antibiotik, vitamin";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const desc = description || defaultDesc;
  const pageUrl = url ? `https://velta.uz${url}` : "https://velta.uz";
  const ogImage = image || "https://velta.uz/og-image.jpg";

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name, content, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };

    setMeta("description", desc);
    setMeta("keywords", keywords || defaultKeywords);
    setMeta("author", siteName);
    setMeta("robots", "index, follow");
    setMeta("theme-color", "#1e3a5f");

    // Open Graph
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", desc, "property");
    setMeta("og:image", ogImage, "property");
    setMeta("og:url", pageUrl, "property");
    setMeta("og:type", type, "property");
    setMeta("og:site_name", siteName, "property");
    setMeta("og:locale", "uz_UZ", "property");

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", desc);
    setMeta("twitter:image", ogImage);

    // Canonical
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = pageUrl;

    // JSON-LD structured data
    const existingLd = document.getElementById("ld-json");
    if (existingLd) existingLd.remove();
    const ld = document.createElement("script");
    ld.id = "ld-json"; ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": type === "article" ? "Article" : "Organization",
      "name": siteName,
      "url": "https://velta.uz",
      "logo": "https://velta.uz/logo.jpg",
      "description": defaultDesc,
      "address": { "@type": "PostalAddress", "addressLocality": "Toshkent", "addressCountry": "UZ" },
      "contactPoint": { "@type": "ContactPoint", "telephone": "+998-71-200-12-12", "contactType": "customer service" },
      "sameAs": ["https://t.me/velta_uz", "https://instagram.com/velta_uz"]
    });
    document.head.appendChild(ld);
  }, [fullTitle, desc, keywords, ogImage, pageUrl, type]);

  return null;
}
