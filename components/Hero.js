import React from "react";
import { RoughNotationGroup } from "react-rough-notation";
import { RainbowHighlight } from "./RainbowHighlight";
import userData from "@constants/data";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      <div className="text-center lg:text-left">
        <RoughNotationGroup show={true}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-700 dark:text-gray-200 leading-tight">
            {userData.hero.map((field) => (
              <span key={field.word} className="block my-3">
                <RainbowHighlight color={field.color}>
                  <span className="inline-block">{field.word}</span>
                </RainbowHighlight>
              </span>
            ))}
          </h1>
        </RoughNotationGroup>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-8">Engineering at UQ. Autonomous vehicles, developer tools and team infrastructure.</p>
        <a href={userData.resumeUrl} className="inline-block mt-6 px-6 py-3 rounded-md bg-purple-500 text-white font-semibold">View résumé</a>
      </div>
      <figure className="w-full max-w-lg mx-auto lg:mt-20">
        <img src={userData.avatarUrl} alt="Ned Lane playing music" className="w-full shadow" />
        <figcaption className="flex items-center gap-3 mt-4 font-mono">
          <svg aria-hidden="true" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4z" /></svg>
          Playing music
        </figcaption>
      </figure>
    </section>
  );
}
