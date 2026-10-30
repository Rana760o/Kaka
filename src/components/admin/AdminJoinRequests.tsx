import { useState, useMemo } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { JoinRequest } from '../../types';

interface AdminJoinRequestsProps {
  joinRequests: JoinRequest[];
}

export function AdminJoinRequests({ joinRequests }: AdminJoinRequestsProps) {
  const [filter, setFilter] = useState<'all' | 'sent' | 'not-sent' | 'pending'>('all');
  const [search, setSearch] = useState('');

  const filteredRequests = useMemo(() => {
    let list = joinRequests;
    if (filter === 'sent') {
      list = list.filter((r) => r.meta_status === 'sent');
    } else if (filter === 'not-sent') {
      list = list.filter((r) => r.meta_status !== 'sent');
    } else if (filter === 'pending') {
      list = list.filter((r) => r.status === 'pending');
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((r) => {
        const full = `${r.tg_first_name} ${r.tg_last_name || ''} ${r.tg_username || ''} ${r.tg_user_id} ${
          r.leads?.utm_campaign || ''
        }`.toLowerCase();
        return full.includes(q);
      });
    }

    return list;
  }, [joinRequests, filter, search]);

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Join requests</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
          Har join request aur uska Meta status. Approve aap Telegram me khud karte ho — approve hote hi yahan “Joined” dikhega.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-0 sm:p-0 shadow-card overflow-hidden">
        {/* Controls Bar */}
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex rounded-xl bg-muted/60 p-1 text-xs">
            {[
              { id: 'all', label: 'All' },
              { id: 'sent', label: 'Subscribe sent' },
              { id: 'not-sent', label: 'Not sent' },
              { id: 'pending', label: 'Waiting approval' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`cursor-pointer rounded-lg px-3 py-1.5 font-medium transition-all ${
                  filter === tab.id
                    ? 'bg-card text-foreground shadow-sm font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative sm:w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search name, @username…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-input bg-background/50 pl-9 pr-3 py-1.5 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Table Content */}
        {filteredRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="grid size-12 place-items-center rounded-2xl bg-muted text-muted-foreground">
              <UserPlus className="size-5" />
            </div>
            <div className="mt-4 font-semibold text-foreground">Nothing here yet</div>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">Join requests yahan live aayenge.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/30 text-muted-foreground font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Telegram user</th>
                  <th className="px-5 py-3">Requested</th>
                  <th className="px-5 py-3">Channel</th>
                  <th className="px-5 py-3">Meta</th>
                  <th className="px-5 py-3">Campaign</th>
                  <th className="px-5 py-3">Country</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredRequests.map((req) => {
                  const fullName =
                    [req.tg_first_name, req.tg_last_name].filter(Boolean).join(' ') || 'Telegram user';

                  return (
                    <tr key={req.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-medium text-foreground">{fullName}</div>
                        <div className="text-[11px] text-muted-foreground">
                          {req.tg_username ? `@${req.tg_username}` : `ID ${req.tg_user_id}`}
                        </div>
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap text-muted-foreground">
                        {formatDate(req.created_at)}
                      </td>

                      <td className="px-5 py-3.5">
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
                      </td>

                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                            req.meta_status === 'sent'
                              ? 'border-success/30 bg-success/10 text-success'
                              : 'border-border bg-muted text-muted-foreground'
                          }`}
                        >
                          {req.meta_status === 'sent' ? 'Subscribe sent' : 'Not sent'}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-muted-foreground">
                        {req.leads?.utm_campaign ? (
                          <span className="font-medium text-foreground">{req.leads.utm_campaign}</span>
                        ) : req.leads?.fbclid ? (
                          <span className="text-primary font-medium">Meta ad</span>
                        ) : (
                          '—'
                        )}
                      </td>

                      <td className="px-5 py-3.5 font-mono text-muted-foreground">
                        {req.leads?.country || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
