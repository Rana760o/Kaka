import { useState } from 'react';
import { Check, LoaderCircle } from 'lucide-react';
import { SiteSettings } from '../../types';
import { THEMES } from '../../store';
import { supabase } from '../../lib/supabase';

interface AdminThemesProps {
  settings: SiteSettings;
  onApplyTheme: (themeId: string) => void;
}

export function AdminThemes({ settings, onApplyTheme }: AdminThemesProps) {
  const [applying, setApplying] = useState<string | null>(null);

  const handleSelect = async (themeId: string) => {
    if (settings.theme === themeId) return;
    setApplying(themeId);

    try {
      const { error } = await supabase
        .from('site_settings')
        .update({
          theme: themeId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', 1);

      if (error) {
        console.warn('Supabase update theme warning:', error.message);
      }
      onApplyTheme(themeId);
    } catch (err) {
      console.error('Error applying theme:', err);
      onApplyTheme(themeId);
    } finally {
      setApplying(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Themes</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
          Ek click me landing page ka poora look badlo. Theme turant live ho jaati hai.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {THEMES.map((t) => {
          const isActive = settings.theme === t.id;
          const isBusy = applying === t.id;

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => handleSelect(t.id)}
              disabled={applying !== null}
              className={`group overflow-hidden rounded-2xl border bg-card text-left shadow-card transition-all cursor-pointer hover:-translate-y-0.5 ${
                isActive
                  ? 'border-primary ring-2 ring-primary/40'
                  : 'border-border hover:border-primary/40'
              }`}
            >
              <div
                data-lp-theme={t.id}
                className="lp-surface relative flex h-44 flex-col items-center justify-center gap-2.5 px-6"
              >
                <div className="grid size-11 place-items-center rounded-full border-2 border-lp-ring/60 bg-lp-bg-2 font-display text-lg text-lp-accent">
                  {settings.logo_text || 'V'}
                </div>

                <div className="font-display text-sm text-lp-fg truncate max-w-full">
                  {settings.channel_name ?? 'VIP CHANNEL'}
                </div>

                <div className="lp-button-shadow h-8 w-full max-w-[170px] rounded-lg bg-lp-accent text-center text-[10px] font-extrabold leading-8 tracking-widest text-lp-accent-fg">
                  {settings.button_text ?? 'JOIN ON TELEGRAM'}
                </div>

                {isActive && (
                  <span className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-4 stroke-[3]" />
                  </span>
                )}

                {isBusy && (
                  <span className="absolute inset-0 grid place-items-center bg-background/50">
                    <LoaderCircle className="size-5 animate-spin text-primary" />
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="font-semibold">{t.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{t.vibe}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
