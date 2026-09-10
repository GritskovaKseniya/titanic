import React, { useEffect, useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { saveSiteSettings, seedSiteSettings, SiteSettings, useSiteSettings } from '../data/siteSettings';
import { AdminButton, Card, Field } from './ui';

export const SettingsAdmin: React.FC = () => {
  const settings = useSiteSettings();
  const [draft, setDraft] = useState<SiteSettings>(settings);
  const [saved, setSaved] = useState(false);
  const [seeding, setSeeding] = useState(false);

  // Adopt live settings once they arrive from Firestore, but don't clobber
  // whatever the admin is mid-editing on later snapshots.
  useEffect(() => {
    setDraft(settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(settings)]);

  const handleSave = async () => {
    await saveSiteSettings(draft);
    setSaved(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading uppercase text-lg text-bone">Соцсети и контакты</h2>
        <AdminButton
          variant="quiet"
          disabled={seeding}
          onClick={async () => {
            setSeeding(true);
            try {
              await seedSiteSettings();
            } finally {
              setSeeding(false);
            }
          }}
        >
          {seeding ? 'Загружаем…' : 'Заполнить стартовыми данными'}
        </AdminButton>
      </div>

      <Card className="max-w-2xl">
        <div className="grid gap-4">
          <Field
            label="Контактный email"
            value={draft.contactEmail}
            onChange={(v) => {
              setDraft((d) => ({ ...d, contactEmail: v }));
              setSaved(false);
            }}
            type="email"
          />

          <div>
            <span className="block text-[11px] font-mono uppercase tracking-[0.08em] text-ash mb-2">Соцсети</span>
            <div className="space-y-3">
              {draft.socialLinks.map((link, i) => (
                <div key={link.id} className="grid grid-cols-[1fr_2fr_auto] gap-2 items-end">
                  <Field
                    label="Подпись"
                    value={link.label}
                    onChange={(v) => {
                      const next = [...draft.socialLinks];
                      next[i] = { ...link, label: v };
                      setDraft((d) => ({ ...d, socialLinks: next }));
                      setSaved(false);
                    }}
                  />
                  <Field
                    label="Ссылка"
                    value={link.url}
                    onChange={(v) => {
                      const next = [...draft.socialLinks];
                      next[i] = { ...link, url: v };
                      setDraft((d) => ({ ...d, socialLinks: next }));
                      setSaved(false);
                    }}
                  />
                  <AdminButton
                    variant="quiet"
                    onClick={() => {
                      setDraft((d) => ({ ...d, socialLinks: d.socialLinks.filter((_, idx) => idx !== i) }));
                      setSaved(false);
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </AdminButton>
                </div>
              ))}
            </div>
            <AdminButton
              variant="quiet"
              className="mt-3"
              onClick={() =>
                setDraft((d) => ({
                  ...d,
                  socialLinks: [...d.socialLinks, { id: `social-${Date.now()}`, label: '', url: '' }],
                }))
              }
            >
              <Plus className="w-3.5 h-3.5" /> Добавить соцсеть
            </AdminButton>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <AdminButton onClick={handleSave}>
              <Save className="w-3.5 h-3.5" /> Сохранить
            </AdminButton>
            {saved && <span className="text-xs text-accent">Сохранено</span>}
          </div>
        </div>
      </Card>
    </div>
  );
};
