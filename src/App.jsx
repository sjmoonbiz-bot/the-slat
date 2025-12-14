import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  PhoneCall,
  Star,
  X,
  ShieldCheck,
  Crown,
  ChevronDown,
  MoveHorizontal,
  Calculator,
  Sparkles,
} from "lucide-react";

// ✅ 로컬 이미지(추천): src/assets/before.webp, src/assets/after.webp
import beforeImg from "./assets/before.webp";
import afterImg from "./assets/after.webp";

/**
 * BRAND / CONTACT
 */
const BRAND = {
  name: "THE SLAT",
  product: "UNISLAT",
  collection: "Signature Collection",
  area: "부산 전지역",
};

const CONTACT = {
  tel: "010-7534-2913",
  kakaoUrl: "https://open.kakao.com/o/sH00Mn6h",
};

/**
 * 💰 PRICING MODEL (판매가 기준)
 * - 여기 숫자 올리면 그대로 “예상 견적”이 올라갑니다.
 * - 마진을 크게 가져가려면: (1) 기본 단가 상향 + (2) 옵션 업셀로 단가 곱하기
 */
const PRICING = {
  BASIC: {
    name: "Basic Line (산토리니)",
    price: 69000, // ✅ 판매가(회배당) - 원하면 더 올리세요
    desc: "밝은 톤에서 가장 안정적인 데일리 텍스처",
  },
  STANDARD: {
    name: "Standard Line (라비콤)",
    price: 79000,
    desc: "두께감 + 결감이 살아있는 균형형",
  },
  PREMIUM: {
    name: "Premium Line (그린프)",
    price: 89000,
    desc: "호텔 무드의 밀도 / 암막 업그레이드 추천",
  },
  INSTALL_FEE: 120000, // ✅ 기본 출장/시공비(브랜드 포지션이면 낮게 잡지 마세요)
  MIN_HEIGHT: 200, // 세로 2m 미만이면 2m로 계산
};

/**
 * 옵션 업셀(객단가 확장)
 * - “추가 비용”보다 “가치 상승 옵션”으로 설계
 */
const OPTION_MULTIPLIERS = {
  blackoutPlus: 1.10, // 암막 강화
  ceilingMount: 1.07, // 천장형/커튼박스 대응
  wideWindow: 1.05, // 대형 창(가로가 크면 작업 난이도 상승)
};

const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
  before: beforeImg,
  after: afterImg,
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
      tag: "Signature White",
    },
    {
      src: "https://images.unsplash.com/photo-1461988320302-91badd605677?q=80&w=800&auto=format&fit=crop",
      tag: "Modern Greige",
    },
    {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
      tag: "Detail Cut",
    },
    {
      src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
      tag: "Living Room",
    },
  ],
};

/* --- UTILS --- */
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
function formatKRW(n) {
  if (!Number.isFinite(n) || Number.isNaN(n)) return "0원";
  return Math.round(n).toLocaleString("ko-KR") + "원";
}
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}
function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

/* --- Fade-in on scroll --- */
function useScrollFade() {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => setIsVisible(e.isIntersecting)),
      { threshold: 0.12 }
    );
    if (domRef.current) observer.observe(domRef.current);
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
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
}

function Button({ children, onClick, href, variant = "primary", className = "" }) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-4 sm:px-8 text-[14px] sm:text-base font-medium transition-all duration-300 rounded-xl relative overflow-hidden group w-full sm:w-auto";
  const variants = {
    primary: "bg-[#1c1917] text-white hover:bg-[#000]",
    gold: "bg-[#c5a065] text-white shadow-lg shadow-[#c5a065]/30 hover:bg-[#b08d55]",
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
        rel="noreferrer"
        target="_blank"
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

/**
 * ✅ Before/After (드래그 중에만 움직이게 고정)
 * - Pointer Events로 모바일/PC 통합
 * - 이미지 “움직이는 느낌” 방지: onMove는 dragging일 때만
 */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);

  const updateFromClientX = (clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clamp(clientX - rect.left, 0, rect.width);
    setPos((x / rect.width) * 100);
  };

  const onPointerDown = (e) => {
    // 버튼/드래그 시작
    setDragging(true);
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch {}
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const endDrag = () => setDragging(false);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <FadeSection>
          <div className="text-center mb-10">
            <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-2 block">
              BEFORE / AFTER
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#1c1917]">한 번의 시공으로, 분위기가 바뀝니다</h3>
            <p className="text-neutral-500 text-sm mt-3">핸들을 드래그해 전/후 차이를 확인하세요.</p>
          </div>
        </FadeSection>

        <div
          ref={containerRef}
          className="relative w-full max-w-5xl mx-auto aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden select-none shadow-2xl bg-[#f3f3f3]"
          style={{ touchAction: "none" }}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          aria-label="시공 전후 비교"
        >
          {/* AFTER */}
          <img
            src={IMAGES.after}
            alt="시공 후 (After)"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            loading="eager"
          />
          <div className="absolute top-4 right-4 bg-[#c5a065] text-white text-xs font-bold px-3 py-1 rounded-full z-20">
            AFTER
          </div>

          {/* BEFORE (clip) */}
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
            <img
              src={IMAGES.before}
              alt="시공 전 (Before)"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: "100%", height: "100%" }}
              draggable={false}
              loading="eager"
            />
            <div className="absolute top-4 left-4 bg-[#1c1917] text-white text-xs font-bold px-3 py-1 rounded-full z-20">
              BEFORE
            </div>
          </div>

          {/* HANDLE */}
          <div
            className="absolute top-0 bottom-0 w-[3px] bg-white z-30 shadow-[0_0_10px_rgba(0,0,0,0.35)]"
            style={{ left: `${pos}%` }}
          >
            <button
              type="button"
              onPointerDown={onPointerDown}
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-[#1c1917]",
                "active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#c5a065]/60"
              )}
              aria-label="드래그 핸들"
            >
              <MoveHorizontal size={18} />
            </button>
          </div>

          {/* 힌트 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] text-white/90 bg-black/35 px-3 py-1.5 rounded-full backdrop-blur">
            핸들을 드래그해 차이를 확인하세요
          </div>
        </div>

        <div className="text-center text-[11px] text-neutral-400 mt-4">
          * 실측 환경(창 구조/커튼박스/몰딩)에 따라 최종 견적은 달라질 수 있습니다.
        </div>
      </div>
    </section>
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
            {BRAND.area} · 프리미엄 윈도우 스타일링{" "}
            <span className="font-bold text-[#1c1917]">{BRAND.name}</span>
          </span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 opacity-50 hover:opacity-100 sm:static sm:translate-y-0"
          aria-label="배너 닫기"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

/**
 * 💡 견적 계산기 (업셀 옵션 + 창 개수 포함)
 */
function RealEstimate() {
  const [inputs, setInputs] = useState({
    widthCm: 300,
    heightCm: 230,
    count: 1,
    line: "PREMIUM",
    blackoutPlus: true,
    ceilingMount: false,
  });

  const result = useMemo(() => {
    const w = Number(inputs.widthCm) || 0;
    const hRaw = Number(inputs.heightCm) || 0;
    const h = Math.max(hRaw, PRICING.MIN_HEIGHT);
    const count = clamp(Number(inputs.count) || 1, 1, 10);

    const hebeSingle = (w * h) / 10000;
    const hebe = hebeSingle * count;

    const unitPrice = PRICING[inputs.line].price;

    // 창이 아주 넓으면 난이도/부자재 반영(가치 옵션으로 표현)
    const wideMult = w >= 380 ? OPTION_MULTIPLIERS.wideWindow : 1;

    let mult = wideMult;
    if (inputs.blackoutPlus) mult *= OPTION_MULTIPLIERS.blackoutPlus;
    if (inputs.ceilingMount) mult *= OPTION_MULTIPLIERS.ceilingMount;

    const material = hebe * unitPrice * mult;
    const totalRaw = material + PRICING.INSTALL_FEE;

    // “정확한 숫자”보다 “브랜드 견적서 느낌”을 위해 천원 단위 절삭
    const total = Math.floor(totalRaw / 1000) * 1000;

    return {
      hebe: hebe.toFixed(2),
      total,
      unitPrice,
      mult,
      heightApplied: h,
      wideApplied: w >= 380,
    };
  }, [inputs]);

  const buildMemo = () => {
    const optionText = [
      inputs.blackoutPlus ? "암막강화" : "기본",
      inputs.ceilingMount ? "천장형" : "벽면형",
    ].join(" / ");

    return `[${BRAND.name} 상담 요청]
제품: ${PRICING[inputs.line].name}
사이즈: ${inputs.widthCm} x ${inputs.heightCm}cm (적용높이 ${result.heightApplied}cm)
개수: ${inputs.count}창
옵션: ${optionText}
예상 견적: 약 ${formatKRW(result.total)}
`;
  };

  const copyAndConsult = async () => {
    const text = buildMemo();
    try {
      await navigator.clipboard.writeText(text);
      alert("견적 내용이 복사되었습니다. 카톡 상담에서 붙여넣기만 하시면 됩니다.");
    } catch {
      alert("복사 권한이 막혀 있습니다. 아래 내용을 직접 복사해 상담해 주세요.");
    }
    window.open(CONTACT.kakaoUrl, "_blank", "noreferrer");
  };

  return (
    <div className="mt-10 sm:mt-12 bg-white rounded-[20px] sm:rounded-[24px] shadow-lg border border-[#e5e5e5] overflow-hidden">
      <div className="p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        {/* INPUTS */}
        <div className="space-y-6 sm:space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calculator size={16} className="text-[#c5a065]" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-neutral-400">
                ESTIMATE
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#1c1917]">예상 견적 확인하기</h3>
            <p className="text-sm text-neutral-500 mt-2 font-light leading-relaxed">
              “가격을 먼저 확인”하면 상담이 훨씬 편해집니다. (부담 없이 확인하세요)
            </p>
          </div>

          <div className="space-y-4">
            {/* LINE */}
            <div>
              <label className="text-[11px] sm:text-[12px] font-bold text-neutral-500 mb-1.5 block">
                라인업 선택
              </label>
              <div className="grid grid-cols-1 gap-2">
                {["BASIC", "STANDARD", "PREMIUM"].map((key) => (
                  <button
                    key={key}
                    onClick={() => setInputs({ ...inputs, line: key })}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border transition-all",
                      inputs.line === key
                        ? "border-[#c5a065] bg-[#c5a065]/5 ring-1 ring-[#c5a065]"
                        : "border-[#eee] hover:border-[#ccc]"
                    )}
                  >
                    <div className="text-left">
                      <div
                        className={cn(
                          "text-sm font-bold",
                          inputs.line === key ? "text-[#1c1917]" : "text-neutral-600"
                        )}
                      >
                        {PRICING[key].name}
                      </div>
                      <div className="text-xs text-neutral-400 mt-0.5">{PRICING[key].desc}</div>
                    </div>
                    <div className={cn("text-sm font-medium", inputs.line === key ? "text-[#c5a065]" : "text-neutral-300")}>
                      {inputs.line === key ? <CheckCircle2 size={16} /> : null}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* SIZE + COUNT */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-[11px] sm:text-[12px] font-bold text-neutral-500 mb-1.5 block">가로 (cm)</label>
                <input
                  type="number"
                  className="w-full h-12 px-4 rounded-xl bg-[#f9f9f9] border border-[#eee] text-base focus:border-[#c5a065] outline-none"
                  placeholder="예: 300"
                  value={inputs.widthCm}
                  onChange={(e) => setInputs({ ...inputs, widthCm: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[11px] sm:text-[12px] font-bold text-neutral-500 mb-1.5 block">세로 (cm)</label>
                <input
                  type="number"
                  className="w-full h-12 px-4 rounded-xl bg-[#f9f9f9] border border-[#eee] text-base focus:border-[#c5a065] outline-none"
                  placeholder="예: 230"
                  value={inputs.heightCm}
                  onChange={(e) => setInputs({ ...inputs, heightCm: e.target.value })}
                />
                <div className="text-[10px] text-neutral-400 mt-1">
                  * 높이는 최소 {PRICING.MIN_HEIGHT}cm 기준으로 계산됩니다.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-[#eee] bg-[#fcfcfc]">
              <div>
                <div className="text-[12px] font-bold text-neutral-700">창 개수</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">거실/방 여러 창이면 개수를 올리세요</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="w-10 h-10 rounded-lg border border-[#e5e5e5] bg-white text-[#1c1917] font-bold active:scale-[0.98]"
                  onClick={() => setInputs({ ...inputs, count: clamp(Number(inputs.count) - 1, 1, 10) })}
                  type="button"
                >
                  −
                </button>
                <div className="w-10 text-center font-bold text-[#1c1917]">{inputs.count}</div>
                <button
                  className="w-10 h-10 rounded-lg border border-[#e5e5e5] bg-white text-[#1c1917] font-bold active:scale-[0.98]"
                  onClick={() => setInputs({ ...inputs, count: clamp(Number(inputs.count) + 1, 1, 10) })}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>

            {/* OPTIONS (UPSELL) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setInputs({ ...inputs, blackoutPlus: !inputs.blackoutPlus })}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all",
                  inputs.blackoutPlus
                    ? "border-[#c5a065] bg-[#c5a065]/5 ring-1 ring-[#c5a065]"
                    : "border-[#eee] bg-white hover:border-[#ccc]"
                )}
              >
                <div className="text-[12px] font-bold text-[#1c1917]">암막 강화</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">무드 밀도 + 프라이버시</div>
              </button>

              <button
                type="button"
                onClick={() => setInputs({ ...inputs, ceilingMount: !inputs.ceilingMount })}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all",
                  inputs.ceilingMount
                    ? "border-[#c5a065] bg-[#c5a065]/5 ring-1 ring-[#c5a065]"
                    : "border-[#eee] bg-white hover:border-[#ccc]"
                )}
              >
                <div className="text-[12px] font-bold text-[#1c1917]">천장형/커튼박스</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">라인 정돈 + 공간 확장감</div>
              </button>
            </div>

            <div className="text-[11px] text-neutral-400 leading-relaxed">
              * “회배”는 (가로×세로/10,000) 기준의 면적 단위입니다. 상담 시 고객님 창 구조에 맞게 최종 확정됩니다.
            </div>
          </div>
        </div>

        {/* OUTPUT */}
        <div className="bg-[#1c1917] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-32 bg-[#c5a065] opacity-5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="text-[10px] text-white/50 tracking-widest mb-1">TOTAL ESTIMATE</div>
              <div className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold text-[#c5a065] backdrop-blur-md">
                출장/시공비 포함
              </div>
            </div>

            <div className="font-serif text-4xl sm:text-5xl text-[#c5a065] tracking-tight">
              {formatKRW(result.total)}
            </div>

            <div className="text-xs text-white/40 mt-6 font-light space-y-1">
              <p>• 적용 면적: {result.hebe}회배</p>
              <p>• 옵션 반영(가치 옵션): x{result.mult.toFixed(2)}</p>
              <p>• {result.wideApplied ? "• 대형 창 반영" : "• 표준 창 기준"}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-sm">
              <span className="text-white/60 text-xs sm:text-sm">상담 전, 견적서부터 저장</span>
              <span className="flex items-center gap-1.5 font-medium text-xs sm:text-sm">
                <Sparkles size={14} className="text-[#c5a065] fill-[#c5a065]" /> 추천
              </span>
            </div>
          </div>

          <button
            onClick={copyAndConsult}
            className="relative z-10 mt-6 sm:mt-8 w-full py-4 rounded-xl bg-[#c5a065] text-[#1c1917] font-bold text-sm hover:bg-[#d6b176] transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <ClipboardCheck size={16} /> 견적서 저장하고 카톡 상담하기
          </button>

          <div className="relative z-10 text-center text-[10px] text-white/35 mt-3">
            * 상담창에 붙여넣기만 하면, 응대가 빨라집니다.
          </div>
        </div>
      </div>
    </div>
  );
}

function GuaranteeBadge() {
  return (
    <div className="mt-10 sm:mt-16 border border-[#e5e5e5] bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#1c1917] text-[#c5a065] flex items-center justify-center shrink-0">
          <ShieldCheck size={24} className="sm:w-8 sm:h-8" />
        </div>
        <div>
          <h4 className="font-serif text-lg sm:text-xl text-[#1c1917] mb-1">책임 시공 보증</h4>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
            시공 후 1년 무상 A/S 기준으로 운영됩니다. <br className="sm:hidden" />
            (부품/상태에 따라 범위는 상담 시 안내)
          </p>
        </div>
      </div>
      <div className="w-full md:w-auto text-[11px] text-neutral-400 leading-relaxed">
        부산 전지역 방문 실측 · 일정 예약은 카톡/전화로 가능합니다.
      </div>
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      q: "견적이 왜 이렇게 차이가 나나요?",
      a: "창 구조(커튼박스/몰딩), 레일 길이, 옵션(암막/천장형), 설치 난이도에 따라 달라집니다. 그래서 ‘예상 견적’을 먼저 보고, 실측으로 최종 확정하는 방식이 가장 안전합니다.",
    },
    {
      q: "세탁/관리 방식이 궁금해요.",
      a: "유니슬렛은 전체를 떼어내는 방식이 아니라, 오염된 부분만 관리하는 구조로 설계됩니다. 사용 환경(반려동물/아이/주방 동선)에 맞춰 추천 라인을 안내해드립니다.",
    },
    {
      q: "사생활 보호(밖에서 안 보이게) 되나요?",
      a: "각도 조절로 시야를 설계할 수 있어 프라이버시 확보에 유리합니다. 채광과 사생활의 균형점을 현장에서 실제로 맞춰드립니다.",
    },
    {
      q: "상담은 어떻게 진행되나요?",
      a: "① 예상 견적 확인 → ② 카톡/전화로 창 사진/사이즈 전달 → ③ 일정 확정 후 방문 실측 → ④ 최종 견적 확정/시공 순으로 진행됩니다.",
    },
  ];

  return (
    <div className="mt-14 sm:mt-20 max-w-3xl mx-auto">
      <div className="text-center mb-8 sm:mb-10">
        <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-2 block">FAQ</span>
        <h3 className="font-serif text-xl sm:text-2xl text-[#1c1917]">구매 전, 꼭 확인하세요</h3>
        <p className="text-neutral-500 text-xs sm:text-sm mt-2">자주 묻는 질문만 정리했습니다.</p>
      </div>

      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div
            key={i}
            className="border border-[#e5e5e5] rounded-xl bg-white overflow-hidden transition-all duration-300 sm:hover:border-[#c5a065]/50"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-5 py-4 sm:px-6 sm:py-5 text-left flex justify-between items-start sm:items-center hover:bg-[#fcfcfc] gap-4"
              type="button"
            >
              <span
                className={cn(
                  "font-medium text-[14px] sm:text-[15px] leading-snug transition-colors",
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

            {/* ✅ max-height 대신 grid 트릭(잘림 방지) */}
            <div className={cn("grid transition-[grid-template-rows] duration-300 ease-in-out", openIndex === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden">
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-[13px] sm:text-[14px] leading-relaxed text-neutral-600 bg-white">
                  <span className="font-bold text-[#1c1917] mr-1">A.</span> {f.a}
                </div>
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

export default function App() {
  // ✅ 폰트 + serif 매핑 (Tailwind의 font-serif를 Noto Serif로 고정)
  useEffect(() => {
    const linkId = "the-slat-fonts";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.href =
        "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@300;400;500;600&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    const styleId = "the-slat-font-map";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        body { background:#fdfcf8; color:#1c1917; font-family:"Noto Sans KR", system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
        .font-serif { font-family:"Noto Serif KR", ui-serif, Georgia, serif; }
        .font-sans { font-family:"Noto Sans KR", system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
        ::selection { background: rgba(197,160,101,0.28); color:#1c1917; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="min-h-screen pb-24 sm:pb-0 bg-[#fdfcf8] font-sans text-[#1c1917] overflow-x-hidden">
      <TopNotice />

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#fdfcf8]/90 backdrop-blur-md border-b border-[#e5e5e5]">
        <div className="mx-auto max-w-6xl px-4 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-sans font-black text-lg sm:text-xl tracking-widest">{BRAND.name}</h1>
            <span className="hidden sm:inline-block text-[10px] tracking-widest text-neutral-400 uppercase border-l border-neutral-300 pl-4">
              {BRAND.area} · Premium Window Styling
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <a
              href={`tel:${CONTACT.tel}`}
              className="px-4 py-2.5 rounded-lg border border-[#e5e5e5] bg-white text-[#1c1917] text-xs font-bold hover:bg-[#fafafa]"
            >
              전화 상담
            </a>
            <button
              onClick={() => scrollToId("estimate")}
              className="px-5 py-2.5 bg-[#1c1917] text-white text-xs font-bold rounded-lg hover:bg-[#333] transition-colors"
              type="button"
            >
              견적 확인
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <FadeSection>
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 justify-center lg:justify-start">
              <span className="border border-[#c5a065] text-[#c5a065] bg-[#c5a065]/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide">
                Premium Styling
              </span>
              <span className="border border-neutral-200 bg-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wide text-neutral-500">
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

            <p className="text-neutral-500 text-sm sm:text-lg leading-relaxed max-w-xl mb-8 sm:mb-10 font-light text-center lg:text-left mx-auto lg:mx-0 break-keep">
              빛과 바람이 머무는 곳. 커튼의 우아함과 블라인드의 기능을 넘어선, 더슬렛 시그니처 컬렉션.
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdfcf8] via-[#fdfcf8]/80 to-transparent z-10"></div>
          <img src={IMAGES.hero} alt="Luxury Interior" className="w-full h-full object-cover" loading="eager" />
        </div>

        <div className="lg:hidden mt-10 px-4">
          <div className="rounded-xl overflow-hidden aspect-[4/3] relative shadow-xl">
            <img src={IMAGES.hero} alt="Luxury Interior" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/25 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <BeforeAfter />

      {/* GALLERY & REVIEWS */}
      <section className="py-16 sm:py-24 bg-[#1c1917] text-white">
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
              실측/시공 사례를 기반으로, 공간에 맞는 톤과 옵션을 제안합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
            {IMAGES.gallery.map((img, i) => (
              <div key={i} className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-800">
                <img
                  src={img.src}
                  alt="Gallery"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700"
                  loading="lazy"
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
              who="부산 시공 고객님"
              text="창 라인이 정돈되니 거실 전체가 훨씬 ‘완성된 공간’처럼 보입니다."
              product="Signature Styling"
            />
            <ReviewCard
              who="부산 시공 고객님"
              text="빛이 들어오는 결이 고급스럽고, 옵션 조합을 잘 잡아주셔서 만족합니다."
              product="Blackout Upgrade"
            />
            <ReviewCard
              who="부산 시공 고객님"
              text="상담 때 견적서를 먼저 받아보니 결정이 빨랐어요. 과정이 깔끔했습니다."
              product="Private Consultation"
            />
          </div>

          <div className="text-white/35 text-[11px] mt-6">
            * 후기는 고객 동의 범위 내에서 예시 형태로 노출되며, 실제 상담 시 더 많은 사례를 안내드립니다.
          </div>
        </div>
      </section>

      {/* ESTIMATE */}
      <section id="estimate" className="py-16 sm:py-24 bg-[#fdfcf8]">
        <div className="mx-auto max-w-4xl px-4">
          <RealEstimate />
          <GuaranteeBadge />
          <FAQ />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 sm:py-12 bg-white border-t border-[#e5e5e5] text-neutral-400 text-xs">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-center md:text-left">
          <div>
            <strong className="text-[#1c1917] text-base sm:text-lg block mb-1 sm:mb-2">{BRAND.name}</strong>
            <p>{BRAND.area} · Premium Window Styling</p>
          </div>
          <div>
            <p className="mb-1">Contact. {CONTACT.tel}</p>
            <p>© 2024 THE SLAT. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY */}
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
    </div>
  );
}
