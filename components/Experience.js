import React from "react";
import userData from "@constants/data";

export default function Experience() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold py-12 md:py-20">Experience</h1>
      </div>
      <div className="bg-[#F1F1F1] dark:bg-gray-900 -mt-16 md:-mt-24 pt-24 md:pt-36 pb-24 px-6">
        <div className="max-w-xl mx-auto">
          {userData.experience.map((item, index) => (
            <React.Fragment key={`${item.company}-${item.title}`}>
              <article className={`relative border p-6 shadow-xl bg-white dark:bg-gray-800 rounded-md z-10 ${item.year === "2027" ? "border-dashed border-gray-400 shadow-sm" : "border-gray-200 dark:border-gray-700"}`}>
                <p className="absolute -top-9 left-0 md:-left-10 text-2xl md:text-4xl whitespace-nowrap font-bold text-gray-200 dark:text-gray-800">{item.year}</p>
                <h2 className="font-semibold text-xl">{item.title}</h2>
                <a href={item.companyLink} className="inline-block mt-1 text-gray-600 dark:text-gray-300">{item.company}</a>
                <p className="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">{item.desc}</p>
              </article>
              {index < userData.experience.length - 1 && <div aria-hidden="true" className="flex flex-col items-center"><div className="w-4 h-4 bg-green-500 rounded-full relative"><div className="absolute inset-0 bg-green-500 rounded-full animate-ping" /></div><div className="w-1 h-24 bg-gray-200 dark:bg-gray-500" /></div>}
            </React.Fragment>
          ))}
          <h2 className="text-3xl font-bold mt-16 mb-6">Education</h2>
          <p className="text-lg font-semibold">Bachelor of Engineering (Software) / Master of Engineering (Software)</p>
          <p className="mt-3 text-gray-600 dark:text-gray-300">The University of Queensland · 2024 to July 2029 (expected)</p>
        </div>
      </div>
    </section>
  );
}
