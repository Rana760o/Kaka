import { Activity } from 'lucide-react';
import { MetaEventLog } from '../../types';

interface AdminEventsProps {
  metaEvents: MetaEventLog[];
}

export function AdminEvents({ metaEvents }: AdminEventsProps) {
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
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Meta events</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
          Meta ko bheja gaya har event aur Meta ka jawab. Test event Events Manager → Test events me dikhte hain.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-0 sm:p-0 shadow-card overflow-hidden">
        {metaEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="grid size-12 place-items-center rounded-2xl bg-muted text-muted-foreground">
              <Activity className="size-5" />
            </div>
            <div className="mt-4 font-semibold text-foreground">No events sent yet</div>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">Pehli join request aate hi yahan Subscribe event dikhega.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/30 text-muted-foreground font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Time</th>
                  <th className="px-5 py-3">Event</th>
                  <th className="px-5 py-3">Result</th>
                  <th className="px-5 py-3">Data sent</th>
                  <th className="px-5 py-3">Meta reply</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {metaEvents.map((evt) => {
                  const sentDisplay = evt.sent_fields
                    .map((f) => f.replace('client_', '').replace('_address', ''))
                    .join(', ');

                  return (
                    <tr key={evt.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5 whitespace-nowrap text-muted-foreground">
                        {formatDate(evt.created_at)}
                      </td>

                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{evt.event_name}</span>
                          {evt.is_test && (
                            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-info/30 bg-info/10 text-info">
                              Test
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-3.5">
                        {evt.ok ? (
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-success/30 bg-success/10 text-success">
                            Accepted
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-destructive/30 bg-destructive/10 text-destructive">
                            Rejected
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-3.5 text-muted-foreground font-mono text-[11px]">
                        {sentDisplay || '—'}
                      </td>

                      <td className="px-5 py-3.5 max-w-xs truncate">
                        {evt.response.error ? (
                          <span className="text-destructive font-medium">
                            {evt.response.error.error_user_msg || evt.response.error.message}
                          </span>
                        ) : evt.response.events_received !== undefined ? (
                          <span className="text-muted-foreground">
                            {evt.response.events_received} received
                          </span>
                        ) : (
                          '—'
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
