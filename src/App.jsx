import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  Flame,
  MessageCircle,
  PhoneCall,
  Star,
  X,
  ShieldCheck,
  Crown,
  HelpCircle,
  ChevronDown
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
 * THEME & STYLING
 */
const THEME = {
  bg: "#fdfcf8", // Stone Cream
  text: "#1c1917", // Deep Charcoal
  accent: "#c5a065", // Muted Gold
  line: "#e5e5e5",
};

/**
 * VIP Estimate Model
 */
const ESTIMATE_MODEL = {
  BASE_PER_M2: 55000,
  INSTALL_BASE: 70000,
  ERROR_RATE: 0.10,
  OPTION_MULTIPLIERS: {
    fabricSignature: 1.2,
    blackout: 1.1,
    pet: 1.0,
    highCeiling: 1.1,
  },
};

/**
 * IMAGES (High-End Selection)
 */
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
  gallery: [
    { src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop", tag: "Signature Fabric" },
    { src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop", tag: "Hotel Mood" },
    { src: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=800&auto=format&fit=crop", tag: "Detail View" },
    { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop", tag: "Wide Space" },
  ],
};

/* --- UTILS --- */
function cn(...c) { return c.filter(Boolean).join(" "); }
function formatKRW(n) {
  if (!Number.isFinite(n)) return "-";
  return (Math.round(n / 1000) * 1000).toLocaleString("ko-KR") + "원";
}
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

/* --- COMPONENTS --- */

function useScrollFade() {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setIsVisible(entry.isIntersecting));
        }, { threshold: 0.1 });
        if(domRef.current) observer.observe(domRef.current);
        return () => observer.disconnect();
    }, []);
    return [isVisible, domRef];
}

function FadeSection({ children, delay = "0ms" }) {
    const [isVisible, domRef] = useScrollFade();
    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: delay }}
        >
            {children}
        </div>
    );
}

function Button({ children, onClick, href, variant = "primary", className = "" }) {
  const base = "inline-flex items-center justify-center gap-2 px-6 py-4 sm:px-8 text-[14px] sm:text-base font-medium transition-all duration-300 rounded-xl relative overflow-hidden group w-full sm:w-auto";
  const variants = {
    primary: "bg-[#1c1917] text-white hover:bg-[#000]",
    gold: "bg-[#c5a065] text-white shadow-lg shadow-[#c5a065]/30 hover:bg-[#b08d55]",
    outline: "bg-white/80 border border-[#e5e5e5] text-[#1c1917] hover:bg-white",
  };
  
  const content = <span className="relative z-10 flex items-center gap-2 justify-center">{children} <ArrowUpRight size={16} /></span>;

  if (href) return <a href={href} className={cn(base, variants[variant], "hover:-translate-y-1 active:scale-[0.98]", className)}>{content}</a>;
  return <button onClick={onClick} type="button" className={cn(base, variants[variant], "hover:-translate-y-1 active:scale-[0.98]", className)}>{content}</button>;
}

function TopNotice() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="bg-[#f5f2eb] border-b border-[#e5e5e5] relative z-50">
      <div className="mx-auto max-w-6xl px-4 py-2.5 flex items-center justify-between text-[11px] sm:text-[12px] text-neutral-600">
        <div className="flex items-center gap-2 w-full justify-center sm:justify-start">
           <Crown size={14} className="text-[#c5a065]" />
           <span className="truncate">이번 달 <span className="font-bold text-[#1c1917]">Private Consultation</span> 무료 혜택, 마감 임박</span>
        </div>
        <button onClick={() => setVisible(false)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 opacity-50 hover:opacity-100 sm:static sm:translate-y-0">
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
    pet: "No",
  });
  const [count, setCount] = useState(17);
  useEffect(() => setCount(17 + Math.floor(Math.random() * 5)), []);

  const estimate = useMemo(() => {
    const w = Math.max(60, Number(inputs.widthCm) || 0) / 100;
    const h = Math.max(120, Number(inputs.heightCm) || 0) / 100;
    const c = Math.min(10, Math.max(1, Number(inputs.count) || 1));
    const area = w * h * c;
    let mult = 1;
    if (inputs.collection === "Signature") mult *= ESTIMATE_MODEL.OPTION_MULTIPLIERS.fabricSignature;
    if (inputs.pet === "Yes") mult *= ESTIMATE_MODEL.OPTION_MULTIPLIERS.pet;
    const raw = area * ESTIMATE_MODEL.BASE_PER_M2 * mult + ESTIMATE_MODEL.INSTALL_BASE;
    const min = Math.round(raw * (1 - ESTIMATE_MODEL.ERROR_RATE));
    const max = Math.round(raw * (1 + ESTIMATE_MODEL.ERROR_RATE));
    const memo = `[${BRAND.name} VIP 견적]\n공간:${inputs.space}\n사이즈:${Math.round(w*100)}x${Math.round(h*100)}cm\n옵션:${inputs.collection}/${inputs.pet}`;
    return { min, max, memo };
  }, [inputs]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(estimate.memo); alert("견적 내용이 복사되었습니다."); } catch {}
  };

  return (
    <div className="mt-12 sm:mt-16 bg-white rounded-[20px] sm:rounded-[24px] shadow-sm border border-[#e5e5e5] overflow-hidden">
      <div className="p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        <div className="space-y-6 sm:space-y-8">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a065] animate-pulse"></span>
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-neutral-400">INSTANT QUOTE</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1c1917]">공간의 가치를 계산해보세요</h3>
                <p className="text-sm text-neutral-500 mt-2 font-light leading-relaxed">
                    입력하신 사이즈를 기준으로 <span className="text-[#c5a065]">Signature Collection</span> 시공가를 산출합니다.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="col-span-2">
                    <label className="text-[11px] sm:text-[12px] font-bold text-neutral-500 mb-1.5 block">설치 공간</label>
                    <select className="w-full h-12 px-4 rounded-xl bg-[#f9f9f9] border border-[#eee] text-base sm:text-sm focus:border-[#c5a065] outline-none appearance-none"
                        value={inputs.space} onChange={e => setInputs({...inputs, space: e.target.value})}>
                        <option>거실 (Living Room)</option>
                        <option>안방 (Master Room)</option>
                    </select>
                </div>
                <div>
                    <label className="text-[11px] sm:text-[12px] font-bold text-neutral-500 mb-1.5 block">가로 (cm)</label>
                    <input type="number" className="w-full h-12 px-4 rounded-xl bg-[#f9f9f9] border border-[#eee] text-base sm:text-sm focus:border-[#c5a065] outline-none placeholder:text-neutral-300"
                        placeholder="예: 300"
                        value={inputs.widthCm} onChange={e => setInputs({...inputs, widthCm: e.target.value})} />
                </div>
                <div>
                    <label className="text-[11px] sm:text-[12px] font-bold text-neutral-500 mb-1.5 block">세로 (cm)</label>
                    <input type="number" className="w-full h-12 px-4 rounded-xl bg-[#f9f9f9] border border-[#eee] text-base sm:text-sm focus:border-[#c5a065] outline-none placeholder:text-neutral-300"
                        placeholder="예: 230"
                        value={inputs.heightCm} onChange={e => setInputs({...inputs, heightCm: e.target.value})} />
                </div>
                <div className="col-span-2 pt-2">
                    <button onClick={() => setInputs({...inputs, pet: inputs.pet === 'Yes' ? 'No' : 'Yes'})} 
                        className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center justify-center gap-2 ${inputs.pet === 'Yes' ? 'border-[#c5a065] text-[#c5a065] bg-[#c5a065]/10' : 'border-[#eee] text-neutral-400 bg-white'}`}>
                        {inputs.pet === 'Yes' ? <CheckCircle2 size={16}/> : <div className="w-4 h-4 rounded-full border border-neutral-300" />}
                        반려동물 / 오염 방지 코팅
                    </button>
                </div>
            </div>
        </div>

        <div className="bg-[#1c1917] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-[#c5a065] opacity-5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
                <div className="text-[10px] text-white/50 tracking-widest mb-1">ESTIMATED COST</div>
                <div className="font-serif text-3xl sm:text-4xl text-[#c5a065] tracking-tight">
                    {formatKRW(estimate.min)}~
                </div>
                <div className="text-xs text-white/40 mt-2 font-light">
                    * {inputs.space} {inputs.widthCm}x{inputs.heightCm}cm 기준
                </div>
                <div className="mt-6 sm:mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-sm">
                    <span className="text-white/60 text-xs sm:text-sm">오늘 확인된 견적</span>
                    <span className="flex items-center gap-1.5 font-medium text-xs sm:text-sm"><Flame size={14} className="text-[#c5a065] fill-[#c5a065]" /> {count}건</span>
                </div>
            </div>
            <button onClick={copy} className="relative z-10 mt-6 sm:mt-8 w-full py-4 rounded-xl bg-[#c5a065] text-[#1c1917] font-bold text-sm hover:bg-[#d6b176] transition-colors flex items-center justify-center gap-2 active:scale-[0.98]">
                <ClipboardCheck size={16}/> VIP 혜택 적용하여 상담하기
            </button>
        </div>
      </div>
    </div>
  );
}

function GuaranteeBadge() {
    return (
        <div className="mt-12 sm:mt-20 border border-[#e5e5e5] bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#1c1917] text-[#c5a065] flex items-center justify-center shrink-0">
                    <ShieldCheck size={24} className="sm:w-8 sm:h-8" />
                </div>
                <div>
                    <h4 className="font-serif text-lg sm:text-xl text-[#1c1917] mb-1">책임 시공 보증제</h4>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">시공 후 1년간 무상 A/S를 보증합니다.<br className="sm:hidden"/> 품질에 대한 자신감입니다.</p>
                </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
                 <div className="flex-1 text-center px-4 py-3 bg-[#f9f9f9] rounded-lg">
                    <div className="text-[10px] sm:text-xs text-neutral-400 mb-1">고객 만족도</div>
                    <div className="font-bold text-[#1c1917] text-sm sm:text-base">4.9/5.0</div>
                 </div>
                 <div className="flex-1 text-center px-4 py-3 bg-[#f9f9f9] rounded-lg">
                    <div className="text-[10px] sm:text-xs text-neutral-400 mb-1">재시공률</div>
                    <div className="font-bold text-[#1c1917] text-sm sm:text-base">0%</div>
                 </div>
            </div>
        </div>
    )
}

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);
    const faqs = [
        { 
            q: "일반 커튼보다 비싼가요?", 
            a: "단순 비교로는 높게 느끼실 수 있습니다. 하지만 매년 드는 세탁비(평균 10만원), 내구성(2배 이상), 그리고 매일 누리는 공간의 가치를 고려하면 오히려 가장 합리적인 투자입니다." 
        },
        { 
            q: "세탁은 정말 편한가요?", 
            a: "혁신적입니다. 전체를 떼어낼 필요 없이, 오염된 낱장(Slat)만 톡 떼어 세탁망에 넣고 세탁기에 돌리시면 됩니다. 건조기 없이 바로 걸어두면 10분 내로 건조됩니다." 
        },
        { 
            q: "밖에서 안이 보이지 않나요?", 
            a: "가장 많이 하시는 질문입니다. 90도 각도 조절을 통해 '나는 밖을 볼 수 있지만, 밖에서는 나를 볼 수 없는' 완벽한 프라이버시 뷰를 설정할 수 있습니다." 
        },
        { 
            q: "고양이나 아이가 망가뜨릴까요?", 
            a: "오히려 추천드립니다. 낱장 구조라 아이나 반려동물이 지나가도 걸리지 않고 부드럽게 열립니다. 만약 손상되더라도 '그 한 장'만 교체하면 되므로 영구적인 사용이 가능합니다." 
        },
        { 
            q: "이사 갈 때 가져갈 수 있나요?", 
            a: "네, 가능합니다. 레일 길이만 조절하거나 추가하면 새 집에도 완벽하게 맞춤 시공해 드립니다. 한 번 구매하면 평생 함께하는 가구와 같습니다." 
        },
        { 
            q: "A/S는 어떻게 되나요?", 
            a: "본사 전문 시공팀이 실측부터 설치까지 100% 책임집니다. 1년 무상 A/S를 보증하며, 이후에도 부품 수급 걱정 없는 평생 관리 서비스를 제공합니다." 
        }
    ];

    return (
        <div className="mt-16 sm:mt-24 max-w-3xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
                <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-2 block">FAQ</span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1c1917]">구매 전, 꼭 확인하세요</h3>
                <p className="text-neutral-500 text-xs sm:text-sm mt-2">고객님들이 가장 자주 묻는 질문을 모았습니다.</p>
            </div>
            <div className="space-y-3">
                {faqs.map((f, i) => (
                    <div key={i} className="border border-[#e5e5e5] rounded-xl bg-white overflow-hidden transition-all duration-300 active:border-[#c5a065]/50 sm:hover:border-[#c5a065]/50">
                        <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full px-5 py-4 sm:px-6 sm:py-5 text-left flex justify-between items-start sm:items-center hover:bg-[#fcfcfc] group gap-4">
                            <span className={`font-medium text-[14px] sm:text-[15px] transition-colors ${openIndex === i ? 'text-[#c5a065]' : 'text-[#1c1917]'} leading-snug`}>Q. {f.q}</span>
                            <ChevronDown size={18} className={`text-neutral-400 shrink-0 mt-0.5 sm:mt-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-[#c5a065]' : ''}`}/>
                        </button>
                        <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${openIndex === i ? 'max-h-48' : 'max-h-0'}`}>
                            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-[13px] sm:text-[14px] leading-relaxed text-neutral-600 bg-white">
                                <span className="font-bold text-[#1c1917] mr-1">A.</span> {f.a}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function ReviewCard({ who, text }) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-[#e5e5e5] hover:shadow-lg transition-shadow duration-500 h-full flex flex-col justify-between">
        <div>
            <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-[#c5a065] text-[#c5a065]" />)}
            </div>
            <p className="font-serif text-[14px] sm:text-[15px] leading-relaxed text-[#1c1917] mb-6">"{text}"</p>
        </div>
        <div className="flex items-center gap-3 pt-5 sm:pt-6 border-t border-[#f5f5f5]">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-[#c5a065]">VIP</div>
            <div>
                <div className="text-xs font-bold text-[#1c1917]">{who}</div>
                <div className="text-[10px] text-neutral-400">Signature Collection</div>
            </div>
        </div>
    </div>
  );
}

export default function App() {
  // Inject Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen pb-24 sm:pb-0 bg-[#fdfcf8] font-sans text-[#1c1917] selection:bg-[#c5a065] selection:text-white overflow-x-hidden">
      <TopNotice />

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#fdfcf8]/90 backdrop-blur-md border-b border-[#e5e5e5]">
        <div className="mx-auto max-w-6xl px-4 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-sans font-black text-lg sm:text-xl tracking-widest">{BRAND.name}</h1>
            <span className="hidden sm:inline-block text-[10px] tracking-widest text-neutral-400 uppercase border-l border-neutral-300 pl-4">
                High-end Window Styling
            </span>
          </div>
          <button onClick={() => scrollToId('estimate')} className="hidden sm:inline-flex px-5 py-2.5 bg-[#1c1917] text-white text-xs font-bold rounded-lg hover:bg-[#333] transition-colors">
            VIP 견적 확인
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-20 sm:pb-32 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 relative z-10">
           <FadeSection>
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 justify-center lg:justify-start">
                    <span className="border border-[#c5a065] text-[#c5a065] bg-[#c5a065]/10 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wide">Premium Styling</span>
                    <span className="border border-neutral-200 bg-white px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wide text-neutral-500">Private Consultation</span>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-[1.15] text-[#1c1917] mb-6 sm:mb-8 text-center lg:text-left">
                    당신의 거실,<br/>
                    <span className="text-[#c5a065] italic">5성급 호텔 라운지</span>가<br/>
                    됩니다.
                </h2>
                <p className="text-neutral-500 text-sm sm:text-lg leading-relaxed max-w-lg mb-8 sm:mb-10 font-light text-center lg:text-left mx-auto lg:mx-0 break-keep">
                    빛과 바람이 머무는 곳. 커튼의 우아함과 블라인드의 기능을 넘어선, 더슬렛 시그니처 컬렉션.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                    <Button onClick={() => scrollToId('estimate')} variant="gold">
                        예상 시공 견적 확인하기
                    </Button>
                    <Button href={CONTACT.kakaoUrl} variant="outline">
                        프라이빗 상담 신청
                    </Button>
                </div>
           </FadeSection>
        </div>

        {/* Hero Image */}
        <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-0 lg:block hidden animate-fade-in-slow">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fdfcf8] via-[#fdfcf8]/80 to-transparent z-10"></div>
            <img src={IMAGES.hero} alt="Luxury Interior" className="w-full h-full object-cover" />
        </div>
        <div className="lg:hidden mt-10 px-4">
            <div className="rounded-xl overflow-hidden aspect-[4/3] relative shadow-xl">
                <img src={IMAGES.hero} alt="Luxury Interior" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/20 to-transparent"></div>
            </div>
        </div>
      </section>

      {/* PROBLEM & SOLUTION */}
      <section className="py-16 sm:py-24 bg-white border-y border-[#e5e5e5]">
         <div className="mx-auto max-w-6xl px-4">
            <FadeSection>
                <div className="text-center mb-10 sm:mb-16">
                    <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-2 sm:mb-3 block">Philosophy</span>
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1c1917] leading-tight">
                        "아름다움은<br/><span className="italic text-neutral-400">편안함</span>에서 시작됩니다"
                    </h3>
                </div>
            </FadeSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                 {/* Feature 1 */}
                 <FadeSection delay="100ms">
                     <div className="p-6 sm:p-8 bg-[#f9f9f9] rounded-xl sm:rounded-2xl h-full border border-transparent hover:border-[#c5a065]/30 transition-all">
                        <div className="w-10 h-10 rounded-full bg-white border border-[#eee] flex items-center justify-center mb-4 sm:mb-6 text-[#c5a065]">
                            <ShieldCheck size={20}/>
                        </div>
                        <h4 className="font-serif text-lg sm:text-xl mb-2 sm:mb-3">완벽한 관리의 자유</h4>
                        <p className="text-sm text-neutral-500 leading-relaxed font-light break-keep">
                            무거운 커튼 세탁의 부담을 내려놓으세요. 오염된 부분만 가볍게 떼어내 관리하는 혁신적인 시스템입니다.
                        </p>
                     </div>
                 </FadeSection>
                 {/* Feature 2 */}
                 <FadeSection delay="200ms">
                     <div className="p-6 sm:p-8 bg-[#f9f9f9] rounded-xl sm:rounded-2xl h-full border border-transparent hover:border-[#c5a065]/30 transition-all">
                        <div className="w-10 h-10 rounded-full bg-white border border-[#eee] flex items-center justify-center mb-4 sm:mb-6 text-[#c5a065]">
                            <ArrowUpRight size={20}/>
                        </div>
                        <h4 className="font-serif text-lg sm:text-xl mb-2 sm:mb-3">끊김 없는 동선</h4>
                        <p className="text-sm text-neutral-500 leading-relaxed font-light break-keep">
                            닫혀 있어도 자유롭게 드나들 수 있습니다. 바람과 사람의 길을 막지 않는 워크스루(Walk-through) 디자인.
                        </p>
                     </div>
                 </FadeSection>
                 {/* Feature 3 */}
                 <FadeSection delay="300ms">
                     <div className="p-6 sm:p-8 bg-[#f9f9f9] rounded-xl sm:rounded-2xl h-full border border-transparent hover:border-[#c5a065]/30 transition-all">
                        <div className="w-10 h-10 rounded-full bg-white border border-[#eee] flex items-center justify-center mb-4 sm:mb-6 text-[#c5a065]">
                            <Star size={20}/>
                        </div>
                        <h4 className="font-serif text-lg sm:text-xl mb-2 sm:mb-3">호텔식 칼주름</h4>
                        <p className="text-sm text-neutral-500 leading-relaxed font-light break-keep">
                            형상 기억 가공으로 언제나 처음 같은 핏을 유지합니다. 당신의 거실은 언제나 정돈되어 있습니다.
                        </p>
                     </div>
                 </FadeSection>
            </div>
         </div>
      </section>

      {/* GALLERY & REVIEWS */}
      <section className="py-16 sm:py-24 bg-[#1c1917] text-white">
        <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 sm:mb-12 gap-6">
                <div>
                    <span className="text-[#c5a065] text-[10px] font-bold tracking-widest uppercase mb-2 sm:mb-3 block">Gallery & Reviews</span>
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-tight">선택하는 사람이<br/>분위기를 증명합니다</h3>
                </div>
                <p className="text-white/40 text-xs sm:text-sm font-light max-w-md text-left md:text-right">
                    반포, 한남, 송도 등 하이엔드 주거 공간에서 선택받은 시그니처 스타일링을 확인하세요.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
                {IMAGES.gallery.map((img, i) => (
                    <div key={i} className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-800">
                        <img src={img.src} alt="Gallery" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700"/>
                        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                            <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-white/80 border border-white/20 px-2 py-1 rounded backdrop-blur-sm">
                                {img.tag}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <ReviewCard who="반포 자이 시공 고객님" text="창 라인이 정돈되니 거실 전체가 ‘호텔 라운지’처럼 바뀌었습니다. 공간의 밀도가 달라 보여요." />
                <ReviewCard who="한남 더힐 시공 고객님" text="빛이 들어오는 결이 정말 고급스럽습니다. 기능보다 분위기의 차이가 압도적이었어요." />
                <ReviewCard who="송도 더샵 시공 고객님" text="거실 무드가 안정감 있게 잡히고, 사진이 잘 나옵니다. ‘완성된 인테리어’가 됐어요." />
            </div>
        </div>
      </section>

      {/* VIP ESTIMATE & GUARANTEE */}
      <section id="estimate" className="py-16 sm:py-24 bg-[#fdfcf8]">
         <div className="mx-auto max-w-4xl px-4">
            <VIPEstimate />
            <GuaranteeBadge />
            <FAQ />
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 sm:py-12 bg-white border-t border-[#e5e5e5] text-neutral-400 text-xs">
         <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-center md:text-left">
            <div>
                <strong className="text-[#1c1917] text-base sm:text-lg block mb-1 sm:mb-2">{BRAND.name}</strong>
                <p>Premium Window Styling Solution</p>
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
                <a href={`tel:${CONTACT.tel}`} className="flex-1 py-3.5 rounded-xl border border-[#e5e5e5] bg-white text-[#1c1917] font-bold text-sm flex items-center justify-center gap-2 active:bg-neutral-50">
                    <PhoneCall size={16}/> 전화 상담
                </a>
                <button onClick={() => scrollToId('estimate')} className="flex-[2] py-3.5 rounded-xl bg-[#1c1917] text-white font-bold text-sm flex items-center justify-center gap-2 active:bg-neutral-800 shadow-lg shadow-black/10">
                    <MessageCircle size={16}/> 프라이빗 견적 확인
                </button>
            </div>
      </div>
    </div>
  );
}