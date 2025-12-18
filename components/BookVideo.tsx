"use client";
import React, { useState } from "react";
import config from "@/lib/config";

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getFullUrl = (url: string): string => {
    if (url.startsWith("http")) {
      return url;
    }
    return `${config.env.imagekit.urlEndpoint}${url}`;
  };

  const fullVideoUrl = getFullUrl(videoUrl);

  return (
    <div className="relative w-full bg-dark-300 rounded-lg overflow-hidden">
      <div className="relative w-full aspect-video bg-black">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-300 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-200"></div>
          </div>
        )}

        {error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-300">
            <p className="text-light-200">Ошибка загрузки видео</p>
          </div>
        ) : (
          <video
            src={fullVideoUrl}
            controls={true}
            onCanPlay={() => setIsLoading(false)}
            onError={() => {
              setError(true);
              setIsLoading(false);
              console.error("Video load error for URL:", fullVideoUrl);
            }}
            className="w-full h-full"
            preload="metadata"
          />
        )}
      </div>
    </div>
  );
};

export default BookVideo;