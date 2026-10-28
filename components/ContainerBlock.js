import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import userData from "@constants/data";

export default function ContainerBlock({ children, ...customMeta }) {
  const router = useRouter();
  const meta = {
    title: `Ned Lane | ${userData.designation}`,
    description: `Brisbane software engineering student at UQ. Explore my developer tools, web applications and work on autonomous racecars.`,
    image: `${userData.siteUrl}/avatar.jpg`,
    type: "website",
    ...customMeta,
  };
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`${userData.siteUrl}${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`${userData.siteUrl}${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={userData.name} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <main className="dark:bg-gray-800 w-full">
        <Navbar />
        <div>{children}</div>
        <Footer />
      </main>
    </div>
  );
}
