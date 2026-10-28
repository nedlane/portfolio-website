import React from "react";
import Link from "next/link";
import userData from "@constants/data";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <p className="text-purple-700 dark:text-purple-300 font-semibold mb-4">Brisbane · Engineering at UQ</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 leading-tight">I build software for vehicles and the people working on them.</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mt-6 leading-relaxed">I’m Ned. I work on autonomous vehicle software, developer tools and the networks that support UQ Racing.</p>
        <p className="text-base text-gray-600 dark:text-gray-300 mt-4">Looking for ongoing part-time robotics or software engineering work. Two days a week during semester, up to three by arrangement. Available with two weeks’ notice.</p>
        <div className="flex flex-wrap gap-4 mt-8">
          <a href={userData.resumeUrl} className="bg-purple-700 text-white px-5 py-3 rounded-md font-semibold">Download résumé</a>
          <Link href="/about" className="border border-gray-500 px-5 py-3 rounded-md font-semibold">About my work</Link>
        </div>
      </div>
      <figure className="max-w-lg">
        <img src={userData.avatarUrl} alt="Ned Lane playing music" className="rounded-lg w-full" />
        <figcaption className="text-sm text-gray-600 dark:text-gray-300 mt-3">Outside engineering, I play music.</figcaption>
      </figure>
    </section>
  );
}
