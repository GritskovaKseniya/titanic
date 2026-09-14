import React from 'react';
import { resolveImageSrc } from '../utils/publicUrl';

export const Field: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}> = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <label className="block">
    <span className="block text-[11px] font-mono uppercase tracking-[0.08em] text-ash mb-1.5">{label}</span>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-dark border hairline px-3 py-2 text-sm text-bone placeholder:text-ash/60 focus:outline-none focus:border-accent transition-colors"
    />
  </label>
);

export const TextAreaField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}> = ({ label, value, onChange, placeholder, rows = 3 }) => (
  <label className="block">
    <span className="block text-[11px] font-mono uppercase tracking-[0.08em] text-ash mb-1.5">{label}</span>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-dark border hairline px-3 py-2 text-sm text-bone placeholder:text-ash/60 focus:outline-none focus:border-accent transition-colors resize-y"
    />
  </label>
);

// Images live as plain files in public/ — upload them via GitHub's web UI
// (Add file → Upload files) into public/posters, public/gallery or
// public/team, then paste the path here. No Firebase Storage, no billing
// plan needed for something this small.
export const ImageField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}> = ({ label, value, onChange, placeholder }) => {
  const preview = resolveImageSrc(value);
  return (
    <label className="block">
      <span className="block text-[11px] font-mono uppercase tracking-[0.08em] text-ash mb-1.5">{label}</span>
      <div className="flex items-center gap-3">
        {preview ? (
          <img src={preview} alt="" className="w-16 h-16 object-cover border hairline shrink-0" />
        ) : (
          <div className="w-16 h-16 border hairline shrink-0 flex items-center justify-center text-ash text-[9px] text-center leading-tight p-1">
            нет файла
          </div>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? 'posters/имя-файла.jpg'}
          className="flex-1 bg-dark border hairline px-3 py-2 text-sm text-bone placeholder:text-ash/60 focus:outline-none focus:border-accent transition-colors"
        />
      </div>
    </label>
  );
};

export const AdminButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'cta' | 'quiet' }
> = ({ variant = 'cta', className = '', ...props }) => (
  <button
    {...props}
    className={`btn ${variant === 'cta' ? 'btn-cta' : 'btn-quiet'} px-4 py-2 text-xs font-mono uppercase tracking-[0.08em] ${className}`}
  />
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-darkSec border hairline p-5 ${className}`}>{children}</div>
);
