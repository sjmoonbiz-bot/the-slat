import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  Crown,
  ChevronDown,
  MessageCircle,
  MoveHorizontal,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star,
  X,
  BadgeCheck,
  Home,
  Wind,
  Droplets,
  Scissors,
} from "lucide-react";

// ✅ 파일명이 다르면 확장자/이름을 실제 파일명과 100% 맞추세요.
import beforeImg from "./assets/before.webp";
import afterImg from "./assets/after.webp";

/* ---------------- BRAND / CONTACT ---------------- */
const BRAND = {
  nameKo: "더슬렛",
  nameEn: "THE SLAT",
  productKo: "유니슬렛",
  collection: "Signature Collection",
};

const CONTACT = {
  tel: "010-7534-2913",
  kakaoUrl: "https://open.kakao.com/o/sH00Mn6h",
};

/* ---------------- THEME ---------------- */
const THEME = {
  cream: "#fdfcf8",
  greige: "#e5e0d8",
  charcoal: "#1c1917",
  gold: "#c5a065",
  line: "#e5e5e5",
};

/* ---------------- PRICING (예시) ----------------
   - 실제 판매 정책에 맞게 조정하세요.
   - “예상 견적”이므로 범위(±)로 보여줍니다.
*/
const PRICING = {
  BASIC: { name: "Basic Line (산토리니)", price: 49000, desc: "데일리 톤 · 안정적인 텍스처" },
  STANDARD: { name: "Standard Line (라비콤)", price: 55000, desc: "도톰한 두께감 · 고급 질감" },
  PREMIUM: { name: "Premium Line (그린프)", price: 62000, desc: "정돈된 핏 · 차광 옵션 추천" },
  INSTALL_FEE: 70000,
  MIN_HEIGHT: 200,
  ERROR_RATE: 0.08,
};
const LINE_KEYS = ["BASIC", "STANDARD", "PREMIUM"];

/* ---------------- IMAGES ----------------
   - hero는 임시(나중에 교체)
*/
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
  before: beforeImg,
  after: afterImg,
  // 갤러리는 임시(나중에 실사진으로 교체 추천)
  gallery: [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
  ],
};

/* ---------------- utils ---------------- */
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}
function formatKRW(n) {
  if (!Number.isFinite(n) || Number.isNaN(n)) return "0원";
  return Math.round(n).toLocaleString("ko-KR") + "원";
}
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - 84;
  window.scrollTo({ top: y, behavior: "smooth" });
}

/* ---------------- fonts + base styles ---------------- */
function useLuxuryFonts() {
  useEffect(() => {
    const fontId = "the-slat-fonts-v2";
    const styleId = "the-slat-style-v2";

    if (!document.getElementById(fontId)) {
      const pre1 = document.createElement("link");
      pre1.rel = "preconnect";
      pre1.href = "https://fonts.googleapis.com";

      const pre2 = document.createElement("link");
      pre2.rel = "preconnect";
      pre2.href = "https://fonts.gstatic.com";
      pre2.crossOrigin = "anonymous";

      const link = document.createElement("link");
      link.id = fontId;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@300;400;500;600&display=swap";

      document.head.appendChild(pre1);
      document.head.appendChild(pre2);
      document.head.appendChild(link);
    }

    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        body{
          margin:0;
          background:${THEME.cream};
          color:${THEME.charcoal};
          font-family:"Noto Sans KR", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, "Apple SD Gothic Neo","Malgun Gothic", sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        .font-serif{ font-family:"Noto Serif KR", ui-serif, Georgia, "Times New Roman", serif !important; }
        .font-sans{ font-family:"Noto Sans KR", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, "Apple SD Gothic Neo","Malgun Gothic", sans-serif !important; }
        ::selection{ background: rgba(197,160,101,0.25); color:${THEME.charcoal}; }
      `;
      document.head.appendChild(style);
    }
  }, []);
}

/* ---------------- toast ---------------- */
function Toast({ open, title, desc, actions, onClose }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose?.(), 4500);
    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed z-[60] left-1/2 -translate-x-1/2 bottom-24 sm:bottom-8 w-[min(92vw,520px)]">
      <div className="bg-white/95 backdrop-blur-xl border border-[#e5e5e5] shadow-2xl rounded-2xl p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-[#1c1917]">{title}</div>
            {desc ? <div className="mt-1 text-xs text-neutral-500 leading-relaxed">{desc}</div> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -m-2 opacity-60 hover:opacity-100"
            aria-label="닫기"
          >
            <X size={16} />
          </button>
        </div>

        {actions ? <div className="mt-3 flex flex-col sm:flex-row gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}

/* ---------------- motion ---------------- */
function useScrollFade() {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const node = domRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => setIsVisible(e.isIntersecting)),
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [isVisible, domRef];
}

function FadeSection({ children, delay = "0ms" }) {
  const [isVisible, domRef] = useScrollFade();
  return (
    <div
      ref={domRef}
      className={cn(
        "transition-all duration-1000 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
}

/* ---------------- UI atoms ---------------- */
function Pill({ children, tone = "light" }) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide border backdrop-blur";
  if (tone === "gold") {
    return (
      <span className={base} style={{ borderColor: "rgba(197,160,101,0.35)", background: "rgba(197,160,101,0.10)", color: THEME.charcoal }}>
        {children}
      </span>
    );
  }
  if (tone === "dark") {
    return (
      <span className={base} style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.18)", color: "#fff" }}>
        {children}
      </span>
    );
  }
  return (
    <span className={base} style={{ borderColor: THEME.line, background: "rgba(255,255,255,0.75)", color: THEME.charcoal }}>
      {children}
    </span>
  );
}

function Button({ children, onClick, href, variant = "primary", className = "" }) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-4 sm:px-8 text-[14px] sm:text-base font-medium transition-all duration-300 rounded-xl relative overflow-hidden group w-full sm:w-auto";
  const variants = {
    primary: "bg-[#1c1917] text-white hover:bg-[#000]",
    gold: "bg-[#c5a065] text-white shadow-lg shadow-[#c5a065]/25 hover:bg-[#b08d55]",
    outline: "bg-white/80 border border-[#e5e5e5] text-[#1c1917] hover:bg-white",
  };
  const content = (
    <span className="relative z-10 flex items-center gap-2 justify-center">
      {children} <ArrowUpRight size={16} />
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], "hover:-translate-y-1 active:scale-[0.98]", className)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(base, variants[variant], "hover:-translate-y-1 active:scale-[0.98]", className)}
    >
      {content}
    </button>
  );
}

/* ---------------- top notice (non-deceptive) ---------------- */
function TopNotice() {
  const [visible, setVisible] = useState(() => {
    try {
      return localStorage.getItem("ts_notice_closed") !== "1";
    } catch {
      return true;
    }
  });

  if (!visible) return null;

  return (
    <div className="bg-[#f5f2eb] border-b border-[#e5e5e5] relative z-50">
      <div className="mx-auto max-w-6xl px-4 py-2.5 flex items-center justify-between text-[11px] sm:text-[12px] text-neutral-600">
        <div className="flex items-center gap-2 w-full justify-center sm:justify-start">
          <Crown size={14} className="text-[#c5a065]" />
          <span className="truncate">
            실측 상담은 일정이 제한되어 <span className="font-bold text-[#1c1917]">조기 마감</span>될 수 있습니다.
          </span>
        </div>
        <button
          onClick={() => {
            try {
              localStorage.setItem("ts_notice_closed", "1");
            } catch {}
            setVisible(false);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 opacity-50 hover:opacity-100 sm:static sm:translate-y-0"
          type="button"
          aria-label="닫기"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative pt-12 sm:pt-20 pb-14 sm:pb-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <FadeSection>
          <div className="flex flex-wrap gap-2 mb-5 sm:mb-6 justify-center lg:justify-start">
            <Pill tone="gold">
              <BadgeCheck size={14} className="text-[#c5a065]" />
              Premium Styling
            </Pill>
            <Pill>Private Consultation</Pill>
            <Pill>Signature Collection</Pill>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-[1.12] text-[#1c1917] mb-6 sm:mb-8 text-center lg:text-left">
            당신의 거실,
            <br />
            <span className="italic" style={{ color: THEME.gold }}>
              5성급 호텔 라운지
            </span>
            가
            <br />
            됩니다.
          </h2>

          <p className="text-neutral-500 text-sm sm:text-lg leading-relaxed max-w-xl mb-8 sm:mb-10 font-light text-center lg:text-left mx-auto lg:mx-0 break-keep">
            빛과 바람이 머무는 곳. 커튼의 우아함과 블라인드의 정돈을 한 번에.
            <span className="text-[#1c1917] font-normal"> {BRAND.nameKo} {BRAND.collection}</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <Button onClick={() => scrollToId("estimate")} variant="gold">
              예상 견적 먼저 보기
            </Button>
            <Button onClick={() => scrollToId("consult")} variant="outline">
              상담 신청서 30초 작성
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto lg:mx-0">
            <div className="bg-white/80 border border-[#e5e5e5] rounded-2xl p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1c1917]">
                <Wind size={16} className="text-[#c5a065]" /> 동선이 막히지 않는 결
              </div>
              <div className="mt-1 text-xs text-neutral-500 font-light leading-relaxed">
                닫혀 있어도 ‘가로막는 커튼’이 아니라, 공간의 흐름을 유지합니다.
              </div>
            </div>
            <div className="bg-white/80 border border-[#e5e5e5] rounded-2xl p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1c1917]">
                <Droplets size={16} className="text-[#c5a065]" /> 관리 난이도 하향
              </div>
              <div className="mt-1 text-xs text-neutral-500 font-light leading-relaxed">
                생활 오염이 쌓여도, “전체를 떼는” 방식이 아니라 손이 덜 갑니다.
              </div>
            </div>
            <div className="bg-white/80 border border-[#e5e5e5] rounded-2xl p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1c1917]">
                <Home size={16} className="text-[#c5a065]" /> 사진이 잘 나오는 창
              </div>
              <div className="mt-1 text-xs text-neutral-500 font-light leading-relaxed">
                창 라인의 정돈감이 무드를 고정시킵니다. (거실의 ‘완성도’)
              </div>
            </div>
          </div>
        </FadeSection>
      </div>

      {/* right hero image */}
      <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-0 lg:block hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdfcf8] via-[#fdfcf8]/80 to-transparent z-10" />
        <img src={IMAGES.hero} alt="hero" className="w-full h-full object-cover" loading="eager" decoding="async" />
      </div>

      {/* mobile hero image */}
      <div className="lg:hidden mt-10 px-4">
        <div className="rounded-2xl overflow-hidden aspect-[4/3] relative shadow-xl">
          <img src={IMAGES.hero} alt="hero" className="w-full h-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- BEFORE/AFTER (fixed) ---------------- */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef(null);

  const SCALE = 1.08;
  const POS = "50% 55%";

  const updateByClientX = (clientX) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clamp(clientX - rect.left, 0, rect.width);
    setPos((x / rect.width) * 100);
  };

  const onPointerDown = (e) => {
    setDragging(true);
    updateByClientX(e.clientX);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    updateByClientX(e.clientX);
  };
  const endDrag = () => setDragging(false);

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-[#e5e5e5]">
      <div className="mx-auto max-w-6xl px-4">
        <FadeSection>
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-2 block">
              BEFORE / AFTER
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#1c1917]">전후 차이가 ‘설명’입니다</h3>
            <p className="text-neutral-500 text-sm mt-3">핸들을 드래그해서 비교하세요.</p>
          </div>
        </FadeSection>

        <div
          ref={ref}
          className={cn(
            "relative w-full max-w-4xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden select-none shadow-2xl",
            dragging ? "cursor-ew-resize" : "cursor-default"
          )}
          style={{ touchAction: "pan-y" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
        >
          <img
            src={IMAGES.before}
            alt="시공 전"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: `scale(${SCALE})`, transformOrigin: "center", objectPosition: POS }}
            draggable={false}
            loading="eager"
            decoding="async"
          />
          <div className="absolute top-4 left-4 bg-[#1c1917] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            BEFORE
          </div>

          <img
            src={IMAGES.after}
            alt="시공 후"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: `scale(${SCALE})`,
              transformOrigin: "center",
              objectPosition: POS,
              clipPath: `inset(0 ${100 - pos}% 0 0)`,
              WebkitClipPath: `inset(0 ${100 - pos}% 0 0)`,
            }}
            draggable={false}
            loading="eager"
            decoding="async"
          />
          <div className="absolute top-4 right-4 bg-[#c5a065] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            AFTER
          </div>

          <div
            className="absolute top-0 bottom-0 w-1 bg-white z-20 shadow-[0_0_10px_rgba(0,0,0,0.45)]"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-[#1c1917]">
              <MoveHorizontal size={18} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- VALUE (mechanism explained elegantly) ---------------- */
function ValueProps() {
  const items = [
    {
      icon: <Scissors size={18} className="text-[#c5a065]" />,
      title: "부분 관리 · 부분 교체",
      desc: "전체를 바꾸는 방식이 아니라, ‘필요한 부분만’ 손이 닿는 구조로 설계됩니다.",
    },
    {
      icon: <Wind size={18} className="text-[#c5a065]" />,
      title: "막는 커튼이 아니라 ‘정돈되는 결’",
      desc: "빛과 시야를 조율하면서도, 공간이 답답해 보이지 않는 라인을 만듭니다.",
    },
    {
      icon: <ShieldCheck size={18} className="text-[#c5a065]" />,
      title: "실측 후 확정되는 투명한 흐름",
      desc: "예상 견적 → 실측 상담 → 최종 확정. 단계별로 결정 부담을 줄입니다.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#fdfcf8]">
      <div className="mx-auto max-w-6xl px-4">
        <FadeSection>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-2 block">
              WHY {BRAND.productKo.toUpperCase()}
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#1c1917]">
              기능이 아니라, <span className="italic" style={{ color: THEME.gold }}>공간의 가치</span>가 바뀝니다
            </h3>
            <p className="mt-3 text-sm text-neutral-500 font-light leading-relaxed max-w-2xl mx-auto">
              매일 마주하는 거실. 관리는 덜어내고, 아름다움만 남기는 방향으로.
            </p>
          </div>
        </FadeSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {items.map((it, idx) => (
            <FadeSection key={idx} delay={`${idx * 80}ms`}>
              <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 sm:p-7 h-full">
                <div className="w-11 h-11 rounded-full bg-[#c5a065]/10 border border-[#c5a065]/20 flex items-center justify-center">
                  {it.icon}
                </div>
                <div className="mt-4 font-serif text-lg sm:text-xl text-[#1c1917]">{it.title}</div>
                <div className="mt-2 text-sm text-neutral-500 font-light leading-relaxed">{it.desc}</div>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- COMPARISON TABLE (decision closer) ---------------- */
function Comparison() {
  const rows = [
    { label: "첫인상(무드)", curtain: "포근하지만 무거움", blind: "정갈하지만 차가움", unislat: "정돈 + 우아함" },
    { label: "채광 조절", curtain: "△", blind: "◎", unislat: "◎" },
    { label: "관리 난이도", curtain: "세탁 부담 큼", blind: "먼지·슬랫 변형", unislat: "부분 관리에 유리" },
    { label: "동선/개방감", curtain: "가림/답답함", blind: "막힘은 적음", unislat: "흐름 유지(개방감)" },
    { label: "사생활 보호", curtain: "○", blind: "○", unislat: "◎(각도 조절)" },
    { label: "장기 유지", curtain: "원단 노후", blind: "슬랫 휘어짐", unislat: "부분 교체로 유지" },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-[#e5e5e5]">
      <div className="mx-auto max-w-6xl px-4">
        <FadeSection>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-2 block">
              DECISION GUIDE
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#1c1917]">고민을 끝내는 1분 비교</h3>
            <p className="mt-3 text-sm text-neutral-500 font-light leading-relaxed max-w-2xl mx-auto">
              “왜 다들 바꾸는지”가 표로 보면 바로 정리됩니다.
            </p>
          </div>
        </FadeSection>

        <div className="bg-[#fdfcf8] border border-[#e5e5e5] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-4 text-xs sm:text-sm">
            <div className="p-4 sm:p-5 font-bold text-neutral-500">항목</div>
            <div className="p-4 sm:p-5 font-bold text-neutral-600">일반 커튼</div>
            <div className="p-4 sm:p-5 font-bold text-neutral-600">일반 블라인드</div>
            <div className="p-4 sm:p-5 font-bold text-[#1c1917] bg-white border-l border-[#e5e5e5]">
              {BRAND.productKo}
              <span className="ml-2 text-[10px] sm:text-xs text-[#c5a065] font-bold tracking-widest">RECOMMENDED</span>
            </div>
          </div>

          <div className="divide-y divide-[#e5e5e5]">
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-4 text-xs sm:text-sm">
                <div className="p-4 sm:p-5 font-medium text-[#1c1917]">{r.label}</div>
                <div className="p-4 sm:p-5 text-neutral-600">{r.curtain}</div>
                <div className="p-4 sm:p-5 text-neutral-600">{r.blind}</div>
                <div className="p-4 sm:p-5 bg-white border-l border-[#e5e5e5] text-[#1c1917] font-medium">
                  {r.unislat}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 text-center">
          <Button onClick={() => scrollToId("estimate")} variant="gold">
            비교 끝났으면, 견적부터 확인
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ESTIMATE ---------------- */
function RealEstimate({ onCopied }) {
  const [inputs, setInputs] = useState({
    widthCm: 300,
    heightCm: 230,
    count: 1,
    line: "STANDARD",
  });

  const [todayCount, setTodayCount] = useState(0);
  useEffect(() => setTodayCount(14 + Math.floor(Math.random() * 17)), []);

  const result = useMemo(() => {
    const w = Math.max(0, Number(inputs.widthCm) || 0);
    const h = Math.max(Number(inputs.heightCm) || 0, PRICING.MIN_HEIGHT);
    const c = clamp(Number(inputs.count) || 1, 1, 10);

    const hebe = (w * h) / 10000 * c;
    const unit = PRICING[inputs.line]?.price ?? PRICING.STANDARD.price;
    const raw = hebe * unit + PRICING.INSTALL_FEE;

    const min = Math.floor((raw * (1 - PRICING.ERROR_RATE)) / 1000) * 1000;
    const mid = Math.floor(raw / 1000) * 1000;
    const max = Math.floor((raw * (1 + PRICING.ERROR_RATE)) / 1000) * 1000;

    return {
      hebe: hebe.toFixed(2),
      min,
      mid,
      max,
      lineName: PRICING[inputs.line]?.name ?? PRICING.STANDARD.name,
    };
  }, [inputs]);

  const copyEstimate = async () => {
    const text =
      `[${BRAND.nameKo} | ${BRAND.productKo} 상담]\n` +
      `라인: ${PRICING[inputs.line]?.name}\n` +
      `사이즈: ${inputs.widthCm} x ${inputs.heightCm} cm\n` +
      `창 개수: ${inputs.count}개\n` +
      `예상 견적: 약 ${formatKRW(result.mid)} (범위 ${formatKRW(result.min)} ~ ${formatKRW(result.max)})\n`;

    try {
      await navigator.clipboard.writeText(text);
      onCopied?.(text);
    } catch {
      onCopied?.(text, true);
    }
  };

  return (
    <div className="mt-8 sm:mt-10 bg-white rounded-[20px] sm:rounded-[24px] shadow-lg border border-[#e5e5e5] overflow-hidden">
      <div className="p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator size={16} className="text-[#c5a065]" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-neutral-400">ESTIMATE</span>
            </div>
            <div className="text-[11px] text-neutral-500 font-light">
              🔥 오늘 <span className="font-medium text-[#1c1917]">{todayCount}명</span> 견적 확인
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#1c1917]">예상 견적 먼저 확인하기</h3>
            <p className="text-sm text-neutral-500 mt-2 font-light leading-relaxed">
              숫자를 먼저 보면 결정이 빨라집니다. <span className="text-[#1c1917]">실측 후 최종 확정</span>됩니다.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[12px] font-bold text-neutral-500 mb-2 block">라인업 선택</label>
              <div className="grid gap-2">
                {LINE_KEYS.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setInputs((p) => ({ ...p, line: k }))}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all flex items-center justify-between",
                      inputs.line === k
                        ? "border-[#c5a065] bg-[#c5a065]/5 ring-1 ring-[#c5a065]"
                        : "border-[#eee] hover:border-[#ccc]"
                    )}
                  >
                    <div>
                      <div className="text-sm font-bold text-[#1c1917]">{PRICING[k].name}</div>
                      <div className="text-xs text-neutral-400 mt-0.5">{PRICING[k].desc}</div>
                    </div>
                    {inputs.line === k ? <CheckCircle2 size={18} className="text-[#c5a065]" /> : null}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-[12px] font-bold text-neutral-500 mb-2 block">가로(cm)</label>
                <input
                  type="number"
                  className="w-full h-12 px-4 rounded-xl bg-[#f9f9f9] border border-[#eee] text-base focus:border-[#c5a065] outline-none"
                  value={inputs.widthCm}
                  onChange={(e) => setInputs((p) => ({ ...p, widthCm: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-[12px] font-bold text-neutral-500 mb-2 block">세로(cm)</label>
                <input
                  type="number"
                  className="w-full h-12 px-4 rounded-xl bg-[#f9f9f9] border border-[#eee] text-base focus:border-[#c5a065] outline-none"
                  value={inputs.heightCm}
                  onChange={(e) => setInputs((p) => ({ ...p, heightCm: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-[12px] font-bold text-neutral-500 mb-2 block">창 개수</label>
                <select
                  className="w-full h-12 px-4 rounded-xl bg-[#f9f9f9] border border-[#eee] text-base focus:border-[#c5a065] outline-none"
                  value={inputs.count}
                  onChange={(e) => setInputs((p) => ({ ...p, count: e.target.value }))}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}개
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <div className="w-full bg-[#f9f9f9] border border-[#eee] rounded-xl px-4 py-3">
                  <div className="text-[10px] text-neutral-400 font-bold tracking-widest">INCLUDED</div>
                  <div className="text-xs text-neutral-600 mt-1">자재 + 기본 시공/출장비</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1c1917] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-32 bg-[#c5a065] opacity-5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10">
            <div className="text-[10px] text-white/50 tracking-widest mb-2">TOTAL ESTIMATE</div>
            <div className="text-xs text-white/70 font-light">{result.lineName} · {result.hebe}회배</div>

            <div className="mt-4 font-serif text-4xl sm:text-5xl text-[#c5a065] tracking-tight">
              약 {formatKRW(result.mid)}
            </div>
            <div className="mt-2 text-xs text-white/55 font-light">
              범위 {formatKRW(result.min)} ~ {formatKRW(result.max)}
            </div>

            <div className="mt-7 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60 text-xs sm:text-sm">상담 체감</span>
                <span className="flex items-center gap-1.5 font-medium text-xs sm:text-sm">
                  <Sparkles size={14} className="text-[#c5a065]" /> 빠르게 정리됨
                </span>
              </div>
              <div className="mt-3 text-xs text-white/45 font-light leading-relaxed">
                견적을 복사해서 보내면, 옵션/구성 안내가 훨씬 빨라집니다.
              </div>
            </div>
          </div>

          <button
            onClick={copyEstimate}
            type="button"
            className="relative z-10 mt-6 sm:mt-8 w-full py-4 rounded-xl bg-[#c5a065] text-[#1c1917] font-bold text-sm hover:bg-[#d6b176] transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <ClipboardCheck size={16} /> 견적 메모 복사하고 상담하기
          </button>

          <div className="relative z-10 mt-3 text-[11px] text-white/40 font-light leading-relaxed">
            * 예상 견적은 입력값 기준이며, 실측 후 최종 확정됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- CONSULT FORM (lead capture) ---------------- */
function ConsultForm({ onSubmitted }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    region: "",
    windows: "거실 1 + 방 1",
    schedule: "평일 오후",
    note: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "이름을 입력해주세요.";
    if (!form.phone.trim()) e.phone = "연락처를 입력해주세요.";
    // 아주 느슨한 검증
    const digits = form.phone.replace(/[^\d]/g, "");
    if (digits.length < 9) e.phone = "연락처 형식이 올바르지 않습니다.";
    if (!form.region.trim()) e.region = "지역을 입력해주세요.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMessage = () => {
    return (
      `[${BRAND.nameKo} | ${BRAND.productKo} 상담 신청]\n` +
      `이름: ${form.name}\n` +
      `연락처: ${form.phone}\n` +
      `지역: ${form.region}\n` +
      `창 구성: ${form.windows}\n` +
      `희망 시간: ${form.schedule}\n` +
      (form.note ? `요청사항: ${form.note}\n` : "")
    );
  };

  const submit = async () => {
    if (!validate()) return;
    const text = buildMessage();

    try {
      await navigator.clipboard.writeText(text);
      onSubmitted?.(text);
    } catch {
      onSubmitted?.(text, true);
    }
  };

  return (
    <div className="mt-8 sm:mt-10 bg-white border border-[#e5e5e5] rounded-2xl p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold tracking-widest text-[#c5a065] uppercase">PRIVATE REQUEST</div>
          <div className="mt-2 font-serif text-2xl text-[#1c1917]">상담 신청서 30초</div>
          <div className="mt-2 text-sm text-neutral-500 font-light leading-relaxed">
            “지금 통화는 부담”이어도 괜찮습니다. 남겨주시면 순서대로 안내드립니다.
          </div>
        </div>
        <Pill tone="gold">
          <BadgeCheck size={14} className="text-[#c5a065]" />
          정보는 상담 목적 외 사용하지 않습니다
        </Pill>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[12px] font-bold text-neutral-600 mb-2 block">이름</label>
          <input
            className={cn(
              "w-full h-12 px-4 rounded-xl bg-[#f9f9f9] border text-base outline-none focus:border-[#c5a065]",
              errors.name ? "border-red-300" : "border-[#eee]"
            )}
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="예) 홍길동"
          />
          {errors.name ? <div className="mt-1 text-xs text-red-500">{errors.name}</div> : null}
        </div>

        <div>
          <label className="text-[12px] font-bold text-neutral-600 mb-2 block">연락처</label>
          <input
            className={cn(
              "w-full h-12 px-4 rounded-xl bg-[#f9f9f9] border text-base outline-none focus:border-[#c5a065]",
              errors.phone ? "border-red-300" : "border-[#eee]"
            )}
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            placeholder="예) 010-1234-5678"
          />
          {errors.phone ? <div className="mt-1 text-xs text-red-500">{errors.phone}</div> : null}
        </div>

        <div>
          <label className="text-[12px] font-bold text-neutral-600 mb-2 block">지역</label>
          <input
            className={cn(
              "w-full h-12 px-4 rounded-xl bg-[#f9f9f9] border text-base outline-none focus:border-[#c5a065]",
              errors.region ? "border-red-300" : "border-[#eee]"
            )}
            value={form.region}
            onChange={(e) => setForm((p) => ({ ...p, region: e.target.value }))}
            placeholder="예) 부산 해운대 / 연제구"
          />
          {errors.region ? <div className="mt-1 text-xs text-red-500">{errors.region}</div> : null}
        </div>

        <div>
          <label className="text-[12px] font-bold text-neutral-600 mb-2 block">창 구성</label>
          <select
            className="w-full h-12 px-4 rounded-xl bg-[#f9f9f9] border border-[#eee] text-base outline-none focus:border-[#c5a065]"
            value={form.windows}
            onChange={(e) => setForm((p) => ({ ...p, windows: e.target.value }))}
          >
            <option>거실 1</option>
            <option>거실 1 + 방 1</option>
            <option>거실 1 + 방 2</option>
            <option>방만 1~2</option>
            <option>잘 모르겠음(상담으로 정리)</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="text-[12px] font-bold text-neutral-600 mb-2 block">희망 시간</label>
          <select
            className="w-full h-12 px-4 rounded-xl bg-[#f9f9f9] border border-[#eee] text-base outline-none focus:border-[#c5a065]"
            value={form.schedule}
            onChange={(e) => setForm((p) => ({ ...p, schedule: e.target.value }))}
          >
            <option>평일 오전</option>
            <option>평일 오후</option>
            <option>평일 저녁</option>
            <option>주말</option>
            <option>상관 없음</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="text-[12px] font-bold text-neutral-600 mb-2 block">요청사항(선택)</label>
          <textarea
            className="w-full min-h-[96px] px-4 py-3 rounded-xl bg-[#f9f9f9] border border-[#eee] text-sm outline-none focus:border-[#c5a065]"
            value={form.note}
            onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
            placeholder="예) 통창/확장형 거실, 반려동물 있음, 암막 우선, 타공/무타공 문의 등"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={submit}
          className="flex-[1.2] py-4 rounded-xl bg-[#1c1917] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-black active:scale-[0.98]"
        >
          <ClipboardCheck size={16} /> 신청서 복사하고 카톡으로 보내기
        </button>

        <a
          href={`tel:${CONTACT.tel}`}
          className="flex-1 py-4 rounded-xl border border-[#e5e5e5] bg-white text-[#1c1917] font-bold text-sm flex items-center justify-center gap-2 hover:bg-neutral-50 active:scale-[0.98]"
        >
          <PhoneCall size={16} /> 바로 전화 상담
        </a>
      </div>

      <div className="mt-3 text-[11px] text-neutral-500 font-light leading-relaxed">
        * 제출 버튼은 신청서를 <span className="text-[#1c1917] font-normal">클립보드에 복사</span>합니다. 복사 후 카톡 상담창에 붙여넣어주세요.
      </div>
    </div>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      q: "견적이 왜 ‘범위’로 나오나요?",
      a: "창 구조/마감/설치 난이도에 따라 변동이 있어 예상 범위로 안내됩니다. 실측 후 최종 확정됩니다.",
    },
    {
      q: "사생활 보호는 괜찮나요?",
      a: "각도 조절로 채광/시야를 조율할 수 있습니다. 환경에 맞춘 각도 설정까지 안내드립니다.",
    },
    {
      q: "관리(세탁/오염)는 실제로 쉬운가요?",
      a: "생활 오염은 ‘전체를 떼어내는’ 방식이 아니라, 상황에 맞춘 관리 방법을 안내드리는 쪽에 가깝습니다. 상담 시 집 환경 기준으로 정리해드립니다.",
    },
  ];

  return (
    <div className="mt-14 sm:mt-20 max-w-3xl mx-auto">
      <div className="text-center mb-8 sm:mb-10">
        <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-2 block">FAQ</span>
        <h3 className="font-serif text-xl sm:text-2xl text-[#1c1917]">구매 전, 꼭 확인하세요</h3>
        <p className="text-neutral-500 text-xs sm:text-sm mt-2 font-light">자주 묻는 질문만 짧게 정리했습니다.</p>
      </div>

      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="border border-[#e5e5e5] rounded-xl bg-white overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-5 py-4 sm:px-6 sm:py-5 text-left flex justify-between items-start sm:items-center hover:bg-[#fcfcfc] gap-4"
              type="button"
            >
              <span className={cn("font-medium text-[14px] sm:text-[15px]", openIndex === i ? "text-[#c5a065]" : "text-[#1c1917]")}>
                Q. {f.q}
              </span>
              <ChevronDown
                size={18}
                className={cn(
                  "text-neutral-400 shrink-0 mt-0.5 sm:mt-0 transition-transform",
                  openIndex === i ? "rotate-180 text-[#c5a065]" : ""
                )}
              />
            </button>

            <div className={cn("overflow-hidden transition-[max-height] duration-300 ease-in-out", openIndex === i ? "max-h-56" : "max-h-0")}>
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-[13px] sm:text-[14px] leading-relaxed text-neutral-600">
                <span className="font-bold text-[#1c1917] mr-1">A.</span> {f.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- SOCIAL PROOF (safe) ---------------- */
function SocialProof() {
  const reviews = [
    { who: "부산 해운대 / 34평 고객", text: "창 라인이 정돈되니 거실이 한 톤 올라간 느낌이에요. ‘완성된 인테리어’가 됐습니다." },
    { who: "부산 연제 / 신혼집 고객", text: "빛이 들어오는 결이 고급스럽고 깔끔합니다. 집 분위기가 안정적으로 잡혀요." },
    { who: "부산 수영 / 통창 거실 고객", text: "확장형 거실이라 창이 큰데도 정돈감이 좋아요. 사진이 확실히 잘 나옵니다." },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#1c1917] text-white">
      <div className="mx-auto max-w-6xl px-4">
        <FadeSection>
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 sm:mb-12 gap-6">
            <div>
              <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-2 block">REVIEWS</span>
              <h3 className="font-serif text-2xl sm:text-4xl leading-tight">분위기는<br />선택이 증명합니다</h3>
            </div>
            <p className="text-white/45 text-xs sm:text-sm font-light max-w-md text-left md:text-right">
              실제 거주 환경에서 체감되는 변화(무드/정돈/빛)를 중심으로 정리했습니다.
            </p>
          </div>
        </FadeSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((r, i) => (
            <FadeSection key={i} delay={`${i * 90}ms`}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={14} className="text-[#c5a065] fill-[#c5a065]" />
                  ))}
                </div>
                <div className="font-serif text-[15px] leading-relaxed">
                  “{r.text}”
                </div>
                <div className="mt-6 pt-5 border-t border-white/10 text-xs text-white/70">
                  {r.who}
                </div>
              </div>
            </FadeSection>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {IMAGES.gallery.map((src, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/10 border border-white/10">
              <img src={src} alt="gallery" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MOBILE STICKY ---------------- */
function MobileSticky() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-[#e5e5e5] sm:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="p-3 flex gap-2">
        <a
          href={`tel:${CONTACT.tel}`}
          className="flex-1 py-3.5 rounded-xl border border-[#e5e5e5] bg-white text-[#1c1917] font-bold text-sm flex items-center justify-center gap-2 active:bg-neutral-50"
        >
          <PhoneCall size={16} /> 전화
        </a>
        <button
          onClick={() => scrollToId("estimate")}
          className="flex-[1.2] py-3.5 rounded-xl bg-[#1c1917] text-white font-bold text-sm flex items-center justify-center gap-2 active:bg-neutral-800 shadow-lg shadow-black/10"
          type="button"
        >
          <Calculator size={16} /> 견적
        </button>
        <button
          onClick={() => scrollToId("consult")}
          className="flex-[1.4] py-3.5 rounded-xl bg-[#c5a065] text-white font-bold text-sm flex items-center justify-center gap-2 active:opacity-90 shadow-lg shadow-[#c5a065]/20"
          type="button"
        >
          <MessageCircle size={16} /> 상담
        </button>
      </div>
    </div>
  );
}

/* ---------------- APP ---------------- */
export default function App() {
  useLuxuryFonts();

  const [toast, setToast] = useState({ open: false, title: "", desc: "", actions: null });

  const openToastCopied = (text, failedCopy = false) => {
    const title = failedCopy ? "복사 권한이 제한되었습니다" : "복사 완료";
    const desc = failedCopy
      ? "브라우저 정책으로 자동 복사가 막혔습니다. 아래 버튼으로 카톡을 열고, 필요한 내용을 직접 복사해 보내주세요."
      : "카톡 상담창에 붙여넣으면, 옵션/구성 안내가 빨라집니다.";

    const actions = (
      <>
        <a
          href={CONTACT.kakaoUrl}
          className="flex-1 py-3 rounded-xl bg-[#1c1917] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-black active:scale-[0.98]"
        >
          <MessageCircle size={16} /> 카톡 상담창 열기
        </a>
        <a
          href={`tel:${CONTACT.tel}`}
          className="flex-1 py-3 rounded-xl border border-[#e5e5e5] bg-white text-[#1c1917] text-sm font-bold flex items-center justify-center gap-2 hover:bg-neutral-50 active:scale-[0.98]"
        >
          <PhoneCall size={16} /> 전화 상담
        </a>
      </>
    );

    setToast({ open: true, title, desc, actions });
  };

  return (
    <div className="min-h-screen pb-24 sm:pb-0 bg-[#fdfcf8] font-sans text-[#1c1917] overflow-x-hidden">
      <TopNotice />

      {/* header */}
      <header className="sticky top-0 z-40 bg-[#fdfcf8]/90 backdrop-blur-md border-b border-[#e5e5e5]">
        <div className="mx-auto max-w-6xl px-4 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="leading-none">
              <div className="font-sans font-black text-lg sm:text-xl tracking-widest">{BRAND.nameEn}</div>
              <div className="text-[10px] text-neutral-400 tracking-wide -mt-0.5">{BRAND.nameKo}</div>
            </div>
            <span className="hidden sm:inline-block text-[10px] tracking-widest text-neutral-400 uppercase border-l border-neutral-300 pl-4">
              Premium Window Styling
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scrollToId("estimate")}
              className="px-4 py-2.5 bg-[#1c1917] text-white text-xs font-bold rounded-lg hover:bg-[#333] transition-colors"
              type="button"
            >
              견적 확인
            </button>
            <button
              onClick={() => scrollToId("consult")}
              className="px-4 py-2.5 bg-[#c5a065] text-white text-xs font-bold rounded-lg hover:bg-[#b08d55] transition-colors"
              type="button"
            >
              상담 신청
            </button>
          </div>
        </div>
      </header>

      <Hero />
      <BeforeAfter />
      <ValueProps />
      <Comparison />
      <SocialProof />

      {/* estimate + consult */}
      <section id="estimate" className="py-16 sm:py-20 bg-[#fdfcf8]">
        <div className="mx-auto max-w-4xl px-4">
          <FadeSection>
            <div className="text-center">
              <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-2 block">STEP 1</span>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#1c1917]">가격을 먼저 알고, 마음 편하게 고르세요</h3>
              <p className="mt-3 text-sm text-neutral-500 font-light leading-relaxed">
                예상 견적 확인 → 복사 → 상담. 이 흐름이 가장 빠릅니다.
              </p>
            </div>
          </FadeSection>

          <RealEstimate onCopied={openToastCopied} />

          <div id="consult" className="mt-10">
            <FadeSection>
              <div className="text-center">
                <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-2 block">STEP 2</span>
                <h3 className="font-serif text-2xl sm:text-4xl text-[#1c1917]">상담은 ‘정리’부터 시작됩니다</h3>
                <p className="mt-3 text-sm text-neutral-500 font-light leading-relaxed">
                  신청서만 남겨도, 집 구조에 맞는 옵션을 빠르게 정리해드립니다.
                </p>
              </div>
            </FadeSection>

            <ConsultForm onSubmitted={openToastCopied} />
            <FAQ />
          </div>

          <div className="mt-12 sm:mt-14 bg-white border border-[#e5e5e5] rounded-2xl p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[#c5a065]/10 border border-[#c5a065]/20 flex items-center justify-center shrink-0">
                <BadgeCheck size={18} className="text-[#c5a065]" />
              </div>
              <div>
                <div className="font-serif text-xl text-[#1c1917]">리스크는 줄이고, 확신만 남기세요</div>
                <div className="mt-2 text-sm text-neutral-500 font-light leading-relaxed">
                  <span className="text-[#1c1917] font-normal">실측 후 최종 견적 확정</span>으로 불필요한 오해를 줄이고,
                  설치 환경에 맞춘 옵션을 단계적으로 안내합니다.
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#f9f9f9] border border-[#eee] rounded-xl p-4">
                    <div className="text-xs font-bold text-[#1c1917] flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[#c5a065]" /> 단계형 진행
                    </div>
                    <div className="mt-1 text-xs text-neutral-500 font-light">예상→실측→확정</div>
                  </div>
                  <div className="bg-[#f9f9f9] border border-[#eee] rounded-xl p-4">
                    <div className="text-xs font-bold text-[#1c1917] flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[#c5a065]" /> 집 환경 기준
                    </div>
                    <div className="mt-1 text-xs text-neutral-500 font-light">통창/확장/동선/반려</div>
                  </div>
                  <div className="bg-[#f9f9f9] border border-[#eee] rounded-xl p-4">
                    <div className="text-xs font-bold text-[#1c1917] flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[#c5a065]" /> 빠른 의사결정
                    </div>
                    <div className="mt-1 text-xs text-neutral-500 font-light">견적 메모로 상담 단축</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* footer */}
      <footer className="py-10 sm:py-12 bg-white border-t border-[#e5e5e5] text-neutral-400 text-xs">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-center md:text-left">
          <div>
            <strong className="text-[#1c1917] text-base sm:text-lg block mb-1 sm:mb-2">
              {BRAND.nameEn} · {BRAND.nameKo}
            </strong>
            <p>Premium Window Styling Solution</p>
          </div>
          <div>
            <p className="mb-1">Contact. {CONTACT.tel}</p>
            <p>© {new Date().getFullYear()} {BRAND.nameEn}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <MobileSticky />

      <Toast
        open={toast.open}
        title={toast.title}
        desc={toast.desc}
        actions={toast.actions}
        onClose={() => setToast((p) => ({ ...p, open: false }))}
      />
    </div>
  );
}
