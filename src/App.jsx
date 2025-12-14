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
} from "lucide-react";

/**
 * ✅ 이미지 넣는 위치 (Vite 기준)
 * - public/images/before.webp
 * - public/images/after.webp
 *  ※ jpg면 before.jpg / after.jpg로 바꾸고 IMAGES 경로도 같이 바꾸세요.
 */

const BRAND = {
  name: "더슬렛",
  nameEn: "THE SLAT",
  product: "유니슬렛",
  collection: "시그니처 컬렉션",
};

const CONTACT = {
  tel: "010-7534-2913",
  kakaoUrl: "https://open.kakao.com/o/sH00Mn6h",
};

const PRICING = {
  BASIC: { name: "Basic Line (산토리니)", price: 49000, desc: "가장 무난한 톤 · 데일리 텍스처" },
  STANDARD: { name: "Standard Line (라비콤)", price: 55000, desc: "도톰한 두께감 · 고급 텍스처" },
  PREMIUM: { name: "Premium Line (그린프)", price: 62000, desc: "정돈된 핏 · 차광 옵션 추천" },
  INSTALL_FEE: 70000,
  MIN_HEIGHT: 200,
  ERROR_RATE: 0.08,
};

const LINE_KEYS = ["BASIC", "STANDARD", "PREMIUM"];

const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
  // ✅ 여기만 파일 확장자/경로가 맞아야 합니다.
  before: "/images/before.webp",
  after: "/images/after.webp",
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop",
      tag: "Signature White",
    },
    {
      src: "https://images.unsplash.com/photo-1461988320302-91badd605677?q=80&w=1000&auto=format&fit=crop",
      tag: "Modern Greige",
    },
    {
      src: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1000&auto=format&fit=crop",
      tag: "Detail Cut",
    },
    {
      src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop",
      tag: "Living Room",
    },
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

/* ---------------- typography (실제 적용 보장) ---------------- */
function useLuxuryFonts() {
  useEffect(() => {
    const fontId = "the-slat-fonts-v6";
    const styleId = "the-slat-style-v6";

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
          background:#fdfcf8;
          color:#1c1917;
          font-family:"Noto Sans KR", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple SD Gothic Neo","Malgun Gothic", sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        .font-serif{ font-family:"Noto Serif KR", ui-serif, Georgia, "Times New Roman", serif !important; }
        .font-sans{ font-family:"Noto Sans KR", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple SD Gothic Neo","Malgun Gothic", sans-serif !important; }
        ::selection{ background: rgba(197,160,101,0.25); color:#1c1917; }
      `;
      document.head.appendChild(style);
    }
  }, []);
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
      { threshold: 0.1 }
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

/* ---------------- UI ---------------- */
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

function TopNotice() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-[#f5f2eb] border-b border-[#e5e5e5] relative z-50">
      <div className="mx-auto max-w-6xl px-4 py-2.5 flex items-center justify-between text-[11px] sm:text-[12px] text-neutral-600">
        <div className="flex items-center gap-2 w-full justify-center sm:justify-start">
          <Crown size={14} className="text-[#c5a065]" />
          <span className="truncate">
            프리미엄 윈도우 스타일링 · <span className="font-bold text-[#1c1917]">{BRAND.nameEn}</span>
          </span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 opacity-50 hover:opacity-100 sm:static sm:translate-y-0"
          aria-label="닫기"
          title="닫기"
          type="button"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

function FeatureStrip() {
  const items = [
    { title: "정돈된 라인", desc: "거실의 ‘결’을 정리해 공간이 넓어 보이게 만듭니다." },
    { title: "빛의 각도", desc: "채광을 ‘눈부심’이 아닌 ‘분위기’로 바꿉니다." },
    { title: "유지의 부담 ↓", desc: "관리 난이도를 낮춰, 오래 예쁘게 쓰는 선택이 됩니다." },
  ];

  return (
    <section className="py-14 sm:py-16 bg-[#fdfcf8]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {items.map((it) => (
            <div key={it.title} className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
              <div className="flex items-center gap-2 text-[#c5a065] text-[11px] font-bold tracking-widest uppercase">
                <Sparkles size={14} />
                POINT
              </div>
              <div className="mt-3 font-serif text-lg text-[#1c1917]">{it.title}</div>
              <div className="mt-2 text-sm text-neutral-500 font-light leading-relaxed">{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * ✅ 고정형 Before/After (이미지 자체는 절대 안 움직임)
 * - BEFORE를 바닥에 고정으로 깔고
 * - AFTER를 clip-path로만 잘라서 보여줌
 */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef(null);

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
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <FadeSection>
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-2 block">
              DRAMATIC CHANGE
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#1c1917]">한 장의 비교가 확신이 됩니다</h3>
            <p className="text-neutral-500 text-sm mt-3">
              핸들을 <span className="font-medium text-[#1c1917]">드래그</span>해 전/후 차이를 확인하세요.
            </p>
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
          role="group"
          aria-label="시공 전후 비교 슬라이더"
        >
          {/* BASE: BEFORE */}
          <img
            src={IMAGES.before}
            alt="시공 전 (Before)"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
            draggable={false}
          />
          <div className="absolute top-4 left-4 bg-[#1c1917] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            BEFORE
          </div>

          {/* TOP: AFTER (clip-path) */}
          <img
            src={IMAGES.after}
            alt="시공 후 (After)"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              clipPath: `inset(0 0 0 ${pos}%)`,
              WebkitClipPath: `inset(0 0 0 ${pos}%)`,
            }}
            loading="eager"
            decoding="async"
            draggable={false}
          />
          <div className="absolute top-4 right-4 bg-[#c5a065] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            AFTER
          </div>

          {/* BAR */}
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

function Toast({ show, text }) {
  return (
    <div
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-[60] transition-all duration-300",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      )}
      style={{ bottom: "92px" }}
      aria-live="polite"
    >
      <div className="bg-[#1c1917] text-white text-xs sm:text-sm px-4 py-3 rounded-xl shadow-2xl border border-white/10">
        {text}
      </div>
    </div>
  );
}

function RealEstimate() {
  const [inputs, setInputs] = useState({
    widthCm: 300,
    heightCm: 230,
    count: 1,
    line: "STANDARD",
    pet: false,
  });

  const [todayCount, setTodayCount] = useState(0);
  useEffect(() => setTodayCount(22 + Math.floor(Math.random() * 11)), []);

  const [toast, setToast] = useState({ show: false, text: "" });
  const toastTimer = useRef(null);

  const result = useMemo(() => {
    const w = Math.max(0, Number(inputs.widthCm) || 0);
    const h = Math.max(Number(inputs.heightCm) || 0, PRICING.MIN_HEIGHT);
    const c = clamp(Number(inputs.count) || 1, 1, 10);

    const hebe = (w * h) / 10000 * c;

    const unitPrice = PRICING[inputs.line]?.price ?? PRICING.STANDARD.price;
    const raw = hebe * unitPrice + PRICING.INSTALL_FEE;

    const min = Math.floor((raw * (1 - PRICING.ERROR_RATE)) / 1000) * 1000;
    const mid = Math.floor(raw / 1000) * 1000;
    const max = Math.floor((raw * (1 + PRICING.ERROR_RATE)) / 1000) * 1000;

    return {
      hebe: hebe.toFixed(2),
      min,
      mid,
      max,
      lineName: PRICING[inputs.line]?.name ?? PRICING.STANDARD.name,
      lineDesc: PRICING[inputs.line]?.desc ?? PRICING.STANDARD.desc,
      countApplied: c,
    };
  }, [inputs]);

  const copy = async () => {
    const text =
      `[${BRAND.name} | ${BRAND.product} 상담 요청]\n` +
      `라인: ${result.lineName}\n` +
      `사이즈: ${inputs.widthCm} x ${inputs.heightCm} cm\n` +
      `창 개수: ${result.countApplied}개\n` +
      `반려동물: ${inputs.pet ? "있음(추천 옵션 안내 요청)" : "없음"}\n` +
      `예상 견적: 약 ${formatKRW(result.mid)} (범위 ${formatKRW(result.min)} ~ ${formatKRW(result.max)})\n` +
      `사진: 거실/창 사진 1~2장 첨부 가능\n`;

    try {
      await navigator.clipboard.writeText(text);
      setToast({ show: true, text: "견적 메모가 복사되었습니다. 카톡 상담에 붙여넣기만 하세요." });
    } catch {
      setToast({ show: true, text: "복사에 실패했습니다. (모바일 정책) 텍스트를 직접 복사해 주세요." });
    } finally {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setToast({ show: false, text: "" }), 2200);
      scrollToId("cta");
    }
  };

  return (
    <div className="mt-10 sm:mt-16 bg-white rounded-[20px] sm:rounded-[24px] shadow-lg border border-[#e5e5e5] overflow-hidden relative">
      <div className="p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        {/* INPUTS */}
        <div className="space-y-6 sm:space-y-8">
          <div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Calculator size={16} className="text-[#c5a065]" />
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-neutral-400">
                  ESTIMATE
                </span>
              </div>
              <div className="text-[11px] text-neutral-500 font-light">
                🔥 오늘 <span className="font-medium text-[#1c1917]">{todayCount}명</span>이 견적 확인
              </div>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-[#1c1917] mt-2">예상 견적 확인하기</h3>
            <p className="text-sm text-neutral-500 mt-2 font-light leading-relaxed">
              숫자를 먼저 확인하면, 결정은 훨씬 편해집니다. (실측 후 최종 확정)
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[11px] sm:text-[12px] font-bold text-neutral-500 mb-1.5 block">
                라인업 선택
              </label>
              <div className="grid grid-cols-1 gap-2">
                {LINE_KEYS.map((key) => (
                  <button
                    key={key}
                    onClick={() => setInputs((p) => ({ ...p, line: key }))}
                    type="button"
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                      inputs.line === key
                        ? "border-[#c5a065] bg-[#c5a065]/5 ring-1 ring-[#c5a065]"
                        : "border-[#eee] hover:border-[#ccc]"
                    )}
                  >
                    <div>
                      <div className={cn("text-sm font-bold", inputs.line === key ? "text-[#1c1917]" : "text-neutral-600")}>
                        {PRICING[key].name}
                      </div>
                      <div className="text-xs text-neutral-400 mt-0.5">{PRICING[key].desc}</div>
                    </div>
                    <div className={cn("text-sm font-medium", inputs.line === key ? "text-[#c5a065]" : "text-neutral-300")}>
                      {inputs.line === key ? <CheckCircle2 size={18} /> : null}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-[11px] sm:text-[12px] font-bold text-neutral-500 mb-1.5 block">
                  가로 (cm)
                </label>
                <input
                  type="number"
                  className="w-full h-12 px-4 rounded-xl bg-[#f9f9f9] border border-[#eee] text-base focus:border-[#c5a065] outline-none"
                  placeholder="예: 300"
                  value={inputs.widthCm}
                  onChange={(e) => setInputs((p) => ({ ...p, widthCm: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-[11px] sm:text-[12px] font-bold text-neutral-500 mb-1.5 block">
                  세로 (cm)
                </label>
                <input
                  type="number"
                  className="w-full h-12 px-4 rounded-xl bg-[#f9f9f9] border border-[#eee] text-base focus:border-[#c5a065] outline-none"
                  placeholder="예: 230"
                  value={inputs.heightCm}
                  onChange={(e) => setInputs((p) => ({ ...p, heightCm: e.target.value }))}
                />
                <div className="mt-1 text-[11px] text-neutral-400">
                  * 높이 {PRICING.MIN_HEIGHT}cm 미만은 {PRICING.MIN_HEIGHT}cm 기준으로 계산됩니다.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-[11px] sm:text-[12px] font-bold text-neutral-500 mb-1.5 block">
                  창 개수
                </label>
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

              <div>
                <label className="text-[11px] sm:text-[12px] font-bold text-neutral-500 mb-1.5 block">
                  반려동물
                </label>
                <button
                  type="button"
                  onClick={() => setInputs((p) => ({ ...p, pet: !p.pet }))}
                  className={cn(
                    "w-full h-12 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-between",
                    inputs.pet
                      ? "border-[#c5a065] bg-[#c5a065]/10 text-[#1c1917]"
                      : "border-[#eee] bg-[#f9f9f9] text-neutral-500"
                  )}
                >
                  <span>{inputs.pet ? "있음" : "없음"}</span>
                  <span className={cn("text-[11px]", inputs.pet ? "text-[#c5a065]" : "text-neutral-400")}>
                    {inputs.pet ? "내구 옵션 안내" : "기본 기준"}
                  </span>
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-[#eee] bg-white p-4">
              <div className="text-[12px] font-bold text-[#1c1917]">정확도 올리는 가장 빠른 방법</div>
              <div className="mt-1 text-[12px] text-neutral-500 font-light leading-relaxed">
                거실/창 사진 <span className="font-medium text-[#1c1917]">1~2장</span>만 주시면,
                레일/마감/창 구조에 맞춘 안내가 빨라집니다.
              </div>
            </div>
          </div>
        </div>

        {/* OUTPUT */}
        <div className="bg-[#1c1917] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-32 bg-[#c5a065] opacity-5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-5">
              <div>
                <div className="text-[10px] text-white/50 tracking-widest mb-1">TOTAL ESTIMATE</div>
                <div className="text-[12px] text-white/70 font-light">
                  {result.lineName} · {result.hebe}회배
                </div>
              </div>
              <div className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold text-[#c5a065] backdrop-blur-md">
                시공비 포함(기본)
              </div>
            </div>

            <div className="font-serif text-4xl sm:text-5xl text-[#c5a065] tracking-tight">
              약 {formatKRW(result.mid)}
            </div>
            <div className="mt-2 text-xs text-white/55 font-light">
              예상 범위: {formatKRW(result.min)} ~ {formatKRW(result.max)}
            </div>

            <div className="text-xs text-white/45 mt-5 font-light space-y-1 leading-relaxed">
              <p>• 입력값 기준 예상 견적이며, 실측 후 최종 확정됩니다.</p>
              <p>• 변동 요인: 창 구조/마감, 설치 난이도, 옵션(차광·내구 등)</p>
            </div>

            <div className="mt-7 pt-6 border-t border-white/10 flex items-center justify-between text-sm">
              <span className="text-white/60 text-xs sm:text-sm">상담 진행 상태</span>
              <span className="flex items-center gap-1.5 font-medium text-xs sm:text-sm">
                <Sparkles size={14} className="text-[#c5a065]" /> 원활
              </span>
            </div>
          </div>

          <button
            onClick={copy}
            className="relative z-10 mt-6 sm:mt-8 w-full py-4 rounded-xl bg-[#c5a065] text-[#1c1917] font-bold text-sm hover:bg-[#d6b176] transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
            type="button"
          >
            <ClipboardCheck size={16} /> 견적서 저장하고 상담하기
          </button>
        </div>
      </div>

      <Toast show={toast.show} text={toast.text} />
    </div>
  );
}

function GuaranteeBadge() {
  return (
    <div className="mt-10 sm:mt-16 border border-[#e5e5e5] bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-start gap-4 w-full md:w-auto">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#1c1917] text-[#c5a065] flex items-center justify-center shrink-0">
          <ShieldCheck size={24} className="sm:w-8 sm:h-8" />
        </div>
        <div>
          <h4 className="font-serif text-lg sm:text-xl text-[#1c1917] mb-1">A/S & 사후관리 안내</h4>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-light">
            기본 1년 무상 A/S(시공/제품 범위 내, 소비자 과실 제외).<br />
            정책/범위는 상담 시 정확히 안내드립니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
        <div className="text-center px-4 py-3 bg-[#f9f9f9] rounded-lg border border-[#eee]">
          <div className="text-[10px] sm:text-xs text-neutral-400 mb-1">견적 방식</div>
          <div className="font-bold text-[#1c1917] text-sm sm:text-base">실측 기반 확정</div>
        </div>
        <div className="text-center px-4 py-3 bg-[#f9f9f9] rounded-lg border border-[#eee]">
          <div className="text-[10px] sm:text-xs text-neutral-400 mb-1">유지 관리</div>
          <div className="font-bold text-[#1c1917] text-sm sm:text-base">옵션 안내</div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "견적이 다른 곳보다 비싼가요?",
      a: "가격은 원단 등급, 마감, 레일/부속, 설치 난이도에 따라 달라집니다. 먼저 ‘예상 범위’를 확인하고, 실측 후 정확한 옵션을 비교해 보시는 걸 권합니다.",
    },
    {
      q: "사생활 보호는 괜찮나요?",
      a: "각도 조절로 채광과 시야를 동시에 설계할 수 있습니다. 낮/밤 환경에 따라 최적 각도가 달라 설치 후 사용 루틴까지 안내드립니다.",
    },
    {
      q: "반려동물/아이가 있으면 걱정돼요",
      a: "가정 환경에 따라 권장 원단과 옵션이 달라집니다. 내구·오염 우선이면 그에 맞춘 라인/옵션을 추천드립니다. 사진 1~2장 주시면 더 정확합니다.",
    },
    {
      q: "이사 갈 때 재설치 가능한가요?",
      a: "가능한 경우가 많지만, 창 사이즈/레일 길이/벽체 구조에 따라 가공이 필요할 수 있습니다. 이사 예정이면 전제까지 포함해 안내드립니다.",
    },
    {
      q: "A/S는 어떻게 진행되나요?",
      a: "기본 A/S 범위(시공/제품) 내에서는 신속히 대응합니다. 범위/기간/유상 여부는 정책에 따라 달라질 수 있어 상담 시 정확한 조건으로 안내드립니다.",
    },
  ];

  return (
    <div className="mt-14 sm:mt-20 max-w-3xl mx-auto">
      <div className="text-center mb-8 sm:mb-10">
        <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-2 block">FAQ</span>
        <h3 className="font-serif text-xl sm:text-2xl text-[#1c1917]">구매 전, 꼭 확인하세요</h3>
        <p className="text-neutral-500 text-xs sm:text-sm mt-2 font-light">
          고객이 가장 많이 묻는 질문만 모았습니다.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div
            key={i}
            className="border border-[#e5e5e5] rounded-xl bg-white overflow-hidden transition-all duration-300 active:border-[#c5a065]/50 sm:hover:border-[#c5a065]/50"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-5 py-4 sm:px-6 sm:py-5 text-left flex justify-between items-start sm:items-center hover:bg-[#fcfcfc] group gap-4"
              type="button"
            >
              <span
                className={cn(
                  "font-medium text-[14px] sm:text-[15px] transition-colors leading-snug",
                  openIndex === i ? "text-[#c5a065]" : "text-[#1c1917]"
                )}
              >
                Q. {f.q}
              </span>
              <ChevronDown
                size={18}
                className={cn(
                  "text-neutral-400 shrink-0 mt-0.5 sm:mt-0 transition-transform duration-300",
                  openIndex === i ? "rotate-180 text-[#c5a065]" : ""
                )}
              />
            </button>

            <div
              className={cn(
                "overflow-hidden transition-[max-height] duration-300 ease-in-out",
                openIndex === i ? "max-h-56" : "max-h-0"
              )}
            >
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-[13px] sm:text-[14px] leading-relaxed text-neutral-600 bg-white">
                <span className="font-bold text-[#1c1917] mr-1">A.</span> {f.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ who, text, product }) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-[#e5e5e5] hover:shadow-lg transition-shadow duration-500 h-full flex flex-col justify-between">
      <div>
        <div className="flex gap-1 mb-3 sm:mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="fill-[#c5a065] text-[#c5a065]" />
          ))}
        </div>
        <p className="font-serif text-[14px] sm:text-[15px] leading-relaxed text-[#1c1917] mb-6">"{text}"</p>
      </div>
      <div className="flex items-center gap-3 pt-5 sm:pt-6 border-t border-[#f5f5f5]">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-[#c5a065]">
          VIP
        </div>
        <div>
          <div className="text-xs font-bold text-[#1c1917]">{who}</div>
          <div className="text-[10px] text-neutral-400">{product}</div>
        </div>
      </div>
    </div>
  );
}

function MobileSticky() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-[#e5e5e5] sm:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="p-3 flex gap-2">
        <a
          href={`tel:${CONTACT.tel}`}
          className="flex-1 py-3.5 rounded-xl border border-[#e5e5e5] bg-white text-[#1c1917] font-bold text-sm flex items-center justify-center gap-2 active:bg-neutral-50"
        >
          <PhoneCall size={16} /> 전화 상담
        </a>
        <button
          onClick={() => scrollToId("estimate")}
          className="flex-[2] py-3.5 rounded-xl bg-[#1c1917] text-white font-bold text-sm flex items-center justify-center gap-2 active:bg-neutral-800 shadow-lg shadow-black/10"
          type="button"
        >
          <MessageCircle size={16} /> 견적 확인
        </button>
      </div>
    </div>
  );
}

export default function App() {
  useLuxuryFonts();

  return (
    <div className="min-h-screen pb-24 sm:pb-0 bg-[#fdfcf8] font-sans text-[#1c1917] overflow-x-hidden">
      <TopNotice />

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#fdfcf8]/90 backdrop-blur-md border-b border-[#e5e5e5]">
        <div className="mx-auto max-w-6xl px-4 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="leading-none">
              <div className="font-sans font-black text-lg sm:text-xl tracking-widest">{BRAND.nameEn}</div>
              <div className="text-[10px] text-neutral-400 tracking-wide -mt-0.5">{BRAND.name}</div>
            </div>
            <span className="hidden sm:inline-block text-[10px] tracking-widest text-neutral-400 uppercase border-l border-neutral-300 pl-4">
              High-end Window Styling
            </span>
          </div>

          <button
            onClick={() => scrollToId("estimate")}
            className="hidden sm:inline-flex px-5 py-2.5 bg-[#1c1917] text-white text-xs font-bold rounded-lg hover:bg-[#333] transition-colors"
            type="button"
          >
            견적 확인
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-28 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <FadeSection>
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 justify-center lg:justify-start">
              <span className="border border-[#c5a065] text-[#c5a065] bg-[#c5a065]/10 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wide">
                Premium Styling
              </span>
              <span className="border border-neutral-200 bg-white px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wide text-neutral-500">
                Private Consultation
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-[1.15] text-[#1c1917] mb-6 sm:mb-8 text-center lg:text-left">
              당신의 거실,
              <br />
              <span className="text-[#c5a065] italic">5성급 호텔 라운지</span>가
              <br />
              됩니다.
            </h2>

            <p className="text-neutral-500 text-sm sm:text-lg leading-relaxed max-w-lg mb-8 sm:mb-10 font-light text-center lg:text-left mx-auto lg:mx-0 break-keep">
              빛과 바람이 머무는 곳. 커튼의 우아함과 블라인드의 기능을 넘어선, {BRAND.name} {BRAND.collection}.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button onClick={() => scrollToId("estimate")} variant="gold">
                예상 시공 견적 확인하기
              </Button>
              <Button href={CONTACT.kakaoUrl} variant="outline">
                프라이빗 상담 신청
              </Button>
            </div>
          </FadeSection>
        </div>

        {/* Hero Image */}
        <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-0 lg:block hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdfcf8] via-[#fdfcf8]/80 to-transparent z-10" />
          <img
            src={IMAGES.hero}
            alt="고급스러운 거실 분위기(임시 이미지)"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="lg:hidden mt-10 px-4">
          <div className="rounded-xl overflow-hidden aspect-[4/3] relative shadow-xl">
            <img
              src={IMAGES.hero}
              alt="고급스러운 거실 분위기(임시 이미지)"
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/20 to-transparent" />
          </div>
        </div>
      </section>

      <FeatureStrip />
      <BeforeAfter />

      {/* GALLERY & REVIEWS */}
      <section className="py-14 sm:py-24 bg-[#1c1917] text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 sm:mb-12 gap-6">
            <div>
              <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-2 sm:mb-3 block">
                Gallery & Reviews
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-tight">
                선택하는 사람이
                <br />
                분위기를 증명합니다
              </h3>
            </div>
            <p className="text-white/40 text-xs sm:text-sm font-light max-w-md text-left md:text-right">
              갤러리는 추후 실사진으로 교체하면 신뢰도와 전환율이 더 올라갑니다.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
            {IMAGES.gallery.map((img, i) => (
              <div key={i} className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-800">
                <img
                  src={img.src}
                  alt={`갤러리 이미지 ${i + 1}`}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-white/80 border border-white/20 px-2 py-1 rounded backdrop-blur-sm">
                    {img.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <ReviewCard
              who="신혼집 고객님"
              text="창 라인이 정돈되니까 거실이 한 번에 ‘완성된 느낌’이 났어요. 분위기가 확 달라졌습니다."
              product="Basic Line"
            />
            <ReviewCard
              who="미니멀 인테리어 고객님"
              text="빛이 들어오는 결이 정말 예뻐요. 과하지 않게 고급스럽게 정리되는 느낌이 좋았습니다."
              product="Standard Line"
            />
            <ReviewCard
              who="반려동물 가정 고객님"
              text="생활 오염이 걱정이었는데, 상담에서 관리 동선까지 같이 잡아줘서 마음이 편해졌어요."
              product="Premium Line"
            />
          </div>
        </div>
      </section>

      {/* ESTIMATE */}
      <section id="estimate" className="py-16 sm:py-24 bg-[#fdfcf8]">
        <div className="mx-auto max-w-4xl px-4">
          <RealEstimate />
          <GuaranteeBadge />
          <FAQ />

          {/* CTA */}
          <div id="cta" className="mt-14 sm:mt-20">
            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 text-[#c5a065] text-[10px] font-bold tracking-widest uppercase">
                <MessageCircle size={14} />
                CONSULT
              </div>
              <div className="mt-3 font-serif text-2xl text-[#1c1917]">
                지금은 “결정”이 아니라,
                <br />
                “확인”만 하세요
              </div>
              <div className="mt-3 text-sm text-neutral-500 font-light leading-relaxed">
                복사된 견적 메모 + 사진 1~2장으로 상담하면, 실제 조건에 맞춘 옵션과 최종 견적을 빠르게 안내받을 수 있습니다.
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${CONTACT.tel}`}
                  className="flex-1 py-4 rounded-xl border border-[#e5e5e5] bg-white text-[#1c1917] font-bold text-sm flex items-center justify-center gap-2 hover:bg-neutral-50 active:scale-[0.98]"
                >
                  <PhoneCall size={16} /> 전화 상담
                </a>
                <a
                  href={CONTACT.kakaoUrl}
                  className="flex-[1.2] py-4 rounded-xl bg-[#1c1917] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-black active:scale-[0.98]"
                >
                  <MessageCircle size={16} /> 카톡 상담
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 sm:py-12 bg-white border-t border-[#e5e5e5] text-neutral-400 text-xs">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-center md:text-left">
          <div>
            <strong className="text-[#1c1917] text-base sm:text-lg block mb-1 sm:mb-2">
              {BRAND.nameEn} · {BRAND.name}
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
    </div>
  );
}
