"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [hasAccepted, setHasAccepted] = useState(false);

  // Check if user has seen disclaimer before
  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem('eid-disclaimer-seen');
    if (hasSeenDisclaimer === 'true') {
      setIsOpen(false);
      setHasAccepted(true);
    }
  }, []);

  const closeModal = () => {
    localStorage.setItem('eid-disclaimer-seen', 'true');
    setIsOpen(false);
    setHasAccepted(true);
  };

  return (
    <>
      {/* Disclaimer button that remains visible */}
      {hasAccepted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 left-4 z-20 bg-amber-500 hover:bg-amber-600 text-white text-xs px-2 py-1 rounded-full"
        >
          About This App
        </motion.button>
      )}
    
      {/* Disclaimer Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl"
            >
              <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-300 mb-4">About This Application</h2>
              
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                  This application shares peaceful and universally understandable verses from the Holy Quran to promote reflection and spiritual connection during Eid.
                </p>
                
                <p>
                  <strong>Source attribution:</strong> All verses are sourced directly from the Quran with proper references provided. We use only reputable translations such as those by Abdullah Yusuf Ali, Muhammad Asad, and Sahih International.
                </p>
                
                <p>
                  <strong>Accuracy and respect:</strong> We ensure that all verses are accurately quoted and presented in their proper context, maintaining the integrity of the original text.
                </p>
                
                <p>
                  <strong>Educational purpose:</strong> This app is intended for educational and spiritual reflection, and to share the peaceful wisdom of the Quran during the blessed time of Eid.
                </p>

                <p className="text-xs opacity-80">
                  Please note: We advise consulting with knowledgeable scholars for comprehensive religious guidance. This app does not provide religious rulings or interpretations.
                </p>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
