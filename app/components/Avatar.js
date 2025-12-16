'use client';

import { useState, useRef, useEffect } from 'react';

export default function Avatar({ isSpeaking, videoToPlay, onVideoEnd }) {
  const videoRef = useRef(null);
  const idleVideoRef = useRef(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    if (idleVideoRef.current) {
      idleVideoRef.current.play();
    }
  }, []);

  useEffect(() => {
    if (videoToPlay && videoRef.current) {
      setIsPlayingVideo(true);
      if (idleVideoRef.current) {
        idleVideoRef.current.pause();
      }
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [videoToPlay]);

  const handleVideoEnd = () => {
    setIsPlayingVideo(false);
    if (idleVideoRef.current) {
      idleVideoRef.current.play();
    }
    if (onVideoEnd) {
      onVideoEnd();
    }
  };

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center overflow-hidden">
      <video
        ref={idleVideoRef}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isPlayingVideo ? 'opacity-0' : 'opacity-100'}`}
        loop
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        style={{ pointerEvents: 'none' }}
      >
        <source src="/Idle.mp4" type="video/mp4" />
      </video>

      {videoToPlay && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlayingVideo ? 'opacity-100' : 'opacity-0'}`}
          onEnded={handleVideoEnd}
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{ pointerEvents: 'none' }}
        >
          <source src={videoToPlay} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
