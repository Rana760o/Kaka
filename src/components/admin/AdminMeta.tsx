import { useState } from 'react';
import { TriangleAlert, LoaderCircle, Save, FlaskConical, Info } from 'lucide-react';
import { MetaStatus } from '../../types';

interface AdminMetaProps {
  meta: MetaStatus;
  onUpdate: (updated: Partial<MetaStatus>) => void;
  onSendTestSubscribe: () => void;
  onNavigate: (path: string) => void;
}

export function AdminMeta({
  meta,
  onUpdate,
  onSendTestSubscribe,
  onNavigate,
}: AdminMetaProps) {
  const [pixelId, setPixelId] = useState(meta.pixelId ?? '');
  const [capiToken, setCapiToken] = useState('');
  const [testCode, setTestCode] = useState(meta.testEventCode ?? '');
  const [busyAction, setBusyAction] = useState<string | null>(null);

  const isConnected = Boolean(meta.pixelId && meta.hasToken);

  const handleSave = () => {
    setBusyAction('save');
    setTimeout(() => {
      onUpdate({
        pixelId,
        testEventCode: testCode,
        hasToken: capiToken ? true : meta.hasToken,
        tokenMasked: capiToken ? `${capiToken.slice(0, 5)}••••••••` : meta.tokenMasked,
      });
      setCapiToken('');
      setBusyAction(null);
    }, 400);
  };

  const handleTestSubscribe = () => {
    setBusyAction('test');
    setTimeout(() => {
      onSendTestSubscribe();
      setBusyAction(null);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Meta pixel</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
          Join request aate hi server se Meta Conversions API ko “Subscribe” event jaata hai. Landing page par browser pixel nahi lagaya gaya, isliye visit/click par koi event nahi dikhega.
        </p>
      </div>

      {meta.testEventCode && (
        <div className="mb-5 flex gap-3 rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm text-warning">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          <span>
            <b>Test mode ON.</b> Abhi saare events sirf “Test events” me jayenge aur ads me nahi gine jayenge. Ads chalane se pehle Test event code khali karke Save karo.
          </span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card">
          <div className="mb-5 flex items-center justify-between">
            <div className="font-semibold">Connection</div>
            {isConnected ? (
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-success/30 bg-success/10 text-success">
                Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-warning/30 bg-warning/10 text-warning">
                Not connected
              </span>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Pixel ID (Dataset ID)</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="1234567890123456"
                value={pixelId}
                onChange={(e) => setPixelId(e.target.value.trim())}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Conversions API access token</label>
              <input
                type="password"
                placeholder={
                  meta.hasToken
                    ? `Saved (${meta.tokenMasked}) — naya daalo to badlega`
                    : 'EAAB…'
                }
                value={capiToken}
                onChange={(e) => setCapiToken(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Test event code (sirf testing ke liye)</label>
              <input
                type="text"
                placeholder="TEST12345"
                value={testCode}
                onChange={(e) => setTestCode(e.target.value.trim())}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <p className="text-xs text-muted-foreground">
                Ads live karne se pehle ise khali karna zaroori hai.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={handleSave}
                disabled={!pixelId || busyAction !== null}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-gold px-4 py-2 text-sm font-semibold text-primary-foreground shadow-gold hover:opacity-95 disabled:opacity-50 cursor-pointer"
              >
                {busyAction === 'save' ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                <span>Save</span>
              </button>

              <button
                type="button"
                onClick={handleTestSubscribe}
                disabled={!isConnected || busyAction !== null}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80 disabled:opacity-50 cursor-pointer"
              >
                {busyAction === 'test' ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <FlaskConical className="size-4" />
                )}
                <span>Send test Subscribe</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/admin/events')}
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
              >
                View event log
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card">
            <div className="font-semibold">Token kahan se milega?</div>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
              <li>
                Meta <b className="text-foreground">Events Manager</b> kholo aur apna pixel (dataset) chuno.
              </li>
              <li>
                <b className="text-foreground">Settings</b> tab me Pixel ID copy karo.
              </li>
              <li>
                Neeche <b className="text-foreground">Conversions API → Generate access token</b> dabao, token copy karo.
              </li>
              <li>
                Testing ke liye <b className="text-foreground">Test events</b> tab se code copy karo.
              </li>
            </ol>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card">
            <div className="flex items-center gap-2 font-semibold">
              <Info className="size-4 text-primary" />
              <span>Ad setup tip</span>
            </div>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              <li>
                Ad set me conversion location <b className="text-foreground">Website</b> aur event{' '}
                <b className="text-foreground">Subscribe</b> chuno.
              </li>
              <li>Ad ka link isi landing page ka published link do.</li>
              <li>EU/UK jaise privacy-law wale deshon ke joins Meta ko nahi bheje jaate.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
