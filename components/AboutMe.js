import React from "react";
import Link from "next/link";
import userData from "@constants/data";

export default function AboutMe() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 md:py-20">
      <h1 className="text-4xl md:text-6xl font-bold mb-10">About me</h1>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6">
          {userData.about.description.map((paragraph) => <p key={paragraph} className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">{paragraph}</p>)}
          <h2 className="text-2xl font-semibold pt-4">Tools I use</h2>
          <ul className="flex flex-wrap gap-3" aria-label="Technical skills">
            {userData.skills.map((skill) => <li key={skill} className="bg-gray-100 dark:bg-gray-900 rounded-md px-4 py-2">{skill}</li>)}
          </ul>
        </div>
        <aside className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 self-start">
          <h2 className="text-xl font-semibold">Work with me</h2>
          <p className="mt-4 leading-relaxed">{userData.about.opportunities}</p>
          <p className="mt-4">Available with two weeks’ notice.</p>
          <div className="flex flex-col gap-4 mt-6">
            <a className="underline font-semibold" href={userData.resumeUrl}>Download résumé</a>
            <a className="underline" href={`mailto:${userData.email}`}>Email me</a>
            <a className="underline" href={userData.socialLinks.linkedin}>LinkedIn</a>
            <Link className="underline" href="/experience">Experience and education</Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
