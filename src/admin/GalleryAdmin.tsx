import React, { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { deleteGalleryItem, GalleryItem, saveGalleryItem, seedGallery, useGalleryItems } from '../data/gallery';
import { uploadImage } from './storage';
import { AdminButton, Card, Field, ImageField, TextAreaField } from './ui';

const emptyItem = (): GalleryItem => ({
  id: `gallery-${Date.now()}`,
  episodeNumber: 1,
  hue: 'navy',
  caption: { ru: '', en: '' },
});

const GalleryItemForm: React.FC<{ item: GalleryItem; onDeleted: () => void }> = ({ item, onDeleted }) => {
  const [draft, setDraft] = useState<GalleryItem>(item);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof GalleryItem>(key: K, value: GalleryItem[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    await saveGalleryItem(draft);
    setSaved(true);
  };

  const handleImage = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadImage(`gallery/${draft.id}-${file.name}`, file);
      set('imageUrl', url);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <div className="grid gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <TextAreaField
            label="Подпись (RU)"
            rows={2}
            value={draft.caption.ru}
            onChange={(v) => set('caption', { ...draft.caption, ru: v })}
          />
          <TextAreaField
            label="Подпись (EN)"
            rows={2}
            value={draft.caption.en}
            onChange={(v) => set('caption', { ...draft.caption, en: v })}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <Field
            label="Номер серии"
            type="number"
            value={String(draft.episodeNumber)}
            onChange={(v) => set('episodeNumber', Number(v) || 1)}
          />
          <ImageField label="Кадр" currentUrl={draft.imageUrl} uploading={uploading} onFile={handleImage} />
        </div>
        <div className="flex items-center gap-3">
          <AdminButton onClick={handleSave}>
            <Save className="w-3.5 h-3.5" /> Сохранить
          </AdminButton>
          <AdminButton
            variant="quiet"
            onClick={async () => {
              await deleteGalleryItem(draft.id);
              onDeleted();
            }}
          >
            <Trash2 className="w-3.5 h-3.5" /> Удалить
          </AdminButton>
          {saved && <span className="text-xs text-accent">Сохранено</span>}
        </div>
      </div>
    </Card>
  );
};

export const GalleryAdmin: React.FC = () => {
  const items = useGalleryItems();
  const [drafts, setDrafts] = useState<GalleryItem[]>([]);
  const [seeding, setSeeding] = useState(false);
  const all = [...items, ...drafts];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading uppercase text-lg text-bone">Галерея</h2>
        <div className="flex gap-2">
          <AdminButton variant="quiet" onClick={() => setDrafts((d) => [...d, emptyItem()])}>
            <Plus className="w-3.5 h-3.5" /> Добавить кадр
          </AdminButton>
          <AdminButton
            variant="quiet"
            disabled={seeding}
            onClick={async () => {
              setSeeding(true);
              try {
                await seedGallery();
              } finally {
                setSeeding(false);
              }
            }}
          >
            {seeding ? 'Загружаем…' : 'Заполнить стартовыми данными'}
          </AdminButton>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {all.map((item) => (
          <GalleryItemForm
            key={item.id}
            item={item}
            onDeleted={() => setDrafts((d) => d.filter((x) => x.id !== item.id))}
          />
        ))}
      </div>
    </div>
  );
};
