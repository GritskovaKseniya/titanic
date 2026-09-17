import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Save } from 'lucide-react';
import { Episode, saveEpisode, seedEpisodes, useEpisodes } from '../data/episodes';
import { Language, LANGUAGES } from '../i18n/translations';
import { resolveImageSrc } from '../utils/publicUrl';
import { AdminButton, Card, Field, ImageField, TextAreaField } from './ui';

const EpisodeForm: React.FC<{ episode: Episode }> = ({ episode }) => {
  const [draft, setDraft] = useState<Episode>(episode);
  const [saved, setSaved] = useState(false);
  const [editLang, setEditLang] = useState<Language>('en');

  const set = <K extends keyof Episode>(key: K, value: Episode[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setSaved(false);
  };
  const setLang = (key: 'title' | 'role' | 'description', lang: Language, value: string) =>
    set(key, { ...draft[key], [lang]: value });

  const handleSave = async () => {
    await saveEpisode(draft);
    setSaved(true);
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-1.5">
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setEditLang(l.code)}
            className={`text-[11px] font-mono uppercase tracking-[0.08em] px-2.5 py-1 border hairline transition-colors ${
              editLang === l.code ? 'text-accent border-accent' : 'text-ash hover:text-bone'
            }`}
          >
            {l.code}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label={`Имя (${editLang})`}
          value={draft.title[editLang]}
          onChange={(v) => setLang('title', editLang, v)}
        />
        <Field
          label={`Класс/роль (${editLang})`}
          value={draft.role[editLang]}
          onChange={(v) => setLang('role', editLang, v)}
        />
      </div>
      <TextAreaField
        label={`Синопсис (${editLang})`}
        value={draft.description[editLang]}
        onChange={(v) => setLang('description', editLang, v)}
      />
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
                  <span className="font-heading uppercase text-bone truncate">{ep.title.en || '(без имени)'}</span>
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
