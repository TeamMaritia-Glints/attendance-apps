import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import Head from "next/head";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/icon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
