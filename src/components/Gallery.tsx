import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useGalleryItems, GalleryHue } from '../data/gallery';
import { resolveImageSrc } from '../utils/publicUrl';

const HUE_GRADIENT: Record<GalleryHue, string> = {
  coral: 'linear-gradient(150deg, #8b2c63 0%, #f14fa0 55%, #1a2f38 100%)',
  gold: 'linear-gradient(150deg, #123240 0%, #c9962f 60%, #071820 100%)',
  navy: 'linear-gradient(150deg, #050f15 0%, #123240 55%, #8b2c63 130%)',
};

export const Gallery: React.FC = () => {
  const { t, language } = useLanguage();
  const galleryItems = useGalleryItems();

  return (
    <section id="gallery" className="py-14 sm:py-20 lg:py-28 bg-darkSec border-y hairline">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-12 gap-6 mb-12">
          <div className="md:col-span-7">
            <span className="slate-label">{t.gallery.label}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-heading font-semibold uppercase text-bone leading-[1.05]">
              {t.gallery.heading}
            </h2>
          </div>
          <p className="md:col-span-5 text-ash self-end md:justify-self-end max-w-md">{t.gallery.description}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {galleryItems.map((item) => (
            <figure
              key={item.id}
              className="group relative aspect-[4/5] overflow-hidden border hairline"
              style={item.imageUrl ? undefined : { background: HUE_GRADIENT[item.hue] }}
            >
              {item.imageUrl && (
                <img src={resolveImageSrc(item.imageUrl)} alt="" className="absolute inset-0 w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <span className="badge badge-synth absolute top-3 left-3">{t.badges.synth}</span>
              <figcaption className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <span className="timecode text-[10px] text-ash block mb-1">
                  {String(item.episodeNumber).padStart(2, '0')}
                </span>
                <span className="text-sm text-bone leading-snug block">{item.caption[language]}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
