// Images now live as plain files in public/ (uploaded straight through GitHub's
// web UI — no Firebase Storage, no billing plan required) rather than as
// Storage download URLs. A stored value is either a path relative to public/
// (e.g. "posters/06-margaret-brown.jpg") or a full external URL — this
// resolves either into something an <img src> can use directly, honoring the
// GitHub Pages base path (e.g. "/titanic/").
export const resolveImageSrc = (value?: string): string | undefined => {
  if (!value) return undefined;
  if (/^(https?:)?\/\//.test(value) || value.startsWith('data:')) return value;
  return `${import.meta.env.BASE_URL}${value.replace(/^\//, '')}`;
};
