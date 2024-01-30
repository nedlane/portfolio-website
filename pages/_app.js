import { ReCaptchaProvider } from "next-recaptcha-v3";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <ReCaptchaProvider>
        <Component {...pageProps} />
      </ReCaptchaProvider>
    </ThemeProvider>
  );
}

export default MyApp;
