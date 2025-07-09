import React, { useState, useEffect, useRef } from "react";

const ScrollProgressBtn = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const scrollRef = useRef<HTMLButtonElement>(null);

  const handleScroll = () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
    setIsActive(window.scrollY > 50);
  };

  const handleProgressClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <style>
        {`
          .progress-wrap {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            z-index: 1000;
          }

          .progress-wrap.active-progress {
            opacity: 1;
            transform: scale(1);
          }

          .progress-circle {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-sizing: border-box;
            stroke-dasharray: 308.66px;
            stroke-dashoffset: ${308.66 - scrollProgress * 3.0866}px;
            stroke: #ffffff;
            stroke-width: 4;
            fill: none;
            transition: stroke-dashoffset 0.3s;
          }

          @media (max-width: 768px) {
            .progress-wrap {
              width: 50px;
              height: 50px;
              bottom: 20px;
              right: 20px;
            }

            .progress-circle {
              stroke-width: 3;
            }
          }
        `}
      </style>
      <button
        ref={scrollRef}
        className={`progress-wrap ${isActive ? "active-progress" : ""}`}
        onClick={handleProgressClick}
        title="Go To Top"
      >
        <span></span>
        <svg
          className="progress-circle svg-content"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            stroke="#ffffff"
            strokeWidth="4"
            fill="none"
            style={{
              strokeDasharray: "308.66px",
              strokeDashoffset: `${308.66 - scrollProgress * 3.0866}px`,
            }}
          />
        </svg>
      </button>
    </>
  );
};

export default ScrollProgressBtn;
