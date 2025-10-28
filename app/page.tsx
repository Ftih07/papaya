"use client";

import React, { useState, useEffect } from "react";
import { Flame } from "lucide-react";

export default function BirthdayApp() {
  const [stage, setStage] = useState("start");
  const [currentWord, setCurrentWord] = useState(0);
  const [candleStates, setCandleStates] = useState([false, false, false]);
  const words = ["Happy", "Birthday", "Mega 🌷"];

  useEffect(() => {
    if (stage === "text-animation") {
      const timer = setTimeout(() => {
        if (currentWord < words.length - 1) {
          setCurrentWord((w) => w + 1);
        } else {
          setTimeout(() => setStage("cake"), 1000);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [stage, currentWord]);

  const handleStart = () => setStage("text-animation");

  const toggleCandle = (index) => {
    setCandleStates((prev) => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  };

  const allCandlesLit = candleStates.every((s) => s);

  // ========== START ==========
  if (stage === "start") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white">
        <button
          onClick={handleStart}
          className="px-10 py-4 bg-white text-pink-600 rounded-full text-2xl font-bold shadow-xl hover:scale-110 transition-transform duration-300"
        >
          Start
        </button>
      </div>
    );
  }

  // ========== TEXT ANIMATION ==========
  if (stage === "text-animation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center text-center">
        {words.map((word, index) => (
          <div
            key={index}
            className={`absolute text-6xl sm:text-7xl font-bold text-white transition-opacity duration-1000 ${
              index === currentWord ? "opacity-100 animate-pulse" : "opacity-0"
            }`}
            style={{
              animation:
                index === currentWord ? "fadeInOut 1.5s ease-in-out" : "none",
            }}
          >
            {word}
          </div>
        ))}

        <style jsx>{`
          @keyframes fadeInOut {
            0%,
            100% {
              opacity: 0;
              transform: scale(0.8);
            }
            50% {
              opacity: 1;
              transform: scale(1.1);
            }
          }
        `}</style>
      </div>
    );
  }

  // ========== CAKE ==========
  if (stage === "cake") {
    const handleBlowOut = () => {
      setCandleStates([false, false, false]);
    };
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 flex flex-col items-center justify-center text-white px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {allCandlesLit ? "" : ""}
        </h2>

        {/* Tombol matikan semua lilin */}
        <button
          onClick={handleBlowOut}
          className="cursor-pointer px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md shadow-md text-sm transition-all mb-10 opacity-5"
        >
          💨 Tiup Semua Lilin
        </button>

        {/* Candles */}
        <div className="flex gap-8 mb-10 justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
              onClick={() => !candleStates[i] && toggleCandle(i)}
            >
              {candleStates[i] && (
                <Flame
                  size={38}
                  fill="#fbbf24"
                  className="text-yellow-400 animate-bounce drop-shadow-lg mb-1"
                />
              )}
              <div className="w-4 h-20 bg-gradient-to-b from-pink-200 to-pink-400 rounded-full shadow-lg border border-pink-500/30"></div>
            </div>
          ))}
        </div>

        {/* Cake */}
        <div className="relative w-full max-w-xs sm:max-w-md mx-auto scale-100 sm:scale-105 transition-all duration-700 ease-out">
          {/* Top Layer - Strawberry */}
          <div className="relative w-[90%] sm:w-80 h-24 sm:h-28 bg-gradient-to-br from-pink-300 via-pink-400 to-rose-400 rounded-2xl shadow-2xl mx-auto overflow-hidden border-4 border-pink-200/50">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

            {/* Frosting decoration */}
            <div className="absolute top-0 left-0 right-0 flex justify-around items-start pt-2">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 sm:w-6 h-6 sm:h-8 bg-gradient-to-b from-white to-pink-100 rounded-b-full shadow-md"
                ></div>
              ))}
            </div>

            {/* Strawberries */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-around px-4 sm:px-6">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="text-2xl sm:text-3xl animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  🍓
                </div>
              ))}
            </div>
          </div>

          {/* Middle Layer - Chocolate */}
          <div className="relative w-[95%] sm:w-96 h-28 sm:h-32 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 rounded-2xl shadow-2xl -mt-3 mx-auto overflow-hidden border-4 border-amber-600/50">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

            {/* Frosting waves */}
            <div className="absolute top-0 left-0 right-0 flex justify-around">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 sm:w-5 h-8 sm:h-10 bg-gradient-to-b from-amber-400 to-amber-600 rounded-b-full shadow-lg"
                ></div>
              ))}
            </div>

            {/* Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-lg sm:text-2xl font-bold drop-shadow-lg bg-amber-900/30 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full backdrop-blur-sm border-2 border-amber-400/30">
                🎉 HBD Meg 🎉
              </div>
            </div>
          </div>

          {/* Bottom Layer - Vanilla */}
          <div className="relative w-[95%] sm:w-[28rem] h-32 sm:h-36 bg-gradient-to-br from-yellow-200 via-amber-200 to-orange-200 rounded-2xl shadow-2xl -mt-3 mx-auto overflow-hidden border-4 border-yellow-300/50">
            <div className="absolute inset-0 bg-gradient-to-t from-orange-300/30 to-transparent"></div>

            {/* Bottom frosting */}
            <div className="absolute top-0 left-0 right-0 flex justify-around">
              {[...Array(14)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 sm:w-5 h-10 sm:h-12 bg-gradient-to-b from-white to-yellow-100 rounded-b-full shadow-lg"
                ></div>
              ))}
            </div>

            {/* Decorative dots */}
            <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-around px-6 sm:px-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full shadow-lg border-2 border-white"
                ></div>
              ))}
            </div>
          </div>

          {/* Cake Stand - Modern */}
          <div className="relative w-[90%] sm:w-[30rem] h-6 sm:h-8 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-full mx-auto -mt-2 shadow-2xl border-4 border-slate-100/50">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-500/30 to-transparent rounded-full"></div>
            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/40 rounded-full"></div>
          </div>
        </div>

        {/* Button selalu muncul */}
        <button
          onClick={() => setStage("video")}
          className="mt-8 px-8 py-3 bg-white text-pink-600 font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Next 🎬
        </button>
      </div>
    );
  }

  // ========== VIDEO ==========
  if (stage === "video") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex flex-col items-center justify-center px-6 text-center text-white">
        <h2 className="text-4xl font-bold mb-6 animate-bounce">
          🎊 HBD Mega 🎊
        </h2>

        <div className="w-full max-w-3xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src="https://drive.google.com/file/d/1nBQZ57t8Tp7_rgtVK12s85nzrHpdMHrD/preview"
            title="Birthday Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>

        <p className="mt-8 text-lg">
          Semoga sukses dan semua keinginanmu tercapai 🚀
        </p>
      </div>
    );
  }

  return null;
}
