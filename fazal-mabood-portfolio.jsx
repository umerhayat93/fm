import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = ["Home","About","Journey","Sports","Leadership","Achievements","Contact"];

const STATS = [
  { value: 50, suffix: "+", label: "International Projects" },
  { value: 12, suffix: "+", label: "Years Leadership" },
  { value: 8, suffix: "+", label: "Sports Initiatives" },
  { value: 30, suffix: "+", label: "Global Partnerships" },
];

const JOURNEY = [
  { year: "2024", title: "Project Manager – Overseas Sales", org: "PURRPLAY Amusement Equipment Co. Ltd, China", desc: "Leading international sales operations and global client partnerships from China." },
  { year: "2022", title: "PhD Completion", org: "Academic Excellence", desc: "Achieved doctoral degree, combining rigorous research with real-world executive application." },
  { year: "2020", title: "BPL Franchise Owner & Sponsor", org: "Lahore Badshah – BPL", desc: "Founded and sponsored Lahore Badshah, driving sports promotion and youth engagement." },
  { year: "2018", title: "International Business Lead", org: "China Operations", desc: "Expanded global business networks and established key international commercial bridges." },
  { year: "2015", title: "Sports Development Advocate", org: "Youth Empowerment Initiative", desc: "Championed grassroots sports programs and youth mentorship across Pakistan." },
];

const SPORTS = [
  { icon: "🏏", title: "Lahore Badshah", sub: "BPL Franchise Owner & Sponsor", desc: "Actively owning and sponsoring Lahore Badshah in BPL, fostering cricket culture and youth talent." },
  { icon: "🏆", title: "Youth Development", sub: "Talent Cultivation", desc: "Mentoring the next generation of athletes and leaders through structured sports programs." },
  { icon: "🌍", title: "Global Sports Bridge", sub: "International Outreach", desc: "Connecting Pakistan's sporting community with international platforms and opportunities." },
  { icon: "⚡", title: "Sports Promotion", sub: "Grassroots to Elite", desc: "Driving sporting activities at all levels, from community events to national leagues." },
];

const LEADERSHIP = [
  { icon: "🌐", title: "Global Business Leadership", desc: "Navigating complex international markets with strategic clarity and executive precision." },
  { icon: "🤝", title: "International Partnerships", desc: "Building lasting bridges between China, Pakistan, and global business ecosystems." },
  { icon: "🎯", title: "Strategic Management", desc: "Transforming vision into measurable outcomes through disciplined project execution." },
  { icon: "💡", title: "Innovation Mindset", desc: "Embracing emerging market trends and technology to stay ahead in a dynamic world." },
  { icon: "👥", title: "Team Building", desc: "Cultivating high-performance multicultural teams united by shared purpose." },
  { icon: "📈", title: "Growth Architect", desc: "Designing scalable strategies that create sustainable value across borders." },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimCounter({ target, suffix, inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span>{count}{suffix}</span>;
}

function Navbar({ active, setActive, dark, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActive(id);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      transition: "all 0.4s ease",
      background: scrolled ? (dark ? "rgba(5,5,10,0.88)" : "rgba(255,255,255,0.88)") : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${dark ? "rgba(180,145,80,0.15)" : "rgba(0,0,0,0.06)"}` : "none",
      padding: "0 5vw",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 20, letterSpacing: 2, color: dark ? "#c9a84c" : "#1a1a2e" }}>FM</span>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="desktop-nav">
          {NAV_ITEMS.map(item => (
            <button key={item} onClick={() => scrollTo(item)}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, letterSpacing: 1.5, textTransform: "uppercase", color: active === item ? "#c9a84c" : (dark ? "#ccc" : "#333"), fontWeight: active === item ? 700 : 400, padding: "4px 0", borderBottom: active === item ? "1px solid #c9a84c" : "1px solid transparent", transition: "all 0.3s" }}>
              {item}
            </button>
          ))}
          <button onClick={toggleDark} style={{ background: "none", border: `1px solid ${dark ? "#c9a84c" : "#999"}`, borderRadius: 20, padding: "4px 12px", cursor: "pointer", color: dark ? "#c9a84c" : "#555", fontSize: 12 }}>{dark ? "☀" : "🌙"}</button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: dark ? "#c9a84c" : "#1a1a2e", fontSize: 24 }}>☰</button>
      </div>
      {menuOpen && (
        <div style={{ background: dark ? "rgba(5,5,10,0.97)" : "rgba(255,255,255,0.97)", padding: "16px 0 24px", borderTop: "1px solid rgba(180,145,80,0.2)" }}>
          {NAV_ITEMS.map(item => (
            <button key={item} onClick={() => scrollTo(item)} style={{ display: "block", width: "100%", textAlign: "center", background: "none", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, letterSpacing: 2, textTransform: "uppercase", color: dark ? "#ccc" : "#333", padding: "12px 0" }}>{item}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero({ dark }) {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
    const fn = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const gx = 30 + mousePos.x * 40;
  const gy = 30 + mousePos.y * 40;

  return (
    <section id="home" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden",
      background: dark ? `radial-gradient(ellipse at ${gx}% ${gy}%, #0f0a1e 0%, #05050a 60%, #0a0810 100%)` : `radial-gradient(ellipse at ${gx}% ${gy}%, #f0e8d0 0%, #e8e0f0 50%, #d0d8f0 100%)`,
      transition: "background 0.8s ease" }}>

      {/* Floating orbs */}
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: dark ? "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)" : "radial-gradient(circle, rgba(180,120,40,0.06) 0%, transparent 70%)", top: "-10%", right: "-10%", pointerEvents: "none", animation: "floatOrb 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: dark ? "radial-gradient(circle, rgba(100,120,200,0.07) 0%, transparent 70%)" : "radial-gradient(circle, rgba(80,100,180,0.05) 0%, transparent 70%)", bottom: "10%", left: "-5%", pointerEvents: "none", animation: "floatOrb 10s ease-in-out infinite reverse" }} />

      {/* Grid overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${dark ? "rgba(201,168,76,0.03)" : "rgba(26,26,46,0.03)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(201,168,76,0.03)" : "rgba(26,26,46,0.03)"} 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 5vw 60px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 60, width: "100%" }}>
        
        {/* Text content */}
        <div style={{ flex: "1 1 400px", zIndex: 2 }}>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(42px, 7vw, 88px)", fontWeight: 900, lineHeight: 1.0, color: dark ? "#f0ece0" : "#0d0d1a", letterSpacing: -2, marginBottom: 24 }}>
              FAZAL<br /><span style={{ color: "#c9a84c" }}>MABOOD</span>
            </h1>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(15px, 2.2vw, 20px)", color: dark ? "rgba(220,210,190,0.85)" : "rgba(30,20,60,0.75)", lineHeight: 1.6, marginBottom: 12, fontStyle: "italic" }}>Overseas Sales Department Project Manager</p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(13px, 1.8vw, 16px)", color: "#c9a84c", letterSpacing: 1, marginBottom: 32 }}>PURRPLAY Amusement Equipment Co. Ltd · China</p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(16px, 2.5vw, 22px)", color: dark ? "rgba(240,236,224,0.7)" : "rgba(26,26,46,0.6)", lineHeight: 1.7, marginBottom: 48, fontStyle: "italic" }}>"Empowering Sports, Inspiring Youth,<br />Building International Connections."</p>
            
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[{ label: "Explore Profile", primary: true }, { label: "Sports Legacy", primary: false }, { label: "Contact", primary: false }].map(btn => (
                <button key={btn.label} style={{ padding: "14px 28px", borderRadius: 2, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s ease", background: btn.primary ? "#c9a84c" : "transparent", color: btn.primary ? "#0d0d1a" : (dark ? "#c9a84c" : "#1a1a2e"), border: btn.primary ? "none" : "1px solid " + (dark ? "#c9a84c" : "#1a1a2e"), fontWeight: btn.primary ? 700 : 500 }}
                  onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(201,168,76,0.3)"; }}
                  onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Profile image */}
        <div style={{ flex: "0 1 340px", display: "flex", justifyContent: "center", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)", transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 280, height: 340, borderRadius: 4, background: dark ? "linear-gradient(145deg, #1a1428, #0d0a1a)" : "linear-gradient(145deg, #e8e0d0, #d8d0e8)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "2px solid rgba(201,168,76,0.3)", boxShadow: dark ? "0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(201,168,76,0.08)" : "0 40px 80px rgba(0,0,0,0.15), 0 0 60px rgba(201,168,76,0.1)", position: "relative" }}>
              {/* Profile photo */}
              <img src="./fm.jpg" alt="Fazal Mabood" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
              {/* Gold corner accents */}
              <div style={{ position: "absolute", top: 12, left: 12, width: 24, height: 24, borderTop: "2px solid #c9a84c", borderLeft: "2px solid #c9a84c" }} />
              <div style={{ position: "absolute", top: 12, right: 12, width: 24, height: 24, borderTop: "2px solid #c9a84c", borderRight: "2px solid #c9a84c" }} />
              <div style={{ position: "absolute", bottom: 12, left: 12, width: 24, height: 24, borderBottom: "2px solid #c9a84c", borderLeft: "2px solid #c9a84c" }} />
              <div style={{ position: "absolute", bottom: 12, right: 12, width: 24, height: 24, borderBottom: "2px solid #c9a84c", borderRight: "2px solid #c9a84c" }} />
            </div>
            {/* Status badge */}
            <div style={{ position: "absolute", bottom: -16, left: "50%", transform: "translateX(-50%)", background: "#c9a84c", color: "#0d0d1a", padding: "8px 20px", borderRadius: 2, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(201,168,76,0.4)" }}>📍 China</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", textAlign: "center", animation: "bounce 2s ease-in-out infinite" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: dark ? "rgba(201,168,76,0.6)" : "rgba(26,26,46,0.4)", marginBottom: 8 }}>Scroll</p>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #c9a84c, transparent)", margin: "0 auto" }} />
      </div>
    </section>
  );
}

function About({ dark }) {
  const [ref, inView] = useInView();
  return (
    <section id="about" ref={ref} style={{ padding: "120px 5vw", background: dark ? "#05050a" : "#faf8f4", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 80, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 340px", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>About</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: dark ? "#f0ece0" : "#0d0d1a", lineHeight: 1.1, marginBottom: 32, letterSpacing: -1 }}>
              Executive.<br />Scholar.<br /><span style={{ color: "#c9a84c" }}>Champion.</span>
            </h2>
            <div style={{ width: 60, height: 2, background: "linear-gradient(to right, #c9a84c, transparent)", marginBottom: 32 }} />
            {/* Stats row */}
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[{ n: "PhD", l: "Academic" }, { n: "China", l: "Based" }, { n: "BPL", l: "Owner" }].map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 800, color: "#c9a84c" }}>{s.n}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: dark ? "rgba(220,210,190,0.5)" : "rgba(26,26,46,0.4)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: "1 1 400px", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(16px, 2.2vw, 20px)", color: dark ? "rgba(220,210,190,0.8)" : "rgba(26,26,46,0.75)", lineHeight: 1.9, marginBottom: 24 }}>
              Fazal Mabood is currently residing in <strong style={{ color: "#c9a84c" }}>China</strong> and serving as Overseas Sales Department Project Manager at <strong style={{ color: dark ? "#f0ece0" : "#0d0d1a" }}>PURRPLAY AMUSEMENT EQUIPMENT CO. LTD</strong>.
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(16px, 2.2vw, 20px)", color: dark ? "rgba(220,210,190,0.8)" : "rgba(26,26,46,0.75)", lineHeight: 1.9, marginBottom: 24 }}>
              Having completed his <strong style={{ color: "#c9a84c" }}>PhD</strong>, he combines academic excellence with international business expertise and leadership. He is deeply passionate about sports development, youth empowerment, and the promotion of sporting activities.
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(16px, 2.2vw, 20px)", color: dark ? "rgba(220,210,190,0.8)" : "rgba(26,26,46,0.75)", lineHeight: 1.9 }}>
              As the owner and sponsor of <strong style={{ color: "#c9a84c" }}>Lahore Badshah in BPL</strong>, he continues to bridge international opportunities while inspiring future generations through leadership, management, and sports initiatives.
            </p>
            <div style={{ marginTop: 40, padding: 32, borderLeft: "3px solid #c9a84c", background: dark ? "rgba(201,168,76,0.04)" : "rgba(201,168,76,0.04)", borderRadius: "0 4px 4px 0" }}>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontStyle: "italic", color: dark ? "#c9a84c" : "#8b6914", lineHeight: 1.6 }}>"With a vision for global collaboration and innovation, he continues to bridge international opportunities while inspiring future generations."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Journey({ dark }) {
  const [ref, inView] = useInView();
  return (
    <section id="journey" ref={ref} style={{ padding: "120px 5vw", background: dark ? "#070710" : "#f4f0ea", position: "relative" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#c9a84c", marginBottom: 12 }}>Timeline</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: dark ? "#f0ece0" : "#0d0d1a", letterSpacing: -1 }}>Professional Journey</h2>
        </div>
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, #c9a84c 10%, #c9a84c 90%, transparent)`, transform: "translateX(-50%)" }} />
          {JOURNEY.map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: i % 2 === 0 ? "flex-start" : "flex-end", marginBottom: 60, position: "relative", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s` }}>
              <div style={{ width: "44%", padding: "28px 32px", background: dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)", border: `1px solid ${dark ? "rgba(201,168,76,0.2)" : "rgba(201,168,76,0.25)"}`, borderRadius: 4, backdropFilter: "blur(10px)", boxShadow: dark ? "0 20px 60px rgba(0,0,0,0.3)" : "0 20px 60px rgba(0,0,0,0.06)", position: "relative" }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 900, color: "rgba(201,168,76,0.25)", position: "absolute", top: 16, right: 20 }}>{item.year}</span>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#c9a84c", marginBottom: 8 }}>{item.year}</p>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: dark ? "#f0ece0" : "#0d0d1a", marginBottom: 6 }}>{item.title}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, color: "#c9a84c", marginBottom: 12, fontStyle: "italic" }}>{item.org}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15, color: dark ? "rgba(220,210,190,0.65)" : "rgba(26,26,46,0.6)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
              {/* Dot */}
              <div style={{ position: "absolute", left: "50%", top: 28, width: 12, height: 12, borderRadius: "50%", background: "#c9a84c", transform: "translateX(-50%)", boxShadow: "0 0 16px rgba(201,168,76,0.6)" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sports({ dark }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(null);
  return (
    <section id="sports" ref={ref} style={{ padding: "120px 5vw", background: dark ? "#05050a" : "#faf8f4", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: dark ? "radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.05) 0%, transparent 60%)" : "radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ marginBottom: 80, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#c9a84c", marginBottom: 12 }}>Passion</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: dark ? "#f0ece0" : "#0d0d1a", letterSpacing: -1 }}>Sports & Youth<br /><span style={{ color: "#c9a84c" }}>Empowerment</span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 28 }}>
          {SPORTS.map((s, i) => (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ padding: 36, background: hov === i ? (dark ? "rgba(201,168,76,0.08)" : "rgba(201,168,76,0.07)") : (dark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.8)"), border: `1px solid ${hov === i ? "rgba(201,168,76,0.5)" : (dark ? "rgba(255,255,255,0.06)" : "rgba(26,26,46,0.08)")}`, borderRadius: 4, transition: "all 0.4s ease", cursor: "default", transform: hov === i ? "translateY(-6px)" : "translateY(0)", boxShadow: hov === i ? "0 24px 60px rgba(201,168,76,0.15)" : "none", opacity: inView ? 1 : 0, transitionDelay: `${i * 0.1}s` }}>
              <div style={{ fontSize: 40, marginBottom: 20 }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: dark ? "#f0ece0" : "#0d0d1a", marginBottom: 6 }}>{s.title}</h3>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, color: "#c9a84c", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>{s.sub}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: dark ? "rgba(220,210,190,0.65)" : "rgba(26,26,46,0.6)", lineHeight: 1.8 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leadership({ dark }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(null);
  return (
    <section id="leadership" ref={ref} style={{ padding: "120px 5vw", background: dark ? "#070710" : "#f4f0ea" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#c9a84c", marginBottom: 12 }}>Vision</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: dark ? "#f0ece0" : "#0d0d1a", letterSpacing: -1 }}>Leadership &<br /><span style={{ color: "#c9a84c" }}>Global Vision</span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {LEADERSHIP.map((l, i) => (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ padding: 40, background: hov === i ? "linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.04))" : (dark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.7)"), border: `1px solid ${hov === i ? "#c9a84c" : (dark ? "rgba(255,255,255,0.05)" : "rgba(26,26,46,0.08)")}`, borderRadius: 4, transition: "all 0.35s ease", transform: hov === i ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)", boxShadow: hov === i ? "0 20px 50px rgba(201,168,76,0.12)" : "none", opacity: inView ? 1 : 0, transitionDelay: `${i * 0.08}s` }}>
              <div style={{ fontSize: 36, marginBottom: 20 }}>{l.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: dark ? "#f0ece0" : "#0d0d1a", marginBottom: 16 }}>{l.title}</h3>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: dark ? "rgba(220,210,190,0.65)" : "rgba(26,26,46,0.6)", lineHeight: 1.8 }}>{l.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements({ dark }) {
  const [ref, inView] = useInView();
  return (
    <section id="achievements" ref={ref} style={{ padding: "120px 5vw", background: dark ? "#05050a" : "#faf8f4", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: dark ? "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)" : "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 80, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#c9a84c", marginBottom: 12 }}>Impact</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: dark ? "#f0ece0" : "#0d0d1a", letterSpacing: -1 }}>Achievements in<br /><span style={{ color: "#c9a84c" }}>Numbers</span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "48px 24px", background: dark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.8)", border: `1px solid ${dark ? "rgba(201,168,76,0.15)" : "rgba(201,168,76,0.2)"}`, borderRadius: 4, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 900, color: "#c9a84c", lineHeight: 1, marginBottom: 16 }}>
                <AnimCounter target={s.value} suffix={s.suffix} inView={inView} />
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, letterSpacing: 2, textTransform: "uppercase", color: dark ? "rgba(220,210,190,0.5)" : "rgba(26,26,46,0.5)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ dark }) {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" ref={ref} style={{ padding: "120px 5vw", background: dark ? "#070710" : "#f4f0ea", position: "relative" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#c9a84c", marginBottom: 12 }}>Connect</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: dark ? "#f0ece0" : "#0d0d1a", letterSpacing: -1 }}>Let's Build<br /><span style={{ color: "#c9a84c" }}>Something Global</span></h2>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: dark ? "rgba(220,210,190,0.6)" : "rgba(26,26,46,0.55)", marginTop: 16, fontStyle: "italic" }}>Based in China · Available Worldwide</p>
        </div>

        {sent ? (
          <div style={{ textAlign: "center", padding: "60px 32px", background: dark ? "rgba(201,168,76,0.06)" : "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 4, opacity: inView ? 1 : 0, transition: "all 0.8s 0.3s" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>✉️</div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, color: "#c9a84c", marginBottom: 12 }}>Message Sent</h3>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: dark ? "rgba(220,210,190,0.7)" : "rgba(26,26,46,0.6)" }}>Thank you for reaching out. Fazal will respond shortly.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, flexWrap: "wrap", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s 0.2s" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              {[{ key: "name", label: "Full Name", type: "text" }, { key: "email", label: "Email Address", type: "email" }].map(f => (
                <div key={f.key} style={{ position: "relative", marginBottom: 28 }}>
                  <input type={f.type} placeholder={f.label} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ width: "100%", background: dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)", border: `1px solid ${dark ? "rgba(201,168,76,0.2)" : "rgba(26,26,46,0.15)"}`, borderRadius: 2, padding: "18px 20px", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: dark ? "#f0ece0" : "#0d0d1a", outline: "none", boxSizing: "border-box", letterSpacing: 0.5 }} />
                </div>
              ))}
              <div style={{ marginBottom: 28 }}>
                <textarea rows={5} placeholder="Your Message" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{ width: "100%", background: dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)", border: `1px solid ${dark ? "rgba(201,168,76,0.2)" : "rgba(26,26,46,0.15)"}`, borderRadius: 2, padding: "18px 20px", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: dark ? "#f0ece0" : "#0d0d1a", outline: "none", resize: "vertical", boxSizing: "border-box", letterSpacing: 0.5 }} />
              </div>
              <button onClick={() => setSent(true)}
                style={{ padding: "16px 48px", background: "#c9a84c", color: "#0d0d1a", border: "none", borderRadius: 2, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 40px rgba(201,168,76,0.4)"; }}
                onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>
                Send Message
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer({ dark }) {
  return (
    <footer style={{ padding: "60px 5vw 40px", background: dark ? "#03030a" : "#0d0d1a", textAlign: "center" }}>
      <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 800, color: "#c9a84c", letterSpacing: 4, marginBottom: 24 }}>FAZAL MABOOD</p>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(14px, 2vw, 18px)", fontStyle: "italic", color: "rgba(201,168,76,0.6)", lineHeight: 1.8, maxWidth: 600, margin: "0 auto 32px" }}>
        "Leadership through vision, sportsmanship through passion,<br />and success through global collaboration."
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 32, flexWrap: "wrap" }}>
        {["LinkedIn", "Twitter", "BPL", "China Office"].map(s => (
          <span key={s} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "rgba(201,168,76,0.5)", cursor: "pointer", transition: "color 0.3s" }}
            onMouseEnter={e => e.target.style.color = "#c9a84c"} onMouseLeave={e => e.target.style.color = "rgba(201,168,76,0.5)"}>
            {s}
          </span>
        ))}
      </div>
      <div style={{ width: 60, height: 1, background: "rgba(201,168,76,0.2)", margin: "0 auto 24px" }} />
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, color: "rgba(201,168,76,0.3)", letterSpacing: 1 }}>© 2025 Fazal Mabood · All Rights Reserved · PURRPLAY Amusement Equipment Co. Ltd</p>
    </footer>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("Home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      const p = (window.scrollY / (d.scrollHeight - d.clientHeight)) * 100;
      setProgress(Math.min(p, 100));
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: dark ? "#05050a" : "#faf8f4", transition: "background 0.5s ease" }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes floatOrb { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-30px) scale(1.05); } }
        @keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        input::placeholder, textarea::placeholder { font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; color: rgba(150,140,120,0.5); }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.4); border-radius: 2px; }
      `}</style>

      {/* Scroll progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, width: `${progress}%`, background: "linear-gradient(to right, #c9a84c, #f0d080)", zIndex: 9999, transition: "width 0.1s linear" }} />

      <Navbar active={active} setActive={setActive} dark={dark} toggleDark={() => setDark(d => !d)} />
      <Hero dark={dark} />
      <About dark={dark} />
      <Journey dark={dark} />
      <Sports dark={dark} />
      <Leadership dark={dark} />
      <Achievements dark={dark} />
      <Contact dark={dark} />
      <Footer dark={dark} />
    </div>
  );
}
