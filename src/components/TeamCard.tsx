import React from 'react';
import { Instagram } from 'lucide-react';
import { TeamMember } from '../data/team';
import { resolveImageSrc } from '../utils/publicUrl';
import { useReveal } from '../hooks/useReveal';

export const TeamCard: React.FC<{
  member: TeamMember;
  roleLabel: string;
  delayMs: number;
}> = ({ member, roleLabel, delayMs }) => {
  const [ref, visible] = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`group bg-dark border hairline flex flex-col transition-colors hover:border-accent/50 reveal ${
        visible ? 'reveal-visible' : ''
      }`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : '0ms' }}
    >
      {member.photoUrl && (
        <div className="overflow-hidden border-b hairline">
          <img
            src={resolveImageSrc(member.photoUrl)}
            alt=""
            className="w-full aspect-square object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>
      )}
      <div className="min-w-0 p-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ash">{roleLabel}</span>
        <h3 className="text-lg font-heading font-semibold text-bone mt-2">{member.name}</h3>
        {member.social && (
          <a
            href={member.social.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-bone transition-colors mt-3"
          >
            <Instagram className="w-3.5 h-3.5" /> {member.social.label}
          </a>
        )}
      </div>
    </div>
  );
};
