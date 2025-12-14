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

// ✅ 여기 경로/확장자만 실제 파일명과 100% 일치해야 합니다.
import beforeImg from "./assets/before.webp";
import afterImg from "./assets/after.webp";

const BRAND = {
  nameKo: "더슬렛",
  nameEn: "THE SLAT",
  product: "유니슬렛",
  collection: "Signature Collection",
};

const CONTACT = {
  tel: "010-7534-2913",
  kakaoUrl: "https://open.kakao.com/o/sH00Mn6h",
};

const PRICING = {
  BASIC: { name: "Basic Line (산토리니)", price: 49000, desc: "데일리 톤 · 안정적인 텍스처" },
  STANDARD: { name: "Standard Line (라비콤)", price: 55000, desc: "도톰한 두께감 · 고급 질감" },
  PREMIUM: { name: "Premium Line (그린프)", price: 62000, desc: "정돈된 핏 · 차광 옵션 추천" },
  INSTALL_FEE: 70000,
  MIN_HEIGHT: 200,
  ERROR_RATE: 0.08,
};

const LINE_KEYS = ["BASIC", "STANDARD", "PREMIUM"];

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
  before: beforeImg,
  after: afterImg,
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

/* ---------------- fonts ---------------- */
function useLuxuryFonts() {
  useEffect(() => {
    const fontId = "the-slat-fonts-v1";
    const styleId = "the-slat-style-v1";

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
          font-family:"Noto Sans KR", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, "Apple SD Gothic Neo","Malgun Gothic", sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        .font-serif{ font-family:"Noto Serif KR", ui-serif, Georgia, "Times New Roman", serif !important; }
        .font-sans{ font-family:"Noto Sans KR", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, "Apple SD Gothic Neo","Malgun Gothic", sans-serif !important; }
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
          type="button"
          aria-label="닫기"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

/**
 * ✅ BEFORE/AFTER (고정형)
 * - BEFORE를 바닥에 고정
 * - AFTER만 clip-path로 잘라서 보여줌
 * - 두 이미지에 동일한 scale을 적용해 ‘움직이는 느낌’ 방지
 */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef(null);

  const SCALE = 1.08; // 보기 좋은 확대
  const POS = "50% 55%"; // 약간 아래쪽 포커스 (필요하면 50% 50%로)

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
              BEFORE / AFTER
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#1c1917]">전후 차이가 ‘설명’입니다</h3>
            <p className="text-neutral-500 text-sm mt-3">
              핸들을 드래그해서 비교하세요.
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
        >
          {/* BEFORE */}
          <img
            src={IMAGES.before}
            alt="시공 전 (Before)"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: `scale(${SCALE})`, transformOrigin: "center", objectPosition: POS }}
            draggable={false}
            loading="eager"
            decoding="async"
          />
          <div className="absolute top-4 left-4 bg-[#1c1917] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            BEFORE
          </div>

          {/* AFTER (clip) */}
          <img
            src={IMAGES.after}
            alt="시공 후 (After)"
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

          {/* HANDLE */}
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

function RealEstimate() {
  const [inputs, setInputs] = useState({
    widthCm: 300,
    heightCm: 230,
    count: 1,
    line: "STANDARD",
    pet: false,
  });

  const [todayCount, setTodayCount] = useState(0);
  useEffect(() => setTodayCount(18 + Math.floor(Math.random() * 13)), []);

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

    return { hebe: hebe.toFixed(2), min, mid, max, lineName: PRICING[inputs.line]?.name ?? PRICING.STANDARD.name };
  }, [inputs]);

  const copy = async () => {
    const text =
      `[${BRAND.nameKo} | ${BRAND.product} 상담]\n` +
      `라인: ${PRICING[inputs.line]?.name}\n` +
      `사이즈: ${inputs.widthCm} x ${inputs.heightCm} cm\n` +
      `창 개수: ${inputs.count}개\n` +
      `예상 견적: 약 ${formatKRW(result.mid)} (범위 ${formatKRW(result.min)} ~ ${formatKRW(result.max)})\n`;
    try {
      await navigator.clipboard.writeText(text);
      alert("견적 메모가 복사되었습니다. 카톡 상담에 붙여넣으세요.");
    } catch {
      alert("복사 실패(브라우저 정책). 텍스트를 직접 복사해주세요.");
    }
  };

  return (
    <div className="mt-12 sm:mt-16 bg-white rounded-[20px] sm:rounded-[24px] shadow-lg border border-[#e5e5e5] overflow-hidden">
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
            <h3 className="font-serif text-xl sm:text-2xl text-[#1c1917]">예상 견적 확인하기</h3>
            <p className="text-sm text-neutral-500 mt-2 font-light leading-relaxed">
              숫자를 먼저 확인하면, 결정이 쉬워집니다. (실측 후 최종 확정)
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

              <div>
                <label className="text-[12px] font-bold text-neutral-500 mb-2 block">반려동물</label>
                <button
                  type="button"
                  onClick={() => setInputs((p) => ({ ...p, pet: !p.pet }))}
                  className={cn(
                    "w-full h-12 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-between",
                    inputs.pet ? "border-[#c5a065] bg-[#c5a065]/10" : "border-[#eee] bg-[#f9f9f9]"
                  )}
                >
                  <span className="text-[#1c1917]">{inputs.pet ? "있음" : "없음"}</span>
                  <span className={cn("text-[11px]", inputs.pet ? "text-[#c5a065]" : "text-neutral-400")}>
                    {inputs.pet ? "내구 옵션 추천" : "기본 기준"}
                  </span>
                </button>
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

            <div className="mt-7 pt-6 border-t border-white/10 flex items-center justify-between text-sm">
              <span className="text-white/60 text-xs sm:text-sm">상담 상태</span>
              <span className="flex items-center gap-1.5 font-medium text-xs sm:text-sm">
                <Sparkles size={14} className="text-[#c5a065]" /> 원활
              </span>
            </div>
          </div>

          <button
            onClick={copy}
            type="button"
            className="relative z-10 mt-6 sm:mt-8 w-full py-4 rounded-xl bg-[#c5a065] text-[#1c1917] font-bold text-sm hover:bg-[#d6b176] transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <ClipboardCheck size={16} /> 견적서 저장하고 상담하기
          </button>
        </div>
      </div>
    </div>
  );
}

function GuaranteeBadge() {
  return (
    <div className="mt-12 sm:mt-16 border border-[#e5e5e5] bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#1c1917] text-[#c5a065] flex items-center justify-center shrink-0">
          <ShieldCheck size={24} className="sm:w-8 sm:h-8" />
        </div>
        <div>
          <h4 className="font-serif text-lg sm:text-xl text-[#1c1917] mb-1">사후관리 안내</h4>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-light">
            A/S 및 정책 범위는 상담 시 정확히 안내드립니다.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
        <div className="text-center px-4 py-3 bg-[#f9f9f9] rounded-lg border border-[#eee]">
          <div className="text-[10px] sm:text-xs text-neutral-400 mb-1">견적</div>
          <div className="font-bold text-[#1c1917] text-sm sm:text-base">실측 후 확정</div>
        </div>
        <div className="text-center px-4 py-3 bg-[#f9f9f9] rounded-lg border border-[#eee]">
          <div className="text-[10px] sm:text-xs text-neutral-400 mb-1">상담</div>
          <div className="font-bold text-[#1c1917] text-sm sm:text-base">전화/카톡</div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { q: "견적은 왜 범위로 나오나요?", a: "창 구조/마감/설치 난이도에 따라 변동이 있어 ‘예상 범위’로 안내됩니다. 실측 후 최종 확정됩니다." },
    { q: "사생활 보호는 괜찮나요?", a: "각도 조절로 채광/시야를 조율할 수 있습니다. 환경에 맞춘 최적 각도 사용법까지 안내드립니다." },
    { q: "반려동물/아이가 있으면요?", a: "내구/오염 우선이면 추천 옵션이 달라집니다. 집 상황에 맞춰 안내드립니다." },
  ];

  return (
    <div className="mt-14 sm:mt-20 max-w-3xl mx-auto">
      <div className="text-center mb-8 sm:mb-10">
        <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-2 block">FAQ</span>
        <h3 className="font-serif text-xl sm:text-2xl text-[#1c1917]">구매 전, 꼭 확인하세요</h3>
        <p className="text-neutral-500 text-xs sm:text-sm mt-2 font-light">자주 묻는 질문만 추렸습니다.</p>
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
              <ChevronDown size={18} className={cn("text-neutral-400 shrink-0 mt-0.5 sm:mt-0 transition-transform", openIndex === i ? "rotate-180 text-[#c5a065]" : "")} />
            </button>

            <div className={cn("overflow-hidden transition-[max-height] duration-300 ease-in-out", openIndex === i ? "max-h-44" : "max-h-0")}>
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
          <button
            onClick={() => scrollToId("estimate")}
            className="hidden sm:inline-flex px-5 py-2.5 bg-[#1c1917] text-white text-xs font-bold rounded-lg hover:bg-[#333] transition-colors"
            type="button"
          >
            견적 확인
          </button>
        </div>
      </header>

      <section className="relative pt-12 sm:pt-20 pb-14 sm:pb-24 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <FadeSection>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-[1.15] text-[#1c1917] mb-6 sm:mb-8 text-center lg:text-left">
              당신의 거실,
              <br />
              <span className="text-[#c5a065] italic">5성급 호텔 라운지</span>가
              <br />
              됩니다.
            </h2>

            <p className="text-neutral-500 text-sm sm:text-lg leading-relaxed max-w-lg mb-8 sm:mb-10 font-light text-center lg:text-left mx-auto lg:mx-0 break-keep">
              빛과 바람이 머무는 곳. 커튼의 우아함과 블라인드의 정돈을 한 번에.
              {` `}
              {BRAND.nameKo} {BRAND.collection}.
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

        <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-0 lg:block hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdfcf8] via-[#fdfcf8]/80 to-transparent z-10" />
          <img src={IMAGES.hero} alt="hero" className="w-full h-full object-cover" loading="eager" decoding="async" />
        </div>
      </section>

      <BeforeAfter />

      <section id="estimate" className="py-14 sm:py-20 bg-[#fdfcf8]">
        <div className="mx-auto max-w-4xl px-4">
          <RealEstimate />
          <GuaranteeBadge />
          <FAQ />

          <div className="mt-12 sm:mt-16 bg-white border border-[#e5e5e5] rounded-2xl p-6 sm:p-8">
            <div className="font-serif text-2xl text-[#1c1917]">상담은 “확인”부터 진행됩니다</div>
            <div className="mt-3 text-sm text-neutral-500 font-light leading-relaxed">
              견적 메모를 복사해 카톡으로 보내면, 창 구조/마감에 맞춘 옵션 안내가 훨씬 빨라집니다.
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
      </section>

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
    </div>
  );
}
