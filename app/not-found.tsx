// src/app/not-found.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft, FiSearch, FiAlertCircle } from "react-icons/fi";

export default function NotFound() {
  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* soft background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute -bottom-28 right-0 h-96 w-96 rounded-full bg-red-200/35 blur-3xl" />
      </div>

      <main className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="w-full"
        >
          {/* top badge */}
          <motion.div
            variants={fadeUp}
            className="mx-auto flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm"
          >
            <FiAlertCircle className="text-base text-red-500" />
            <span className="font-medium">404</span>
            <span className="text-zinc-300">•</span>
            <span>Not Found</span>
          </motion.div>

          {/* icon + title */}
          <motion.div variants={fadeUp} className="mt-10 text-center">
            <motion.div
              className="mx-auto mb-5 flex items-center justify-center"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative h-16 w-16 rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <Image
                  src="/icon-for-sharing.png"
                  alt="brand icon"
                  fill
                  className="object-contain p-2 rounded-full"
                  priority
                />
              </div>
            </motion.div>

            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Page not found
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-600">
              Looks like this page doesn’t exist (or it moved).
              Let’s get you back on track — like autumn leaves finding their way 🍂
            </p>
          </motion.div>

          {/* "search" hint box */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-10 w-full max-w-sm rounded-2xl border border-zinc-100 bg-white p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-red-600 hover:shadow-md"
              >
                <FiHome className="text-base" />
                Home
              </Link>

              <a
                href="mailto:mis.mdev@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-2.5 text-sm font-medium text-orange-700 transition-all duration-200 hover:bg-orange-100"
              >
                Contact
              </a>

            </div>
          </motion.div>

          {/* subtle footer */}
          <motion.p
            variants={fadeUp}
            className="mt-10 text-center text-xs text-zinc-500"
          >
            © {new Date().getFullYear()} Mohanad Khaled Hubaishan  🍁
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
}