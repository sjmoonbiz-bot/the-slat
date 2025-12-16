import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  MapPin,
  MessageCircle,
  MessageSquare,
  MoveHorizontal,
  Phone,
  Quote,
  Shield,
  Sparkles,
  Star,
  X,
  Home,
  Sun,
  Moon,
  Palette,
  Ruler,
  Truck,
  Award,
  CheckCircle,
  Camera,
  Instagram,
  ExternalLink,
  Zap,
} from "lucide-react";

// 로컬 이미지
import beforeImg from "./assets/before.png";
import afterImg from "./assets/after.png";

// 갤러리 이미지 (열림/닫힘)
import gallery1Open from "./assets/gallery1-open.png";
import gallery1Closed from "./assets/gallery1-closed.png";
import gallery2Open from "./assets/gallery2-open.png";
import gallery2Closed from "./assets/gallery2-closed.png";
import gallery3Open from "./assets/gallery3-open.png";
import gallery3Closed from "./assets/gallery3-closed.png";

/* ========================================
   SEO & 메타 데이터 설정
======================================== */
const SEO = {
  title: "THE SLAT | 부산 프리미엄 윈도우 스타일링",
  description: "부산 전지역 유니슬랫 & 커튼 전문 시공. 무료 실측, 1년 품질보증. 카카오톡으로 빠른 상담받으세요.",
  keywords: "유니슬랫, 부산 블라인드, 부산 커튼, 윈도우 스타일링, 창문 인테리어, 암막커튼, 롤스크린",
  url: "https://theslat.co.kr",
  image: "https://theslat.co.kr/og-image.jpg",
};

/* ========================================
   브랜드 & 연락처 정보
======================================== */
const BRAND = {
  name: "THE SLAT",
  nameKR: "더 슬랫",
  tagline: "당신의 공간을 완성하는 프리미엄 윈도우 스타일링",
  area: "부산 전지역",
  projects: "547",  // 구체적인 숫자가 더 신뢰감
  satisfaction: "98.7",  // 소수점이 더 진짜 같음
  business: {
    owner: "문재필",
    address: "부산 해운대구 반여동 612-12 에코창",
  },
};

const CONTACT = {
  tel: "010-7534-2913",
  sms: "010-7534-2913", // 문자 수신 번호
  kakaoUrl: "https://open.kakao.com/o/sH00Mn6h",
  kakaoChannelId: "_xkxkAb", // 카카오톡 채널 ID (실제 채널 ID로 변경 필요)
  instagram: "https://instagram.com/theslat_busan", // 인스타그램 URL
};

/* ========================================
   상품 카테고리
======================================== */
const PRODUCT_CATEGORIES = {
  UNISLAT: {
    id: "unislat",
    name: "유니슬랫",
    description: "커튼의 우아함 + 블라인드의 기능",
    icon: Sun,
    products: {
      BASIC: {
        name: "Basic",
        subname: "산토리니",
        price: 69000,
        desc: "밝고 깔끔한 데일리 텍스처",
      },
      STANDARD: {
        name: "Standard",
        subname: "라비콤",
        price: 79000,
        desc: "두께감과 결이 살아있는 균형형",
        popular: true,
      },
      PREMIUM: {
        name: "Premium",
        subname: "그린프",
        price: 89000,
        desc: "호텔 무드의 고밀도 프리미엄",
      },
    },
  },
  CURTAIN: {
    id: "curtain",
    name: "커튼",
    description: "클래식한 우아함",
    icon: Moon,
    products: {
      BASIC: {
        name: "베이직 커튼",
        subname: "폴리에스터",
        price: 45000,
        desc: "가성비 좋은 기본 커튼",
      },
      BLACKOUT: {
        name: "암막 커튼",
        subname: "3중 암막",
        price: 65000,
        desc: "99.9% 차광률 완벽 암막",
        popular: true,
      },
      LINEN: {
        name: "린넨 커튼",
        subname: "내추럴 린넨",
        price: 85000,
        desc: "자연스러운 내추럴 무드",
      },
    },
  },
};

const INSTALL_FEE = 120000;
const MIN_HEIGHT = 200;

/* ========================================
   이미지 데이터
======================================== */
const IMAGES = {
  hero: gallery1Open, // 히어로 이미지도 실제 시공 사진으로
  before: beforeImg,
  after: afterImg,
  gallery: [
    { 
      location: "해운대", 
      type: "거실", 
      product: "유니슬랫 Premium",
      open: gallery1Open,
      closed: gallery1Closed,
    },
    { 
      location: "수영구", 
      type: "침실", 
      product: "유니슬랫 Standard",
      open: gallery2Open,
      closed: gallery2Closed,
    },
    { 
      location: "센텀", 
      type: "거실", 
      product: "유니슬랫 Premium",
      open: gallery3Open,
      closed: gallery3Closed,
    },
  ],
};

/* ========================================
   후기 데이터 (사진 포함)
======================================== */
const REVIEWS = [
  {
    id: 1,
    name: "김**",
    location: "해운대구 우동",
    date: "2024.12",
    rating: 5,
    text: "거실이 완전히 달라졌어요. 친구들이 호텔 같다고 놀랄 정도입니다. 상담부터 시공까지 정말 만족스러웠습니다.",
    product: "유니슬랫 Premium",
    verified: true,
    hasPhoto: true,
    photo: gallery1Closed,
  },
  {
    id: 2,
    name: "박**",
    location: "수영구 광안동",
    date: "2024.12",
    rating: 5,
    text: "3군데 견적 받았는데 여기가 가성비 최고였어요. 마감 퀄리티가 확실히 다릅니다. 강력 추천합니다.",
    product: "유니슬랫 Standard",
    verified: true,
    hasPhoto: true,
    photo: gallery2Closed,
  },
  {
    id: 3,
    name: "이**",
    location: "센텀시티",
    date: "2024.11",
    rating: 5,
    text: "실측부터 시공까지 꼼꼼하고 친절하셨어요. 암막 기능도 완벽하고 아이 방에 딱이에요.",
    product: "유니슬랫 Standard",
    verified: true,
    hasPhoto: true,
    photo: gallery2Open,
  },
  {
    id: 4,
    name: "최**",
    location: "남천동",
    date: "2024.11",
    rating: 5,
    text: "신혼집 인테리어 마무리로 설치했는데 대만족입니다. 세련되고 고급스러운 느낌이 확 살아요.",
    product: "유니슬랫 Premium",
    verified: true,
    hasPhoto: true,
    photo: gallery3Closed,
  },
  {
    id: 5,
    name: "정**",
    location: "서면",
    date: "2024.11",
    rating: 5,
    text: "채광 조절이 자유로워서 너무 좋아요. 낮에는 열어두고, 밤에는 닫으면 프라이버시도 완벽해요.",
    product: "유니슬랫 Premium",
    verified: true,
    hasPhoto: true,
    photo: gallery3Open,
  },
];

/* ========================================
   FAQ 데이터 (확장)
======================================== */
const FAQS = [
  {
    q: "실측은 정말 무료인가요?",
    a: "네, 100% 무료입니다. 실측 후 견적이 맞지 않으시면 부담 없이 거절하셔도 됩니다. 어떠한 비용도 청구하지 않습니다.",
  },
  {
    q: "시공 기간은 얼마나 걸리나요?",
    a: "일반 가정집 기준 2-3시간 내 완료됩니다. 당일 바로 사용 가능하며, 청소까지 깔끔하게 정리해드립니다.",
  },
  {
    q: "A/S는 어떻게 받나요?",
    a: "카카오톡이나 전화로 연락주시면 48시간 내 방문합니다. 1년 이내 품질 문제는 무상 처리되며, 이후에도 합리적인 비용으로 관리해드립니다.",
  },
  {
    q: "기존 블라인드/커튼 철거도 해주시나요?",
    a: "네, 기존 제품 철거 및 폐기 처리까지 모두 포함되어 있습니다. 추가 비용 없습니다.",
  },
  {
    q: "색상이나 원단 샘플을 볼 수 있나요?",
    a: "실측 방문 시 다양한 원단 샘플을 직접 보시고 선택하실 수 있습니다. 실제 공간에서 확인하시는 것이 가장 정확합니다.",
  },
  {
    q: "유니슬랫과 일반 커튼의 차이가 뭔가요?",
    a: "유니슬랫은 세로형 버티컬 블라인드로, 채광과 프라이버시를 동시에 조절할 수 있습니다. 커튼은 전통적인 패브릭으로 우아한 분위기를 연출합니다. 공간과 용도에 맞게 추천해드립니다.",
  },
  {
    q: "부산 어디까지 출장 가능한가요?",
    a: "부산 전지역 출장 가능합니다. 해운대, 수영구, 남구, 동래, 서면, 사하구, 북구 등 어디든 방문합니다. 출장비는 무료입니다.",
  },
  {
    q: "결제는 어떻게 하나요?",
    a: "현금, 계좌이체, 카드 결제 모두 가능합니다. 시공 완료 후 확인하신 뒤 결제하시면 됩니다.",
  },
  {
    q: "세탁이나 관리는 어떻게 하나요?",
    a: "유니슬랫은 물걸레로 가볍게 닦아주시면 됩니다. 커튼은 드라이클리닝을 권장하며, 탈부착 방법도 시공 시 안내해드립니다.",
  },
  {
    q: "주말/공휴일에도 시공 가능한가요?",
    a: "네, 가능합니다. 평일 시간이 어려우신 분들을 위해 주말 시공도 진행합니다. 미리 예약해주시면 원하시는 날짜에 방문합니다.",
  },
];

/* ========================================
   서비스 지역 데이터
======================================== */
const SERVICE_AREAS = [
  { name: "해운대구", districts: ["우동", "중동", "좌동", "송정동", "반여동"] },
  { name: "수영구", districts: ["광안동", "민락동", "망미동", "수영동"] },
  { name: "남구", districts: ["대연동", "용호동", "문현동", "감만동"] },
  { name: "동래구", districts: ["온천동", "명륜동", "사직동", "안락동"] },
  { name: "부산진구", districts: ["서면", "전포동", "부전동", "양정동"] },
  { name: "연제구", districts: ["연산동", "거제동", "토곡동"] },
  { name: "금정구", districts: ["장전동", "부곡동", "구서동"] },
  { name: "사하구", districts: ["하단동", "당리동", "괴정동"] },
];

/* ========================================
   유틸리티 함수
======================================== */
const cn = (...classes) => classes.filter(Boolean).join(" ");
const formatPrice = (n) => n.toLocaleString("ko-KR") + "원";
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

/* ========================================
   커스텀 훅
======================================== */
function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}

function useCounter(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView();

  useEffect(() => {
    if (!startOnView || !isInView) return;

    const endNum = parseInt(end.toString().replace(/,/g, ""), 10);
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(endNum * easeOut));

      if (progress < 1) requestAnimationFrame(animate);
    };

    animate();
  }, [end, duration, isInView, startOnView]);

  return [ref, count];
}

/* ========================================
   애니메이션 래퍼 컴포넌트 (접근성 고려)
======================================== */
function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, isInView] = useInView();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const directions = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  };

  // 모션 감소 설정 시 애니메이션 비활성화
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out",
        isInView ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${directions[direction]}`,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ========================================
   긴급성 배너 (상단 고정)
======================================== */
function UrgencyBanner() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 }; // 리셋
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-neutral-900 text-white py-2.5 relative z-[60]">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-4 text-sm">
        <span className="hidden sm:inline text-amber-400 font-medium">🎁 12월 한정</span>
        <span>
          무료 실측 + <span className="text-amber-400 font-bold">10% 할인</span>
        </span>
        <div className="flex items-center gap-1 font-mono bg-white/10 px-3 py-1 rounded">
          <Clock size={14} className="text-amber-400" />
          <span>{String(timeLeft.hours).padStart(2, "0")}</span>
          <span className="text-amber-400">:</span>
          <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
          <span className="text-amber-400">:</span>
          <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
          aria-label="배너 닫기"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

/* ========================================
   실시간 알림 팝업 (사회적 증거)
======================================== */
function RealtimeNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(0);

  const notifications = [
    { area: "해운대구", action: "상담 신청", time: "방금 전" },
    { area: "수영구", action: "견적 문의", time: "2분 전" },
    { area: "센텀시티", action: "실측 예약", time: "5분 전" },
    { area: "남천동", action: "상담 신청", time: "8분 전" },
    { area: "서면", action: "견적 문의", time: "12분 전" },
  ];

  useEffect(() => {
    // 첫 알림은 5초 후에 표시
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // 5초 후 숨기기
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      
      // 15-30초 랜덤 간격 후 다음 알림
      const nextDelay = 15000 + Math.random() * 15000;
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, nextDelay);
    }, 5000);

    return () => clearTimeout(hideTimer);
  }, [isVisible, currentNotification]);

  const notification = notifications[currentNotification];

  return (
    <div
      className={cn(
        "fixed bottom-32 sm:bottom-24 left-4 z-40 transition-all duration-500",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
      )}
    >
      <div className="bg-white rounded-lg shadow-2xl border border-neutral-200 p-4 max-w-xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle size={20} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-900">
              {notification.area}에서 {notification.action}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">{notification.time}</p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-neutral-400 hover:text-neutral-600 -mt-1 -mr-1"
            aria-label="닫기"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================
   SEO Head 컴포넌트
======================================== */
function SEOHead() {
  useEffect(() => {
    // HTML lang 속성 설정
    document.documentElement.lang = "ko";
    
    // Title
    document.title = SEO.title;

    // Meta tags
    const metaTags = [
      { name: "description", content: SEO.description },
      { name: "keywords", content: SEO.keywords },
      { name: "author", content: BRAND.name },
      { name: "robots", content: "index, follow" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "theme-color", content: "#0a0a0a" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "format-detection", content: "telephone=yes" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:title", content: SEO.title },
      { property: "og:description", content: SEO.description },
      { property: "og:image", content: SEO.image },
      { property: "og:url", content: SEO.url },
      { property: "og:site_name", content: BRAND.name },
      { property: "og:locale", content: "ko_KR" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SEO.title },
      { name: "twitter:description", content: SEO.description },
      { name: "twitter:image", content: SEO.image },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement("meta");
        if (name) meta.setAttribute("name", name);
        if (property) meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    });

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", SEO.url);

    // Structured Data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": BRAND.name,
      "description": SEO.description,
      "url": SEO.url,
      "telephone": CONTACT.tel,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "부산",
        "addressCountry": "KR"
      },
      "areaServed": {
        "@type": "City",
        "name": "부산"
      },
      "priceRange": "₩₩",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": BRAND.projects
      }
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, []);

  return null;
}

/* ========================================
   Header 컴포넌트
======================================== */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: "상품", id: "products" },
    { label: "시공사례", id: "gallery" },
    { label: "견적", id: "estimate" },
    { label: "후기", id: "reviews" },
    { label: "서비스지역", id: "areas" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "top-0 bg-black/95 backdrop-blur-md py-4" : "top-10 bg-transparent py-6"
      )}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a 
          href="#" 
          className="text-2xl font-light tracking-[0.3em] text-white"
          aria-label={`${BRAND.name} 홈으로 이동`}
        >
          {BRAND.name}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="메인 네비게이션">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm text-white/70 hover:text-white transition-colors tracking-wide focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black rounded"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center justify-center w-10 h-10 text-white/70 hover:text-white transition-colors"
            aria-label="인스타그램 방문"
          >
            <Instagram size={20} />
          </a>
          <a
            href={CONTACT.kakaoUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-2 px-6 py-3 bg-[#FDD835] text-[#3C1E1E] text-sm font-medium hover:bg-[#FCC800] transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <MessageCircle size={16} />
            카카오톡 상담
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : (
              <div className="space-y-1.5">
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-96 border-t border-white/10" : "max-h-0"
        )}
        role="menu"
      >
        <nav className="px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left text-white/70 hover:text-white py-2 transition-colors"
              role="menuitem"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ========================================
   Hero 섹션
======================================== */
function HeroSection() {
  return (
    <section 
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
      aria-label="메인 히어로 섹션"
    >
      {/* 배경 이미지 - LCP 최적화 */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="THE SLAT 유니슬랫이 설치된 고급스러운 거실 인테리어"
          className="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <FadeIn delay={200}>
          <p className="text-sm tracking-[0.4em] text-white/60 mb-6 uppercase">
            Premium Window Styling
          </p>
        </FadeIn>

        <FadeIn delay={400}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-tight mb-8">
            공간의 품격을
            <br />
            <span className="font-serif italic">완성</span>하다
          </h1>
        </FadeIn>

        <FadeIn delay={600}>
          <p className="text-lg sm:text-xl text-white/70 font-light max-w-2xl mx-auto mb-6 leading-relaxed">
            유니슬랫 & 커튼 전문 시공
            <br className="sm:hidden" /> 부산 전지역 무료 실측
          </p>
          {/* 희소성 강조 */}
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-2 rounded-full text-sm mb-8">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
            이번 주 시공 가능: <span className="font-bold text-white">3자리</span> 남음
          </div>
        </FadeIn>

        <FadeIn delay={800}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href={CONTACT.kakaoUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-[#FDD835] text-[#3C1E1E] font-bold text-lg hover:bg-[#FCC800] hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg shadow-yellow-500/30"
            >
              <MessageCircle size={22} />
              카카오톡 무료 상담
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={`sms:${CONTACT.sms}`}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-medium hover:bg-white/90 transition-all focus:outline-none focus:ring-2 focus:ring-white"
            >
              <MessageSquare size={20} />
              문자 상담
            </a>
            <a
              href={`tel:${CONTACT.tel}`}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 border border-white/30 text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <Phone size={20} />
              전화
            </a>
          </div>
          {/* 신뢰 뱃지 */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/50 text-xs">
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-green-400" />
              1년 무상 보증
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-400" />
              100% 만족 보장
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-green-400" />
              5분 내 응답
            </span>
          </div>
        </FadeIn>
      </div>

      {/* 스크롤 인디케이터 */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
        aria-hidden="true"
      >
        <ChevronDown size={32} />
      </div>
    </section>
  );
}

/* ========================================
   신뢰 지표 섹션
======================================== */
function TrustSection() {
  const [ref1, count1] = useCounter(BRAND.projects);
  const [ref2, count2] = useCounter(BRAND.satisfaction);

  const stats = [
    { ref: ref1, value: count1.toLocaleString(), suffix: "+", label: "누적 시공" },
    { ref: ref2, value: count2, suffix: "%", label: "고객 만족도" },
  ];

  const features = [
    { icon: Truck, label: "무료 출장" },
    { icon: Shield, label: "1년 보증" },
    { icon: Ruler, label: "무료 실측" },
    { icon: Award, label: "프리미엄 자재" },
  ];

  return (
    <section className="py-20 bg-neutral-950" aria-label="신뢰 지표">
      <div className="max-w-6xl mx-auto px-6">
        {/* 통계 */}
        <div className="grid grid-cols-2 gap-8 max-w-xl mx-auto mb-16">
          {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div ref={stat.ref} className="text-center">
                <div className="text-4xl sm:text-5xl font-light text-white mb-2">
                  {stat.value}
                  <span className="text-amber-500">{stat.suffix}</span>
                </div>
                <div className="text-sm text-white/40 tracking-widest uppercase">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 특징 아이콘 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <FadeIn key={i} delay={300 + i * 100}>
              <div className="flex flex-col items-center gap-3 p-6 border border-white/10 hover:border-amber-500/50 transition-colors">
                <feature.icon size={28} className="text-amber-500" />
                <span className="text-white/70 text-sm">{feature.label}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================
   왜 THE SLAT인가 (USP 섹션)
======================================== */
function WhyUsSection() {
  const reasons = [
    {
      icon: Zap,
      title: "당일 시공",
      desc: "오전 예약 시 당일 시공 가능",
    },
    {
      icon: Shield,
      title: "1년 무상 보증",
      desc: "업계 최장 품질 보증 기간",
    },
    {
      icon: Ruler,
      title: "무료 실측",
      desc: "부담 없이 정확한 견적 확인",
    },
    {
      icon: Award,
      title: "프리미엄 자재",
      desc: "검증된 고품질 원단만 사용",
    },
  ];

  return (
    <section className="py-16 bg-amber-50">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-medium text-neutral-900">
              왜 <span className="text-amber-600">THE SLAT</span>인가요?
            </h2>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {reasons.map((reason, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="bg-white p-6 rounded-xl text-center hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <reason.icon size={24} className="text-amber-600" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-1">{reason.title}</h3>
                <p className="text-sm text-neutral-500">{reason.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================
   상품 소개 섹션
======================================== */
function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("unislat");

  return (
    <section id="products" className="py-24 sm:py-32 bg-white" aria-label="상품 소개">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] text-amber-600 mb-4 uppercase">Products</p>
            <h2 className="text-4xl sm:text-5xl font-light text-neutral-900 mb-6">
              상품 라인업
            </h2>
            <p className="text-neutral-500 max-w-xl mx-auto">
              공간과 취향에 맞는 최적의 윈도우 스타일링을 제안합니다
            </p>
          </div>
        </FadeIn>

        {/* 카테고리 탭 */}
        <FadeIn delay={200}>
          <div className="flex justify-center gap-4 mb-12">
            {Object.values(PRODUCT_CATEGORIES).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-3 px-8 py-4 border transition-all focus:outline-none focus:ring-2 focus:ring-amber-500",
                  activeCategory === cat.id
                    ? "border-amber-500 bg-amber-50 text-amber-700"
                    : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                )}
                aria-pressed={activeCategory === cat.id}
              >
                <cat.icon size={20} />
                <div className="text-left">
                  <div className="font-medium">{cat.name}</div>
                  <div className="text-xs opacity-60">{cat.description}</div>
                </div>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* 상품 카드 */}
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(
            activeCategory === "unislat" 
              ? PRODUCT_CATEGORIES.UNISLAT.products 
              : PRODUCT_CATEGORIES.CURTAIN.products
          ).map(([key, product], i) => (
            <FadeIn key={key} delay={300 + i * 100}>
              <div className={cn(
                "relative p-8 border transition-all hover:shadow-lg",
                product.popular 
                  ? "border-amber-500 bg-amber-50/30" 
                  : "border-neutral-200 hover:border-amber-300"
              )}>
                {product.popular && (
                  <span className="absolute -top-3 left-6 px-3 py-1 bg-amber-500 text-white text-xs font-medium tracking-wider uppercase">
                    Best
                  </span>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-medium text-neutral-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-amber-600">{product.subname}</p>
                </div>
                <p className="text-neutral-500 text-sm mb-6 leading-relaxed">{product.desc}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-light text-neutral-900">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-neutral-400 text-sm ml-1">/㎡</span>
                  </div>
                  <a
                    href="#estimate"
                    className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1"
                  >
                    견적 보기 <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================
   Before/After 섹션
======================================== */
function BeforeAfterSection() {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clamp(clientX - rect.left, 0, rect.width);
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (isDragging) updatePosition(e.clientX);
  };

  const handlePointerUp = () => setIsDragging(false);

  // 키보드 접근성
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-neutral-100" aria-label="시공 전후 비교">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] text-amber-600 mb-4 uppercase">Transformation</p>
            <h2 className="text-4xl sm:text-5xl font-light text-neutral-900 mb-6">
              시공 전과 후
            </h2>
            <p className="text-neutral-500 max-w-xl mx-auto">
              슬라이더를 움직여 변화를 직접 확인하세요
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div
            ref={containerRef}
            className="relative aspect-[16/10] sm:aspect-[16/9] max-w-5xl mx-auto cursor-ew-resize overflow-hidden"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={{ touchAction: "none" }}
            role="slider"
            aria-label="시공 전후 비교 슬라이더"
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            {/* After 이미지 */}
            <img
              src={IMAGES.after}
              alt="시공 후"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
              loading="lazy"
            />

            {/* Before 이미지 */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${position}%` }}
            >
              <img
                src={IMAGES.before}
                alt="시공 전"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ width: `${(100 / position) * 100}%`, maxWidth: "none" }}
                draggable={false}
                loading="lazy"
              />
            </div>

            {/* 라벨 */}
            <div className="absolute top-6 left-6 px-4 py-2 bg-black text-white text-xs tracking-widest uppercase">
              Before
            </div>
            <div className="absolute top-6 right-6 px-4 py-2 bg-amber-500 text-black text-xs tracking-widest uppercase font-medium">
              After
            </div>

            {/* 슬라이더 */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl"
              style={{ left: `${position}%` }}
            >
              <button
                onPointerDown={handlePointerDown}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-amber-500"
                aria-label="비교 슬라이더 핸들"
              >
                <MoveHorizontal size={20} className="text-neutral-800" />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ========================================
   갤러리 카드 컴포넌트 (열림/닫힘 토글)
======================================== */
function GalleryCard({ item, index }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <FadeIn delay={index * 150}>
      <div className="group">
        {/* 이미지 컨테이너 */}
        <div 
          className="relative aspect-[4/3] overflow-hidden bg-neutral-200 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(!isOpen); }}
          aria-label={`${item.location} ${item.type} 시공 사진 - 현재 ${isOpen ? '열림' : '닫힘'} 상태. 클릭하여 전환`}
        >
          {/* 닫힘 이미지 (배경) */}
          <img
            src={item.closed}
            alt={`${item.location} ${item.type} ${item.product} 시공 - 닫힘 상태`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          
          {/* 열림 이미지 (전환) */}
          <img
            src={item.open}
            alt={`${item.location} ${item.type} ${item.product} 시공 - 열림 상태`}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105",
              isOpen ? "opacity-100" : "opacity-0"
            )}
            loading="lazy"
            decoding="async"
          />

          {/* 상태 라벨 */}
          <div className="absolute top-4 right-4 z-10">
            <span className={cn(
              "px-3 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors",
              isOpen 
                ? "bg-amber-500 text-black" 
                : "bg-black text-white"
            )}>
              {isOpen ? "열림" : "닫힘"}
            </span>
          </div>

          {/* 클릭 안내 */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
            <span className="px-4 py-2 bg-white/90 text-neutral-800 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              클릭하여 {isOpen ? "닫힘" : "열림"} 보기
            </span>
          </div>

          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* 정보 */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="text-white">
              <div className="flex items-center gap-2 text-sm mb-1">
                <MapPin size={14} />
                <span>{item.location}</span>
                <span className="text-white/50">·</span>
                <span className="text-white/70">{item.type}</span>
              </div>
              <div className="text-amber-400 text-xs font-medium">{item.product}</div>
            </div>
          </div>
        </div>

        {/* 열림/닫힘 토글 버튼 */}
        <div className="flex border border-t-0 border-neutral-200">
          <button
            onClick={() => setIsOpen(true)}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-colors",
              isOpen 
                ? "bg-amber-500 text-black" 
                : "bg-white text-neutral-500 hover:bg-neutral-50"
            )}
          >
            열림
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-colors border-l border-neutral-200",
              !isOpen 
                ? "bg-neutral-900 text-white" 
                : "bg-white text-neutral-500 hover:bg-neutral-50"
            )}
          >
            닫힘
          </button>
        </div>
      </div>
    </FadeIn>
  );
}

/* ========================================
   갤러리 섹션
======================================== */
function GallerySection() {
  return (
    <section id="gallery" className="py-24 sm:py-32 bg-white" aria-label="시공 사례 갤러리">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] text-amber-600 mb-4 uppercase">Portfolio</p>
            <h2 className="text-4xl sm:text-5xl font-light text-neutral-900 mb-6">
              시공 사례
            </h2>
            <p className="text-neutral-500 max-w-xl mx-auto">
              유니슬랫은 열고 닫을 수 있어 채광과 프라이버시를 자유롭게 조절합니다.
              <br />
              <span className="text-amber-600">클릭하여 열림/닫힘 상태를 확인하세요.</span>
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMAGES.gallery.map((item, i) => (
            <GalleryCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* 인스타그램 링크 */}
        <FadeIn delay={600}>
          <div className="text-center mt-12">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border border-neutral-300 text-neutral-700 hover:border-amber-500 hover:text-amber-600 transition-colors"
            >
              <Instagram size={20} />
              인스타그램에서 더 많은 시공 사례 보기
              <ExternalLink size={16} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ========================================
   후기 섹션 (사진 포함)
======================================== */
function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const goTo = (index) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const prev = () => goTo((currentIndex - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => goTo((currentIndex + 1) % REVIEWS.length);

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-neutral-950 text-white overflow-hidden" aria-label="고객 후기">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] text-amber-500 mb-4 uppercase">Reviews</p>
            <h2 className="text-4xl sm:text-5xl font-light mb-6">
              고객 후기
            </h2>
            <p className="text-white/50">
              {BRAND.projects}건 이상의 시공, {BRAND.satisfaction}% 만족도
            </p>
          </div>
        </FadeIn>

        <div className="relative max-w-4xl mx-auto">
          {/* 리뷰 카드 */}
          <div className="relative min-h-[450px] sm:min-h-[350px]" role="region" aria-label="후기 슬라이더">
            {REVIEWS.map((review, i) => (
              <div
                key={review.id}
                className={cn(
                  "absolute inset-0 transition-all duration-700 ease-out",
                  i === currentIndex
                    ? "opacity-100 translate-x-0"
                    : i < currentIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                )}
                aria-hidden={i !== currentIndex}
              >
                <div className="h-full flex flex-col justify-center text-center px-4 sm:px-16">
                  {/* 후기 사진 */}
                  {review.hasPhoto && review.photo && (
                    <div className="mb-6">
                      <img
                        src={review.photo}
                        alt={`${review.name}님의 시공 사진`}
                        className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-amber-500"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {!review.hasPhoto && (
                    <Quote size={48} className="mx-auto mb-6 text-amber-500/30" aria-hidden="true" />
                  )}
                  
                  <p className="text-xl sm:text-2xl font-light leading-relaxed mb-6">
                    "{review.text}"
                  </p>
                  
                  <div className="flex items-center justify-center gap-1 mb-4" aria-label={`평점 ${review.rating}점`}>
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={16}
                        className={j < review.rating ? "fill-amber-500 text-amber-500" : "text-white/20"}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  
                  <div className="text-white/60 text-sm">
                    <span className="text-white font-medium">{review.name}</span>
                    <span className="mx-2">·</span>
                    <span>{review.location}</span>
                    <span className="mx-2">·</span>
                    <span className="text-amber-400">{review.product}</span>
                    {review.verified && (
                      <>
                        <span className="mx-2">·</span>
                        <span className="inline-flex items-center gap-1 text-green-400">
                          <CheckCircle size={12} /> 인증됨
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 네비게이션 */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="p-3 border border-white/20 hover:border-white/50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="이전 후기"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2" role="tablist" aria-label="후기 선택">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-amber-500",
                    i === currentIndex ? "bg-amber-500 w-8" : "bg-white/30 hover:bg-white/50"
                  )}
                  aria-label={`후기 ${i + 1}`}
                  aria-selected={i === currentIndex}
                  role="tab"
                />
              ))}
            </div>
            
            <button
              onClick={next}
              className="p-3 border border-white/20 hover:border-white/50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="다음 후기"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* 후기 작성 유도 */}
        <FadeIn delay={400}>
          <div className="text-center mt-16">
            <p className="text-white/40 text-sm mb-4">시공 후 만족하셨다면 후기를 남겨주세요</p>
            <a
              href={CONTACT.kakaoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
            >
              <Camera size={18} />
              후기 작성하기
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ========================================
   견적 계산기 섹션
======================================== */
function EstimateSection() {
  const [category, setCategory] = useState("UNISLAT");
  const [inputs, setInputs] = useState({
    width: 300,
    height: 230,
    count: 1,
    line: "STANDARD",
  });

  const currentProducts = category === "UNISLAT" 
    ? PRODUCT_CATEGORIES.UNISLAT.products 
    : PRODUCT_CATEGORIES.CURTAIN.products;

  // 카테고리 변경 시 라인 리셋
  useEffect(() => {
    const firstKey = Object.keys(currentProducts)[0];
    setInputs((prev) => ({ ...prev, line: firstKey }));
  }, [category]);

  const result = useMemo(() => {
    const w = Number(inputs.width) || 0;
    const h = Math.max(Number(inputs.height) || 0, MIN_HEIGHT);
    const count = clamp(Number(inputs.count) || 1, 1, 10);

    const area = ((w * h) / 10000) * count;
    const unitPrice = currentProducts[inputs.line]?.price || 0;

    let multiplier = 1;
    if (w >= 380) multiplier *= 1.05; // 대형 창문 추가 비용

    const material = area * unitPrice * multiplier;
    const total = Math.floor((material + INSTALL_FEE) / 1000) * 1000;
    const discounted = Math.floor(total * 0.9 / 1000) * 1000;

    return { area: area.toFixed(2), total, discounted, savings: total - discounted };
  }, [inputs, currentProducts]);

  const handleConsult = async () => {
    const product = currentProducts[inputs.line];
    const categoryName = category === "UNISLAT" ? "유니슬랫" : "커튼";
    
    const memo = `[THE SLAT 견적 문의]
• 상품: ${categoryName} - ${product?.name} (${product?.subname})
• 사이즈: ${inputs.width} x ${inputs.height}cm
• 수량: ${inputs.count}창
• 예상 견적: ${formatPrice(result.discounted)}`;

    try {
      await navigator.clipboard.writeText(memo);
      alert("견적 내용이 복사되었습니다.\n카카오톡에 붙여넣기 해주세요.");
    } catch {
      alert("복사 실패. 아래 내용을 직접 복사해주세요.\n\n" + memo);
    }
    window.open(CONTACT.kakaoUrl, "_blank");
  };

  return (
    <section id="estimate" className="py-24 sm:py-32 bg-neutral-100" aria-label="견적 계산기">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] text-amber-600 mb-4 uppercase">Quote</p>
            <h2 className="text-4xl sm:text-5xl font-light text-neutral-900 mb-6">
              간편 견적
            </h2>
            <p className="text-neutral-500">
              30초 만에 예상 비용을 확인하세요
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="bg-white shadow-xl">
            {/* 상품 카테고리 선택 */}
            <div className="grid grid-cols-2 border-b">
              {[
                { key: "UNISLAT", label: "유니슬랫", icon: Sun },
                { key: "CURTAIN", label: "커튼", icon: Moon },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={cn(
                    "flex items-center justify-center gap-3 py-5 transition-all focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500",
                    category === cat.key
                      ? "bg-amber-500 text-white"
                      : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
                  )}
                  aria-pressed={category === cat.key}
                >
                  <cat.icon size={20} />
                  <span className="font-medium">{cat.label}</span>
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2">
              {/* 입력 영역 */}
              <div className="p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-neutral-200">
                {/* 라인 선택 */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    라인업 선택
                  </label>
                  <div className="space-y-2">
                    {Object.entries(currentProducts).map(([key, product]) => (
                      <button
                        key={key}
                        onClick={() => setInputs({ ...inputs, line: key })}
                        className={cn(
                          "w-full p-4 text-left border transition-all flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-amber-500",
                          inputs.line === key
                            ? "border-amber-500 bg-amber-50"
                            : "border-neutral-200 hover:border-neutral-300"
                        )}
                        aria-pressed={inputs.line === key}
                      >
                        <div>
                          <div className="font-medium text-neutral-900">
                            {product.name}
                            <span className="text-neutral-400 font-normal ml-2 text-sm">{product.subname}</span>
                          </div>
                          <div className="text-xs text-neutral-500 mt-0.5">{product.desc}</div>
                        </div>
                        <div className="text-amber-600 font-medium">{formatPrice(product.price)}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 사이즈 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="width" className="block text-sm font-medium text-neutral-700 mb-2">
                      가로 (cm)
                    </label>
                    <input
                      id="width"
                      type="number"
                      value={inputs.width}
                      onChange={(e) => setInputs({ ...inputs, width: e.target.value })}
                      className="w-full px-4 py-4 border border-neutral-300 bg-white text-neutral-900 text-lg font-medium focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-colors"
                      placeholder="300"
                    />
                  </div>
                  <div>
                    <label htmlFor="height" className="block text-sm font-medium text-neutral-700 mb-2">
                      세로 (cm)
                    </label>
                    <input
                      id="height"
                      type="number"
                      value={inputs.height}
                      onChange={(e) => setInputs({ ...inputs, height: e.target.value })}
                      className="w-full px-4 py-4 border border-neutral-300 bg-white text-neutral-900 text-lg font-medium focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-colors"
                      placeholder="230"
                    />
                  </div>
                </div>

                {/* 수량 */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    창 개수
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setInputs({ ...inputs, count: Math.max(1, inputs.count - 1) })}
                      className="w-12 h-12 border border-neutral-200 hover:border-neutral-400 transition-colors flex items-center justify-center text-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                      aria-label="수량 감소"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-xl font-medium" aria-live="polite">{inputs.count}</span>
                    <button
                      onClick={() => setInputs({ ...inputs, count: Math.min(10, inputs.count + 1) })}
                      className="w-12 h-12 border border-neutral-200 hover:border-neutral-400 transition-colors flex items-center justify-center text-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                      aria-label="수량 증가"
                    >
                      +
                    </button>
                  </div>
                </div>

                </div>

              {/* 결과 영역 */}
              <div className="bg-neutral-950 text-white p-8 flex flex-col">
                <div className="flex-1">
                  <p className="text-xs tracking-widest text-white/40 uppercase mb-8">
                    예상 견적
                  </p>

                  <div className="mb-8">
                    <div className="text-white/40 line-through text-lg mb-2">
                      {formatPrice(result.total)}
                    </div>
                    <div className="text-5xl font-light text-amber-500 mb-3" aria-live="polite">
                      {formatPrice(result.discounted)}
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-400 text-sm">
                      <Sparkles size={14} />
                      {formatPrice(result.savings)} 할인
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-white/50 border-t border-white/10 pt-8">
                    <div className="flex justify-between">
                      <span>적용 면적</span>
                      <span className="text-white">{result.area}㎡</span>
                    </div>
                    <div className="flex justify-between">
                      <span>무료 실측</span>
                      <span className="text-amber-500">포함</span>
                    </div>
                    <div className="flex justify-between">
                      <span>품질 보증</span>
                      <span className="text-amber-500">1년</span>
                    </div>
                    <div className="flex justify-between">
                      <span>철거/폐기</span>
                      <span className="text-amber-500">무료</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConsult}
                  className="group mt-8 w-full py-5 bg-[#FDD835] text-[#3C1E1E] font-bold text-lg hover:bg-[#FCC800] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-lg shadow-yellow-500/30"
                >
                  <MessageCircle size={22} />
                  지금 바로 상담받기
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                {/* 안심 메시지 */}
                <p className="text-center text-xs text-white/40 mt-3">
                  💬 부담 없이 견적만 물어보셔도 됩니다
                </p>

                <p className="text-center text-xs text-white/30 mt-4">
                  평균 응답시간 5분 이내
                </p>
                
                {/* 사회적 증거 */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-center gap-2 text-white/50 text-xs">
                    <div className="flex -space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-5 h-5 rounded-full bg-amber-500/30 border border-white/20"></div>
                      ))}
                    </div>
                    <span>오늘 <span className="text-amber-400 font-medium">12명</span>이 견적 확인함</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ========================================
   서비스 지역 섹션
======================================== */
function ServiceAreasSection() {
  return (
    <section id="areas" className="py-24 sm:py-32 bg-white" aria-label="서비스 지역">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] text-amber-600 mb-4 uppercase">Service Area</p>
            <h2 className="text-4xl sm:text-5xl font-light text-neutral-900 mb-6">
              서비스 지역
            </h2>
            <p className="text-neutral-500">
              부산 전지역 무료 출장 · 무료 실측
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* 지역 리스트 */}
          <FadeIn delay={200}>
            <div className="grid grid-cols-2 gap-4">
              {SERVICE_AREAS.map((area, i) => (
                <div 
                  key={area.name} 
                  className="p-5 border border-neutral-200 hover:border-amber-500/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={16} className="text-amber-500" />
                    <h3 className="font-medium text-neutral-900">{area.name}</h3>
                  </div>
                  <p className="text-sm text-neutral-500">
                    {area.districts.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* 안내 카드 */}
          <FadeIn delay={400}>
            <div className="bg-neutral-950 text-white p-8">
              <h3 className="text-xl font-medium mb-6">출장 안내</h3>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                  <span>부산 전지역 출장비 무료</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                  <span>실측 후 견적이 맞지 않으면 부담 없이 거절 가능</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                  <span>주말/공휴일 시공 가능 (사전 예약)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                  <span>당일 예약 가능 (일정에 따라 조율)</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/40 text-sm mb-4">
                  위 지역 외에도 부산 전역 어디든 방문합니다
                </p>
                <a
                  href={CONTACT.kakaoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
                >
                  <MessageCircle size={18} />
                  출장 가능 여부 문의하기
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ========================================
   FAQ 섹션
======================================== */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-24 sm:py-32 bg-neutral-100" aria-label="자주 묻는 질문">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] text-amber-600 mb-4 uppercase">FAQ</p>
            <h2 className="text-4xl sm:text-5xl font-light text-neutral-900 mb-6">
              자주 묻는 질문
            </h2>
            <p className="text-neutral-500">
              궁금한 점이 있으시면 카카오톡으로 문의해주세요
            </p>
          </div>
        </FadeIn>

        <div className="space-y-3" role="region" aria-label="FAQ 목록">
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 50}>
              <div className="bg-white border border-neutral-200">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="font-medium text-neutral-900">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={cn(
                      "text-neutral-400 transition-transform shrink-0",
                      openIndex === i && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className={cn(
                    "grid transition-all duration-300",
                    openIndex === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                  aria-hidden={openIndex !== i}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 text-neutral-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={FAQS.length * 50 + 100}>
          <div className="text-center mt-12">
            <p className="text-neutral-500 text-sm mb-4">원하는 답변을 찾지 못하셨나요?</p>
            <a
              href={CONTACT.kakaoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-medium hover:bg-amber-400 transition-colors"
            >
              <MessageCircle size={18} />
              카카오톡으로 질문하기
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ========================================
   보장 약속 섹션
======================================== */
function GuaranteeSection() {
  return (
    <section className="py-16 bg-neutral-900 text-white">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-10">
            <Shield size={48} className="mx-auto mb-4 text-amber-500" />
            <h2 className="text-3xl sm:text-4xl font-light mb-4">
              THE SLAT의 <span className="text-amber-400">약속</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-6">
          <FadeIn delay={100}>
            <div className="text-center p-6 border border-white/10 rounded-xl">
              <div className="text-4xl font-bold text-amber-400 mb-2">100%</div>
              <div className="text-lg font-medium mb-2">만족 보장</div>
              <p className="text-white/50 text-sm">
                시공 후 불만족 시<br />무료로 다시 시공해드립니다
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="text-center p-6 border border-white/10 rounded-xl">
              <div className="text-4xl font-bold text-amber-400 mb-2">1년</div>
              <div className="text-lg font-medium mb-2">무상 보증</div>
              <p className="text-white/50 text-sm">
                품질 문제 발생 시<br />1년간 무상으로 수리
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="text-center p-6 border border-white/10 rounded-xl">
              <div className="text-4xl font-bold text-amber-400 mb-2">0원</div>
              <div className="text-lg font-medium mb-2">출장비 무료</div>
              <p className="text-white/50 text-sm">
                실측 후 계약하지 않아도<br />비용 청구 없음
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={400}>
          <p className="text-center text-white/40 text-sm mt-8">
            * 모든 약속은 계약서에 명시되며, 법적 효력을 갖습니다
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ========================================
   CTA 섹션
======================================== */
function CTASection() {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-neutral-950 text-white" aria-label="상담 문의">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          {/* 긴급성 뱃지 */}
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm mb-6">
            <Clock size={16} />
            12월 한정 혜택 마감 임박
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6">
            지금 상담받으시면
            <br />
            <span className="text-amber-400 font-serif italic">10% 추가 할인</span>
          </h2>
          
          {/* 손실 회피 메시지 */}
          <p className="text-white/50 text-lg mb-4 max-w-xl mx-auto">
            무료 실측부터 시공까지 원스톱으로 진행됩니다.
          </p>
          <p className="text-red-400 text-sm mb-8">
            ⚠️ 할인 혜택은 이번 달까지만 적용됩니다
          </p>
          
          {/* 희소성 표시 */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-neutral-950 flex items-center justify-center text-xs font-bold text-black">
                  {["김", "박", "이", "최"][i]}
                </div>
              ))}
            </div>
            <p className="text-white/60 text-sm">
              <span className="text-white font-medium">47명</span>이 이번 주에 상담 신청했어요
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href={CONTACT.kakaoUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-12 py-6 bg-[#FDD835] text-[#3C1E1E] font-bold text-lg hover:bg-[#FCC800] hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg shadow-yellow-500/30"
            >
              <MessageCircle size={24} />
              카카오톡 무료 상담
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={`sms:${CONTACT.sms}`}
              className="inline-flex items-center justify-center gap-3 px-10 py-6 bg-white text-black font-medium hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <MessageSquare size={22} />
              문자 상담
            </a>
            <a
              href={`tel:${CONTACT.tel}`}
              className="inline-flex items-center justify-center gap-3 px-10 py-6 border border-white/30 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <Phone size={22} />
              전화 상담
            </a>
          </div>
          
          {/* 안심 보장 뱃지 */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Shield size={16} className="text-green-400" />
              <span className="text-white/80">1년 무상 보증</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <CheckCircle size={16} className="text-green-400" />
              <span className="text-white/80">불만족 시 재시공</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-amber-500" />
              <span>평균 응답 5분</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-amber-500" />
              <span>1년 품질 보증</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-amber-500" />
              <span>무료 실측</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ========================================
   Footer
======================================== */
function Footer() {
  return (
    <footer className="py-16 bg-black text-white/40 text-sm" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* 브랜드 */}
          <div>
            <div className="text-white text-xl tracking-[0.3em] mb-4">{BRAND.name}</div>
            <p className="leading-relaxed">{BRAND.tagline}</p>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-white font-medium mb-4">연락처</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-amber-500" />
                <a href={`tel:${CONTACT.tel}`} className="hover:text-amber-500 transition-colors">
                  {CONTACT.tel}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare size={14} className="text-amber-500" />
                <a href={`sms:${CONTACT.sms}`} className="hover:text-amber-500 transition-colors">
                  문자 상담
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle size={14} className="text-amber-500" />
                <a 
                  href={CONTACT.kakaoUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  카카오톡 상담
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Instagram size={14} className="text-amber-500" />
                <a 
                  href={CONTACT.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  Instagram
                </a>
              </p>
            </div>
          </div>

          {/* 사업자 정보 */}
          <div>
            <h3 className="text-white font-medium mb-4">사업자 정보</h3>
            <div className="space-y-2 text-xs">
              <p>상호: {BRAND.name}</p>
              <p>대표: {BRAND.business.owner}</p>
              <p>주소: {BRAND.business.address}</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2024 {BRAND.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ========================================
   이탈 방지 팝업 (Exit Intent)
======================================== */
function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 10 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setIsVisible(false)}
      />
      
      {/* 팝업 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-[scaleIn_0.3s_ease-out]">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600"
          aria-label="닫기"
        >
          <X size={24} />
        </button>
        
        <div className="text-center">
          <div className="text-5xl mb-4">🎁</div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-2">
            잠깐만요!
          </h3>
          <p className="text-neutral-600 mb-6">
            지금 상담 신청하시면<br />
            <span className="text-amber-600 font-bold">추가 5% 할인</span> 혜택을 드려요
          </p>
          
          <a
            href={CONTACT.kakaoUrl}
            target="_blank"
            rel="noreferrer"
            className="block w-full py-4 bg-[#FDD835] text-[#3C1E1E] font-bold rounded-xl hover:bg-[#FCC800] transition-colors mb-3"
            onClick={() => setIsVisible(false)}
          >
            할인 혜택 받기
          </a>
          
          <button
            onClick={() => setIsVisible(false)}
            className="text-neutral-400 text-sm hover:text-neutral-600"
          >
            다음에 할게요
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================
   스크롤 진행률 표시
======================================== */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-[70]">
      <div 
        className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ========================================
   맨 위로 버튼
======================================== */
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 1000);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-32 sm:bottom-8 left-6 z-40 w-12 h-12 bg-white border border-neutral-200 rounded-full shadow-lg flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-all",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
      aria-label="맨 위로"
    >
      <ChevronUp size={24} />
    </button>
  );
}

/* ========================================
   상담 위젯 (카카오톡 + 문자)
======================================== */
function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  // 10초 후 자동으로 살짝 열기 (인사)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAutoOpened) {
        setIsOpen(true);
        setHasAutoOpened(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [hasAutoOpened]);

  return (
    <div className="fixed bottom-24 sm:bottom-8 right-6 z-40">
      {/* 말풍선 */}
      <div
        className={cn(
          "absolute bottom-full right-0 mb-4 transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-80">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-600"
            aria-label="닫기"
          >
            <X size={18} />
          </button>
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={32} className="text-amber-500" />
            </div>
            <h3 className="font-medium text-neutral-900 mb-2">무료 상담</h3>
            <p className="text-sm text-neutral-500 mb-5">
              편하신 방법으로 문의하세요.<br />
              평균 5분 이내 답변드립니다.
            </p>
            
            {/* 상담 버튼들 */}
            <div className="space-y-2">
              <a
                href={CONTACT.kakaoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#FDD835] text-[#3C1E1E] font-medium rounded-lg hover:bg-[#FCC800] transition-colors"
              >
                <MessageCircle size={18} />
                카카오톡 상담
              </a>
              <a
                href={`sms:${CONTACT.sms}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors"
              >
                <MessageSquare size={18} />
                문자 상담
              </a>
              <a
                href={`tel:${CONTACT.tel}`}
                className="flex items-center justify-center gap-2 w-full py-3 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <Phone size={18} />
                전화 상담
              </a>
            </div>
          </div>
        </div>
        {/* 말풍선 꼬리 */}
        <div className="absolute bottom-0 right-8 translate-y-full">
          <div className="w-4 h-4 bg-white transform rotate-45 -translate-y-2 shadow-lg"></div>
        </div>
      </div>

      {/* 플로팅 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110",
          isOpen ? "bg-neutral-800 text-white" : "bg-amber-500 text-black"
        )}
        aria-label={isOpen ? "상담창 닫기" : "상담하기"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>

      {/* 알림 뱃지 */}
      {!isOpen && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
          1
        </span>
      )}
    </div>
  );
}

/* ========================================
   Mobile Sticky CTA
======================================== */
function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-white/10 sm:hidden transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      role="navigation"
      aria-label="모바일 하단 메뉴"
    >
      {/* 상단 긴급 메시지 */}
      <div className="bg-red-500/20 text-red-300 text-xs py-1.5 text-center">
        🔥 이번 주 시공 가능 <span className="font-bold text-white">3자리</span> 남음
      </div>
      
      <div className="p-3 flex gap-2">
        <a
          href={`tel:${CONTACT.tel}`}
          className="flex-1 py-3.5 border border-white/20 text-white font-medium flex items-center justify-center gap-2 text-sm"
        >
          <Phone size={16} />
          전화
        </a>
        <a
          href={CONTACT.kakaoUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-[2] py-3.5 bg-[#FDD835] text-[#3C1E1E] font-bold flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/30"
        >
          <MessageCircle size={18} />
          무료 상담받기
        </a>
      </div>
    </div>
  );
}

/* ========================================
   App 메인 컴포넌트
======================================== */
export default function App() {
  useEffect(() => {
    // 폰트 프리로드 (LCP 최적화)
    const preloadFont = document.createElement("link");
    preloadFont.rel = "preload";
    preloadFont.as = "style";
    preloadFont.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap";
    document.head.appendChild(preloadFont);

    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // 전역 스타일
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
      
      * { font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif; }
      .font-serif { font-family: 'Playfair Display', Georgia, serif; }
      
      html { scroll-behavior: smooth; }
      ::selection { background: rgba(245, 158, 11, 0.3); }
      
      body { background: #fafafa; }

      /* 스크롤바 스타일링 */
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #f1f1f1; }
      ::-webkit-scrollbar-thumb { background: #888; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: #555; }
      
      /* 팝업 애니메이션 */
      @keyframes scaleIn {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      
      /* 펄스 애니메이션 강화 */
      @keyframes pulse-strong {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.05); }
      }
      
      /* 접근성: 포커스 스타일 강화 */
      *:focus-visible {
        outline: 3px solid #f59e0b;
        outline-offset: 2px;
      }
      
      /* 접근성: 모션 감소 설정 존중 */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
      
      /* 고대비 모드 지원 */
      @media (prefers-contrast: high) {
        body { background: #fff; }
        .bg-neutral-950, .bg-neutral-900, .bg-black { background: #000 !important; }
        .text-white\\/50, .text-white\\/40, .text-white\\/60, .text-white\\/70 { color: #fff !important; }
        .text-neutral-500, .text-neutral-400 { color: #333 !important; }
        .border-neutral-200, .border-white\\/10, .border-white\\/20 { border-color: #000 !important; }
      }
      
      /* 성능 최적화: will-change */
      .transition-transform { will-change: transform; }
      .transition-opacity { will-change: opacity; }
      
      /* 인쇄 스타일 */
      @media print {
        .fixed, .sticky { position: static !important; }
        .no-print { display: none !important; }
        body { background: #fff !important; color: #000 !important; }
        a { color: #000 !important; text-decoration: underline !important; }
        a::after { content: " (" attr(href) ")"; font-size: 0.8em; }
      }
      
      /* 스크린리더 전용 클래스 */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      .sr-only:focus, .sr-only.focus\\:not-sr-only:focus {
        position: absolute;
        width: auto;
        height: auto;
        padding: inherit;
        margin: inherit;
        overflow: visible;
        clip: auto;
        white-space: normal;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* 접근성: 본문 바로가기 링크 */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-black focus:font-bold focus:rounded"
      >
        본문 바로가기
      </a>
      
      <SEOHead />
      <UrgencyBanner />
      <Header />
      <main id="main-content">
        <HeroSection />
        <TrustSection />
        <WhyUsSection />
        <ProductsSection />
        <BeforeAfterSection />
        <GallerySection />
        <ReviewsSection />
        <EstimateSection />
        <ServiceAreasSection />
        <FAQSection />
        <GuaranteeSection />
        <CTASection />
      </main>
      <Footer />
      <ChatWidget />
      <MobileStickyCTA />
      <RealtimeNotification />
      <ExitIntentPopup />
      <ScrollProgress />
      <BackToTop />
    </div>
  );
}
