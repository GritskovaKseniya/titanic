import { Language } from '../i18n/translations';
import { removeDoc, saveDoc, seedCollection, useLiveCollection } from './liveCollection';

export type GalleryHue = 'coral' | 'gold' | 'navy';

export interface GalleryItem {
  id: string;
  episodeNumber: number;
  hue: GalleryHue;
  caption: Record<Language, string>;
  /** Path under public/gallery/ (or a full URL), once set via /admin. Falls back to a `hue` gradient tile until then. */
  imageUrl?: string;
}

// Placeholder tiles standing in for the real AI stills — once real images are
// uploaded through /admin they carry `imageUrl` and the gradient is unused.
export const defaultGalleryItems: GalleryItem[] = [
  {
    id: 'gallery-01',
    episodeNumber: 2,
    hue: 'gold',
    caption: {
      en: 'First-class saloon, interior reconstruction',
      ru: 'Салон первого класса, реконструкция интерьера',
      fr: 'Salon de première classe, reconstitution intérieure',
      es: 'Salón de primera clase, reconstrucción del interior',
      de: 'Salon der ersten Klasse, Innenraumrekonstruktion',
      it: 'Salone di prima classe, ricostruzione degli interni',
    },
  },
  {
    id: 'gallery-02',
    episodeNumber: 9,
    hue: 'navy',
    caption: {
      en: 'The bow at a depth of 3,800 m',
      ru: 'Нос корабля на глубине 3800 м',
      fr: 'La proue à 3 800 m de profondeur',
      es: 'La proa a 3800 m de profundidad',
      de: 'Der Bug in 3.800 m Tiefe',
      it: 'La prua a 3.800 m di profondità',
    },
  },
  {
    id: 'gallery-03',
    episodeNumber: 9,
    hue: 'coral',
    caption: {
      en: 'Personal effects among the wreckage',
      ru: 'Личные вещи среди обломков',
      fr: "Effets personnels parmi l'épave",
      es: 'Objetos personales entre los restos del naufragio',
      de: 'Persönliche Gegenstände zwischen den Wrackteilen',
      it: 'Oggetti personali tra i relitti',
    },
  },
  {
    id: 'gallery-04',
    episodeNumber: 1,
    hue: 'gold',
    caption: {
      en: 'Titanic leaves Southampton at dusk',
      ru: '«Титаник» покидает Саутгемптон на закате',
      fr: 'Le Titanic quitte Southampton au crépuscule',
      es: 'El Titanic zarpa de Southampton al atardecer',
      de: 'Die Titanic verlässt Southampton in der Abenddämmerung',
      it: 'Il Titanic lascia Southampton al crepuscolo',
    },
  },
  {
    id: 'gallery-05',
    episodeNumber: 3,
    hue: 'coral',
    caption: {
      en: "A passenger's face, rebuilt from a single photograph",
      ru: 'Лицо пассажирки, восстановленное по одной фотографии',
      fr: "Le visage d'une passagère, reconstitué à partir d'une seule photographie",
      es: 'El rostro de una pasajera, reconstruido a partir de una sola fotografía',
      de: 'Das Gesicht einer Passagierin, rekonstruiert aus einem einzigen Foto',
      it: 'Il volto di una passeggera, ricostruito da una singola fotografia',
    },
  },
  {
    id: 'gallery-06',
    episodeNumber: 5,
    hue: 'navy',
    caption: {
      en: 'The bridge, one minute before impact',
      ru: 'Мостик за минуту до столкновения',
      fr: 'La passerelle, une minute avant la collision',
      es: 'El puente de mando, un minuto antes del impacto',
      de: 'Die Brücke, eine Minute vor dem Zusammenstoß',
      it: 'Il ponte di comando, un minuto prima dell\'impatto',
    },
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
