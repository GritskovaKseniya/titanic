import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { buildVimeoEmbed } from '../utils/video';

/**
 * Vimeo player overlay shared by the trailer button and episode cards. Mount
 * it from the click that opens it: on phones/tablets it goes straight to
 * fullscreen, which browsers only allow shortly after a user gesture.
 *
 * - Android / iPad: the overlay itself is fullscreened (landscape-locked on
 *   Android where supported); leaving fullscreen closes the player.
 * - iPhone can't fullscreen an element or a cross-origin iframe, so the embed
 *   autoplays with playsinline=0, which hands playback to iOS's native
 *   fullscreen player as soon as it starts.
 * - Desktop: a centered overlay; Esc, the ✕ or a click outside closes it.
 */
export const VideoModal: React.FC<{ video: string; title: string; onClose: () => void }> = ({ video, title, onClose }) => {
  const [touch] = useState(() => window.matchMedia('(pointer: coarse)').matches);
  const modalRef = useRef<HTMLDivElement>(null);
  const enteredFullscreen = useRef(false);
  const embed = buildVimeoEmbed(video, touch ? { autoplay: '1', playsinline: '0' } : { autoplay: '1' });

  const close = () => {
    if (enteredFullscreen.current) {
      enteredFullscreen.current = false;
      screen.orientation?.unlock?.();
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    }
    onClose();
  };

  useEffect(() => {
    const el = modalRef.current;
    if (!touch || !el?.requestFullscreen) return;
    el.requestFullscreen()
      .then(() => {
        enteredFullscreen.current = true;
        // Not in lib.dom's types yet; Android Chrome supports it in fullscreen.
        (screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> }).lock?.('landscape').catch(() => {});
      })
      .catch(() => {});
  }, [touch]);

  // Leaving fullscreen (back gesture, system button) closes the player too,
  // instead of dropping the visitor into a half-screen overlay; Esc on desktop.
  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement && enteredFullscreen.current) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('keydown', onKey);
    };
  });

  if (!embed) return null;

  return (
    <div
      ref={modalRef}
      className={`fixed inset-0 z-[100] flex items-center justify-center ${touch ? 'bg-black' : 'bg-black/85 p-4 sm:p-8'}`}
      onClick={close}
    >
      {/* Width also capped by height (16:9), so the video always fits the
          screen whole. Touch fullscreen gives it the full height and puts the
          close button over the corner; desktop keeps room above it. */}
      <div
        className={`relative w-full ${touch ? 'max-w-[calc(100dvh*16/9)]' : 'max-w-[min(56rem,calc((100dvh-6rem)*16/9))]'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className={`text-bone hover:text-accent transition-colors ${
            touch ? 'fixed top-3 right-3 z-10 rounded-full bg-black/60 p-2' : 'absolute -top-10 right-0'
          }`}
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="aspect-video bg-black border hairline overflow-hidden">
          <iframe
            src={embed}
            title={title}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
