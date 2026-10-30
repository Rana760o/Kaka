import React, { useState } from 'react';
import {
  LayoutDashboard,
  UserPlus,
  MousePointerClick,
  Activity,
  Palette,
  Bot,
  ExternalLink,
  LogOut,
  Menu,
  X,
  SlidersHorizontal,
  Flame,
  Crown,
} from 'lucide-react';

interface AdminLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export function AdminLayout({
  currentPath,
  onNavigate,
  onLogout,
  children,
}: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navGroups = [
    {
      group: 'Overview',
      items: [
        { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/admin/join-requests', label: 'Join requests', icon: UserPlus },
        { to: '/admin/clicks', label: 'Button clicks', icon: MousePointerClick },
        { to: '/admin/events', label: 'Meta events', icon: Activity },
      ],
    },
    {
      group: 'Landing page',
      items: [
        { to: '/admin/landing', label: 'Page content', icon: SlidersHorizontal },
        { to: '/admin/themes', label: 'Themes', icon: Palette },
      ],
    },
    {
      group: 'Connections',
      items: [
        { to: '/admin/telegram', label: 'Telegram bot', icon: Bot },
        { to: '/admin/meta', label: 'Meta pixel', icon: Flame },
      ],
    },
  ];

  const handleNavigate = (path: string) => {
    onNavigate(path);
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="grid size-10 place-items-center rounded-xl bg-gradient-gold shadow-gold">
          <Crown className="size-5 text-primary-foreground" />
        </div>
        <div>
          <div className="font-heading text-sm font-semibold tracking-wide">CHANNEL PRIME</div>
          <div className="text-xs text-muted-foreground">Tracking panel</div>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-4">
        {navGroups.map((g) => (
          <div key={g.group} className="space-y-1">
            <div className="px-3 text-xs font-medium text-muted-foreground">{g.group}</div>
            <div className="space-y-1">
              {g.items.map((item) => {
                const Icon = item.icon;
                const active = currentPath === item.to;
                return (
                  <button
                    key={item.to}
                    type="button"
                    onClick={() => handleNavigate(item.to)}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-sidebar-accent font-semibold text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="space-y-1 border-t border-sidebar-border p-3">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground/75 hover:bg-sidebar-accent/60 transition-colors"
        >
          <ExternalLink className="size-4" />
          <span>View landing page</span>
        </a>
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground/75 hover:bg-sidebar-accent/60 transition-colors"
        >
          <LogOut className="size-4" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sidebar-border lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 border-r border-sidebar-border shadow-2xl">
            <div className="relative h-full">
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-4 z-10 rounded-lg p-1.5 text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
              <SidebarContent />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Mobile Header */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <span className="font-heading text-sm font-semibold">CHANNEL PRIME</span>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
