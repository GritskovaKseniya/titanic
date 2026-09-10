// Vimeo-only embed builder — adapted from the pattern used in
// one-two-film-academy's utils/video.ts, trimmed to the one host this site
// needs. Accepts a bare id, a full vimeo.com URL, or a private-video URL
// carrying a `/<hash>` or `?h=<hash>` privacy token.
export const buildVimeoEmbed = (input: string): string | null => {
  const s = input.trim();
  if (!s) return null;

  let id: string | null = null;
  let hash: string | undefined;

  if (/^\d+$/.test(s)) {
    id = s;
  } else {
    const m = s.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([a-zA-Z0-9]+))?/);
    if (m) {
      id = m[1];
      const hashParam = s.match(/[?&]h=([a-zA-Z0-9]+)/);
      hash = m[2] || hashParam?.[1];
    }
  }
  if (!id) return null;

  const params = new URLSearchParams({ dnt: '1', title: '0', byline: '0', portrait: '0' });
  if (hash) params.set('h', hash);
  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
};
