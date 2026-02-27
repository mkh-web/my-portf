import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "@/app/globals.css";


const font = Tajawal({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "700"], // أضفنا أوزان إضافية لتجنب أخطاء التحميل
  preload: true,
  display: "swap",
  fallback: ["Tahoma", "sans-serif"],
});


type Props = {
  params: Promise<{ locale: string }>;
};


export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  const isAr = locale === "ar";

  const baseUrl = "https://mk-portfolio-eight-tau.vercel.app";
  const homePath = `/${locale}`;

  const siteName = isAr ? "مهند خالد حبيشان" : "Mohanad Khaled Hubaishan";

  const translations = {
    title: isAr
      ? "مهند خالد حبيشان | مختص نظم معلومات ومطور مواقع"
      : "Mohanad Khaled Hubaishan | Information Systems & Web Developer",

    template: isAr
      ? "%s | بورتفوليو مهند خالد "
      : "%s | MK Portfolio",

    description: isAr
      ? "بورتفوليو مهند خالد حبيشان — مختص في إدارة نظم المعلومات ومطور مواقع من عدن، اليمن. خبرة في Next.js وLaravel وTypeScript وTailwind، وإدارة VPS سحابي (Linux/Nginx/SSL) مع تركيز على الأداء والأمان وبناء حلول رقمية مؤسسية."
      : "Portfolio of Mohanad Khaled Hubaishan — Information Systems Specialist & Web Developer based in Aden, Yemen. Experienced in Next.js, Laravel, TypeScript, Tailwind CSS, and cloud VPS administration (Linux/Nginx/SSL), focused on performance, security, and scalable institutional solutions.",

    keywords: isAr
      ? [
        "مهند خالد حبيشان",
        "بورتفوليو",
        "مختص نظم معلومات",
        "نظم معلومات إدارية",
        "مطور مواقع",
        "Next.js",
        "Laravel",
        "TypeScript",
        "Tailwind CSS",
        "JavaScript",
        "PHP",
        "SQL",
        "Linux",
        "VPS",
        "Nginx",
        "SSL",
        "إدارة السيرفر",
        "نشر التطبيقات",
        "عدن",
        "اليمن",
      ].join(", ")
      : [
        "Mohanad Khaled Hubaishan",
        "portfolio",
        "Information Systems Specialist",
        "Management Information Systems",
        "Web Developer",
        "Frontend Developer",
        "Full Stack Developer",
        "Next.js",
        "Laravel",
        "TypeScript",
        "Tailwind CSS",
        "JavaScript",
        "PHP",
        "SQL",
        "Linux",
        "Cloud VPS",
        "Nginx",
        "SSL",
        "Server administration",
        "Deployment",
        "Aden",
        "Yemen",
      ].join(", "),

    ogLocale: isAr ? "ar_AR" : "en_US",

    altText: isAr
      ? "بورتفوليو مهند خالد حبيشان"
      : "Mohanad Khaled Hubaishan Portfolio",
  };

  return {
    metadataBase: new URL(baseUrl),

    title: { default: translations.title, template: translations.template },
    description: translations.description,
    keywords: translations.keywords,

    authors: [{ name: siteName, url: baseUrl }],
    creator: siteName,
    publisher: siteName,
    category: "portfolio",

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: homePath,
      languages: {
        ar: "/ar",
        en: "/en",
      },
    },

    openGraph: {
      title: { default: translations.title, template: translations.template },
      description: translations.description,
      siteName,
      images: [
        {
          url: "/icon-for-sharing.png",
          width: 1200,
          height: 630,
          alt: translations.altText,
          type: "image/png",
        },
      ],
      locale: translations.ogLocale,
      alternateLocale: isAr ? ["en_US"] : ["ar_AR"],
      type: "website",
      url: homePath,
    },

    twitter: {
      card: "summary_large_image",
      title: translations.title,
      description: translations.description,
      creator: "@mohnd_khalid_hubaishan",
      images: ["/icon-for-sharing.png"],
    },

    icons: {
      icon: [
        { url: "/favicon.ico", type: "image/x-icon" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },

    manifest: `/manifest.webmanifest`,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div
        className={`${font.variable} antialiased`}
      >
        {children}
      </div>
  );
}
