'use client';

import { useEffect, useRef } from 'react';

export default function Avatar({ isSpeaking }) {
  const containerRef = useRef(null);
  const avatarUrl = 'https://models.readyplayer.me/693f7a76fe6f676b663b7cc4.glb';

  useEffect(() => {
    if (!containerRef.current) return;

    const iframe = document.createElement('iframe');
    const scene = isSpeaking ? 'fullbody-portrait-v1-talking' : 'fullbody-portrait-v1';
    
    iframe.src = `https://models.readyplayer.me/render?model=${avatarUrl}&scene=${scene}&quality=high`;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.allow = 'camera; microphone';
    
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(iframe);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [isSpeaking]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full rounded-xl overflow-hidden"
      style={{ minHeight: '400px' }}
    />
  );
}