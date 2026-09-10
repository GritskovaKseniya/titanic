import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfigured } from '../firebase';
import { auth } from './useAuthUser';
import { Field } from './ui';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError('Неверный email или пароль.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-5">
      <div className="w-full max-w-sm bg-darkSec border hairline p-8">
        <h1 className="font-heading font-semibold uppercase text-bone text-xl mb-1">Админка</h1>
        <p className="text-sm text-ash mb-6">Титаник: Корабль легенд</p>

        {!firebaseConfigured ? (
          <p className="text-sm text-goldBright leading-relaxed">
            Firebase ещё не подключён — задайте переменные окружения <code className="text-xs">VITE_FIREBASE_*</code>{' '}
            (см. README) и пересоберите сайт.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="team@example.com" />
            <Field label="Пароль" value={password} onChange={setPassword} type="password" placeholder="••••••••" />
            {error && <p className="text-sm text-leader">{error}</p>}
            <button disabled={loading} type="submit" className="btn btn-cta w-full py-2.5 text-sm justify-center">
              {loading ? 'Входим…' : 'Войти'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
