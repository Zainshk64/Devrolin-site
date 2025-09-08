import React, { Suspense } from "react";
import type { AppProps } from "next/app";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// font awesome 6
import "public/icons/font-awesome/css/all.css";

// custom icons
import "public/icons/glyphter/css/xpovio.css";

// main scss
import "@/styles/main.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...pageProps} />
      <ToastContainer position="top-center" />

    </Suspense>
  );
}
