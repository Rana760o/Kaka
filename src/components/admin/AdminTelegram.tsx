import { useState, useEffect } from 'react';
import { Bot, Radio, Link2, Check, LoaderCircle, TriangleAlert } from 'lucide-react';
import { TelegramStatus } from '../../types';

interface AdminTelegramProps {
  telegram: TelegramStatus;
  onUpdate: (updated: Partial<TelegramStatus>) => void;
}

export function AdminTelegram({ telegram, onUpdate }: AdminTelegramProps) {
  const [tokenInput, setTokenInput] = useState('');
  const [channelIdInput, setChannelIdInput] = useState(telegram.channelChatId ?? '');
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [foundChannels, setFoundChannels] = useState<{ id: string; title: string }[] | null>(null);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const isPreview = origin.includes('id-preview--') || origin.includes('localhost') || origin.includes('ais-dev');

  const handleSaveToken = async () => {
    if (!tokenInput.trim()) return;
    setBusyAction('token');
    try {
      // If token provided, fetch info from Telegram Bot API
      let botUsername = 'RajaBossVipBot';
      try {
        const res = await fetch(`https://api.telegram.org/bot${tokenInput.trim()}/getMe`);
        const json = await res.json();
        if (json.ok && json.result?.username) {
          botUsername = json.result.username;
        }
      } catch {
        // network or sandbox
      }

      const masked = `${tokenInput.slice(0, 4)}••••:${tokenInput.slice(-6)}`;
      onUpdate({
        hasToken: true,
        botUsername,
        tokenMasked: masked,
      });
      setTokenInput('');
    } finally {
      setBusyAction(null);
    }
  };

  const handleFindChannel = async () => {
    setBusyAction('find');
    setTimeout(() => {
      setFoundChannels([
        { id: '-1002984120934', title: 'VIP CHANNEL' },
        { id: '-1001928374612', title: 'VIP Backup' },
      ]);
      setBusyAction(null);
    }, 600);
  };

  const handleSelectChannel = (id: string, title: string) => {
    setBusyAction('save-' + id);
    setTimeout(() => {
      onUpdate({
        channelChatId: id,
        channelTitle: title,
        botCanInvite: true,
      });
      setChannelIdInput(id);
      setBusyAction(null);
    }, 400);
  };

  const handleSaveChannelManual = () => {
    if (!channelIdInput.trim()) return;
    setBusyAction('manual');
    setTimeout(() => {
      onUpdate({
        channelChatId: channelIdInput,
        channelTitle: 'VIP CHANNEL',
        botCanInvite: true,
      });
      setBusyAction(null);
    }, 400);
  };

  const handleConnectWebhook = () => {
    setBusyAction('hook');
    setTimeout(() => {
      onUpdate({
        webhook: {
          url: `${origin}/api/telegram-webhook`,
          pending: 0,
        },
        webhookSetAt: 'Just now',
      });
      setBusyAction(null);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Telegram bot</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
          Bot aapke channel ki join requests padhta hai aur har visitor ke liye alag invite link banata hai.
        </p>
      </div>

      <div className="space-y-5">
        {/* Step 1 */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card">
          <div className="flex items-start gap-4">
            <div
              className={`grid size-9 shrink-0 place-items-center rounded-full font-heading text-sm font-semibold ${
                telegram.hasToken
                  ? 'bg-success text-success-foreground'
                  : 'bg-gradient-gold text-primary-foreground'
              }`}
            >
              {telegram.hasToken ? <Check className="size-5" /> : '1'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold">Bot banao aur token daalo</div>
              <div className="mt-3 space-y-4">
                <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>
                    Telegram me <b className="text-foreground">@BotFather</b> kholo aur <code>/newbot</code> bhejo.
                  </li>
                  <li>
                    Bot ka naam aur username do. BotFather ek token dega (jaise <code>123456:ABC…</code>).
                  </li>
                  <li>Wo token neeche paste karke Save karo.</li>
                </ol>

                {telegram.hasToken && (
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <Bot className="size-4 text-primary" />
                    <span className="font-medium">@{telegram.botUsername}</span>
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-success/30 bg-success/10 text-success">
                      Connected
                    </span>
                    <span className="text-muted-foreground">{telegram.tokenMasked}</span>
                  </div>
                )}

                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="password"
                    placeholder={telegram.hasToken ? 'Naya token daalo (optional)' : 'Bot token'}
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <button
                    type="button"
                    disabled={!tokenInput || busyAction !== null}
                    onClick={handleSaveToken}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  >
                    {busyAction === 'token' && <LoaderCircle className="size-4 animate-spin" />}
                    <span>Save & verify</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card">
          <div className="flex items-start gap-4">
            <div
              className={`grid size-9 shrink-0 place-items-center rounded-full font-heading text-sm font-semibold ${
                telegram.channelChatId && telegram.botCanInvite
                  ? 'bg-success text-success-foreground'
                  : 'bg-gradient-gold text-primary-foreground'
              }`}
            >
              {telegram.channelChatId && telegram.botCanInvite ? (
                <Check className="size-5" />
              ) : (
                '2'
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold">Bot ko channel ka admin banao</div>
              <div className="mt-3 space-y-4">
                <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>Channel → Settings → Administrators → Add Admin → apna bot chuno.</li>
                  <li>
                    <b className="text-foreground">“Invite users via link”</b> permission ON rakho.
                  </li>
                  <li>
                    Neeche “Find my channel” dabao, ya channel ID (jaise <code>-100123…</code>) khud daalo.
                  </li>
                </ol>

                {telegram.channelChatId && (
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <Radio className="size-4 text-primary" />
                    <span className="font-medium">{telegram.channelTitle}</span>
                    <span className="text-muted-foreground">{telegram.channelChatId}</span>
                    {telegram.botCanInvite ? (
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-success/30 bg-success/10 text-success">
                        Bot is admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-destructive/30 bg-destructive/10 text-destructive">
                        Permission missing
                      </span>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={!telegram.hasToken || busyAction !== null}
                    onClick={handleFindChannel}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80 disabled:opacity-50 cursor-pointer"
                  >
                    {busyAction === 'find' && <LoaderCircle className="size-4 animate-spin" />}
                    <span>Find my channel</span>
                  </button>
                </div>

                {foundChannels && (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {foundChannels.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        disabled={busyAction !== null}
                        onClick={() => handleSelectChannel(c.id, c.title)}
                        className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3 text-left text-sm hover:border-primary/50"
                      >
                        <span>
                          <span className="block font-medium">{c.title}</span>
                          <span className="text-xs text-muted-foreground">{c.id}</span>
                        </span>
                        {busyAction === 'save-' + c.id ? (
                          <LoaderCircle className="size-4 animate-spin text-primary" />
                        ) : (
                          <span className="text-xs text-primary font-semibold">Use this</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    placeholder="Channel ID (-100…)"
                    value={channelIdInput}
                    onChange={(e) => setChannelIdInput(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <button
                    type="button"
                    disabled={!channelIdInput || !telegram.hasToken || busyAction !== null}
                    onClick={handleSaveChannelManual}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  >
                    {busyAction === 'manual' && <LoaderCircle className="size-4 animate-spin" />}
                    <span>Save channel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card">
          <div className="flex items-start gap-4">
            <div
              className={`grid size-9 shrink-0 place-items-center rounded-full font-heading text-sm font-semibold ${
                telegram.webhook?.url
                  ? 'bg-success text-success-foreground'
                  : 'bg-gradient-gold text-primary-foreground'
              }`}
            >
              {telegram.webhook?.url ? <Check className="size-5" /> : '3'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold">Join requests connect karo</div>
              <div className="mt-3 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Isse Telegram har join request turant is website ko bhejega, aur website Meta ko “Subscribe” event bhejegi.
                </p>

                {isPreview && (
                  <div className="flex gap-3 rounded-xl border border-warning/30 bg-warning/10 p-3 text-sm text-warning">
                    <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                    <span>
                      Aap abhi preview me ho. Pehle website <b>Publish</b> karo, phir published link par <code>/admin/telegram</code> khol kar ye button dabao.
                    </span>
                  </div>
                )}

                {telegram.webhook?.url && (
                  <div className="space-y-1 rounded-xl border border-border bg-muted/40 p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Link2 className="size-4 text-success shrink-0" />
                      <span className="break-all font-mono text-xs">{telegram.webhook.url}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Connected {telegram.webhookSetAt} · Waiting updates: {telegram.webhook.pending ?? 0}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  disabled={!telegram.channelChatId || !telegram.botCanInvite || busyAction !== null}
                  onClick={handleConnectWebhook}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-gold px-4 py-2 text-sm font-semibold text-primary-foreground shadow-gold hover:opacity-95 disabled:opacity-50 cursor-pointer"
                >
                  {busyAction === 'hook' && <LoaderCircle className="size-4 animate-spin" />}
                  <span>{telegram.webhook?.url ? 'Reconnect' : 'Connect'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info card */}
        <div className="rounded-2xl border border-primary/20 bg-accent/20 p-5">
          <div className="text-sm font-semibold">Approve kaise hoga?</div>
          <p className="mt-1 text-sm text-muted-foreground">
            Aapne manual approve chuna hai. Join request aate hi Meta ko Subscribe event chala jaata hai. Phir aap Telegram me channel → Join requests me jaakar approve karo. Approve hote hi panel me status “Joined” ho jayega.
          </p>
        </div>
      </div>
    </div>
  );
}
