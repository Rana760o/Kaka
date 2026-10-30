import React, { useState } from 'react';
import { Send, ArrowUpRight, Users, LoaderCircle } from 'lucide-react';
import { SiteSettings } from '../types';

interface LandingViewProps {
  content: SiteSettings;
  onJoin?: () => void;
  busy?: boolean;
  error?: string | null;
  preview?: boolean;
  className?: string;
  onNavigate?: (path: string) => void;
}

export function LandingView({
  content,
  onJoin,
  busy = false,
  error = null,
  preview = false,
  className = '',
  onNavigate,
}: LandingViewProps) {
  const [localBusy, setLocalBusy] = useState(false);
  const isBusy = busy || localBusy;

  const handleJoinClick = () => {
    if (isBusy) return;
    if (onJoin) {
      onJoin();
    } else {
      setLocalBusy(true);
      setTimeout(() => {
        setLocalBusy(false);
        const link = content.fallback_link || 'https://t.me/+rajaboss_vip';
        window.open(link, '_blank');
      }, 1200);
    }
  };

  return (
    <div
      data-lp-theme={content.theme}
      className={`lp-surface relative flex w-full flex-col items-center justify-center overflow-hidden px-5 text-lp-fg ${
        preview ? 'min-h-[640px] py-14' : 'min-h-dvh py-16'
      } ${className}`}
    >
      <main className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        {/* Logo Avatar */}
        <div className="animate-lp-rise">
          <div className="animate-lp-pulse grid size-28 place-items-center rounded-full border-2 border-lp-ring/60 bg-lp-bg-2 p-1">
            {content.logo_url ? (
              <img
                src={content.logo_url}
                alt={`${content.channel_name} logo`}
                className="size-full rounded-full object-cover"
              />
            ) : (
              <span className="font-display text-4xl text-lp-accent">
                {content.logo_text || 'V'}
              </span>
            )}
          </div>
        </div>

        {/* Badge */}
        {content.badge_text && (
          <div
            className="animate-lp-rise mt-7 inline-flex items-center gap-2 rounded-full border border-lp-accent/40 bg-lp-accent/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.25em] text-lp-accent"
            style={{ animationDelay: '80ms' }}
          >
            <span className="size-2 rounded-full bg-lp-accent" />
            {content.badge_text}
          </div>
        )}

        {/* Channel Name */}
        <h1
          className="animate-lp-rise mt-5 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl"
          style={{ animationDelay: '140ms' }}
        >
          {content.channel_name}
        </h1>

        {/* Tagline */}
        <p
          className="animate-lp-rise mt-4 max-w-sm text-base leading-relaxed text-lp-muted"
          style={{ animationDelay: '200ms' }}
        >
          {content.tagline}
        </p>

        {/* Member Count */}
        {content.show_member_count && content.member_count_text && (
          <div
            className="animate-lp-rise mt-4 inline-flex items-center gap-2 text-sm font-semibold text-lp-fg/90"
            style={{ animationDelay: '240ms' }}
          >
            <Users className="size-4 text-lp-accent" />
            {content.member_count_text}
          </div>
        )}

        {/* CTA Button */}
        <button
          type="button"
          onClick={handleJoinClick}
          disabled={isBusy}
          className="animate-lp-rise lp-button-shadow group relative mt-8 flex h-16 w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-2xl bg-lp-accent px-6 text-base font-extrabold tracking-[0.12em] text-lp-accent-fg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-80"
          style={{ animationDelay: '300ms' }}
        >
          <span className="animate-lp-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-lp-fg/25 blur-md" />
          {isBusy ? (
            <LoaderCircle className="size-5 animate-spin" />
          ) : (
            <Send className="size-5" />
          )}
          <span>{isBusy ? 'OPENING TELEGRAM…' : content.button_text}</span>
          {!isBusy && (
            <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
        </button>

        {/* Error or Helper text */}
        {error ? (
          <p className="mt-3 text-sm font-medium text-lp-accent">{error}</p>
        ) : (
          <p className="mt-3 text-sm text-lp-muted">{content.helper_text}</p>
        )}

        {/* Footer label divider */}
        {content.footer_label && (
          <div className="mt-10 flex w-full items-center gap-4 text-[11px] tracking-[0.35em] text-lp-muted">
            <span className="h-px flex-1 bg-lp-muted/25" />
            {content.footer_label}
            <span className="h-px flex-1 bg-lp-muted/25" />
          </div>
        )}

        {/* Privacy Policy link */}
        {!preview && (
          <div className="mt-4 text-xs text-lp-muted/80">
            <button
              onClick={() => onNavigate && onNavigate('/privacy')}
              className="hover:text-lp-fg transition-colors cursor-pointer"
            >
              Privacy policy
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
