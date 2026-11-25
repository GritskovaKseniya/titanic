import { useEffect, useState } from 'react';
import { fetchVimeoThumbnail } from '../utils/video';

/** The video's cover frame URL, or null until loaded / if there isn't one. */
export function useVimeoThumbnail(vimeoInput: string, enabled = true): string | null {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !vimeoInput) {
      setUrl(null);
      return;
    }
    let cancelled = false;
    fetchVimeoThumbnail(vimeoInput).then((u) => !cancelled && setUrl(u));
    return () => {
      cancelled = true;
    };
  }, [vimeoInput, enabled]);

  return url;
}
