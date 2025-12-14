import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  ClipboardCheck,
  Crown,
  Flame,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";

/**
 * BRAND / CONTACT
 */
const BRAND = {
  name: "THE SLAT",
  product: "UNISLAT",
  collection: "Signature Collection",
};

const CONTACT = {
  tel: "010-7534-2913",
  kakaoUrl: "https://open.kakao.com/o/sH00Mn6h",
};

/**
 * ELEGANT LUXURY THEME
 */
const THEME = {
  stoneCream: "#fdfcf8",
  warmGreige: "#e5e0d8",
  deepCharcoal: "#1c1917",
  mutedGold: "#c5a065",
  ink: "#120f0e",
  line: "#e5e5e5",
};

/**
 * VIP Estimate model
 * - BASE_PER_M2 / INSTALL_BASE: 실제 단가로 교체 권장
 * - 숫자 노출을 원치 않으면 BASE_PER_M2 = 0 으로 두세요.
 */
const ESTIMATE_MODEL = {
  BASE_PER_M2: 55000, // Demo Price
  INSTALL_BASE: 70000, // Demo Installation fee
  ERROR_RATE: 0.1,
  OPTION_MULTIPLIERS: {
    fabricSignature: 1.2,
    blackout: 1.1,
    pet: 1.0,
    highCeiling: 1.1,
  },
};

/**
 * High-End Imagery (Optimized Unsplash URLs)
 */
const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
      tag: "Signature Fabric",
    },
    {
      src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
      tag: "Hotel Mood",
    },
    {
      src: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=800&auto=format&fit=crop",
      tag: "Detail View",
    },
    {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
      tag: "Wide Space",
    },
  ],
};

function cn(...c) {
  return c.filter(Boolean).join(" ");
}

function formatKRW(n) {
  if (!Number.isFinite(n)) return "-";
  return (Math.round(n / 1000) * 1000).toLocaleString("ko-KR") + "원";
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - 96;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function SafeImage({ src, alt, className = "" }) {
  const [ok, setOk] = useState(Boolean(src));
  if (ok && src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setOk(false)}
        className={className}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "bg-neutral-100 flex items-center justify-center text-neutral-300 text-xs",
        className
      )}
    >
      Image
    </div>
  );
}

/**
 * Typography Injection
 */
function useLuxuryFonts() {
  useEffect(() => {
    const linkId = "the-slat-fonts-v4";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600&family=Noto+Serif+KR:wght@300;400;500;600&display=swap";
      document.head.appendChild(link);
    }

    const styleId = "the-slat-theme-css-v4";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
      :root {
        --stoneCream: ${THEME.stoneCream};
        --greige: ${THEME.warmGreige};
        --charcoal: ${THEME.deepCharcoal};
        --gold: ${THEME.mutedGold};
        --line: ${THEME.line};
      }
      body {
        margin: 0;
        background: var(--stoneCream);
        color: var(--charcoal);
        font-family: "Noto Sans KR", sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      .font-serif { font-family: "Noto Serif KR", serif; }
      .font-sans { font-family: "Noto Sans KR", sans-serif; }
      ::selection { background: rgba(197, 160, 101, 0.2); color: var(--charcoal); }

      @keyframes slatFadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in { animation: slatFadeIn 700ms ease-out both; }
      @media (prefers-reduced-motion: reduce) {
        .animate-fade-in { animation: none; }
      }
    `;
    document.head.appendChild(style);
  }, []);
}

function Badge({ children, tone = "light" }) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium tracking-wide backdrop-blur-md";
  const styles =
    tone === "hero"
      ? {
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.1)",
          color: "#fff",
        }
      : {
          border: `1px solid ${THEME.line}`,
          background: "#fff",
          color: THEME.deepCharcoal,
        };

  return (
    <span className={base} style={styles}>
      {children}
    </span>
  );
}

function Button({ children, onClick, href, variant = "primary", className = "" }) {
  const base =
    "inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-[14px] transition-all duration-300 sm:w-auto rounded-xl";
  const variants = {
    primary: {
      background: THEME.deepCharcoal,
      color: "#fff",
      border: "1px solid transparent",
    },
    gold: {
      background: THEME.mutedGold,
      color: "#fff",
      border: "1px solid transparent",
      boxShadow: "0 4px 14px rgba(197, 160, 101, 0.3)",
    },
    outline: {
      background: "rgba(255,255,255,0.8)",
      color: THEME.deepCharcoal,
      border: `1px solid ${THEME.line}`,
    },
    ghost: {
      background: "transparent",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.3)",
    },
  };

  const style = variants[variant] || variants.primary;

  const content = (
    <>
      {children} <ArrowUpRight className="h-4 w-4 opacity-70" />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(base, "hover:-translate-y-0.5", className)}
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(base, "hover:-translate-y-0.5", className)}
      style={style}
    >
      {content}
    </button>
  );
}

function TopNotice() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-[#f5f2eb] border-b border-[#e5e5e5] relative z-50">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-center sm:justify-between text-[12px] text-neutral-600">
        <div className="flex items-center gap-2">
          <Crown size={12} className="text-[#c5a065]" />
          <span>
            이번 달 <span className="font-bold text-[#1c1917]">Private Consultation</span> 무료
            혜택, 마감 임박
          </span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 opacity-50 hover:opacity-100 sm:static sm:translate-y-0"
          type="button"
          aria-label="닫기"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

function VIPEstimate() {
  const [inputs, setInputs] = useState({
    widthCm: 300,
    heightCm: 230,
    count: 1,
    space: "거실",
    collection: "Signature",
    blackout: "Standard",
    pet: "No",
    ceiling: "Standard",
  });

  const [todayCount, setTodayCount] = useState(17);
  useEffect(() => setTodayCount(17 + Math.floor(Math.random() * 5)), []);

  const [toast, setToast] = useState("");
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const estimate = useMemo(() => {
    const w = Math.max(60, Number(inputs.widthCm) || 0) / 100;
    const h = Math.max(120, Number(inputs.heightCm) || 0) / 100;
    const c = Math.min(10, Math.max(1, Number(inputs.count) || 1));
    const area = w * h * c;

    let mult = 1;
    if (inputs.collection === "Signature") mult *= ESTIMATE_MODEL.OPTION_MULTIPLIERS.fabricSignature;
    if (inputs.blackout === "Enhanced") mult *= ESTIMATE_MODEL.OPTION_MULTIPLIERS.blackout;
    if (inputs.pet === "Yes") mult *= ESTIMATE_MODEL.OPTION_MULTIPLIERS.pet;
    if (inputs.ceiling === "High") mult *= ESTIMATE_MODEL.OPTION_MULTIPLIERS.highCeiling;

    const raw = area * ESTIMATE_MODEL.BASE_PER_M2 * mult + ESTIMATE_MODEL.INSTALL_BASE;
    const min = Math.round(raw * (1 - ESTIMATE_MODEL.ERROR_RATE));
    const max = Math.round(raw * (1 + ESTIMATE_MODEL.ERROR_RATE));

    const memo =
      `[${BRAND.name} | ${BRAND.collection} 프라이빗 견적]\n` +
      `공간: ${inputs.space}\n` +
      `사이즈: ${Math.round(w * 100)} x ${Math.round(h * 100)} cm\n` +
      `창 개수: ${c}개\n` +
      `옵션: ${inputs.collection} / 암막(${inputs.blackout}) / 반려동물(${inputs.pet}) / 천장(${inputs.ceiling})\n` +
      `사진: 거실 전경 1장 + 창 디테일 1장 (가능하면)\n`;

    return {
      area,
      min,
      max,
      memo,
      show: ESTIMATE_MODEL.BASE_PER_M2 > 0,
    };
  }, [inputs]);

  const copyAndOpen = async () => {
    try {
      await navigator.clipboard.writeText(estimate.memo);
      setToast("견적서가 복사되었습니다. 카톡 상담창에 붙여넣어 주세요.");
      // 일부 모바일 브라우저는 window.open 차단 가능
      window.open(CONTACT.kakaoUrl, "_blank");
    } catch {
      setToast("복사가 제한된 환경입니다. 아래 내용을 길게 눌러 복사해 주세요.");
    }
  };

  return (
    <div className="mt-16 bg-white rounded-[24px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.08)] border border-[#e5e5e5] overflow-hidden relative">
      {/* Toast */}
      {toast ? (
        <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-[#1c1917] px-4 py-2 text-[12px] text-white shadow-lg">
          {toast}
        </div>
      ) : null}

      <div className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Input Form */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a065]"></span>
              <span className="text-[11px] font-bold tracking-widest text-neutral-400">INSTANT QUOTE</span>
            </div>
            <h3 className="font-serif text-2xl text-[#1c1917]">공간의 가치를 계산해보세요</h3>
            <p className="text-sm text-neutral-500 mt-2 font-light">
              입력하신 기준으로 <span className="text-[#c5a065]">Signature Collection</span> 예상 범위를 안내합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[12px] font-bold text-neutral-500 mb-1 block">설치 공간</label>
              <select
                className="w-full h-12 px-4 rounded-lg bg-[#f9f9f9] border border-[#eee] text-sm focus:border-[#c5a065] outline-none transition-colors"
                value={inputs.space}
                onChange={(e) => setInputs({ ...inputs, space: e.target.value })}
              >
                <option value="거실">거실 (Living Room)</option>
                <option value="안방">안방 (Master Room)</option>
                <option value="서재/기타">서재/기타</option>
              </select>
            </div>

            <div>
              <label className="text-[12px] font-bold text-neutral-500 mb-1 block">가로 (cm)</label>
              <input
                type="number"
                className="w-full h-12 px-4 rounded-lg bg-[#f9f9f9] border border-[#eee] text-sm focus:border-[#c5a065] outline-none transition-colors"
                value={inputs.widthCm}
                onChange={(e) => setInputs({ ...inputs, widthCm: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[12px] font-bold text-neutral-500 mb-1 block">세로 (cm)</label>
              <input
                type="number"
                className="w-full h-12 px-4 rounded-lg bg-[#f9f9f9] border border-[#eee] text-sm focus:border-[#c5a065] outline-none transition-colors"
                value={inputs.heightCm}
                onChange={(e) => setInputs({ ...inputs, heightCm: e.target.value })}
              />
            </div>

            <div className="col-span-2">
              <label className="text-[12px] font-bold text-neutral-500 mb-1 block">창 개수</label>
              <select
                className="w-full h-12 px-4 rounded-lg bg-[#f9f9f9] border border-[#eee] text-sm focus:border-[#c5a065] outline-none transition-colors"
                value={inputs.count}
                onChange={(e) => setInputs({ ...inputs, count: e.target.value })}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}개
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2 flex gap-2 pt-2">
              <button
                onClick={() =>
                  setInputs({ ...inputs, pet: inputs.pet === "Yes" ? "No" : "Yes" })
                }
                type="button"
                className={cn(
                  "flex-1 py-3 rounded-lg text-xs font-bold border transition-all",
                  inputs.pet === "Yes"
                    ? "border-[#c5a065] text-[#c5a065] bg-[#c5a065]/10"
                    : "border-[#eee] text-neutral-400"
                )}
              >
                반려동물 {inputs.pet === "Yes" ? "Yes" : "No"}
              </button>

              <button
                onClick={() =>
                  setInputs({
                    ...inputs,
                    blackout: inputs.blackout === "Enhanced" ? "Standard" : "Enhanced",
                  })
                }
                type="button"
                className={cn(
                  "flex-1 py-3 rounded-lg text-xs font-bold border transition-all",
                  inputs.blackout === "Enhanced"
                    ? "border-[#1c1917] text-[#1c1917] bg-[#1c1917]/5"
                    : "border-[#eee] text-neutral-400"
                )}
              >
                암막 강화 {inputs.blackout === "Enhanced" ? "Yes" : "No"}
              </button>
            </div>

            <div className="col-span-2">
              <button
                onClick={() =>
                  setInputs({
                    ...inputs,
                    ceiling: inputs.ceiling === "High" ? "Standard" : "High",
                  })
                }
                type="button"
                className={cn(
                  "w-full py-3 rounded-lg text-xs font-bold border transition-all",
                  inputs.ceiling === "High"
                    ? "border-[#1c1917] text-[#1c1917] bg-[#1c1917]/5"
                    : "border-[#eee] text-neutral-400"
                )}
              >
                천장 높음 {inputs.ceiling === "High" ? "Yes" : "No"}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Result Card */}
        <div className="bg-[#1c1917] rounded-2xl p-8 text-white flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-32 bg-[#c5a065] opacity-5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-[10px] text-white/50 tracking-widest mb-1">
                  ESTIMATED COST
                </div>
                <div className="font-serif text-3xl sm:text-4xl text-[#c5a065]">
                  {estimate.show
                    ? `${formatKRW(estimate.min)} ~ ${formatKRW(estimate.max)}`
                    : "Private Quote"}
                </div>
                <div className="text-xs text-white/40 mt-2 font-light">
                  * {inputs.space} · {inputs.widthCm}x{inputs.heightCm}cm · {inputs.count}개 (자재+시공 기준)
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">오늘 확인된 견적</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Flame size={14} className="text-[#c5a065] fill-[#c5a065]" /> {todayCount}건
                </span>
              </div>

              <div className="text-[12px] text-white/45 font-light leading-relaxed">
                정확한 범위는 창 구조/레일/원단 옵션에 따라 달라질 수 있습니다. 사진 1~2장 첨부 시 안내가 가장 빠릅니다.
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 space-y-3">
            <button
              onClick={copyAndOpen}
              className="w-full py-4 rounded-xl bg-[#c5a065] text-[#1c1917] font-bold text-sm hover:bg-[#d6b176] transition-colors flex items-center justify-center gap-2"
              type="button"
            >
              <ClipboardCheck size={16} /> VIP 혜택 적용하여 상담하기
            </button>
            <div className="text-center text-[10px] text-white/30">
              * 버튼을 누르면 견적서가 복사되고, 카톡 상담으로 연결됩니다.
            </div>
          </div>
        </div>
      </div>

      {/* Fallback memo block (copy restricted environments) */}
      <div className="px-8 pb-8 sm:px-12 sm:pb-10">
        <div className="text-[11px] font-bold tracking-widest text-neutral-400 mb-2">MEMO</div>
        <pre className="whitespace-pre-wrap rounded-xl border border-[#eee] bg-[#fafafa] p-4 text-[12px] text-neutral-600">
          {estimate.memo}
        </pre>
      </div>
    </div>
  );
}

function ReviewCard({ who, text, rating = 5 }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-[#e5e5e5] hover:shadow-lg transition-shadow duration-500">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={12} className="fill-[#c5a065] text-[#c5a065]" />
        ))}
      </div>
      <p className="font-serif text-[15px] leading-relaxed text-[#1c1917] mb-6">“{text}”</p>
      <div className="flex items-center gap-3 pt-6 border-t border-[#f5f5f5]">
        <div className="w-8 h-8 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[10px] font-bold text-[#c5a065]">
          VIP
        </div>
        <div>
          <div className="text-xs font-bold text-[#1c1917]">{who}</div>
          <div className="text-[10px] text-neutral-400">Signature Collection</div>
        </div>
      </div>
    </div>
  );
}

function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-[#e5e5e5] sm:hidden">
      <div className="p-3 flex gap-2">
        <a
          href={`tel:${CONTACT.tel}`}
          className="flex-1 py-3.5 rounded-xl border border-[#e5e5e5] bg-white text-[#1c1917] font-bold text-sm flex items-center justify-center gap-2"
        >
          <PhoneCall size={16} /> 전화 상담
        </a>
        <button
          onClick={() => scrollToId("estimate")}
          className="flex-[2] py-3.5 rounded-xl bg-[#1c1917] text-white font-bold text-sm flex items-center justify-center gap-2"
          type="button"
        >
          <MessageCircle size={16} /> 프라이빗 견적 확인
        </button>
      </div>
    </div>
  );
}

export default function App() {
  useLuxuryFonts();

  return (
    <div className="min-h-screen pb-24 sm:pb-0">
      <TopNotice />

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#fdfcf8]/90 backdrop-blur-md border-b border-[#e5e5e5]">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-sans font-black text-xl tracking-widest text-[#1c1917]">
              {BRAND.name}
            </h1>
            <span className="hidden sm:inline-block text-[10px] tracking-widest text-neutral-400 uppercase border-l border-neutral-300 pl-4">
              High-end Window Styling
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToId("estimate")}
              className="hidden sm:inline-flex px-5 py-2.5 bg-[#1c1917] text-white text-xs font-bold rounded-lg hover:bg-[#333] transition-colors"
              type="button"
            >
              VIP 견적 확인
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex gap-2 mb-6 animate-fade-in">
              <Badge tone="light">Premium Styling</Badge>
              <Badge tone="light">Private Consultation</Badge>
            </div>
            <h2 className="font-serif text-5xl sm:text-7xl leading-[1.1] text-[#1c1917] mb-8">
              당신의 거실,
              <br />
              <span className="text-[#c5a065] italic">5성급 호텔 라운지</span>가
              <br />
              됩니다.
            </h2>
            <p className="font-sans text-neutral-500 text-lg leading-relaxed max-w-lg mb-10 font-light">
              빛과 바람이 머무는 곳. 커튼의 우아함과 블라인드의 기능을 넘어선, 더슬렛 시그니처 컬렉션을 만나보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => scrollToId("estimate")} variant="primary">
                예상 시공 견적 확인하기
              </Button>
              <Button href={CONTACT.kakaoUrl} variant="outline">
                프라이빗 상담 신청
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Image Background (Desktop) */}
        <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-0 lg:block hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdfcf8] via-[#fdfcf8]/80 to-transparent z-10"></div>
          <SafeImage src={IMAGES.hero} alt="Luxury Interior" className="w-full h-full object-cover" />
        </div>

        {/* Mobile Hero Image */}
        <div className="lg:hidden mt-12 px-4">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
            <SafeImage src={IMAGES.hero} alt="Luxury Interior" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* PROBLEM & SOLUTION */}
      <section className="py-24 bg-white border-y border-[#e5e5e5]">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-3 block">
              Philosophy
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#1c1917]">
              “아름다움은
              <br />
              <span className="italic text-[#888]">편안함</span>에서 시작됩니다”
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#f9f9f9] rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-white border border-[#eee] flex items-center justify-center mb-6 text-[#c5a065]">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-serif text-xl mb-3">완벽한 관리의 자유</h4>
              <p className="text-sm text-neutral-500 leading-relaxed font-light">
                무거운 커튼 세탁의 부담을 내려놓으세요. 오염된 부분만 가볍게 떼어내 관리하는 혁신적인 시스템입니다.
              </p>
            </div>

            <div className="p-8 bg-[#f9f9f9] rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-white border border-[#eee] flex items-center justify-center mb-6 text-[#c5a065]">
                <ArrowUpRight size={20} />
              </div>
              <h4 className="font-serif text-xl mb-3">끊김 없는 동선</h4>
              <p className="text-sm text-neutral-500 leading-relaxed font-light">
                닫혀 있어도 자유롭게 드나들 수 있습니다. 바람과 사람의 길을 막지 않는 워크스루(Walk-through) 디자인.
              </p>
            </div>

            <div className="p-8 bg-[#f9f9f9] rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-white border border-[#eee] flex items-center justify-center mb-6 text-[#c5a065]">
                <Star size={20} />
              </div>
              <h4 className="font-serif text-xl mb-3">호텔식 칼주름</h4>
              <p className="text-sm text-neutral-500 leading-relaxed font-light">
                형상 기억 가공으로 언제나 처음 같은 핏을 유지합니다. 당신의 거실은 언제나 정돈되어 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY & REVIEWS */}
      <section className="py-24 bg-[#1c1917] text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-3 block">
                Gallery & Reviews
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl">
                선택하는 사람이
                <br />
                분위기를 증명합니다
              </h3>
            </div>
            <p className="text-white/40 text-sm font-light max-w-md text-right">
              반포, 한남, 송도 등 하이엔드 주거 공간에서 선택받은 시그니처 스타일링을 확인하세요.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {IMAGES.gallery.map((img, i) => (
              <div key={i} className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-800">
                <SafeImage
                  src={img.src}
                  alt="Gallery"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-bold tracking-widest text-white/80 border border-white/20 px-2 py-1 rounded backdrop-blur-sm">
                    {img.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReviewCard
              who="반포 자이 시공 고객님"
              text="창 라인이 정돈되니 거실 전체가 ‘호텔 라운지’처럼 바뀌었습니다. 공간의 밀도가 달라 보여요."
            />
            <ReviewCard
              who="한남 더힐 시공 고객님"
              text="빛이 들어오는 결이 정말 고급스럽습니다. 기능보다 분위기의 차이가 압도적이었어요."
            />
            <ReviewCard
              who="송도 더샵 시공 고객님"
              text="거실 무드가 안정감 있게 잡히고, 사진이 잘 나옵니다. ‘완성된 인테리어’가 됐어요."
            />
          </div>
        </div>
      </section>

      {/* VIP ESTIMATE */}
      <section id="estimate" className="py-24 bg-[#fdfcf8]">
        <div className="mx-auto max-w-4xl px-4">
          <VIPEstimate />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-white border-t border-[#e5e5e5] text-neutral-400 text-xs">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <strong className="text-[#1c1917] text-lg block mb-2">{BRAND.name}</strong>
            <p>Premium Window Styling Solution</p>
          </div>
          <div className="text-right">
            <p>Contact. {CONTACT.tel}</p>
            <p>© 2024 All rights reserved.</p>
          </div>
        </div>
      </footer>

      <StickyCTA />
    </div>
  );
}
