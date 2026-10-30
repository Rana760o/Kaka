import { useState, useEffect } from 'react';
import { Save, Smartphone, Monitor, LoaderCircle } from 'lucide-react';
import { SiteSettings } from '../../types';
import { LandingView } from '../LandingView';
import { supabase } from '../../lib/supabase';

interface AdminLandingProps {
  settings: SiteSettings;
  onSave: (newSettings: SiteSettings) => void;
}

export function AdminLanding({ settings, onSave }: AdminLandingProps) {
  const [form, setForm] = useState<SiteSettings>({ ...settings });
  const [saving, setSaving] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');

  useEffect(() => {
    setForm({ ...settings });
  }, [settings]);

  const hasChanges = JSON.stringify(form) !== JSON.stringify(settings);

  const updateField = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (form.fallback_link && !/^https:\/\/t\.me\//.test(form.fallback_link)) {
      alert('Channel link https://t.me/ se shuru hona chahiye');
      return;
    }

    setSaving(true);
    try {
      const { id, updated_at, ...rest } = form;
      const { error } = await supabase
        .from('site_settings')
        .update({
          ...rest,
          updated_at: new Date().toISOString(),
        })
        .eq('id', 1);

      if (error) {
        console.warn('Supabase update warning, fallback to local state:', error.message);
      }
      onSave(form);
    } catch (err) {
      console.error('Error saving settings:', err);
      onSave(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Page content</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
            Landing page ka har text yahan se badlo. Right side me live preview dikhta hai.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-gold px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold transition-all disabled:opacity-50"
        >
          {saving ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          <span>Save changes</span>
        </button>
      </div>

      {/* Main Grid: Form Left, Live Preview Right */}
      <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          {/* Brand Card */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card">
            <div className="mb-4 font-semibold">Brand</div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium">Channel name</label>
                <input
                  type="text"
                  maxLength={60}
                  value={form.channel_name}
                  onChange={(e) => updateField('channel_name', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Logo letter</label>
                <input
                  type="text"
                  maxLength={3}
                  value={form.logo_text}
                  onChange={(e) => updateField('logo_text', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                <p className="text-xs text-muted-foreground">Logo image na ho to ye letter dikhega</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Logo image link</label>
                <input
                  type="url"
                  placeholder="https://…/logo.png"
                  value={form.logo_url ?? ''}
                  onChange={(e) => updateField('logo_url', e.target.value || null)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                <p className="text-xs text-muted-foreground">Optional — kisi image ka https link</p>
              </div>
            </div>
          </div>

          {/* Texts Card */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card">
            <div className="mb-4 font-semibold">Texts</div>
            <div className="grid gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Badge</label>
                <input
                  type="text"
                  maxLength={40}
                  value={form.badge_text}
                  onChange={(e) => updateField('badge_text', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  rows={3}
                  maxLength={220}
                  value={form.tagline}
                  onChange={(e) => updateField('tagline', e.target.value)}
                  className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Button text</label>
                  <input
                    type="text"
                    maxLength={30}
                    value={form.button_text}
                    onChange={(e) => updateField('button_text', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Text under button</label>
                  <input
                    type="text"
                    maxLength={80}
                    value={form.helper_text}
                    onChange={(e) => updateField('helper_text', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Footer label</label>
                <input
                  type="text"
                  maxLength={30}
                  value={form.footer_label}
                  onChange={(e) => updateField('footer_label', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <div className="text-sm font-medium">Show member count</div>
                  <div className="text-xs text-muted-foreground">Jaise “10K+ members”</div>
                </div>
                <button
                  type="button"
                  onClick={() => updateField('show_member_count', !form.show_member_count)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                    form.show_member_count ? 'bg-primary' : 'bg-input'
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-background transition-transform shadow-lg ${
                      form.show_member_count ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {form.show_member_count && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Member count text</label>
                  <input
                    type="text"
                    maxLength={40}
                    value={form.member_count_text}
                    onChange={(e) => updateField('member_count_text', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Links Card */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card">
            <div className="mb-4 font-semibold">Links</div>
            <div className="grid gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Backup channel link</label>
                <input
                  type="url"
                  placeholder="https://t.me/+xxxxxxxx"
                  value={form.fallback_link ?? ''}
                  onChange={(e) => updateField('fallback_link', e.target.value || null)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                <p className="text-xs text-muted-foreground">
                  Private channel ka invite link (join request wala). Sirf tab use hota hai jab bot link na bana paye — is link se aaye joins Meta ko nahi jaate.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Privacy contact</label>
                <input
                  type="text"
                  placeholder="@youradmin"
                  value={form.privacy_contact ?? ''}
                  onChange={(e) => updateField('privacy_contact', e.target.value || null)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                <p className="text-xs text-muted-foreground">
                  Privacy page par dikhega (email ya Telegram username)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="xl:sticky xl:top-6 xl:self-start">
          <div className="rounded-2xl border border-border bg-card p-3 sm:p-3 shadow-card">
            <div className="mb-3 flex items-center justify-between px-2 pt-1">
              <div className="text-sm font-semibold">Live preview</div>
              <div className="flex rounded-lg bg-muted p-1">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    previewDevice === 'mobile'
                      ? 'bg-card text-foreground shadow-card'
                      : 'text-muted-foreground'
                  }`}
                >
                  <Smartphone className="size-3.5" />
                  <span>Mobile</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    previewDevice === 'desktop'
                      ? 'bg-card text-foreground shadow-card'
                      : 'text-muted-foreground'
                  }`}
                >
                  <Monitor className="size-3.5" />
                  <span>Desktop</span>
                </button>
              </div>
            </div>

            <div
              className={`mx-auto overflow-hidden rounded-2xl border border-border shadow-2xl transition-all ${
                previewDevice === 'mobile' ? 'max-w-[380px]' : 'w-full'
              }`}
            >
              <LandingView content={form} preview={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
