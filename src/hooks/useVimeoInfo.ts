import { useEffect, useState } from 'react';
import { fetchVimeoInfo, VimeoInfo } from '../utils/video';

/** The video's cover frame and length (see fetchVimeoInfo), or null until loaded / if unavailable. */
export function useVimeoInfo(vimeoInput: string, enabled = true): VimeoInfo | null {
  const [info, setInfo] = useState<VimeoInfo | null>(null);

  useEffect(() => {
    if (!enabled || !vimeoInput) {
      setInfo(null);
      return;
    }
    let cancelled = false;
    fetchVimeoInfo(vimeoInput).then((i) => !cancelled && setInfo(i));
    return () => {
      cancelled = true;
    };
  }, [vimeoInput, enabled]);

  return info;
}
