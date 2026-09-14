import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { saveTeamMember, seedTeam, TeamMember, useTeam } from '../data/team';
import { AdminButton, Card, Field, ImageField } from './ui';

const ROLE_LABEL: Record<TeamMember['roleKey'], string> = {
  producer: 'Исполнительный продюсер',
  director: 'Режиссёр',
  editor: 'Монтажёр',
  aiFilmmaker: 'ИИ-режиссёр',
};

const TeamMemberForm: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [draft, setDraft] = useState<TeamMember>(member);
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof TeamMember>(key: K, value: TeamMember[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    await saveTeamMember(draft);
    setSaved(true);
  };

  return (
    <Card>
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-goldBright block mb-4">
        {ROLE_LABEL[draft.roleKey]}
      </span>
      <div className="grid gap-4">
        <Field label="Имя" value={draft.name} onChange={(v) => set('name', v)} />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Соцсеть — подпись (необязательно)"
            value={draft.social?.label ?? ''}
            onChange={(v) => set('social', { label: v, url: draft.social?.url ?? '' })}
            placeholder="@instagram"
          />
          <Field
            label="Соцсеть — ссылка"
            value={draft.social?.url ?? ''}
            onChange={(v) => set('social', { label: draft.social?.label ?? '', url: v })}
            placeholder="https://instagram.com/..."
          />
        </div>
        <ImageField
          label="Фото (путь в public/team/ или ссылка)"
          value={draft.photoUrl ?? ''}
          onChange={(v) => set('photoUrl', v)}
          placeholder="team/имя.jpg"
        />
        <div className="flex items-center gap-3">
          <AdminButton onClick={handleSave}>
            <Save className="w-3.5 h-3.5" /> Сохранить
          </AdminButton>
          {saved && <span className="text-xs text-accent">Сохранено</span>}
        </div>
      </div>
    </Card>
  );
};

export const TeamAdmin: React.FC = () => {
  const team = useTeam();
  const [seeding, setSeeding] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading uppercase text-lg text-bone">Команда</h2>
        <AdminButton
          variant="quiet"
          disabled={seeding}
          onClick={async () => {
            setSeeding(true);
            try {
              await seedTeam();
            } finally {
              setSeeding(false);
            }
          }}
        >
          {seeding ? 'Загружаем…' : 'Заполнить стартовыми данными'}
        </AdminButton>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {team.map((member) => (
          <TeamMemberForm key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};
