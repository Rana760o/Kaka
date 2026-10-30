import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { SiteSettings } from '../types';

interface PrivacyPageProps {
  content: SiteSettings;
  onNavigate: (path: string) => void;
}

export function PrivacyPage({ content, onNavigate }: PrivacyPageProps) {
  const [optedOut, setOptedOut] = useState(false);

  useEffect(() => {
    setOptedOut(document.cookie.split('; ').includes('lp_ad_optout=1'));
  }, []);

  const handleToggleOptOut = () => {
    const next = !optedOut;
    document.cookie = next
      ? 'lp_ad_optout=1; path=/; max-age=31536000; samesite=lax'
      : 'lp_ad_optout=0; path=/; max-age=31536000; samesite=lax';
    setOptedOut(next);
  };

  return (
    <div
      data-lp-theme={content.theme}
      className="lp-surface min-h-dvh px-5 py-14 text-lp-fg"
    >
      <article className="mx-auto max-w-2xl space-y-6 leading-relaxed">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-sm text-lp-muted hover:text-lp-fg transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          <span>Back</span>
        </button>

        <h1 className="font-display text-3xl">Privacy policy</h1>

        <p className="text-lp-muted">
          This page explains what {content.channel_name || 'This channel'} collects when you open this page and join our Telegram channel.
        </p>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">What we collect</h2>
          <ul className="list-disc space-y-1 pl-5 text-lp-muted">
            <li>That you visited the page, your country, and the ad campaign name in the link.</li>
            <li>When you tap the join button: your IP address, browser details and the Facebook/Instagram ad click ID from the link.</li>
            <li>When you send a join request on Telegram: your Telegram name, username and user ID (shared with us by Telegram).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Who we share it with and why</h2>
          <p className="text-lp-muted">
            When you send a join request, we tell Meta Platforms (Facebook/Instagram) that a &quot;Subscribe&quot; happened, together with your IP address, browser details and ad click ID. Meta uses this to measure our ad results and to optimize who sees our ads. We do not send your Telegram name or ID to Meta. Nothing is sent to Meta just for visiting the page or tapping the button.
          </p>
          <p className="text-lp-muted">
            Visitors from the EU, EEA, UK and Switzerland, and visitors whose country we cannot detect, are never reported to Meta.
          </p>
        </section>

        <section className="space-y-3 rounded-2xl border border-lp-muted/20 bg-lp-bg-2/60 p-5">
          <h2 className="text-lg font-semibold">Opt out of ad measurement</h2>
          <p className="text-sm text-lp-muted">
            {optedOut
              ? 'You have opted out on this browser. Your future join requests will not be reported to Meta.'
              : 'Turn this on and your future join requests from this browser will not be reported to Meta.'}
          </p>
          <button
            type="button"
            onClick={handleToggleOptOut}
            className="cursor-pointer rounded-xl bg-lp-accent px-4 py-2 text-sm font-bold text-lp-accent-fg transition-opacity hover:opacity-90"
          >
            {optedOut ? 'Allow ad measurement again' : 'Opt out'}
          </button>
        </section>

        {content.privacy_contact && (
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Contact</h2>
            <p className="text-lp-muted">
              To ask about or delete your data, contact us at: {content.privacy_contact}
            </p>
          </section>
        )}
      </article>
    </div>
  );
}
