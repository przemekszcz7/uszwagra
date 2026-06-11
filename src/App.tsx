import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
  X,
  Star,
  Cpu,
  Settings,
  Wrench,
  Zap,
  Wind,
  ClipboardCheck,
  Droplet,
  ExternalLink,
  ChevronRight,
  Disc,
  Quote,
  Tag,
  ShieldCheck
} from "lucide-react";

// Structure of schedule days with Polish titles and hours
const scheduleDays = [
  { dayNum: 1, label: "Poniedziałek", hours: "08:00 – 17:00" },
  { dayNum: 2, label: "Wtorek", hours: "08:00 – 17:00" },
  { dayNum: 3, label: "Środa", hours: "08:00 – 17:00" },
  { dayNum: 4, label: "Czwartek", hours: "08:00 – 17:00" },
  { dayNum: 5, label: "Piątek", hours: "08:00 – 17:00" },
  { dayNum: 6, label: "Sobota", hours: "08:00 – 15:00", badge: "KRÓCEJ" },
  { dayNum: 0, label: "Niedziela", hours: "ZAMKNIĘTE", isClosed: true }
];

// List of services with icons and detailed descriptions in Polish
const services = [
  {
    id: "serv-diagnostyka",
    title: "Diagnostyka Komputerowa",
    description: "Profesjonalny odczyt błędów i pełna analiza elektroniki pojazdu priorytetowym sprzętem diagnostycznym.",
    icon: Cpu
  },
  {
    id: "serv-hamulcowy",
    title: "Układ Hamulcowy",
    description: "Szybka i profesjonalna wymiana tarcz, klocków oraz test płynu hamulcowego — bezkompromisowe bezpieczeństwo.",
    icon: Disc
  },
  {
    id: "serv-oleje",
    title: "Wymiana Oleju i Filtrów",
    description: "Kompleksowy serwis olejowy wraz z doborem optymalnych filtrów powietrza, paliwa i kabinowych.",
    icon: Droplet
  },
  {
    id: "serv-rozrzad",
    title: "Wymiana Rozrządu",
    description: "Rozrząd wymieniany ze szwajcarską precyzją, z zachowaniem wszelkich norm producenta pojazdu.",
    icon: Settings
  },
  {
    id: "serv-zawieszenie",
    title: "Zawieszenie i Układ Kierowniczy",
    description: "Naprawa amortyzatorów, wahaczy, drążków i sworzni. Przywracamy pewne prowadzenie auta.",
    icon: Wrench
  },
  {
    id: "serv-elektryka",
    title: "Elektryka Samochodowa",
    description: "Skuteczne usuwanie zwarć, serwis rozruszników, alternatorów oraz profesjonalny dobór akumulatorów.",
    icon: Zap
  },
  {
    id: "serv-klimatyzacja",
    title: "Klimatyzacja",
    description: "Serwis okresowy, uzupełnianie czynnika (nabijanie), testy szczelności i odgrzybianie dla świeżego oddechu.",
    icon: Wind
  },
  {
    id: "serv-przeglady",
    title: "Przeglądy i Wyceny",
    description: "Szybka i fachowa rzetelna wycena naprawy bez jakichkolwiek zobowiązań. Zadzwoń bezpośrednio pod numer: 791 221 308",
    icon: ClipboardCheck
  }
];

// Gallery images as specified in the prompt
const galleryImages = [
  {
    id: "gallery-image-1",
    url: "https://i.ibb.co/GvpvZT5v/573897543-122202313244563594-3051229251747513845-n.jpg",
    caption: "Nasza strefa warsztatowa — porządek i nienaganny profesjonalizm u Szwagra."
  },
  {
    id: "gallery-image-2",
    url: "https://i.ibb.co/cXtCywPZ/617258094-122217962930563594-2031825142029999738-n.jpg",
    caption: "Młody i dynamiczny zespół dbający o najdrobniejsze motoryzacyjne detale."
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Dynamic state highlight for current day of week
  const [currentDayNumber, setCurrentDayNumber] = useState(-1);

  useEffect(() => {
    // Detect day of week (0 = Sunday, 1 = Monday ...)
    const day = new Date().getDay();
    setCurrentDayNumber(day);

    // Watch scroll for dynamic header styling with passive flag for high scrolling performance
    const handleScroll = () => {
      const crossedThreshold = window.scrollY > 40;
      setIsScrolled((prev) => {
        if (prev !== crossedThreshold) {
          return crossedThreshold;
        }
        return prev;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Soft custom scrolling helper for navigation links
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-nunito text-[#5A6070] antialiased">
      
      {/* 2. TOP BAR */}
      <div 
        id="top-info-bar"
        className="bg-[#F5C518] text-[#0F2347] font-exo font-bold text-[11px] sm:text-xs tracking-wider py-2.5 px-4 text-center select-none"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-6 gap-y-1">
          <a id="topbar-phone" href="tel:791221308" className="hover:opacity-80 transition-opacity flex items-center gap-1.5 shrink-0">
            <Phone size={13} className="text-[#0F2347]" /> 791 221 308
          </a>
          <span className="opacity-40 hidden md:inline">•</span>
          <a id="topbar-email" href="mailto:warsztat.u.szwagra@gmail.com" className="hover:opacity-80 transition-opacity flex items-center gap-1.5 shrink-0">
            <Mail size={13} className="text-[#0F2347]" /> warsztat.u.szwagra@gmail.com
          </a>
          <span className="opacity-40 hidden md:inline">•</span>
          <span id="topbar-address" className="flex items-center gap-1.5 shrink-0">
            <MapPin size={13} className="text-[#0F2347]" /> Groblowa 13a, Grudziądz
          </span>
          <span className="opacity-40 hidden lg:inline">•</span>
          <span id="topbar-hours" className="flex items-center gap-1.5 shrink-0">
            <span>Pon–Pt:</span> 08–17 <span className="opacity-40">|</span> <span>Sob:</span> 08–15
          </span>
        </div>
      </div>

      {/* 3. NAVIGATION (Sticky, below top bar) */}
      <header 
        id="main-header"
        className={`sticky top-0 z-40 transition-all duration-300 border-b-3 border-[#1B3A6B] ${
          isScrolled 
            ? "bg-white/98 shadow-[0_4px_20px_rgba(27,58,107,0.12)] py-2" 
            : "bg-white/98 py-3.5"
        }`}
        style={{ backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Logo Left */}
          <div 
            id="brand-logo"
            onClick={() => scrollToSection("hero-section")}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="relative overflow-hidden w-11 h-11 rounded border-2 border-[#1B3A6B] group-hover:border-[#F5C518] transition-colors shadow">
              <img 
                id="logo-image"
                src="https://i.ibb.co/ynDpX2Xq/538207547-122188978010563594-8161172719695115073-n.jpg"
                alt="Logo Warsztat u Szwagra"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex flex-col justify-center leading-none">
              <span className="font-exo font-normal text-[#1B3A6B] text-[10px] tracking-[0.2em] uppercase">
                WARSZTAT
              </span>
              <span className="font-exo font-black text-[#1B3A6B] text-xl sm:text-2xl tracking-tight leading-none group-hover:text-[#F5C518] transition-colors uppercase">
                U SZWAGRA
              </span>
            </div>
          </div>

          {/* Desktop Nav Links Right */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
            {[
              { id: "o-nas", label: "O Nas" },
              { id: "uslugi", label: "Usługi" },
              { id: "galeria", label: "Galeria" },
              { id: "godziny", label: "Godziny" },
              { id: "opinie", label: "Opinie" },
              { id: "kontakt", label: "Kontakt" }
            ].map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => scrollToSection(link.id)}
                className="relative font-exo font-semibold text-[#1B3A6B] tracking-wider text-sm uppercase py-1 group overflow-hidden cursor-pointer"
              >
                <span>{link.label}</span>
                {/* Underline animated slider element */}
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#F5C518] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
            ))}
          </nav>

          {/* Action Call for Desktop */}
          <div className="hidden xl:block">
            <a
              id="nav-quick-cta"
              href="tel:791221308"
              className="font-exo font-bold text-xs bg-[#1B3A6B] text-white hover:bg-[#F5C518] hover:text-[#0F2347] px-4.5 py-2 rounded uppercase tracking-wider transition-all duration-300 border border-transparent shadow"
            >
              Zadzwoń teraz
            </a>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#1B3A6B] hover:text-[#F5C518] p-1.5 transition-colors cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[110px] sm:top-[120px] bottom-0 bg-white z-30 flex flex-col items-center justify-start py-12 px-6 gap-6 overflow-y-auto"
          >
            <div className="w-full max-w-sm flex flex-col gap-4 text-center">
              {[
                { id: "o-nas", label: "O Nas" },
                { id: "uslugi", label: "Usługi" },
                { id: "galeria", label: "Galeria" },
                { id: "godziny", label: "Godziny" },
                { id: "opinie", label: "Opinie" },
                { id: "kontakt", label: "Kontakt" }
              ].map((link, index) => (
                <motion.button
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollToSection(link.id)}
                  className="w-full py-4 text-lg font-exo font-bold text-[#1B3A6B] hover:bg-[#F5F5F0] hover:text-[#F5C518] rounded uppercase tracking-widest border-b border-gray-100 transition-all cursor-pointer"
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-8 flex flex-col gap-4"
              >
                <a
                  id="mobile-cta-phone"
                  href="tel:791221308"
                  className="bg-[#F5C518] text-[#0F2347] font-exo font-bold py-4.5 rounded shadow tracking-wide text-center uppercase flex items-center justify-center gap-2"
                >
                  <Phone size={18} /> Call: 791 221 308
                </a>
                <p className="text-xs text-[#8090A0] leading-relaxed">
                  Groblowa 13a, Grudziądz<br />
                  Zadzwoń przed przyjazdem — dogadamy dogodną godzinę!
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. HERO SECTION */}
      <section 
        id="hero-section"
        className="relative min-h-[90vh] flex items-center bg-black overflow-hidden clip-diagonal-bottom"
        style={{
          backgroundImage: `url('https://i.ibb.co/rRDHNFQG/675000499-122232966662563594-4236871885271655111-n.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Deep dark gradient overlay */}
        <div 
          className="absolute inset-0 z-0" 
          style={{
            background: "linear-gradient(120deg, rgba(15,35,71,0.92) 0%, rgba(15,35,71,0.65) 55%, rgba(15,35,71,0.30) 100%)"
          }} 
        />

        {/* Dynamic particles or halftone effect for deep contrast */}
        <div className="absolute inset-0 bg-halftone opacity-10 z-[1] select-none pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 flex flex-col justify-center">
          <div className="max-w-3xl space-y-6 md:space-y-8 pl-[2vw] md:pl-[6vw]">
            
            {/* Small Label tag with sliding key entry */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center"
            >
              <span 
                id="hero-location-label"
                className="bg-[#F5C518] text-[#0F2347] font-exo font-extrabold text-xs sm:text-sm tracking-[0.2em] px-3.5 py-1.5 uppercase rounded-sm shadow-sm"
              >
                Grudziądz · Ul. Groblowa 13a
              </span>
            </motion.div>

            {/* Main title stacked */}
            <div className="space-y-1 sm:space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="font-exo font-black text-white text-5xl sm:text-7xl lg:text-[6.5rem] tracking-tight leading-none uppercase"
              >
                WARSZTAT
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-exo font-black text-[#F5C518] text-5xl sm:text-7xl lg:text-[7.2rem] tracking-tight leading-none uppercase"
                style={{
                  textShadow: "0 0 40px rgba(245,197,24,0.4)"
                }}
              >
                U SZWAGRA
              </motion.h1>
            </div>

            {/* Yellow separator rule */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="h-[3.5px] w-[110px] bg-[#F5C518] origin-left"
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="text-white font-nunito font-light text-lg sm:text-xl lg:text-2xl italic max-w-xl leading-relaxed opacity-95"
            >
              "Najlepsze ceny. Najwyższa jakość. Traktujemy Cię jak znajomego."
            </motion.p>

            {/* Two CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-6"
            >
              <a
                id="cta-hero-phone"
                href="tel:791221308"
                className="group relative inline-flex items-center justify-center gap-2 bg-[#F5C518] text-[#0F2347] hover:bg-yellow-400 font-exo font-black tracking-wider text-sm sm:text-base px-8 py-4.5 rounded shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,197,24,0.6)] cursor-pointer"
              >
                <Phone size={18} className="animate-pulse" />
                <span>ZADZWOŃ: 791 221 308</span>
              </a>

              <button
                id="cta-hero-services"
                onClick={() => scrollToSection("uslugi")}
                className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-[#0F2347] font-exo font-extrabold tracking-wider text-sm sm:text-base px-8 py-4.5 rounded transition-all duration-300 cursor-pointer"
              >
                SPRAWDŹ USŁUGI
              </button>
            </motion.div>

            {/* Below buttons badge chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-3 pt-4"
            >
              <span id="badge-prices" className="bg-white/10 border border-white/20 px-4 py-2 text-xs font-semibold uppercase text-white tracking-widest rounded-full backdrop-blur-sm shadow flex items-center gap-1.5">
                <Tag size={13} className="text-[#F5C518]" /> Najlepsze Ceny
              </span>
              <span id="badge-time" className="bg-white/10 border border-white/20 px-4 py-2 text-xs font-semibold uppercase text-white tracking-widest rounded-full backdrop-blur-sm shadow flex items-center gap-1.5">
                <Zap size={13} className="text-[#F5C518]" /> Szybka Realizacja
              </span>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. O NAS SECTION */}
      <section 
        id="o-nas"
        className="relative bg-white py-16 sm:py-28 px-4 sm:px-8 overflow-hidden"
        style={{
          clipPath: "polygon(0 4%, 100% 0, 100% 96%, 0 100%)"
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column Left: Text */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="space-y-3">
              <span className="font-exo font-bold text-xs uppercase tracking-[0.25em] text-[#1B3A6B] block">
                MINI PREZENTACJA · O NAS
              </span>
              
              <div className="flex items-center gap-4">
                <span className="w-1.5 h-12 bg-[#F5C518] rounded-full block shrink-0" />
                <h2 className="font-exo font-black text-3xl sm:text-4xl lg:text-5xl text-[#1B3A6B] leading-none uppercase">
                  MŁODZI, SPRAWNI,<br />UCZCIWE CENY
                </h2>
              </div>
            </div>

            <div className="space-y-5 font-nunito font-light text-[#5A6070] text-base sm:text-lg leading-relaxed">
              <p>
                <strong>Warsztat u Szwagra</strong> to absolutne zaprzeczenie
                sztywnych, korporacyjnych serwisów samochodowych. Jesteśmy ekipą
                młodych, utalentowanych i zdeterminowanych mechaników pasjonatów z Grudziądza, 
                którzy do każdego samochodu podchodzą z precyzją, a do właściciela pojazdu — jak do dobrego szwagra!
              </p>
              <p>
                Naszym absolutnym priorytetem są <strong>najlepsze ceny na rynku</strong>. Oferujemy klarowne wyceny, pełne 
                informowanie o postępach i zero niespodziewanych dopłat przy odbiorze. Jesteśmy tu po to, by pomóc, 
                a nie naciągać. Szybko, konkretnie i bez ściemniania.
              </p>
              <p>
                Naprawiamy sprawnie i od ręki większość standardowych usterek eksploatacyjnych. Nasze zadowolenie płynie 
                z rzetelnej, czystej pracy i dumy, z jaką nasi powracający klienci polecają nas dalej.
              </p>
            </div>

            {/* Stat Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {[
                { label: "Najlepsze Ceny", icon: Tag, description: "Brak naciągania" },
                { label: "Od Ręki", icon: Zap, description: "Szanujemy Twój czas" },
                { label: "100% Zaufania", icon: ShieldCheck, description: "Szlachetna uczciwość" }
              ].map((chip, idx) => {
                const StatIcon = chip.icon;
                return (
                  <div 
                    key={idx}
                    id={`stat-chip-${idx}`}
                    className="p-4 border-2 border-[#1B3A6B] hover:border-[#F5C518] transition-colors rounded duration-300 bg-[#F5F5F0]/50"
                  >
                    <div className="flex items-center gap-2.5 mb-1">
                      <StatIcon size={18} className="text-[#1B3A6B]" />
                      <span className="font-exo font-black text-[#1B3A6B] text-sm sm:text-base uppercase tracking-wider">{chip.label}</span>
                    </div>
                    <span className="text-xs text-[#8090A0] block font-medium">{chip.description}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column Right: Image with offset yellow frame overlay */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] z-10">
              
              {/* Offset border frame behind image */}
              <div 
                className="absolute inset-0 border-3 border-[#F5C518] rounded" 
                style={{ transform: "translate(12px, 12px)", zIndex: -1 }}
              />

              {/* Main Image */}
              <div className="w-full h-full overflow-hidden rounded shadow-lg border-2 border-[#1B3A6B]">
                <img 
                  id="about-us-image"
                  src="https://i.ibb.co/GvpvZT5v/573897543-122202313244563594-3051229251747513845-n.jpg"
                  alt="Mechanicy pracujący w warsztacie"
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Subtle visual badge overlay */}
              <div className="absolute -bottom-4 -left-4 bg-[#1B3A6B] text-white p-4 rounded shadow-lg border-b-4 border-[#F5C518]">
                <span className="font-exo font-black text-2xl text-[#F5C518] block leading-none">GRUDZIĄDZ</span>
                <span className="text-xs uppercase tracking-wider opacity-80 block mt-1">Uczciwy Mechanik</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. USŁUGI (Services) SECTION */}
      <section 
        id="uslugi"
        className="relative bg-[#111927] bg-halftone py-24 sm:py-32 px-4 sm:px-8 text-white clip-diagonal-top"
      >
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          {/* Section titles */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="font-exo font-bold text-xs uppercase tracking-[0.25em] text-[#F5C518] block">
              ZAKRES USŁUG WARSZTATU
            </span>
            <h2 className="font-exo font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
              CO ROBIMY WARSZTATOWO
            </h2>
            <p className="font-nunito font-light text-[#8090A0] text-base sm:text-lg italic">
              "Kompleksowa obsługa Twojego samochodu — szybko i w dobrej cenie"
            </p>
          </div>

          {/* Grid structure of 8 services */}
          <div id="services-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((serv) => {
              const IconComponent = serv.icon;
              return (
                <div
                  key={serv.id}
                  id={serv.id}
                  className="group relative bg-white/[0.04] hover:bg-white/[0.08] rounded border-t-4 border-[#1B3A6B] hover:border-[#F5C518] p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,197,24,0.15)] hover:-translate-y-1.5 cursor-default"
                >
                  <div className="space-y-4">
                    
                    {/* Icon bubble */}
                    <div className="w-12 h-12 rounded bg-white/[0.05] border border-white/10 group-hover:border-[#F5C518] group-hover:bg-[#F5C518]/10 text-[#F5C518] flex items-center justify-center transition-all duration-300">
                      <IconComponent size={24} className="group-hover:scale-110 transition-transform" />
                    </div>

                    {/* Title */}
                    <h3 className="font-exo font-extrabold text-[#FFFFFF] group-hover:text-[#F5C518] text-lg uppercase tracking-wide transition-colors">
                      {serv.title}
                    </h3>

                    {/* Description */}
                    <p className="font-nunito font-light text-[#8090A0] group-hover:text-white/90 text-sm leading-relaxed transition-colors">
                      {serv.description}
                    </p>
                  </div>

                  {/* Little corner aesthetic indicator */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-40 transition-opacity">
                    <span className="text-[10px] uppercase tracking-wider font-mono text-[#F5C518]">&gt;&gt;</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Full-width Highlight band */}
          <div 
            id="uslugi-price-highlight"
            className="w-full bg-[#F5C518] text-[#0F2347] p-6 lg:p-8 rounded flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="text-center md:text-left space-y-1">
              <span className="font-exo font-black text-lg sm:text-2xl tracking-normal uppercase block">
                NAJLEPSZE CENY W GRUDZIĄDZU — ZADZWOŃ: 791 221 308
              </span>
              <span className="font-nunito font-normal text-[#0F2347]/80 text-sm sm:text-base">
                Zadzwoń do Szwagra, powiedz co stuka w zawieszeniu i otrzymaj darmową, szybką kalkulację!
              </span>
            </div>
            
            <a
              id="highlight-call-btn"
              href="tel:791221308"
              className="px-6 py-3 border-2 border-[#0F2347] font-exo font-black text-[#0F2347] text-sm uppercase tracking-wide hover:bg-[#0F2347] hover:text-white rounded transition-colors duration-300 shrink-0 select-none inline-flex items-center gap-2"
            >
              <Phone size={16} /> SZYBKI TELEFON
            </a>
          </div>

        </div>
      </section>

      {/* 7. GALERIA (Gallery) SECTION */}
      <section 
        id="galeria"
        className="py-20 sm:py-28 px-4 sm:px-8 bg-[#F5F5F0]"
      >
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
          
          {/* Section Header */}
          <div className="text-center space-y-2">
            <span className="font-exo font-bold text-xs uppercase tracking-[0.25em] text-[#1B3A6B] block">
              ZOBACZ NASZĄ PRACĘ
            </span>
            <h2 className="font-exo font-black text-4xl sm:text-5xl text-[#1B3A6B] uppercase tracking-tight">
              GALERIA NASZEGO WARSZTATU
            </h2>
            <div className="h-1 w-20 bg-[#F5C518] mx-auto mt-4 rounded" />
          </div>

          {/* Grid Layout of photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                id={img.id}
                onClick={() => setLightboxImage(img.url)}
                className="group relative cursor-pointer overflow-hidden rounded shadow-[0_8px_30px_rgba(27,58,107,0.18)] border-3 border-transparent hover:border-[#F5C518] transition-all bg-white"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={img.url}
                  alt="Warsztat u Szwagra ujęcie"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* On hover view glass effect */}
                <div className="absolute inset-0 bg-[#0F2347]/70 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-6 transition-all duration-300">
                  <span className="bg-[#F5C518] text-[#0F2347] font-exo font-black text-[10px] tracking-wider px-2 py-1 uppercase rounded self-start mb-2">
                    POWIĘKSZ ZDJĘCIE
                  </span>
                  <p className="text-white font-nunito text-xs sm:text-sm font-medium leading-relaxed">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center font-nunito font-light text-[#8090A0] text-sm">
            Kliknij na dowolne zdjęcie robocze, aby wyświetlić pełny podgląd w powiększeniu.
          </p>
        </div>
      </section>

      {/* Interactive Photo Lightbox Component */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            id="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 bg-[#0F2347]/95 z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              id="lightbox-container"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded bg-black border-3 border-[#F5C518] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage}
                alt="Powiększone zdjęcie"
                className="object-contain max-w-full max-h-[80vh]"
                referrerPolicy="no-referrer"
              />
              
              {/* Close Button top-right */}
              <button
                id="lightbox-close-btn"
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 bg-[#F5C518] hover:bg-yellow-400 text-[#0F2347] p-2 rounded-full cursor-pointer shadow-lg transition-colors"
                aria-label="Zamknij"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. GODZINY OTWARCIA (Hours) SECTION */}
      <section 
        id="godziny"
        className="bg-[#1B3A6B] py-20 sm:py-28 px-4 sm:px-8 text-white text-center"
      >
        <div className="max-w-2xl mx-auto space-y-10">
          
          <div className="space-y-2">
            <span className="font-exo font-bold text-xs uppercase tracking-[0.25em] text-[#F5C518] block">
              SPRAWDŹ DOSTĘPNOŚĆ WARSZTATU
            </span>
            <h2 className="font-exo font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
              KIEDY JESTEŚMY W PRACY?
            </h2>
            <p className="font-nunito font-light text-white/70 text-sm sm:text-base italic max-w-md mx-auto">
              Chcesz umówić się na diagnostykę komputerową lub wymianę klocków? Zapraszamy poniżej.
            </p>
          </div>

          {/* Centered Schedule Board */}
          <div 
            id="schedule-board"
            className="w-full max-w-[500px] mx-auto bg-white/5 border border-white/15 rounded-lg overflow-hidden shadow-2xl text-left"
          >
            {/* Header bar */}
            <div className="bg-[#F5C518] text-[#0F2347] py-4.5 px-6 font-exo font-[900] text-center tracking-wider text-base sm:text-lg flex items-center justify-center gap-2">
              <Clock size={18} /> HARMONOGRAM ROBOCZY
            </div>

            {/* List of days with active highlight */}
            <div className="divide-y divide-white/10">
              {scheduleDays.map((day) => {
                const isTodayActive = currentDayNumber === day.dayNum;
                return (
                  <div
                    key={day.dayNum}
                    id={`schedule-row-${day.dayNum}`}
                    className={`flex items-center justify-between py-4 px-6 transition-colors ${
                      isTodayActive
                        ? "bg-[#F5C518]/15 border-l-4 border-[#F5C518] text-white font-bold"
                        : "text-white/85"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-exo text-sm tracking-wide">{day.label}</span>
                      {isTodayActive && (
                        <span className="text-[10px] bg-[#F5C518] text-[#0F2347] font-black px-1.5 py-0.5 rounded tracking-wide uppercase shadow">
                          DZIŚ OTWARTE!
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm tracking-tight text-[#F5C518]">
                        {day.hours}
                      </span>
                      {day.badge && (
                        <span className="text-[9px] bg-red-600 text-white font-black px-1.5 py-0.5 rounded tracking-wide">
                          {day.badge}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prompt below */}
          <p className="font-nunito font-light text-white/80 text-sm sm:text-base italic max-w-lg mx-auto">
            "Masz pilną sprawę w nietypowych godzinach? Napisz lub zadzwoń — u Szwagra zawsze znajdziemy dobre, elastyczne rozwiązanie!"
          </p>
        </div>
      </section>

      {/* 9. OPINIE (Reviews) SECTION */}
      <section 
        id="opinie"
        className="py-20 sm:py-28 px-4 sm:px-8 bg-white text-center"
      >
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          <div className="space-y-2">
            <span className="font-exo font-bold text-xs uppercase tracking-[0.25em] text-[#1B3A6B] block">
              ZADOWOLENIE KLIENTÓW GRUDZIĄDZA
            </span>
            <h2 className="font-exo font-black text-4xl sm:text-5xl text-[#1B3A6B] uppercase tracking-tight">
              CO MÓWIĄ O NAS NASI LUDZIE?
            </h2>
            <div className="h-1 w-20 bg-[#F5C518] mx-auto mt-4 rounded" />
          </div>

          {/* Testimonial Card */}
          <div 
            id="testimonial-card"
            className="w-full max-w-[640px] mx-auto bg-[#F5F5F0] border-l-5 border-[#F5C518] rounded p-8 sm:p-12 text-left relative shadow-[0_4px_20px_rgba(27,58,107,0.08)]"
          >
            {/* Big quote mark */}
            <span className="font-exo font-black text-[7.5rem] leading-none text-[#F5C518]/30 absolute top-2 right-6 pointer-events-none select-none">
              ”
            </span>

            <div className="space-y-6">
              {/* Stars representation */}
              <div className="flex gap-1.5 text-[#F5C518]" id="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={22} fill="#F5C518" />
                ))}
              </div>

              {/* Quote text */}
              <p className="font-nunito font-light text-[#181818] text-base sm:text-lg lg:text-xl italic leading-relaxed relative z-10">
                "Młode chłopaki robią świetną robotę, wszystko załatwione od ręki. Cena niesamowicie konkurencyjna jak na dzisiejsze czasy, a do tego super luźna, przyjazna atmosfera. 100% Zaufania bez kręcenia!"
              </p>

              {/* Author line */}
              <div className="flex items-center gap-3">
                <span className="w-10 h-[1.5px] bg-[#1B3A6B]" />
                <span className="font-nunito font-bold text-sm text-[#8090A0] uppercase tracking-widest">
                  — Zadowolony Klient, Grudziądz
                </span>
              </div>
            </div>
          </div>

          {/* Read review and write link to FB */}
          <div>
            <a
              id="fb-reviews-button"
              href="https://www.facebook.com/profile.php?id=61566907827371&sk=reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-[#1B3A6B] text-[#1B3A6B] font-exo font-extrabold text-sm uppercase tracking-wider px-7 py-3.5 hover:bg-[#1B3A6B] hover:text-white transition-all duration-300 rounded cursor-pointer"
            >
              <span>WIĘCEJ OPINII NA FACEBOOKU</span>
              <ExternalLink size={16} />
            </a>
          </div>

        </div>
      </section>

      {/* 10. KONTAKT (Contact) SECTION */}
      <section 
        id="kontakt"
        className="py-20 sm:py-28 px-4 sm:px-8 bg-[#F5F5F0]"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center md:text-left space-y-2">
            <span className="font-exo font-bold text-xs uppercase tracking-[0.25em] text-[#1B3A6B] block">
              SZYBKO I NA TEMAT · LOKALIZACJA
            </span>
            <h2 className="font-exo font-black text-4xl sm:text-5xl text-[#1B3A6B] uppercase tracking-tight">
              SPRAWDŹ ADRES I NAPISZ / ZADZWOŃ
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column: Info list */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-8 h-full">
              
              <div className="bg-white rounded p-6 sm:p-8 shadow-sm space-y-6">
                
                {/* 1. Address line */}
                <div id="contact-addr-row" className="pb-4 border-b border-[#E4E6EA] flex items-start gap-3">
                  <span className="font-exo font-extrabold text-[#F5C518] text-lg select-none leading-none pt-1">▸</span>
                  <div className="space-y-1">
                    <span className="font-exo font-bold text-[#1B3A6B] text-xs uppercase tracking-wider block">Adres Warsztatu:</span>
                    <p className="font-nunito font-semibold text-[#181818] text-base">ul. Groblowa 13a, 86-300 Grudziądz</p>
                  </div>
                </div>

                {/* 2. Phone number line */}
                <div id="contact-phone-row" className="pb-4 border-b border-[#E4E6EA] flex items-start gap-3">
                  <span className="font-exo font-extrabold text-[#F5C518] text-lg select-none leading-none pt-1">▸</span>
                  <div className="space-y-1">
                    <span className="font-exo font-bold text-[#1B3A6B] text-xs uppercase tracking-wider block">Telefon (Szybka Wycena):</span>
                    <a href="tel:791221308" className="font-mono font-medium text-lg text-[#1B3A6B] hover:text-[#F5C518] transition-colors leading-relaxed block">
                      791 221 308
                    </a>
                  </div>
                </div>

                {/* 3. E-mail line */}
                <div id="contact-email-row" className="pb-4 border-b border-[#E4E6EA] flex items-start gap-3">
                  <span className="font-exo font-extrabold text-[#F5C518] text-lg select-none leading-none pt-1">▸</span>
                  <div className="space-y-1">
                    <span className="font-exo font-bold text-[#1B3A6B] text-xs uppercase tracking-wider block">E-mail firmowy:</span>
                    <a href="mailto:warsztat.u.szwagra@gmail.com" className="font-nunito font-semibold text-base text-[#1B3A6B] hover:text-[#F5C518] transition-colors leading-relaxed block">
                      warsztat.u.szwagra@gmail.com
                    </a>
                  </div>
                </div>

                {/* 4. Hours representation in contact */}
                <div id="contact-hours-row" className="pb-2 flex items-start gap-3">
                  <span className="font-exo font-extrabold text-[#F5C518] text-lg select-none leading-none pt-1">▸</span>
                  <div className="space-y-1">
                    <span className="font-exo font-bold text-[#1B3A6B] text-xs uppercase tracking-wider block">Godziny przyjęć aut:</span>
                    <p className="font-nunito text-[#5A6070] text-sm">
                      <span className="font-semibold text-[#181818]">Poniedziałek – Piątek:</span> 08:00 – 17:00<br />
                      <span className="font-semibold text-[#181818]">Sobota:</span> 08:00 – 15:00 <span className="opacity-65 text-xs text-red-500">(Krócej)</span><br />
                      <span className="font-semibold text-[#181818]">Niedziela:</span> Zamknięte
                    </p>
                  </div>
                </div>

              </div>

              {/* Value Callout Box */}
              <div 
                id="value-callout-box"
                className="bg-[#1B3A6B] text-white p-6 rounded border-l-5 border-[#F5C518] shadow-md flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="font-exo font-extrabold text-xl text-[#F5C518] block tracking-wide uppercase">
                    NAJLEPSZE CENY
                  </span>
                  <p className="font-nunito font-light text-white/80 text-sm">
                    Sprawdź sam — wstępna wycena telefoniczna lub na miejscu jest bezpłatna i niezobowiązująca.
                  </p>
                </div>
                
                {/* Visual wrench badge */}
                <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center text-[#F5C518]">
                  <Wrench size={20} />
                </div>
              </div>

              {/* Facebook Button */}
              <a
                id="facebook-cta-large"
                href="https://www.facebook.com/profile.php?id=61566907827371"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#1B3A6B] text-[#F5C518] hover:bg-[#2A5298] hover:text-white font-exo font-black text-sm tracking-widest uppercase p-4.5 rounded shadow-md transition-colors duration-300 group cursor-pointer"
              >
                {/* Clean SVG Facebook Icon to look high craft */}
                <svg 
                  className="w-5 h-5 fill-current" 
                  viewBox="0 0 24 24" 
                  aria-hidden="true"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                <span>WARSZTAT U SZWAGRA NA FB</span>
              </a>

            </div>

            {/* Right Column: Google Maps IFrame styled neatly */}
            <div className="lg:col-span-6">
              <div 
                id="maps-iframe-wrapper"
                className="w-full h-full border-3 border-[#F5C518] rounded bg-white p-1 hover:shadow-xl transition-all duration-300"
              >
                <iframe
                  id="google-maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2373.6303970209!2d18.749010012731222!3d53.49293346362949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4702cfc2f694d479%3A0x170060b7c48b630e!2sGroblowa%2013a%2C%2086-302%20Grudzi%C4%85dz!5e0!3m2!1spl!2spl!4v1781169248914!5m2!1spl!2spl"
                  width="100%"
                  height="390"
                  style={{ border: 0, minHeight: "380px" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa z lokalizacją Warsztatu u Szwagra"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 11. FOOTER */}
      <footer 
        id="site-footer"
        className="bg-[#0F2347] py-16 px-4 sm:px-8 text-white text-center"
      >
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Logo element stack */}
          <div className="flex flex-col items-center gap-3">
            <div className="overflow-hidden w-11 h-11 rounded border border-[#F5C518]/60 shadow">
              <img 
                id="footer-logo-img"
                src="https://i.ibb.co/ynDpX2Xq/538207547-122188978010563594-8161172719695115073-n.jpg"
                alt="Logo rzemieślnicze"
                className="object-cover w-full h-full"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <span className="font-exo font-black text-xl sm:text-2xl tracking-normal text-white uppercase mt-1">
              WARSZTAT U SZWAGRA
            </span>
            
            <p className="font-nunito font-light text-[#8090A0] text-sm tracking-wide">
              Grudziądz · ul. Groblowa 13a
            </p>
          </div>

          {/* Centered decorative rule */}
          <div className="w-[100px] h-[2px] bg-[#F5C518] mx-auto opacity-80" />

          {/* Footer menu links */}
          <nav id="footer-menu" className="flex flex-wrap items-center justify-center gap-6 text-[#5A6070] text-sm font-semibold uppercase">
            <button 
              id="footer-link-fb"
              onClick={() => window.open("https://www.facebook.com/profile.php?id=61566907827371", "_blank")}
              className="hover:text-[#F5C518] transition-colors cursor-pointer"
            >
              Facebook
            </button>
            <span>·</span>
            <button 
              id="footer-link-reviews"
              onClick={() => window.open("https://www.facebook.com/profile.php?id=61566907827371&sk=reviews", "_blank")}
              className="hover:text-[#F5C518] transition-colors cursor-pointer"
            >
              Opinie
            </button>
            <span>·</span>
            <button 
              id="footer-link-contact"
              onClick={() => scrollToSection("kontakt")}
              className="hover:text-[#F5C518] transition-colors cursor-pointer"
            >
              Kontakt
            </button>
          </nav>

          {/* Copyright notice */}
          <div className="space-y-1 text-xs text-[#5A6070] font-light leading-relaxed">
            <p>© 2026 Warsztat u Szwagra · Grudziądz · Wszelkie prawa zastrzeżone</p>
            <p className="opacity-75">Projekt strony stworzony dla warsztatu stolicy dobrej ceny u Szwagra.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
