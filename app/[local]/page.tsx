'use client';

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiCode,
  FiServer,
  FiAward,
  FiBookOpen,
  FiMail,
  FiMapPin,
  FiPhone,
  FiArrowRight,
  FiGlobe,
  FiMenu,
  FiX,
} from "react-icons/fi";

type Project = {
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  tags: string[];
  href: string;
  hasImage: boolean;
  img?: string;
};

export default function MainPage() {
  const pathname = usePathname();
  const router = useRouter();

  const isAr = pathname.startsWith("/ar");
  const localePrefix = isAr ? "/ar" : "/en";

  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ تحديث اتجاه الصفحة (أفضل حل يبقى في layout، لكن هذا يضمنه)
  useLayoutEffect(() => {
    document.documentElement.setAttribute("lang", isAr ? "ar" : "en");
    document.documentElement.setAttribute("dir", isAr ? "rtl" : "ltr");
  }, [isAr]);

  // ✅ اقفل المينيو لو تغير المسار (لغة/تنقل)
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // ✅ منع سكرول الخلفية لما المينيو مفتوح
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // ✅ Esc لإغلاق المينيو
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // رقم واتساب (بدون مسافات)
  const phoneRaw = "967782902986";
  const whatsappLink = `https://wa.me/${phoneRaw}?text=${encodeURIComponent(
    isAr ? "مرحبًا مهند، أريد التواصل معك بخصوص عمل." : "Hi Mohanad, I'd like to contact you about work."
  )}`;

  const switchLanguage = () => {
    // لو الصفحة بدون /ar أو /en (مثلاً "/")
    if (!pathname.startsWith("/ar") && !pathname.startsWith("/en")) {
      router.push(isAr ? `/en${pathname}` : `/ar${pathname}`);
      return;
    }

    const nextPath = isAr
      ? pathname.replace(/^\/ar(\/|$)/, "/en$1")
      : pathname.replace(/^\/en(\/|$)/, "/ar$1");

    router.push(nextPath);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const content = {
    en: {
      nav: {
        projects: "Projects",
        exp: "Experience",
        skills: "Skills",
        courses: "Courses",
      },
      heroTitle: "Building Stable & Intelligent Digital Solutions",
      heroDesc:
        "Information Systems Specialist & Web Developer. I build modern web applications using Next.js and Laravel, and manage cloud VPS environments (Linux / Nginx / SSL) with a focus on performance and security.",
      expTitle: "Experience",
      skillsTitle: "Skills",
      coursesTitle: "Courses",
      projectsTitle: "Projects",
      projectsDesc:
        "Selected work — live links included. B.A.B is a graduation project (no image).",
      footerNote: " 🍁",
      location: "Aden, Yemen",
      btn: {
        email: "Email",
        whatsapp: "WhatsApp",
        lang: "العربية",
      },
      phone: '+967-782-902-986'
    },
    ar: {
      nav: {
        projects: "المشاريع",
        exp: "الخبرات",
        skills: "المهارات",
        courses: "الدورات",
      },
      heroTitle: "بناء حلول رقمية مستقرة وذكية",
      heroDesc:
        "مختص في إدارة نظم المعلومات ومطور مواقع. أطور تطبيقات ويب حديثة باستخدام Next.js وLaravel، وأدير خوادم VPS سحابية (Linux / Nginx / SSL) مع التركيز على الأداء والأمان.",
      expTitle: "الخبرات",
      skillsTitle: "المهارات",
      coursesTitle: "الدورات",
      projectsTitle: "المشاريع",
      projectsDesc:
        "أعمال مختارة — بعض المشاريع لها روابط مباشرة، وB.A.B مشروع تخرج (بدون صورة).",
      footerNote: "🍁",
      location: "عدن، اليمن",
      btn: {
        email: "إيميل",
        whatsapp: "واتساب",
        lang: "English",
      },
      phone: '967-782-902-986+'

    },
  };

  const t = isAr ? content.ar : content.en;

  const experiences = useMemo(
    () => [
      {
        icon: <FiServer className="text-orange-500" />,
        titleEn: "Web Developer — Ministry of Finance (MOF)",
        titleAr: "مطور مواقع — وزارة المالية",
        dateEn: "Feb 2025 — Present",
        dateAr: "فبراير 2025 — حتى الآن",
        bulletsEn: [
          "Developed and launched the official website using Next.js and Laravel.",
          "Managed a cloud VPS (Linux): Nginx, SSL, deployments, monitoring, and security hardening.",
          "Optimized server performance and implemented backup strategies to ensure stability.",
          "Set up and maintained business email services for internal communication.",
        ],
        bulletsAr: [
          "تطوير وإطلاق الموقع الرسمي باستخدام Next.js و Laravel.",
          "إدارة VPS سحابي (Linux): إعداد Nginx و SSL والنشر والمراقبة وتعزيز الأمان.",
          "تحسين أداء الخادم وتطبيق استراتيجيات النسخ الاحتياطي لضمان الاستقرار.",
          "إعداد وإدارة البريد المؤسسي لدعم التواصل الداخلي.",
        ],
      },
      {
        icon: <FiCode className="text-red-500" />,
        titleEn: "Teacher (C++ & C#) — University of Science and Technology",
        titleAr: "معيد (C++ و C#) — جامعة العلوم والتكنولوجيا",
        dateEn: "Sep 2024 — Nov 2024",
        dateAr: "سبتمبر 2024 — نوفمبر 2024",
        bulletsEn: ["Improved student outcomes through interactive learning activities (+10% average test scores)."],
        bulletsAr: ["تحسين نتائج الطلاب عبر أنشطة تفاعلية (+10% متوسط الاختبارات)."],
      },
      {
        icon: <FiAward className="text-orange-500" />,
        titleEn: "IT Internship — Aden Refinery Company",
        titleAr: "تدريب تقني — شركة مصافي عدن",
        dateEn: "Sep 2024 — Oct 2024",
        dateAr: "سبتمبر 2024 — أكتوبر 2024",
        bulletsEn: ["Troubleshooting hardware/software, basic networking, and IT support."],
        bulletsAr: ["استكشاف أعطال الأجهزة والبرمجيات، وشبكات أساسية، ودعم تقني."],
      },
    ],
    []
  );

  const skillGroups = useMemo(
    () => [
      {
        icon: <FiCode className="text-red-500" />,
        titleEn: "Web Development",
        titleAr: "تطوير الويب",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Responsive UI", "REST APIs", "github", "laravel", "motion"],
      },
      {
        icon: <FiServer className="text-orange-500" />,
        titleEn: "Cloud & Server",
        titleAr: "السيرفر والسحابة",
        items: ["Linux VPS", "SSL/TLS", "Deployment", "Backups", "Basic monitoring/logs", "google workspace"],
      },
      {
        icon: <FiAward className="text-red-500" />,
        titleEn: "Professional",
        titleAr: "مهنية",
        items: ["Collaboration", "Documentation", "Problem Solving", "Time Management", "Risk Awareness", "project management"],
      },
    ],
    []
  );

  const courses = useMemo(
    () => [
      {
        icon: <FiBookOpen className="text-orange-500" />,
        nameEn: "Google Career Certificates — Foundations: Data, Data, Everywhere",
        nameAr: "شهادات Google في أساسيات البيانات: البيانات في كل مكان",
      },
      {
        icon: <FiBookOpen className="text-red-500" />,
        nameEn: "Foundations of Cybersecurity — Google Career Certificates",
        nameAr: "أساسيات الأمن السيبراني — شهادات Google",
      },
      {
        icon: <FiBookOpen className="text-orange-500" />,
        nameEn: "Foundations of Project Management — Google Career Certificates",
        nameAr: "أساسيات إدارة المشاريع — شهادات Google",
      },
      {
        icon: <FiBookOpen className="text-red-500" />,
        nameEn: "Human Resources Analytics — UCI (Coursera)",
        nameAr: "تحليلات الموارد البشرية — جامعة كاليفورنيا في إيرفاين (Coursera)",
      },
      {
        icon: <FiBookOpen className="text-orange-500" />,
        nameEn: "Principles of UX/UI Design — Meta (Coursera)",
        nameAr: "مبادئ تصميم UX/UI — Meta (Coursera)",
      },
    ],
    []
  );

  const projects: Project[] = useMemo(
    () => [
      {
        titleEn: "Ministry of Finance Website",
        titleAr: "موقع وزارة المالية",
        descEn: "Official government website with a focus on performance, security, and reliability.",
        descAr: "الموقع الرسمي لوزارة المالية مع تركيز على الأداء والأمان والاعتمادية.",
        tags: ["Next.js", "Laravel", "VPS", "Linux", "Nginx", "SSL"],
        href: "https://mof-yemen.com",
        hasImage: true,
        img: "/mof.png",
      },
      {
        titleEn: "ChatBit Platform (Frontend)",
        titleAr: "ChatBit (واجهات)",
        descEn: "Modern landing page for a CRM-based platform using Next.js and a clean UI system.",
        descAr: "صفحة تعريفية حديثة لمنصة تعتمد على CRM باستخدام Next.js وبنية واجهات نظيفة.",
        tags: ["Next.js", "TypeScript", "Tailwind"],
        href: "https://chatbit-nxt.vercel.app/",
        hasImage: true,
        img: "/cht.png",
      },
      {
        titleEn: "Ahqaf Website",
        titleAr: "موقع الأحقاف",
        descEn: "Content-focused website with user-friendly navigation.",
        descAr: "موقع يركز على عرض المحتوى وتجربة تصفح سهلة.",
        tags: ["Next.js", "UI", "Responsive"],
        href: "https://ahqaf.vercel.app/",
        hasImage: true,
        img: "/ahq.png",
      },
      {
        titleEn: "Travel Landing Page",
        titleAr: "واجهة صفحة سفر",
        descEn: "Tourism-focused landing page with modern design and responsive layout.",
        descAr: "صفحة تعريفية للسفر بتصميم حديث وتجاوب ممتاز.",
        tags: ["Next.js", "Landing Page", "Responsive"],
        href: "https://travel-landing-lemon.vercel.app/",
        hasImage: true,
        img: "/air.png",
      },
      {
        titleEn: "BitX Portfolio",
        titleAr: "بورتفوليو BitX",
        descEn: "Portfolio-style website showcasing projects with a clean aesthetic.",
        descAr: "موقع بورتفوليو لعرض المشاريع بأسلوب نظيف ومرتب.",
        tags: ["Next.js", "Portfolio", "UX"],
        href: "https://bitx-protoflio.vercel.app/",
        hasImage: true,
        img: "/bit.png",
      },
      {
        titleEn: "Beyond Aden Bridge (B.A.B) — Graduation Project",
        titleAr: "Beyond Aden Bridge (B.A.B) — مشروع تخرج",
        descEn: "Full-stack e-commerce concept built as a graduation project (no public demo image).",
        descAr: "فكرة متجر إلكتروني (فل ستاك) كمشروع تخرج (بدون صورة عرض).",
        tags: ["PHP", "JavaScript", "SQL", "HTML/CSS"],
        href: "#",
        hasImage: false,
      },
    ],
    []
  );

  const scrollTo = (hash: string) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-white text-zinc-900 relative overflow-hidden">
      {/* خلفية خفيفة بطابع خريفي */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-red-200/25 blur-3xl" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <Link href={localePrefix} className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-zinc-100 bg-white">
              <Image src="/icon-for-sharing.png" alt="brand" fill className="object-contain p-1 rounded-full" priority />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">{isAr ? "مهند خالد حبيشان" : "Mohanad Hubaishan"}</p>
              <p className="text-xs text-zinc-500">{t.location}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-4 text-sm text-zinc-600 md:flex">
            <a className="hover:text-zinc-900" href="#projects">{t.nav.projects}</a>
            <a className="hover:text-zinc-900" href="#experience">{t.nav.exp}</a>
            <a className="hover:text-zinc-900" href="#skills">{t.nav.skills}</a>
            <a className="hover:text-zinc-900" href="#courses">{t.nav.courses}</a>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-medium text-orange-700 hover:bg-orange-100"
            >
              <FiPhone className="text-base" />
              {t.btn.whatsapp}
            </a>

            <a
              href="mailto:mis.mdev@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-3 py-2 text-xs font-medium text-white hover:bg-red-600"
            >
              <FiMail className="text-base" />
              {t.btn.email}
            </a>

            <button
              onClick={switchLanguage}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
            >
              <FiGlobe className="text-base" />
              {t.btn.lang}
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 text-zinc-700 hover:bg-zinc-50"
            aria-label="Open menu"
          >
            <FiMenu size={20} />
          </button>
        </div>
      </header>

      {/* Side Menu (Mobile) — خارج header عشان ما يكسر stacking */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              className={`fixed top-0 z-50 h-full w-[85%] max-w-sm bg-white shadow-xl ${isAr ? "right-0" : "left-0"}`}
              initial={{ x: isAr ? 360 : -360 }}
              animate={{ x: 0 }}
              exit={{ x: isAr ? 360 : -360 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-full flex-col p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-zinc-100 bg-white">
                      <Image src="/icon-for-sharing.png" alt="brand" fill className="object-contain p-1 rounded-full" priority />
                    </div>
                    <div className="leading-tight">
                      <p className="text-sm font-semibold">{isAr ? "مهند خالد حبيشان" : "Mohanad Hubaishan"}</p>
                      <p className="text-xs text-zinc-500">{t.location}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 text-zinc-700 hover:bg-zinc-50"
                    aria-label="Close menu"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <nav className="mt-6 space-y-2">
                  {[
                    { href: "#projects", label: t.nav.projects },
                    { href: "#experience", label: t.nav.exp },
                    { href: "#skills", label: t.nav.skills },
                    { href: "#courses", label: t.nav.courses },
                  ].map((item) => (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        scrollTo(item.href);
                      }}
                      className="w-full text-start rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 hover:bg-zinc-100"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                <div className="mt-6 space-y-2">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-medium text-orange-700 hover:bg-orange-100"
                  >
                    <FiPhone className="text-base" />
                    {t.btn.whatsapp}
                  </a>

                  <a
                    href="mailto:mis.mdev@gmail.com"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-sm font-medium text-white hover:bg-red-600"
                  >
                    <FiMail className="text-base" />
                    {t.btn.email}
                  </a>

                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      switchLanguage();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                  >
                    <FiGlobe className="text-base" />
                    {t.btn.lang}
                  </button>
                </div>

                <div className="mt-auto pt-6 text-xs text-zinc-500">
                  © {new Date().getFullYear()} — {t.footerNote}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="relative mx-auto max-w-5xl px-5 py-14 text-[15px] md:text-[16px]">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          {/* HERO */}
          <motion.section variants={fadeUp} className="text-center">
            <div className="mx-auto mb-6 flex justify-center">
              <motion.div
                className="relative h-20 w-20"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image src="/icon-for-sharing.png" alt="brand" fill className="object-contain rounded-full" priority />
              </motion.div>
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">{t.heroTitle}</h1>

            <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-8 text-zinc-600">
              {t.heroDesc}
            </p>

            <div className="mx-auto mt-8 flex flex-wrap justify-center gap-2">
              <span className="rounded-full border border-zinc-100 bg-white px-4 py-2 text-xs text-zinc-700">
                <FiMapPin className="inline -mt-0.5 me-1 text-orange-500" />
                {t.location}
              </span>
              <span className="rounded-full border border-zinc-100 bg-white px-4 py-2 text-xs text-zinc-700">
                <FiMail className="inline -mt-0.5 me-1 text-red-500" />
                mis.mdev@gmail.com
              </span>
              <span className="rounded-full border border-zinc-100 bg-white px-4 py-2 text-xs text-zinc-700">
                <FiPhone className="inline -mt-0.5 me-1 text-orange-500" />
                {t.phone}
              </span>
            </div>
          </motion.section>

          {/* PROJECTS */}
          <motion.section id="projects" variants={fadeUp} className="mt-14 scroll-mt-24">
            <h2 className="text-xl font-semibold">{t.projectsTitle}</h2>
            <p className="mt-2 text-sm text-zinc-600">{t.projectsDesc}</p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {projects.map((p) =>
                p.hasImage ? (
                  <motion.a
                    key={p.titleEn}
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    variants={fadeUp}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="group block overflow-hidden rounded-3xl border border-zinc-100 bg-white"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-zinc-50">
                      <Image
                        src={p.img || "/img1.png"}
                        alt={isAr ? p.titleAr : p.titleEn}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-semibold text-zinc-900">
                            {isAr ? p.titleAr : p.titleEn}
                          </h3>
                          <p className="mt-2 text-[15px] md:text-base leading-8 text-zinc-600">
                            {isAr ? p.descAr : p.descEn}
                          </p>
                        </div>

                        <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-zinc-100 bg-zinc-50 text-zinc-700 transition group-hover:bg-red-50 group-hover:text-red-600">
                          <FiArrowRight />
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-zinc-100 bg-white px-3 py-1 text-xs text-zinc-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.a>
                ) : (
                  <motion.div
                    key={p.titleEn}
                    variants={fadeUp}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="rounded-3xl border border-zinc-100 bg-white p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-900">
                          {isAr ? p.titleAr : p.titleEn}
                        </h3>
                        <p className="mt-2 text-[15px] md:text-base leading-8 text-zinc-600">
                          {isAr ? p.descAr : p.descEn}
                        </p>
                      </div>

                      <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-zinc-100 bg-zinc-50 text-zinc-700">
                        <FiAward />
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-zinc-100 bg-white px-3 py-1 text-xs text-zinc-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 text-xs text-zinc-500">
                      {isAr ? "ملاحظة: مشروع تخرج — رابط تجريبي غير متوفر." : "Note: Graduation project — no live demo link."}
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </motion.section>

          {/* EXPERIENCE */}
          <motion.section id="experience" variants={fadeUp} className="mt-14 scroll-mt-24">
            <h2 className="text-xl font-semibold">{t.expTitle}</h2>
            <div className="mt-6 grid gap-5">
              {experiences.map((e) => (
                <motion.div
                  key={e.titleEn}
                  variants={fadeUp}
                  className="rounded-3xl border border-zinc-100 bg-white p-6"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-50 border border-zinc-100">
                        {e.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{isAr ? e.titleAr : e.titleEn}</p>
                        <p className="text-xs text-zinc-500">{isAr ? e.dateAr : e.dateEn}</p>
                      </div>
                    </div>
                  </div>

                  <ul className="mt-4 list-disc space-y-2 ps-5 text-[15px] md:text-base text-zinc-700">
                    {(isAr ? e.bulletsAr : e.bulletsEn).map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* SKILLS */}
          <motion.section id="skills" variants={fadeUp} className="mt-14 scroll-mt-24">
            <h2 className="text-xl font-semibold">{t.skillsTitle}</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {skillGroups.map((g) => (
                <motion.div
                  key={g.titleEn}
                  variants={fadeUp}
                  className="rounded-3xl border border-zinc-100 bg-white p-6"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-50 border border-zinc-100">
                      {g.icon}
                    </div>
                    <p className="text-sm font-semibold">{isAr ? g.titleAr : g.titleEn}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span key={s} className="rounded-full border border-zinc-100 bg-white px-3 py-1 text-xs text-zinc-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* COURSES */}
          <motion.section id="courses" variants={fadeUp} className="mt-14 scroll-mt-24">
            <h2 className="text-xl font-semibold">{t.coursesTitle}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {courses.map((c) => (
                <motion.div
                  key={c.nameEn}
                  variants={fadeUp}
                  className="flex items-start gap-3 rounded-3xl border border-zinc-100 bg-white p-6"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-50 border border-zinc-100">
                    {c.icon}
                  </div>
                  <p className="text-sm text-zinc-800">{isAr ? c.nameAr : c.nameEn}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* FOOTER */}
          <motion.footer variants={fadeUp} className="mt-16 text-center">
            <div className="mx-auto h-px w-full max-w-2xl bg-zinc-100" />
            <p className="mt-6 text-xs text-zinc-500">
              © {new Date().getFullYear()} Mohanad Khaled Hubaishan — {t.footerNote}
            </p>
          </motion.footer>
        </motion.div>
      </main>
    </div>
  );
}