import React from "react";
import Link from "next/link";
import userData from "@constants/data";

export default function AboutMe() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold py-12 md:py-20">About Me.</h1>
      </div>
      <div className="bg-[#F1F1F1] dark:bg-gray-900 -mt-16 md:-mt-24 pt-24 md:pt-36 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-2xl md:text-4xl font-semibold leading-relaxed">
            {userData.about.title}. Currently working on{" "}
            <a className="bg-purple-500 rounded-md px-2 py-1 text-white inline decoration-clone" href={userData.about.currentProjectUrl}>{userData.about.currentProject}</a>
          </p>
          <div className="grid md:grid-cols-3 gap-12 md:gap-20 mt-16 md:mt-20">
            <aside>
              <h2 className="text-xl font-semibold">Contact</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">Send me an <a className="underline font-semibold" href={`mailto:${userData.email}`}>email</a> or use the <Link className="underline" href="/contact">contact form</Link>.</p>
              <h2 className="text-xl font-semibold mt-8">Job opportunities</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">{userData.about.opportunities} Available with two weeks’ notice.</p>
              <a className="inline-block mt-4 underline font-semibold" href={userData.resumeUrl}>View résumé</a>
              <h2 className="text-xl font-semibold mt-8">Social links</h2>
              <ul className="mt-4 space-y-4 font-mono text-gray-600 dark:text-gray-300">
                {[['GitHub', userData.socialLinks.github], ['LinkedIn', userData.socialLinks.linkedin], ['Instagram', userData.socialLinks.instagram]].map(([label, href]) => <li key={label}><a className="hover:underline" href={href}>→ {label}</a></li>)}
              </ul>
            </aside>
            <div className="md:col-span-2">
              {userData.about.description.map((paragraph) => <p key={paragraph} className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-6">{paragraph}</p>)}
              <h2 className="bg-purple-500 text-3xl rounded-md px-2 py-1 inline-block font-bold text-white mt-4">Tools I use</h2>
              <ul className="flex flex-wrap gap-x-6 gap-y-4 mt-8 text-lg font-mono" aria-label="Technical skills">
                {userData.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
