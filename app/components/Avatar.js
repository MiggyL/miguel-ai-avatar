'use client';

import { useEffect, useRef, useState } from 'react';

export default function Avatar({ isSpeaking }) {
  const [error, setError] = useState(false);
  const avatarUrl = 'https://models.readyplayer.me/693f7a76fe6f676b663b7cc4.glb';

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-blue-50 to-purple-50">
      {error ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3">
              M
            </div>
            <p className="text-sm text-gray-500">Avatar Preview</p>
          </div>
        </div>
      ) : (
        <iframe
          src={`https://models.readyplayer.me/render?model=${avatarUrl}&scene=fullbody-portrait-v1&quality=medium&blendShapes[mouthOpen]=${isSpeaking ? '0.5' : '0'}`}
          className="w-full h-full border-0"
          allow="camera; microphone"
          onError={() => setError(true)}
          style={{ minHeight: '100%' }}
        />
      )}
    </div>
  );
}
