import { removeDoc, saveDoc, seedCollection, useLiveCollection } from './liveCollection';

export type GalleryHue = 'coral' | 'gold' | 'navy';

export interface GalleryItem {
  id: string;
  episodeNumber: number;
  hue: GalleryHue;
  caption: { ru: string; en: string };
  /** Public Storage URL of the real still, once uploaded via /admin. Falls back to a `hue` gradient tile until then. */
  imageUrl?: string;
}

// Placeholder tiles standing in for the real AI stills — once real images are
// uploaded through /admin they carry `imageUrl` and the gradient is unused.
export const defaultGalleryItems: GalleryItem[] = [
  {
    id: 'gallery-01',
    episodeNumber: 2,
    hue: 'gold',
    caption: { ru: 'Салон первого класса, реконструкция интерьера', en: 'First-class saloon, interior reconstruction' },
  },
  {
    id: 'gallery-02',
    episodeNumber: 9,
    hue: 'navy',
    caption: { ru: 'Нос корабля на глубине 3800 м', en: 'The bow at a depth of 3,800 m' },
  },
  {
    id: 'gallery-03',
    episodeNumber: 9,
    hue: 'coral',
    caption: { ru: 'Личные вещи среди обломков', en: 'Personal effects among the wreckage' },
  },
  {
    id: 'gallery-04',
    episodeNumber: 1,
    hue: 'gold',
    caption: { ru: '«Титаник» покидает Саутгемптон на закате', en: 'Titanic leaves Southampton at dusk' },
  },
  {
    id: 'gallery-05',
    episodeNumber: 3,
    hue: 'coral',
    caption: { ru: 'Лицо пассажирки, восстановленное по одной фотографии', en: "A passenger's face, rebuilt from a single photograph" },
  },
  {
    id: 'gallery-06',
    episodeNumber: 5,
    hue: 'navy',
    caption: { ru: 'Мостик за минуту до столкновения', en: 'The bridge, one minute before impact' },
  },
];

export const useGalleryItems = (): GalleryItem[] => useLiveCollection<GalleryItem>('gallery', defaultGalleryItems);

export const saveGalleryItem = (item: GalleryItem): Promise<void> => saveDoc('gallery', item.id, item);

export const deleteGalleryItem = (id: string): Promise<void> => removeDoc('gallery', id);

export const seedGallery = (): Promise<void> =>
  seedCollection(
    'gallery',
    defaultGalleryItems.map((g) => ({ id: g.id, data: g })),
  );
