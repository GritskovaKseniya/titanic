// Vimeo helpers — adapted from the pattern used in one-two-film-academy's
// utils/video.ts, trimmed to the one host this site needs. Accept a bare id,
// a full vimeo.com URL, or a private-video URL carrying a `/<hash>` or
// `?h=<hash>` privacy token.
const parseVimeo = (input: string): { id: string; hash?: string } | null => {
  const s = input.trim();
  if (/^\d+$/.test(s)) return { id: s };
  const m = s.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([a-zA-Z0-9]+))?/);
  if (!m) return null;
  return { id: m[1], hash: m[2] || s.match(/[?&]h=([a-zA-Z0-9]+)/)?.[1] };
};

export const buildVimeoEmbed = (input: string, extraParams: Record<string, string> = {}): string | null => {
  const v = parseVimeo(input);
  if (!v) return null;
  const params = new URLSearchParams({ dnt: '1', title: '0', byline: '0', portrait: '0', ...extraParams });
  if (v.hash) params.set('h', v.hash);
  return `https://player.vimeo.com/video/${v.id}?${params.toString()}`;
};

export interface VimeoInfo {
  /** The video's own cover frame, 1280px wide. */
  thumbnailUrl: string | null;
  /** Length in seconds. */
  duration: number | null;
}

// From Vimeo's oEmbed, which allows cross-origin requests. Cached per video
// so each is fetched once per visit.
const infoCache = new Map<string, Promise<VimeoInfo | null>>();

export const fetchVimeoInfo = (input: string): Promise<VimeoInfo | null> => {
  const v = parseVimeo(input);
  if (!v) return Promise.resolve(null);
  const key = `${v.id}/${v.hash ?? ''}`;
  let pending = infoCache.get(key);
  if (!pending) {
    const videoUrl = `https://vimeo.com/${v.id}${v.hash ? `/${v.hash}` : ''}`;
    pending = fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(videoUrl)}&width=1280`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { thumbnail_url?: string; duration?: number } | null) =>
        data ? { thumbnailUrl: data.thumbnail_url ?? null, duration: data.duration ?? null } : null,
      )
      .catch(() => null);
    infoCache.set(key, pending);
  }
  return pending;
};
