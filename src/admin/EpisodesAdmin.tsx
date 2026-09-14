import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Save } from 'lucide-react';
import { Episode, saveEpisode, seedEpisodes, useEpisodes } from '../data/episodes';
import { resolveImageSrc } from '../utils/publicUrl';
import { AdminButton, Card, Field, ImageField, TextAreaField } from './ui';

const EpisodeForm: React.FC<{ episode: Episode }> = ({ episode }) => {
  const [draft, setDraft] = useState<Episode>(episode);
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof Episode>(key: K, value: Episode[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setSaved(false);
  };
  const setLang = (key: 'title' | 'role' | 'description', lang: 'ru' | 'en', value: string) =>
    set(key, { ...draft[key], [lang]: value });

  const handleSave = async () => {
    await saveEpisode(draft);
    setSaved(true);
  };

  return (
    <div className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Имя (RU)" value={draft.title.ru} onChange={(v) => setLang('title', 'ru', v)} />
        <Field label="Имя (EN)" value={draft.title.en} onChange={(v) => setLang('title', 'en', v)} />
        <Field label="Класс/роль (RU)" value={draft.role.ru} onChange={(v) => setLang('role', 'ru', v)} />
        <Field label="Класс/роль (EN)" value={draft.role.en} onChange={(v) => setLang('role', 'en', v)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <TextAreaField label="Синопсис (RU)" value={draft.description.ru} onChange={(v) => setLang('description', 'ru', v)} />
        <TextAreaField label="Синопсис (EN)" value={draft.description.en} onChange={(v) => setLang('description', 'en', v)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4 items-start">
        <Field
          label="Vimeo (ссылка или id)"
          value={draft.vimeoId}
          onChange={(v) => set('vimeoId', v)}
          placeholder="https://vimeo.com/..."
        />
        <ImageField
          label="Постер (путь в public/posters/ или ссылка)"
          value={draft.posterUrl}
          onChange={(v) => set('posterUrl', v)}
          placeholder="posters/06-margaret-brown.jpg"
        />
      </div>
      {resolveImageSrc(draft.posterUrl) && (
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-[0.08em] text-ash mb-1.5">
              Обрезка превью (карточка серии) — {draft.posterFocusY ?? 27}% сверху
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={draft.posterFocusY ?? 27}
              onChange={(e) => set('posterFocusY', Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>
          <div className="relative w-full aspect-video overflow-hidden border hairline">
            <img
              src={resolveImageSrc(draft.posterUrl)}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: `50% ${draft.posterFocusY ?? 27}%` }}
            />
          </div>
        </div>
      )}
      <div className="flex items-center gap-3">
        <AdminButton onClick={handleSave}>
          <Save className="w-3.5 h-3.5" /> Сохранить
        </AdminButton>
        {saved && <span className="text-xs text-accent">Сохранено</span>}
      </div>
    </div>
  );
};

export const EpisodesAdmin: React.FC = () => {
  const episodes = useEpisodes();
  const [openNumber, setOpenNumber] = useState<number | null>(episodes[0]?.number ?? null);
  const [seeding, setSeeding] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading uppercase text-lg text-bone">Серии</h2>
        <AdminButton
          variant="quiet"
          disabled={seeding}
          onClick={async () => {
            setSeeding(true);
            try {
              await seedEpisodes();
            } finally {
              setSeeding(false);
            }
          }}
        >
          {seeding ? 'Загружаем…' : 'Заполнить стартовыми данными'}
        </AdminButton>
      </div>

      <div className="space-y-3">
        {episodes.map((ep) => {
          const open = openNumber === ep.number;
          return (
            <Card key={ep.number}>
              <button
                onClick={() => setOpenNumber(open ? null : ep.number)}
                className="w-full flex items-center justify-between gap-3 text-left"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span className="timecode text-ash text-sm">{String(ep.number).padStart(2, '0')}</span>
                  <span className="font-heading uppercase text-bone truncate">{ep.title.ru || '(без имени)'}</span>
                </span>
                {open ? <ChevronUp className="w-4 h-4 text-ash shrink-0" /> : <ChevronDown className="w-4 h-4 text-ash shrink-0" />}
              </button>
              {open && (
                <div className="mt-5 pt-5 border-t hairline">
                  <EpisodeForm episode={ep} />
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
