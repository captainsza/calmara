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
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const interactionRef = useRef(false);

  const currentTrack = tracks[currentTrackIndex];

  // Handle audio loading
  const handleLoadedData = () => {
    setIsLoaded(true);
    if (interactionRef.current) {
      playAudio();
    }
  };

  // Play audio with error handling
  const playAudio = () => {
    if (!audioRef.current || !isLoaded) return;

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setAudioError(null);
        })
        .catch(error => {
          console.log("Play error:", error);
          setIsPlaying(false);
          setAudioError("Couldn't play audio automatically");
        });
    }
  };

  // Try to autoplay when component mounts and track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.7; // Set lower volume for background music

      // Try autoplay if we have user interaction history
      if (interactionRef.current && isLoaded) {
        playAudio();
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentTrackIndex, isLoaded]);

  // Setup user interaction detection
  useEffect(() => {
    // Function to handle user interaction
    const handleUserInteraction = () => {
      if (!interactionRef.current) {
        interactionRef.current = true;
        
        // Try to play audio if it's already loaded
        if (isLoaded) {
          playAudio();
        }
        
        // Store that user has interacted for future page visits
        try {
          sessionStorage.setItem('hasInteracted', 'true');
        } catch (e) {
          console.log('Could not access sessionStorage');
        }
      }
    };

    // Check if user has interacted in previous sessions
    try {
      const hasInteracted = sessionStorage.getItem('hasInteracted') === 'true';
      if (hasInteracted) {
        interactionRef.current = true;
      }
    } catch (e) {
      console.log('Could not access sessionStorage');
    }

    // Events to detect user interaction
    const events = ['click', 'touchstart', 'keydown'];
    
    // Add multiple event listeners
    events.forEach(event => 
      document.addEventListener(event, handleUserInteraction, { once: true })
    );
    
    // Cleanup
    return () => {
      events.forEach(event => 
        document.removeEventListener(event, handleUserInteraction)
      );
    };
  }, [isLoaded]);

  // Toggle play/pause with better state management
  const togglePlayPause = () => {
    // Reset error state on manual interaction
    setAudioError(null);

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Mark that we've had user interaction
        interactionRef.current = true;
        
        // Attempt to play
        playAudio();
      }
    }
  };

  // Change to a random track
  const changeRandomTrack = () => {
    // Reset error state on track change
    setAudioError(null);
    
    // Select a random track that's different from current
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * tracks.length);
    } while (newIndex === currentTrackIndex && tracks.length > 1);
    
    setIsLoaded(false);
    setCurrentTrackIndex(newIndex);
    
    // Playback will be handled by the useEffect that watches currentTrackIndex
  };

  // Handle track end - play the next random track
  const handleTrackEnd = () => {
    changeRandomTrack();
  };

  // Handle audio errors
  const handleAudioError = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    console.error("Audio error:", e);
    setAudioError("Error loading audio");
    setIsPlaying(false);
  };

  return (
    <div className={`audio-player ${className}`}>
      <audio 
        ref={audioRef} 
        src={currentTrack.src}
        onEnded={handleTrackEnd}
        onLoadedData={handleLoadedData}
        onError={handleAudioError}
        preload="auto"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur p-2 rounded-full shadow-md"
      >
        {/* Play/Pause Button with enhanced feedback */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlayPause}
          className={`w-8 h-8 flex items-center justify-center transition-colors duration-300
            ${isPlaying 
              ? 'bg-emerald-600 hover:bg-emerald-700' 
              : 'bg-amber-500 hover:bg-amber-600'} 
            text-white rounded-full relative overflow-hidden`}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          title={isPlaying ? "Pause music" : "Play music"}
        >
          {!isLoaded && (
            <span className="absolute inset-0 bg-gray-700/30 flex items-center justify-center">
              <span className="w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin"></span>
            </span>
          )}
          
          {isLoaded && isPlaying ? (
            <span className="h-3 w-3 border-l-2 border-r-2 border-white"></span> // Pause icon
          ) : (
            <span className="ml-1 w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent"></span> // Play icon
          )}
        </motion.button>
        
        {/* Skip Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={changeRandomTrack}
          disabled={!isLoaded}
          className={`w-8 h-8 flex items-center justify-center 
            ${isLoaded ? 'bg-amber-500 hover:bg-amber-600' : 'bg-gray-400'} 
            text-white rounded-full transition-colors duration-300`}
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
        
        {/* Now playing label with animation and error feedback */}
        <div className={`text-xs ml-1 max-w-[120px] sm:max-w-none overflow-hidden transition-colors duration-300
          ${audioError 
            ? 'text-red-500 dark:text-red-400' 
            : isPlaying 
              ? 'text-emerald-800 dark:text-emerald-300' 
              : 'text-gray-500 dark:text-gray-400'}`}
        >
          <div className="truncate flex items-center">
            {isPlaying && !audioError && (
              <span className="mr-1 music-pulse inline-flex items-center">
                <span className="w-1 h-2 bg-emerald-500 dark:bg-emerald-400 mx-[1px] animate-sound-wave"></span>
                <span className="w-1 h-3 bg-emerald-500 dark:bg-emerald-400 mx-[1px] animate-sound-wave animation-delay-200"></span>
                <span className="w-1 h-2 bg-emerald-500 dark:bg-emerald-400 mx-[1px] animate-sound-wave animation-delay-400"></span>
              </span>
            )}
            {audioError ? (
              <span className="text-red-500 dark:text-red-400">
                Click to enable music
              </span>
            ) : isPlaying ? (
              <span>{currentTrack.label}</span>
            ) : (
              <span>{isLoaded ? "Music Paused" : "Loading..."}</span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AudioPlayer;
