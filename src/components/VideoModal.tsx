import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { buildVimeoEmbed } from '../utils/video';

// iPhone/iPad (incl. iPadOS posing as a Mac). WebKit only lets an embedded
// player autoplay muted, so there we wait for a tap on play (with sound) and
// hand the video to the system player, which rotates with the phone.
const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

/**
 * Vimeo player overlay shared by the trailer button and episode cards. Mount
 * it from the click that opens it: fullscreen is only allowed shortly after a
 * user gesture.
 *
 * Phones/tablets ("touch"):
 * - iPhone/iPad: a black screen with the player; tapping play opens the
 *   video in iOS's own fullscreen player (playsinline=0). Closing that
 *   player (Done / swipe down) closes this overlay as well.
 * - Android: the page goes fullscreen and locks landscape; leaving
 *   fullscreen closes the player. If the browser refuses the lock and the
 *   phone is held upright, the player is laid out sideways (rotated 90°).
 * - The page underneath is frozen while it's open and restored to the same
 *   scroll position on close.
 * Desktop: a centered overlay; Esc, the ✕ or a click outside closes it.
 */
export const VideoModal: React.FC<{ video: string; title: string; onClose: () => void }> = ({ video, title, onClose }) => {
  const [touch] = useState(() => window.matchMedia('(pointer: coarse)').matches);
  const [ios] = useState(isIOS);
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const enteredFullscreen = useRef(false);
  const embed = buildVimeoEmbed(video, ios ? { playsinline: '0' } : { autoplay: '1' });

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
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
    if (!touch || ios || !el?.requestFullscreen) return;
    el.requestFullscreen()
      .then(() => {
        enteredFullscreen.current = true;
        // Not in lib.dom's types yet; Android Chrome supports it in fullscreen.
        (screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> }).lock?.('landscape').catch(() => {});
      })
      .catch(() => {});
  }, [touch, ios]);

  // iOS: when the system player is dismissed, go straight back to the page
  // rather than leaving the visitor on a paused player. Uses Vimeo's
  // postMessage API (fullscreenchange event); if it never fires, the ✕ works.
  useEffect(() => {
    if (!ios) return;
    let wasFullscreen = false;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://player.vimeo.com' || e.source !== iframeRef.current?.contentWindow) return;
      let msg: { event?: string; data?: { fullscreen?: boolean } };
      try {
        msg = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (msg?.event === 'ready') {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ method: 'addEventListener', value: 'fullscreenchange' }),
          'https://player.vimeo.com',
        );
      } else if (msg?.event === 'fullscreenchange') {
        if (msg.data?.fullscreen) wasFullscreen = true;
        else if (wasFullscreen) onCloseRef.current();
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [ios]);

  // Freeze the page behind the player (position:fixed is the variant iOS
  // Safari respects) and put it back exactly where it was.
  useEffect(() => {
    if (!touch) return;
    const y = window.scrollY;
    const body = document.body.style;
    const prev = { position: body.position, top: body.top, width: body.width, overflow: body.overflow };
    Object.assign(body, { position: 'fixed', top: `-${y}px`, width: '100%', overflow: 'hidden' });
    return () => {
      Object.assign(body, prev);
      window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior }); // the page has smooth scrolling
    };
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

  const player = (
    <div className="aspect-video bg-black border hairline overflow-hidden">
      <iframe ref={iframeRef} src={embed} title={title} className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
    </div>
  );
  const closeButton = (className: string) => (
    <button onClick={close} className={`text-bone hover:text-accent transition-colors ${className}`} aria-label="Close">
      <X className="w-6 h-6" />
    </button>
  );

  if (touch && ios) {
    return (
      <div ref={modalRef} className="fixed inset-0 z-[100] bg-black overscroll-contain flex items-center justify-center">
        {closeButton('absolute top-3 right-3 z-10 rounded-full bg-black/60 p-2')}
        <div className="w-full max-w-[calc(100dvh*16/9)]">{player}</div>
      </div>
    );
  }

  if (touch) {
    return (
      <div ref={modalRef} className="fixed inset-0 z-[100] bg-black overscroll-contain">
        {/* The "stage" fills the screen; held upright it's swapped to
            screen-height × screen-width and turned 90°, so the video and the
            ✕ read as landscape. The video is the largest 16:9 that fits. */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-dvh flex items-center justify-center
                     portrait:w-[100dvh] portrait:h-[100vw] portrait:rotate-90"
        >
          {closeButton('absolute top-3 right-3 z-10 rounded-full bg-black/60 p-2')}
          <div className="w-full max-w-[calc(100dvh*16/9)] portrait:max-w-[calc(100vw*16/9)]">{player}</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={modalRef} className="fixed inset-0 z-[100] bg-black/85 p-4 sm:p-8 flex items-center justify-center" onClick={close}>
      {/* Width also capped by height (16:9), leaving room for the ✕ above. */}
      <div className="relative w-full max-w-[min(56rem,calc((100dvh-6rem)*16/9))]" onClick={(e) => e.stopPropagation()}>
        {closeButton('absolute -top-10 right-0')}
        {player}
      </div>
    </div>
  );
};
