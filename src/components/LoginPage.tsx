import React, { useState, useEffect } from 'react';
import { Crown, LoaderCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASS } from '../store';

interface LoginPageProps {
  onLoginSuccess: (email: string) => void;
  onNavigate: (path: string) => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState(DEFAULT_ADMIN_EMAIL);
  const [password, setPassword] = useState(DEFAULT_ADMIN_PASS);
  const [loading, setLoading] = useState(false);
  const [adminExists, setAdminExists] = useState<boolean | null>(true);
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const { data } = await supabase.rpc('admin_exists');
        setAdminExists(Boolean(data));
        if (data === false) {
          setMode('signup');
        }
      } catch {
        setAdminExists(true);
      }
    }
    checkAdmin();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      if (mode === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // If offline or password mismatch, verify if it's the official credentials
          if (
            email.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase() &&
            password === DEFAULT_ADMIN_PASS
          ) {
            onLoginSuccess(email);
            return;
          }
          throw error;
        }

        if (data.session) {
          onLoginSuccess(email);
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          },
        });

        if (error) throw error;

        if (data.session) {
          onLoginSuccess(email);
        } else {
          setEmailSent(true);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden bg-background px-4">
      {/* Radial top glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative w-full max-w-sm rounded-3xl border border-border bg-card/80 p-8 shadow-card backdrop-blur">
        {/* Crown logo in gold gradient */}
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-gold shadow-gold">
          <Crown className="size-7 text-primary-foreground" />
        </div>

        <h1 className="mt-5 text-center text-2xl font-semibold text-foreground">
          {mode === 'signin' ? 'Admin login' : 'Create admin account'}
        </h1>

        <p className="mt-1 text-center text-sm text-muted-foreground">
          {mode === 'signup' && adminExists === false
            ? 'Pehla account hi admin banega.'
            : 'Channel tracking panel'}
        </p>

        {errorMessage && (
          <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive text-center">
            {errorMessage}
          </div>
        )}

        {emailSent ? (
          <div className="mt-6 rounded-xl border border-primary/30 bg-accent/40 p-4 text-sm text-foreground">
            Aapke email par confirm link bheja gaya hai. Link kholo, phir yahan login karo.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-10 w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-10 w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-gold font-semibold text-primary-foreground shadow-gold transition-opacity hover:opacity-95 disabled:opacity-70"
            >
              {loading && <LoaderCircle className="size-4 animate-spin" />}
              <span>{mode === 'signin' ? 'Sign in' : 'Create account'}</span>
            </button>
          </form>
        )}

        {adminExists === false && !emailSent && (
          <button
            type="button"
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          >
            {mode === 'signin'
              ? 'New here? Create the admin account'
              : 'Already have an account? Sign in'}
          </button>
        )}
      </div>
    </div>
  );
}
