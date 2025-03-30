"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useAnimatedText from "./helpers/useAnimatedText";

export default function Home() {
  const [ayat, setAyat] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const [showConfetti, setShowConfetti] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  
  const { text: animatedAyat, isComplete } = useAnimatedText(ayat || "", {
    delay: 300,
    speed: language === "hindi" ? 40 : 30,
  });

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('eidAyatFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Show initial animation
    const timer = setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem('eidAyatFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchAyat = async () => {
    setLoading(true);
    setError(null);
    setShowConfetti(false);
    try {
      const response = await fetch("/api/ayat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          prompt: `Provide a peaceful and universally understandable Ayat from the Quran in ${language}`, 
          language 
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch ayat");
      }
      
      const data = await response.json();
      setAyat(data.response);
      
      // Show confetti on successful fetch
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const addToFavorites = () => {
    if (ayat && !favorites.includes(ayat)) {
      setFavorites([...favorites, ayat]);
    }
  };
  
  const shareAyat = async () => {
    if (!ayat) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Eid Special - Words of Peace',
          text: ayat,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(ayat).then(() => {
        alert('Ayat copied to clipboard!');
      });
    }
  };

  // Confetti animation component
  const Confetti = () => {
    return (
      <div className="confetti-container">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: ['#FFD700', '#FFC107', '#4CAF50', '#2196F3'][Math.floor(Math.random() * 4)]
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900 flex flex-col items-center justify-center p-4 sm:p-8 font-[family-name:var(--font-geist-sans)] overflow-hidden">
      {showConfetti && <Confetti />}
      
      <div className="w-full max-w-3xl mx-auto text-center">
        {/* Language selector */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button 
            onClick={() => setLanguage("english")} 
            className={`px-3 py-1 rounded-full text-sm transition-all ${language === "english" ? "bg-emerald-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
          >
            English
          </button>
          <button 
            onClick={() => setLanguage("hindi")} 
            className={`px-3 py-1 rounded-full text-sm transition-all ${language === "hindi" ? "bg-emerald-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
          >
            हिंदी
          </button>
        </div>
        
        {/* Favorites button */}
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="flex items-center gap-1 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-sm transition-all"
          >
            <span className="text-lg">★</span> 
            {showFavorites ? "Hide Favorites" : "Show Favorites"}
          </button>
        </div>
        
        {/* Header with Eid Greeting */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-emerald-800 dark:text-emerald-300 mb-4 font-[arabic-font]">
            <span className="text-amber-500">Eid</span> Mubarak
          </h1>
          <p className="text-lg sm:text-xl text-emerald-700 dark:text-emerald-400">
            Celebrate this special day with words of peace and wisdom
          </p>
        </motion.div>

        {/* Decorative elements */}
        <div className="flex justify-center mb-8">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-amber-400 via-emerald-600 to-amber-400 rounded-full"
          ></motion.div>
        </div>
        
        {/* Moon and stars decoration */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute -top-16 -right-16 text-6xl text-amber-300 opacity-50 dark:opacity-30"
          >
            ☪
          </motion.div>
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              repeatType: "reverse"
            }}
            className="absolute top-8 right-8 text-2xl text-amber-300"
          >
            ✧
          </motion.div>
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.5,
              repeatType: "reverse",
              delay: 0.5
            }}
            className="absolute -top-4 right-36 text-sm text-amber-300"
          >
            ✦
          </motion.div>
        </div>

        {/* Favorites display */}
        <AnimatePresence>
          {showFavorites && favorites.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 mb-6 max-h-60 overflow-y-auto"
            >
              <h3 className="font-semibold mb-2 text-emerald-700 dark:text-emerald-300">Your Favorites</h3>
              <ul className="text-left">
                {favorites.map((fav, idx) => (
                  <li key={idx} className="mb-2 pb-2 border-b border-emerald-100 dark:border-emerald-900 text-sm">
                    {fav}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ayat display area */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 mb-8 min-h-[200px] flex flex-col items-center justify-center transition-all duration-300 border border-emerald-100 dark:border-emerald-900"
        >
          {ayat ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="animate-fadeIn w-full"
            >
              <div className={`text-gray-700 dark:text-gray-200 text-lg sm:text-xl md:text-2xl italic leading-relaxed mb-6 ${language === "hindi" ? "font-hindi" : ""}`}>
                {animatedAyat}
              </div>
              
              <div className="flex justify-center gap-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addToFavorites}
                  disabled={!!ayat && favorites.includes(ayat)}
                  className={`px-4 py-2 rounded-full text-sm flex items-center gap-1 transition-all
                    ${ayat && favorites.includes(ayat) 
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed" 
                      : "bg-amber-500 hover:bg-amber-600 text-white"}
                  `}
                >
                  <span>★</span> 
                  {ayat && favorites.includes(ayat) ? "Saved" : "Save"}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareAyat}
                  className="px-4 py-2 rounded-full text-sm bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 transition-all"
                >
                  <span>↗</span> Share
                </motion.button>
              </div>
            </motion.div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 relative">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute top-2 left-2 w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.6s" }}></div>
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-4 text-emerald-700 dark:text-emerald-400"
              >
                Finding wisdom for you...
              </motion.p>
            </div>
          ) : (
            <div className="text-center">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-gray-600 dark:text-gray-300 mb-4"
              >
                Click the button below to receive a peaceful verse from the Quran
                {language === "hindi" && <span> in हिंदी</span>}
              </motion.p>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.6
                }}
              >
                <Image 
                  src="/eid-icon.png" 
                  alt="Eid decoration" 
                  width={100} 
                  height={100}
                  className="mx-auto filter drop-shadow-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </motion.div>
            </div>
          )}

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-red-500 dark:text-red-400"
            >
              {error}
            </motion.div>
          )}
        </motion.div>

        {/* Button area */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          onClick={fetchAyat}
          disabled={loading}
          className={`
            px-8 py-4 rounded-full text-lg font-medium transition-all duration-300
            ${loading 
              ? "bg-gray-400 text-gray-200 cursor-not-allowed" 
              : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl"}
            border border-emerald-400/20
          `}
        >
          {loading ? "Loading..." : "Surprise Me with Wisdom"}
        </motion.button>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-6 text-sm text-emerald-700 dark:text-emerald-400"
        >
          Spreading peace and understanding on this blessed Eid
        </motion.p>
      </div>
    </div>
  );
}
