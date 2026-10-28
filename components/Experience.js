import React from "react";
import userData from "@constants/data";

export default function Experience() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      <h1 className="text-4xl md:text-6xl font-bold mb-10">Experience</h1>
      <div className="space-y-6">
        {userData.experience.map((item) => (
          <article key={`${item.company}-${item.title}`} className="border border-gray-300 dark:border-gray-600 p-6 rounded-lg">
            <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">{item.year}</p>
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <a href={item.companyLink} className="inline-block mt-1 underline text-gray-700 dark:text-gray-300">{item.company}</a>
            <p className="mt-3 leading-relaxed text-gray-700 dark:text-gray-300">{item.desc}</p>
          </article>
        ))}
      </div>
      <h2 className="text-3xl font-bold mt-14 mb-6">Education</h2>
      <p className="text-lg font-semibold">Bachelor of Engineering (Software) / Master of Engineering (Software)</p>
      <p className="mt-2">The University of Queensland · 2024 to July 2029 (expected)</p>
      <a href={userData.resumeUrl} className="inline-block mt-8 underline font-semibold">Download my résumé</a>
    </section>
  );
}
