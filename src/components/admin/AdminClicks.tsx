import { MousePointerClick } from 'lucide-react';
import { LeadClick } from '../../types';

interface AdminClicksProps {
  leads: LeadClick[];
}

export function AdminClicks({ leads }: AdminClicksProps) {
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

  const getReasonLabel = (reason: string | null) => {
    if (reason === 'consent_region') return 'Privacy region';
    if (reason === 'unknown_region') return 'Unknown country';
    if (reason === 'opted_out') return 'Opted out';
    return 'Off';
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Button clicks</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
          Har click par ek personal Telegram invite link banta hai. Click Meta ko nahi jaata — sirf join request hone par.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-0 sm:p-0 shadow-card overflow-hidden">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="grid size-12 place-items-center rounded-2xl bg-muted text-muted-foreground">
              <MousePointerClick className="size-5" />
            </div>
            <div className="mt-4 font-semibold text-foreground">No clicks yet</div>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">Landing page par button click hote hi yahan dikhega.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/30 text-muted-foreground font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Time</th>
                  <th className="px-5 py-3">From</th>
                  <th className="px-5 py-3">Campaign</th>
                  <th className="px-5 py-3">Country</th>
                  <th className="px-5 py-3">Tracking</th>
                  <th className="px-5 py-3">Link</th>
                  <th className="px-5 py-3">Join request</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leads.map((lead) => {
                  const hasJoined = lead.join_requests && lead.join_requests.length > 0;

                  return (
                    <tr key={lead.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5 whitespace-nowrap text-muted-foreground">
                        {formatDate(lead.created_at)}
                      </td>

                      <td className="px-5 py-3.5">
                        {lead.fbclid ? (
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-info/30 bg-info/10 text-info">
                            Meta ad
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-border bg-muted text-muted-foreground">
                            Direct
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-3.5 font-medium text-foreground">
                        {lead.utm_campaign ?? lead.utm_source ?? '—'}
                      </td>

                      <td className="px-5 py-3.5 font-mono text-muted-foreground">
                        {lead.country ?? '—'}
                      </td>

                      <td className="px-5 py-3.5">
                        {lead.tracking_allowed ? (
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-success/30 bg-success/10 text-success">
                            Allowed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-border bg-muted text-muted-foreground">
                            {getReasonLabel(lead.block_reason)}
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-3.5">
                        {lead.link_source === 'bot' ? (
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-primary/30 bg-primary/10 text-primary">
                            Personal link
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-warning/30 bg-warning/10 text-warning">
                            Fallback link
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-3.5">
                        {hasJoined ? (
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-success/30 bg-success/10 text-success">
                            Yes
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs">Not yet</span>
                        )}
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
