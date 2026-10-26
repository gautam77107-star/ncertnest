"use client";
import { useState } from "react";
import { extractYouTubeId, youtubeEmbedUrl, youtubeWatchUrl, youtubeThumbnail } from "@/lib/youtube";
import { Play, ExternalLink } from "lucide-react";

export default function YouTubePlayer({ urlOrId, title }: { urlOrId: string; title?: string }) {
  const id = extractYouTubeId(urlOrId);
  const [loaded, setLoaded] = useState(false);

  if (!id) {
    return (
      <div className="aspect-video bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-2xl flex flex-col items-center justify-center text-[var(--muted)] gap-2">
        <Play className="w-10 h-10 opacity-40" />
        <span>Video lecture coming soon.</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {title && <h3 className="font-semibold text-lg">{title}</h3>}
      <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-lg border border-[var(--border)]">
        {!loaded ? (
          <button
            onClick={() => setLoaded(true)}
            className="w-full h-full relative group"
            aria-label="Load video"
          >
            <img src={youtubeThumbnail(id)} alt={title || "Video thumbnail"} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition">
              <span className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl group-hover:scale-110 transition">
                <Play className="w-7 h-7 fill-white" />
              </span>
            </span>
          </button>
        ) : (
          <iframe
            src={youtubeEmbedUrl(id)}
            title={title || "YouTube video"}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      <a href={youtubeWatchUrl(id)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[var(--primary)] hover:underline">
        Watch on YouTube <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
