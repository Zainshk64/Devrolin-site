// _app.tsx
import React, { Suspense, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// font awesome 6
import "public/icons/font-awesome/css/all.css";

// custom icons
import "public/icons/glyphter/css/xpovio.css";

// main scss
import "@/styles/main.scss";

// Modern Loader Component
const ModernLoader = () => {
  return (
    <div className="modern-loader-wrapper">
      <div className="loader-content">
        {/* Animated Logo */}
        <div className="logo-container">
          <img 
            src="/images/Company-Logo-Normal-1/1.svg" 
            alt="OLIM Logo" 
            className="company-logo"
          />
        </div>

        {/* Animated Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-bar-fill"></div>
        </div>

        {/* Loading Text */}
        <p className="loading-text">Your Future , Our technology.</p>
      </div>

      <style jsx>{`
        .modern-loader-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .loader-content {
          text-align: center;
          animation: fadeIn 0.5s ease-in;
        }

        .logo-container {
          margin-bottom: 10px;
          animation: pulse 2s ease-in-out infinite;
        }

        .company-logo {
          width: 150px;
          height: auto;
          filter: drop-shadow(0 4px 12px rgba(255, 107, 53, 0.2));
        }

        .progress-bar-container {
          width: 200px;
          height: 4px;
          background: #ffe5dc;
          border-radius: 10px;
          overflow: hidden;
          margin: 0 auto 20px;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #FF6B35 0%, #ff8c5a 100%);
          border-radius: 10px;
          animation: fillProgress 1.5s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
        }

        .loading-text {
          color: #FF6B35;
          font-size: 14px;
          font-weight: 500;
          margin: 0;
          animation: textPulse 2s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes drawLine {
          0%, 100% {
            stroke-dashoffset: 30;
          }
          50% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fillProgress {
          0% {
            width: 0%;
            transform: translateX(0);
          }
          50% {
            width: 100%;
            transform: translateX(0);
          }
          100% {
            width: 100%;
            transform: translateX(100%);
          }
        }

        @keyframes textPulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [routeChanging, setRouteChanging] = useState(false);

  // First time page load - 2-3 seconds minimum loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Handle route changes - show loader on navigation
  useEffect(() => {
    const handleStart = () => {
      setRouteChanging(true);
    };

    const handleComplete = () => {
      // Minimum 1 second loading on route change
      setTimeout(() => {
        setRouteChanging(false);
      }, 1000);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  // Show loader on first load or route change
  if (loading || routeChanging) {
    return <ModernLoader />;
  }

  return (
    <Suspense fallback={<ModernLoader />}>
      <Component {...pageProps} />
      <Toaster position="bottom-left" />
    </Suspense>
  );
}