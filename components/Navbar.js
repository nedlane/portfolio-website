import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import userData from "@constants/data";

export default function Navbar() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <header className="max-w-6xl mx-auto px-6 py-6 md:py-8">
      <div className="flex flex-wrap justify-between items-center gap-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo_optim.svg" alt="" className="h-12 hidden sm:block" />
          <div>
            <p className="font-semibold text-xl">{userData.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{userData.designation}</p>
          </div>
        </Link>
        <button type="button" aria-label="Toggle dark mode" className="rounded-md border border-gray-400 px-3 py-2" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
          {mounted && resolvedTheme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
      <nav aria-label="Main navigation" className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-sm md:text-base">
        {[['/about', 'About'], ['/experience', 'Experience'], ['/contact', 'Contact']].map(([href, label]) => (
          <Link key={href} href={href} aria-current={router.pathname === href ? "page" : undefined} className={router.pathname === href ? "font-bold underline" : "hover:underline"}>{label}</Link>
        ))}
        <a href={userData.resumeUrl} className="hover:underline">Résumé</a>
        <a href={userData.socialLinks.linkedin} className="hover:underline">LinkedIn</a>
        <a href="https://tutoring.nedlane.com/" className="hover:underline">Tutoring</a>
      </nav>
    </header>
  );
}
