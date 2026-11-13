import React, { useCallback, useRef, useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import { resolveImageSrc } from '../utils/publicUrl';

/**
 * Drag-to-reveal comparison: a reconstructed/colorized photo on the left,
 * sliding to uncover the real archival one on the right (or any other pair) —
 * mirrors the site's own Archive vs. AI Reconstruction framing, so the left
 * label reads in the accent color and the right one in the archival gold.
 */
export const CompareSlider: React.FC<{
  leftSrc: string;
  rightSrc: string;
  leftLabel: string;
  rightLabel: string;
  alt?: string;
}> = ({ leftSrc, rightSrc, leftLabel, rightLabel, alt = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    containerRef.current?.setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };
  const stopDragging = () => setDragging(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4));
    if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl border hairline select-none touch-none cursor-ew-resize"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      <img
        src={resolveImageSrc(rightSrc)}
        alt={alt}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={resolveImageSrc(leftSrc)}
          alt={alt}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 pointer-events-none" />

      <span className="absolute top-3 left-3 rounded-full bg-dark/80 backdrop-blur-sm px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
        {leftLabel}
      </span>
      <span className="absolute top-3 right-3 rounded-full bg-dark/80 backdrop-blur-sm px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-goldBright">
        {rightLabel}
      </span>

      <div
        className="absolute inset-y-0 w-0.5 bg-bone/80 pointer-events-none"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label={`${leftLabel} / ${rightLabel}`}
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={handleKeyDown}
        className="absolute top-1/2 w-10 h-10 rounded-full bg-dark border-2 border-accent flex items-center justify-center text-accent shadow-lg shadow-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        style={{ left: `${pos}%`, transform: 'translate(-50%, -50%)' }}
      >
        <ChevronsLeftRight className="w-4 h-4" />
      </div>
    </div>
  );
};
