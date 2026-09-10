import React from 'react';

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

export const ImageField: React.FC<{
  label: string;
  currentUrl?: string;
  uploading?: boolean;
  onFile: (file: File) => void;
}> = ({ label, currentUrl, uploading, onFile }) => (
  <label className="block">
    <span className="block text-[11px] font-mono uppercase tracking-[0.08em] text-ash mb-1.5">{label}</span>
    <div className="flex items-center gap-3">
      {currentUrl ? (
        <img src={currentUrl} alt="" className="w-16 h-16 object-cover border hairline shrink-0" />
      ) : (
        <div className="w-16 h-16 border hairline shrink-0 flex items-center justify-center text-ash text-[10px] text-center">
          нет файла
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = '';
        }}
        className="text-xs text-ash file:mr-3 file:btn file:btn-quiet file:px-3 file:py-1.5 file:text-xs disabled:opacity-50"
      />
      {uploading && <span className="text-xs text-accent">Загрузка…</span>}
    </div>
  </label>
);

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
