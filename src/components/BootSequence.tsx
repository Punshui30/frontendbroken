
import { useEffect, useRef } from 'react';

interface BootSequenceProps {
  onBootComplete: () => void;
}

export default function BootSequence({ onBootComplete }: BootSequenceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnd = () => onBootComplete();
    const handleLoaded = () => {
      video.play().catch(err => {
        console.error('Autoplay failed:', err);
        onBootComplete(); // fallback
      });
    };

    video.addEventListener('ended', handleEnd);
    video.addEventListener('loadeddata', handleLoaded);

    // ✅ Emergency fallback if neither event fires
    const timeout = setTimeout(() => {
      console.warn("Boot timeout fallback triggered");
      onBootComplete();
    }, 4000);

    return () => {
      video.removeEventListener('ended', handleEnd);
      video.removeEventListener('loadeddata', handleLoaded);
      clearTimeout(timeout);
    };
  }, [onBootComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/boot.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      <p className="text-lg text-gold font-mono z-10 animate-pulse">loading system...</p>
    </div>
  );
}
