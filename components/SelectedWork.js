import React from "react";
import userData from "@constants/data";

export default function SelectedWork() {
  return (
    <section className="bg-[#F1F1F1] dark:bg-gray-900 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-8 mb-16">
          <h2 className="text-6xl lg:text-9xl max-w-xl font-bold text-gray-500 md:text-white dark:text-gray-600">Selected work</h2>
          <a href={userData.socialLinks.github} className="self-start md:self-center px-6 py-4 rounded-md bg-white shadow-lg text-lg font-semibold dark:text-gray-700">View GitHub ↗</a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
          {userData.work.map((item) => (
            <article key={item.title}>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{item.title}</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
