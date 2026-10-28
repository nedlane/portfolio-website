import React from "react";
import userData from "@constants/data";

export default function SelectedWork() {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">What I work on</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {userData.work.map((item) => (
            <article key={item.title} className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-gray-700 dark:text-gray-300">You can find my public projects on <a className="underline font-semibold" href={userData.socialLinks.github}>GitHub</a>. I can discuss my team contributions in an interview.</p>
      </div>
    </section>
  );
}
