"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface AudioTrack {
  name: string;
  src: string;
  label: string;
}

interface AudioPlayerProps {
  tracks: AudioTrack[];
  className?: string;
}

const AudioPlayer = ({ tracks, className = "" }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  // Auto-play when component mounts (with user interaction constraint handled)
  useEffect(() => {
    const attemptAutoPlay = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            // Auto-play was prevented by browser
            console.log("Auto-play prevented:", error);
            setIsPlaying(false);
          });
      }
    };

    // Try to auto-play
    attemptAutoPlay();

    // Setup event listeners for when user interacts with the page
    const handleInteraction = () => {
      if (!isPlaying && audioRef.current) {
        attemptAutoPlay();
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
      }
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Change to a random track
  const changeRandomTrack = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * tracks.length);
    } while (newIndex === currentTrackIndex && tracks.length > 1);
    
    setCurrentTrackIndex(newIndex);
    
    setTimeout(() => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play();
      }
    }, 100);
  };

  // Handle track end - play the next random track
  const handleTrackEnd = () => {
    changeRandomTrack();
  };

  return (
    <div className={`audio-player ${className}`}>
      <audio 
        ref={audioRef} 
        src={currentTrack.src}
        onEnded={handleTrackEnd}
        loop={false}
      />
      
      <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur p-2 rounded-full shadow-md">
        {/* Play/Pause Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={togglePlayPause}
          className="w-8 h-8 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-full"
          aria-label={isPlaying ? "Pause music" : "Play music"}
          title={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <span className="h-3 w-3 border-l-2 border-r-2 border-white"></span> // Pause icon
          ) : (
            <span className="ml-1 w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent"></span> // Play icon
          )}
        </motion.button>
        
        {/* Skip Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={changeRandomTrack}
          className="w-8 h-8 flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white rounded-full"
          aria-label="Change song"
          title="Change song"
        >
          <span className="block w-4 h-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3L21 7L17 11"></path>
              <path d="M3 7H21"></path>
              <path d="M7 13L3 17L7 21"></path>
              <path d="M21 17H3"></path>
            </svg>
          </span>
        </motion.button>
        
        {/* Now playing label */}
        {isPlaying && (
          <div className="text-xs text-emerald-800 dark:text-emerald-300 ml-1 max-w-[120px] sm:max-w-none overflow-hidden">
            <div className="truncate flex items-center">
              <span className="mr-1">♪</span>
              <span>{currentTrack.label}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
