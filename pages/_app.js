import { ReCaptchaProvider } from "next-recaptcha-v3";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <ReCaptchaProvider>
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
      </ReCaptchaProvider>
    </ThemeProvider>
  );
}

export default MyApp;
