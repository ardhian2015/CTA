import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Shield, Phone, MapPin, Mail, Globe, Check, Sparkles, Camera,
  BadgeCheck, Wrench, Star, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-cctv.jpg";
import gal1 from "@/assets/gallery-1.jpg";
import gal2 from "@/assets/gallery-2.jpg";
import gal3 from "@/assets/gallery-3.jpg";
import gal4 from "@/assets/gallery-4.jpg";
import pkgDahua from "@/assets/pkg-dahua.jpg";
import pkgHilook from "@/assets/pkg-hilook.jpg";
import pkgHikvision from "@/assets/pkg-hikvision.jpg";
import pkgEzviz from "@/assets/pkg-ezviz.jpg";
import pkgDahuaAio from "@/assets/pkg-dahua-aio.jpg";
import pkgImou from "@/assets/pkg-imou.jpg";

import brandDahua from "@/assets/brands/dahua.png";
import brandHilook from "@/assets/brands/hilook.png";
import brandHikvision from "@/assets/brands/hikvision.png";
import brandEzviz from "@/assets/brands/ezviz.png";
import brandImou from "@/assets/brands/imou.png";

import locRumah from "@/assets/locations/rumah.jpg";
import locToko from "@/assets/locations/toko.jpg";
import locKantor from "@/assets/locations/kantor.jpg";

import clientYakult from "@/assets/clients/yakult.png.asset.json";
import clientAscott from "@/assets/clients/ascott.png.asset.json";
import clientBritish from "@/assets/clients/british-embassy.png.asset.json";
import clientSankyu from "@/assets/clients/sankyu.svg.asset.json";
import clientAlsok from "@/assets/clients/alsok.jpg.asset.json";
import clientAdira from "@/assets/clients/adira.png.asset.json";
import clientBaf from "@/assets/clients/baf.png.asset.json";

const WA_NUMBER = "6288222301117";
const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Berkah CCTV — Pasang CCTV Online, Terima Beres Jakarta" },
      { name: "description", content: "Jasa pasang CCTV Dahua, Hikvision, HiLook, Ezviz & Imou. Paket lengkap terima beres untuk rumah, toko, kantor. Cek promo khusus hari ini via WhatsApp." },
      { property: "og:title", content: "Berkah CCTV — Pasang CCTV Terima Beres" },
      { property: "og:description", content: "Paket CCTV lengkap dengan garansi resmi. Promo khusus hari ini." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

type Location = "Rumah" | "Toko" | "Kantor";

const packages = [
  {
    brand: "Dahua", tier: "2MP HD", logo: brandDahua,
    img: pkgDahua,
    items: ["Kamera Indoor 2MP", "Kamera Outdoor 2MP", "DVR HDTVI 4Ch 1 Unit", "HDD 500GB WD Purple"],
    note: "Paket standar terbaik untuk rumah & toko kecil.",
  },
  {
    brand: "HiLook", tier: "2MP HD", logo: brandHilook,
    img: pkgHilook,
    items: ["Kamera Indoor 2MP", "Kamera Outdoor 2MP", "DVR Turbo HD 4Ch", "HDD 500GB WD Purple"],
    note: "By Hikvision — value of money untuk hunian.",
  },
  {
    brand: "Hikvision", tier: "2MP Premium", logo: brandHikvision,
    img: pkgHikvision,
    items: ["Kamera Indoor 2MP", "Kamera Outdoor 2MP", "DVR Turbo HD 4Ch", "HDD 500GB WD Purple"],
    note: "Brand premium dengan kualitas gambar tajam.",
  },
  {
    brand: "Ezviz", tier: "All-in-One", logo: brandEzviz,
    img: pkgEzviz,
    items: ["Kamera WiFi Indoor/Outdoor", "Tanpa DVR — Cloud Storage", "Akses HP via Aplikasi", "Setup praktis cepat"],
    note: "Solusi WiFi pintar tanpa kabel ribet.",
    badge: "Praktis",
  },
  {
    brand: "Dahua", tier: "5MP All-in-One", logo: brandDahua,
    img: pkgDahuaAio,
    items: ["Kamera Indoor 5MP", "Kamera Outdoor 5MP", "DVR Penta-brid 4Ch", "HDD 1TB WD Purple"],
    note: "Resolusi tinggi 5MP, detail wajah jelas.",
    badge: "Best Seller",
  },
  {
    brand: "Imou", tier: "All-in-One WiFi", logo: brandImou,
    img: pkgImou,
    items: ["Kamera WiFi Smart", "Night Vision Color", "Cloud + MicroSD", "App Imou Life"],
    note: "Cocok untuk pemantauan rumah & ruang anak.",
  },
];

const locations: { key: Location; img: string; desc: string }[] = [
  { key: "Rumah", img: locRumah, desc: "Lindungi keluarga & properti — pantau dari HP." },
  { key: "Toko", img: locToko, desc: "Cegah kehilangan stok, awasi kasir & pintu masuk." },
  { key: "Kantor", img: locKantor, desc: "Sistem CCTV terstruktur dengan rekaman & user roles." },
];

const clients = [
  { name: "ALSOK", logo: clientAlsok.url },
  { name: "Bussan Auto Finance", logo: clientBaf.url },
  { name: "British Embassy Jakarta", logo: clientBritish.url },
  { name: "Adira Finance", logo: clientAdira.url },
  { name: "Yakult", logo: clientYakult.url },
  { name: "The Ascott Limited", logo: clientAscott.url },
  { name: "Sankyu", logo: clientSankyu.url },
];

function buildPkgMessage(brand: string, tier: string, items: string[], loc: Location) {
  return [
    `Halo Berkah CCTV, saya tertarik dengan *Paket ${brand} ${tier}*.`,
    ``,
    `Isi paket:`,
    ...items.map(i => `• ${i}`),
    ``,
    `Kebutuhan lokasi: *${loc}*`,
    `Mohon info penawaran & jadwal survey. Terima kasih.`,
  ].join("\n");
}

function Index() {
  const [today, setToday] = useState("");
  const [locByPkg, setLocByPkg] = useState<Record<string, Location>>({});

  useEffect(() => {
    const d = new Date();
    setToday(d.toLocaleDateString("id-ID", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    }));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Top contact bar */}
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> 0882-2230-1117</span>
            <span className="hidden sm:flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> team@berkahsolusi.com</span>
          </div>
          <span className="hidden md:flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Slipi, Palmerah, Jakarta Barat</span>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-display font-bold text-lg">
            <div className="w-9 h-9 rounded-lg bg-gradient-accent flex items-center justify-center shadow-glow">
              <Shield className="w-5 h-5 text-accent-foreground" />
            </div>
            <span>Berkah<span className="text-accent">CCTV</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#paket" className="hover:text-accent transition-colors">Paket</a>
            <a href="#layanan" className="hover:text-accent transition-colors">Layanan</a>
            <a href="#galeri" className="hover:text-accent transition-colors">Galeri</a>
            <a href="#kontak" className="hover:text-accent transition-colors">Kontak</a>
          </nav>
          <a href={waLink("Halo, saya ingin konsultasi pemasangan CCTV.")} target="_blank" rel="noreferrer">
            <Button className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 shadow-glow">
              <MessageCircle className="w-4 h-4" /> Chat WA
            </Button>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-30">
          <img src={heroImg} alt="CCTV terpasang di gedung modern" className="w-full h-full object-cover mix-blend-luminosity" width={1600} height={1024} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              Promo Khusus Hari Ini — {today || "—"}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] text-balance">
              Pasang CCTV Online,<br/>
              <span className="bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                Terima Beres Hari Ini.
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl">
              Konsultasi, survey, pemasangan, hingga setup aplikasi di HP Anda — semua kami urus.
              Brand resmi: Dahua, Hikvision, HiLook, Ezviz, Imou.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/90">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 px-3 py-1.5 rounded-full">
                <Star className="w-3.5 h-3.5 text-accent" /> Ramah, Fast Respon, Amanah, Dan Berpengalaman
              </span>
            </div>
            <div className="mt-2 text-sm text-white/70">
              Bersama Sales Resmi Berkah CCTV, Lebih Cepat, Praktis Dan Mudah
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={waLink(`Halo, saya tertarik dengan PROMO HARI INI (${today}). Mohon info paket CCTV.`)} target="_blank" rel="noreferrer">
                <Button size="lg" className="bg-promo text-promo-foreground hover:bg-promo/90 shadow-glow h-12 px-6 text-base font-semibold">
                  <Sparkles className="w-4 h-4" /> Cek Promo Hari Ini
                </Button>
              </a>
              <a href="#paket">
                <Button size="lg" variant="outline" className="h-12 px-6 text-base bg-white/5 border-white/30 text-white hover:bg-white/10 hover:text-white">
                  Lihat Paket CCTV
                </Button>
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { n: "1500+", l: "Titik Terpasang" },
                { n: "10+ Thn", l: "Pengalaman" },
                { n: "24/7", l: "Support" },
              ].map(s => (
                <div key={s.l}>
                  <div className="text-2xl md:text-3xl font-bold font-display text-white">{s.n}</div>
                  <div className="text-xs text-white/70 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Promo card */}
          <div className="lg:justify-self-end w-full max-w-md">
            <div className="relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-glow">
              <div className="absolute -top-3 -right-3 bg-promo text-promo-foreground text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide animate-pulse">
                Hot Today
              </div>
              <div className="text-xs uppercase tracking-widest text-white/60">Promo Khusus</div>
              <div className="text-sm text-white/80 mt-1">{today || "Memuat tanggal…"}</div>
              <div className="mt-4 text-3xl font-bold font-display">Cek Promo</div>
              <p className="text-white/70 text-sm mt-2">Untuk paket CCTV 4 channel — gratis survey lokasi Jabodetabek.</p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Gratis biaya pemasangan", "Setup aplikasi HP", "Garansi resmi 1 tahun", "Pasang dulu, baru bayar"].map(t => (
                  <li key={t} className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> {t}</li>
                ))}
              </ul>
              <a href={waLink(`Halo, saya mau klaim PROMO HARI INI (${today}) — Cek Promo.`)} target="_blank" rel="noreferrer" className="block mt-6">
                <Button className="w-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 h-12 text-base font-semibold">
                  <MessageCircle className="w-4 h-4" /> Klaim Promo via WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees strip */}
      <section className="border-y border-border bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { i: BadgeCheck, t: "Jaminan Harga Terbaik" },
            { i: Wrench, t: "Layanan Purna Jual" },
            { i: Shield, t: "Garansi Resmi" },
            { i: Star, t: "Terima Beres" },
          ].map(({ i: I, t }) => (
            <div key={t} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <I className="w-5 h-5 text-accent" />
              </div>
              <div className="font-semibold text-sm">{t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PAKET */}
      <section id="paket" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider mb-3">
              Paket Lengkap Terima Beres
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-balance">Daftar Paket CCTV</h2>
            <p className="mt-4 text-muted-foreground">
              Pilih lokasi pemasangan di setiap paket — pesan WhatsApp otomatis terisi sesuai pilihan Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((p) => {
              const key = `${p.brand}-${p.tier}`;
              const selected = locByPkg[key] ?? "Rumah";
              return (
                <article key={key} className="group bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-glow transition-all hover:-translate-y-1 flex flex-col">
                  <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                    <img src={p.img} alt={`Paket ${p.brand} ${p.tier}`} loading="lazy" width={800} height={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {p.badge && (
                      <span className="absolute top-3 left-3 bg-promo text-promo-foreground text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                        {p.badge}
                      </span>
                    )}
                    <span className="absolute top-3 right-3 bg-background/90 backdrop-blur text-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
                      {p.tier}
                    </span>
                    <div className="absolute bottom-3 left-3 bg-white rounded-lg px-3 py-2 shadow-md">
                      <img src={p.logo} alt={`${p.brand} logo`} loading="lazy" className="h-6 w-auto object-contain" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Camera className="w-4 h-4 text-accent" /> Paket {p.brand}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{p.note}</p>
                    <ul className="mt-4 space-y-2 flex-1">
                      {p.items.map(i => (
                        <li key={i} className="flex gap-2 text-sm">
                          <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" /> {i}
                        </li>
                      ))}
                    </ul>

                    {/* Location selector */}
                    <div className="mt-5">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Lokasi pemasangan
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {(["Rumah", "Toko", "Kantor"] as Location[]).map(l => (
                          <button
                            key={l}
                            type="button"
                            onClick={() => setLocByPkg(s => ({ ...s, [key]: l }))}
                            aria-pressed={selected === l}
                            className={`text-xs font-semibold rounded-lg py-2 border transition-colors ${
                              selected === l
                                ? "bg-accent text-accent-foreground border-accent shadow-sm"
                                : "bg-background text-foreground border-border hover:border-accent/50"
                            }`}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>

                    <a
                      href={waLink(buildPkgMessage(p.brand, p.tier, p.items, selected))}
                      target="_blank"
                      rel="noreferrer"
                      className="block mt-4"
                    >
                      <Button className="w-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
                        <MessageCircle className="w-4 h-4" /> Minta Penawaran ({selected})
                      </Button>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* LAYANAN */}
      <section id="layanan" className="py-20 bg-secondary/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold">Kami Pasang di Mana Saja</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Tim profesional dengan SLA jelas — dari survey gratis sampai serah-terima.</p>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {locations.map(({ key, img, desc }) => (
              <div key={key} className="bg-card rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-glow transition-all text-left">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={img} alt={`Pemasangan CCTV di ${key}`} loading="lazy" width={640} height={480}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{key}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-hero text-primary-foreground p-10 md:p-16 text-center shadow-glow">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-accent blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-promo blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold text-balance">
                Pasang CCTV Anda Sekarang Juga
              </h2>
              <p className="mt-4 text-white/80 max-w-xl mx-auto">
                Konsultasi gratis lewat WhatsApp — tim kami siap merekomendasikan paket terbaik untuk lokasi Anda.
              </p>
              <a href={waLink("Halo, saya ingin konsultasi pemasangan CCTV sekarang juga.")} target="_blank" rel="noreferrer" className="inline-block mt-8">
                <Button size="lg" className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 h-14 px-8 text-base font-semibold shadow-glow">
                  <MessageCircle className="w-5 h-5" /> Konsultasi Gratis Via Whatsapp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="py-16 border-y border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-8">
            Beberapa Klien Kami
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 items-center">
            {clients.map(c => (
              <div key={c.name} className="h-20 rounded-xl bg-card border border-border flex items-center justify-center p-4 hover:border-accent/40 hover:shadow-card transition-all">
                <img
                  src={c.logo}
                  alt={`Logo ${c.name}`}
                  loading="lazy"
                  className={`max-w-full w-auto object-contain transition-all ${c.name === "The Ascott Limited" ? "max-h-16" : "max-h-12"}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="galeri" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">Galeri Produk & Pekerjaan</h2>
            <p className="mt-4 text-muted-foreground">Dokumentasi tim kami di lapangan.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[gal1, gal2, gal3, gal4].map((g, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden group relative shadow-card">
                <img src={g} alt={`Dokumentasi pemasangan CCTV ${i + 1}`} loading="lazy" width={800} height={800}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="kontak" className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-xl">
              <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              Berkah<span className="text-accent">CCTV</span>
            </div>
            <p className="mt-4 text-sm text-white/70">
              Solusi pemasangan CCTV terima beres untuk rumah, toko, dan kantor di Jabodetabek.
            </p>
            <a href={waLink("Halo, saya ingin bertanya tentang pemasangan CCTV.")} target="_blank" rel="noreferrer" className="inline-block mt-6">
              <Button className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
                <MessageCircle className="w-4 h-4" /> Chat WhatsApp
              </Button>
            </a>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/60">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3"><Phone className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" /> <span>+62 882-2230-1117</span></li>
              <li className="flex items-start gap-3"><MessageCircle className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" /> <span>WA: 0882-2230-1117</span></li>
              <li className="flex items-start gap-3"><Mail className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" /> <span>team@berkahsolusi.com</span></li>
              <li className="flex items-start gap-3"><Globe className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" /> <span>berkahcctv.com</span></li>
              <li className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" /> <span>Jl B2 no. 6a Rt 008/02 Slipi, Palmerah, Jakarta Barat 11410</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/60">Lokasi</h4>
            <div className="rounded-xl overflow-hidden border border-white/20">
              <iframe
                src="https://maps.google.com/maps?q=Jl+B2+no.+6a+Slipi+Palmerah+Jakarta+Barat+11410&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full aspect-[4/3]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Berkah CCTV"
                allowFullScreen
              />
              <a href="https://maps.app.goo.gl/bKSZe1VeMKxNrzQGA" target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 text-sm font-medium hover:bg-white/5 transition-colors">
                <MapPin className="w-4 h-4 text-accent" /> Buka di Google Maps
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-5 text-xs text-white/50 flex flex-wrap justify-between gap-2">
            <span>© {new Date().getFullYear()} Berkah CCTV — Berkah Solusi.</span>
            <span>Distributor resmi Dahua · Hikvision · HiLook · Ezviz · Imou</span>
          </div>
        </div>
      </footer>

      {/* Floating WA */}
      <a href={waLink("Halo, saya butuh info CCTV.")} target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-whatsapp text-whatsapp-foreground rounded-full p-4 shadow-glow hover:scale-110 transition-transform"
        aria-label="Chat WhatsApp">
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
