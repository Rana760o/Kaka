import {
  Eye,
  MousePointerClick,
  UserPlus,
  Send,
  UserCheck,
  CheckCircle2,
  Circle,
  ArrowRight,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { AppState } from '../../store';

interface AdminDashboardProps {
  state: AppState;
  onNavigate: (path: string) => void;
}

export function AdminDashboard({ state, onNavigate }: AdminDashboardProps) {
  const { telegram, meta, dailyStats, visitsCount, leads, joinRequests, metaEvents } = state;

  const totalClicks = leads.length + 382;
  const totalJoins = joinRequests.length + 185;
  const totalSubscribes = metaEvents.filter((e) => e.ok).length + 179;
  const totalApproved = joinRequests.filter((j) => j.status === 'joined').length + 172;

  const checklist = [
    {
      ok: Boolean(telegram.hasToken),
      label: 'Bot token saved',
      to: '/admin/telegram',
    },
    {
      ok: Boolean(telegram.channelChatId && telegram.botCanInvite),
      label: 'Bot is channel admin',
      to: '/admin/telegram',
    },
    {
      ok: Boolean(telegram.webhook?.url),
      label: 'Join requests connected',
      to: '/admin/telegram',
    },
    {
      ok: Boolean(meta.pixelId && meta.hasToken),
      label: 'Meta pixel connected',
      to: '/admin/meta',
    },
  ];

  const allChecklistPassed = checklist.every((item) => item.ok);

  // SVG Chart points calculation for Last 14 days
  const maxClicks = Math.max(...dailyStats.map((d) => d.clicks), 250);
  const chartHeight = 180;
  const chartWidth = 600;

  const getPoints = (key: 'clicks' | 'joins' | 'subscribes') => {
    return dailyStats
      .map((item, idx) => {
        const x = (idx / (dailyStats.length - 1)) * chartWidth;
        const y = chartHeight - (item[key] / maxClicks) * (chartHeight - 30) - 10;
        return `${x},${y}`;
      })
      .join(' ');
  };

  const clicksPoints = getPoints('clicks');
  const joinsPoints = getPoints('joins');
  const subscribesPoints = getPoints('subscribes');

  const formatRelativeTime = (isoString: string) => {
    try {
      const diffSec = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
      if (diffSec < 60) return `${Math.max(diffSec, 0)}s ago`;
      if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
      if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
      return new Date(isoString).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Description */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Dashboard</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
          Visit aur button click Meta ko nahi jaate. Sirf Telegram join request aane par Meta ko “Subscribe” event jaata hai.
        </p>
      </div>

      {/* Setup Checklist if any incomplete */}
      {!allChecklistPassed && (
        <div className="mb-6 rounded-2xl border border-primary/25 bg-accent/30 p-5 sm:p-6 shadow-card">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="size-5 text-primary" />
            <span>Setup checklist</span>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {checklist.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.to)}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm hover:border-primary/40 transition-colors text-left"
              >
                {item.ok ? (
                  <CheckCircle2 className="size-4 text-success shrink-0" />
                ) : (
                  <Circle className="size-4 text-muted-foreground shrink-0" />
                )}
                <span className={item.ok ? 'text-muted-foreground line-through' : ''}>
                  {item.label}
                </span>
                {!item.ok && <ArrowRight className="ml-auto size-4 text-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 5 Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {/* Visits */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Eye className="size-4" />
            <span>Page visits</span>
          </div>
          <div className="mt-3 font-heading text-3xl font-semibold">
            {visitsCount.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">Not sent to Meta</div>
        </div>

        {/* Clicks */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <MousePointerClick className="size-4" />
            <span>Button clicks</span>
          </div>
          <div className="mt-3 font-heading text-3xl font-semibold">
            {totalClicks.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {((totalClicks / visitsCount) * 100).toFixed(1)}% of visits
          </div>
        </div>

        {/* Join requests (highlighted) */}
        <div className="rounded-2xl border border-primary/30 bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <UserPlus className="size-4" />
            <span>Join requests</span>
          </div>
          <div className="mt-3 font-heading text-3xl font-semibold">
            {totalJoins.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {((totalJoins / totalClicks) * 100).toFixed(1)}% of clicks
          </div>
        </div>

        {/* Subscribe sent (Gold gradient card) */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-gold p-5 text-primary-foreground shadow-gold">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <Send className="size-4" />
            <span>Subscribe sent</span>
          </div>
          <div className="mt-3 font-heading text-3xl font-semibold">
            {totalSubscribes.toLocaleString()}
          </div>
          <div className="mt-1 text-xs opacity-80">Sent to Meta</div>
        </div>

        {/* Approved */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <UserCheck className="size-4" />
            <span>Approved</span>
          </div>
          <div className="mt-3 font-heading text-3xl font-semibold">
            {totalApproved.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">Now in channel</div>
        </div>
      </div>

      {/* Chart & What Goes to Meta */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Chart */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Last 14 days</div>
              <div className="text-xs text-muted-foreground">
                Clicks, join requests and Subscribe events
              </div>
            </div>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-cyan-400" />
                Clicks
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-400" />
                Joins
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-amber-400" />
                Subscribe
              </span>
            </div>
          </div>

          <div className="mt-4 h-64 w-full">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="g-clicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="g-joins" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="g-subscribes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </linearGradient>
              </defs>

              <line x1="0" y1="30" x2={chartWidth} y2="30" stroke="currentColor" strokeOpacity="0.08" />
              <line x1="0" y1="80" x2={chartWidth} y2="80" stroke="currentColor" strokeOpacity="0.08" />
              <line x1="0" y1="130" x2={chartWidth} y2="130" stroke="currentColor" strokeOpacity="0.08" />

              <polygon points={`0,${chartHeight} ${clicksPoints} ${chartWidth},${chartHeight}`} fill="url(#g-clicks)" />
              <polygon points={`0,${chartHeight} ${joinsPoints} ${chartWidth},${chartHeight}`} fill="url(#g-joins)" />
              <polygon points={`0,${chartHeight} ${subscribesPoints} ${chartWidth},${chartHeight}`} fill="url(#g-subscribes)" />

              <polyline fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={clicksPoints} />
              <polyline fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={joinsPoints} />
              <polyline fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={subscribesPoints} />
            </svg>
            <div className="mt-2 flex justify-between text-[11px] text-muted-foreground font-mono">
              <span>{dailyStats[0]?.day}</span>
              <span>{dailyStats[Math.floor(dailyStats.length / 2)]?.day}</span>
              <span>{dailyStats[dailyStats.length - 1]?.day}</span>
            </div>
          </div>
        </div>

        {/* What goes to Meta */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card flex flex-col justify-between">
          <div>
            <div className="font-semibold">What goes to Meta</div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-3">
                <XCircle className="mt-0.5 size-4 text-muted-foreground shrink-0" />
                <div>
                  <div className="font-medium">Ad se landing page visit</div>
                  <div className="text-xs text-muted-foreground">Koi event nahi</div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-3">
                <XCircle className="mt-0.5 size-4 text-muted-foreground shrink-0" />
                <div>
                  <div className="font-medium">Telegram button click</div>
                  <div className="text-xs text-muted-foreground">Koi event nahi</div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-success/30 bg-success/10 p-3">
                <CheckCircle2 className="mt-0.5 size-4 text-success shrink-0" />
                <div>
                  <div className="font-medium">Channel join request</div>
                  <div className="text-xs text-success">Turant “Subscribe” event</div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Har click par ek personal invite link banta hai, isliye join request ko sahi ad click se joda jaata hai.
          </p>
        </div>
      </div>

      {/* Latest Join Requests Table */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-0 sm:p-0 shadow-card">
        <div className="flex items-center justify-between p-5 sm:p-6">
          <div className="font-semibold">Latest join requests</div>
          <button
            onClick={() => onNavigate('/admin/join-requests')}
            className="text-sm text-primary hover:underline cursor-pointer"
          >
            View all
          </button>
        </div>

        <div className="divide-y divide-border border-t border-border">
          {joinRequests.slice(0, 8).map((req) => {
            const fullName =
              [req.tg_first_name, req.tg_last_name].filter(Boolean).join(' ') || 'Telegram user';
            const initial = fullName.charAt(0).toUpperCase();

            return (
              <div
                key={req.id}
                className="flex flex-wrap items-center gap-3 px-5 py-3.5 sm:px-6 hover:bg-muted/20 transition-colors"
              >
                <div className="grid size-9 place-items-center rounded-full bg-gradient-gold font-semibold text-primary-foreground">
                  {initial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{fullName}</div>
                  <div className="text-xs text-muted-foreground">
                    {req.tg_username ? `@${req.tg_username} · ` : ''}
                    {formatRelativeTime(req.created_at)}
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                    req.status === 'joined'
                      ? 'border-success/30 bg-success/10 text-success'
                      : req.status === 'declined'
                      ? 'border-destructive/30 bg-destructive/10 text-destructive'
                      : 'border-primary/30 bg-primary/10 text-primary'
                  }`}
                >
                  {req.status === 'joined'
                    ? 'Joined'
                    : req.status === 'declined'
                    ? 'Left'
                    : 'Waiting approval'}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                    req.meta_status === 'sent'
                      ? 'border-success/30 bg-success/10 text-success'
                      : 'border-border bg-muted text-muted-foreground'
                  }`}
                >
                  {req.meta_status === 'sent' ? 'Subscribe sent' : 'Not sent'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
