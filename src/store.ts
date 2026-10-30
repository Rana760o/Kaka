import { SiteSettings, TelegramStatus, MetaStatus, LeadClick, JoinRequest, MetaEventLog, DailyStat } from './types';

const STORAGE_KEY = 'rajaboss_vip_data_v1';

export const DEFAULT_ADMIN_EMAIL = 'balajiofficialsatkamatka4@gmail.com';
export const DEFAULT_ADMIN_PASS = 'balaji8094';

export const THEMES = [
  { id: 'emerald-gold', name: 'Emerald Gold', vibe: 'Dark teal glow with a gold button' },
  { id: 'royal-crimson', name: 'Royal Crimson', vibe: 'Deep maroon with rich gold' },
  { id: 'midnight-blue', name: 'Midnight Blue', vibe: 'Navy night with an electric cyan button' },
  { id: 'saffron-fire', name: 'Saffron Fire', vibe: 'Warm ember glow, bold saffron' },
  { id: 'neon-lime', name: 'Neon Lime', vibe: 'Pitch black with a neon lime punch' },
  { id: 'rose-noir', name: 'Rose Noir', vibe: 'Black velvet with a hot rose button' },
  { id: 'ice-silver', name: 'Ice Silver', vibe: 'Cool graphite with silver light' },
  { id: 'ivory-classic', name: 'Ivory Classic', vibe: 'Light cream page with a deep green button' },
];

export const INITIAL_SETTINGS: SiteSettings = {
  id: 1,
  channel_name: 'VIP CHANNEL',
  tagline: 'Daily updates and insights — shared inside our private Telegram channel.',
  badge_text: '100% FREE ENTRY',
  button_text: 'JOIN ON TELEGRAM',
  helper_text: 'Tap to open Telegram instantly.',
  footer_label: 'PRIVATE CHANNEL',
  logo_text: 'M',
  logo_url: null,
  theme: 'royal-crimson',
  fallback_link: 'https://t.me/+rajaboss_vip_official',
  privacy_contact: '@balajiofficial',
  show_member_count: false,
  member_count_text: '1K+ members',
  updated_at: new Date().toISOString(),
};

export const INITIAL_TELEGRAM: TelegramStatus = {
  hasToken: true,
  botUsername: 'RajaBossVipBot',
  tokenMasked: '7921••••:AA••••••••••',
  channelChatId: '-1002984120934',
  channelTitle: 'VIP CHANNEL',
  botCanInvite: true,
  webhook: {
    url: 'https://rajabossvip.lovable.app/api/webhook',
    pending: 0,
  },
  webhookSetAt: '2 days ago',
};

export const INITIAL_META: MetaStatus = {
  pixelId: '984120394812391',
  hasToken: true,
  tokenMasked: 'EAAB7••••••••••',
  testEventCode: '',
};

function generateSeedStats(): DailyStat[] {
  const stats: DailyStat[] = [];
  const now = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const clicks = Math.floor(180 + Math.sin(i * 0.8) * 60 + Math.random() * 40);
    const joins = Math.floor(clicks * (0.45 + Math.random() * 0.15));
    const subscribes = Math.floor(joins * 0.94);
    stats.push({ day: dateStr, clicks, joins, subscribes });
  }
  return stats;
}

export const INITIAL_LEADS: LeadClick[] = [
  {
    id: 'lead-1',
    created_at: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    country: 'IN',
    tracking_allowed: true,
    block_reason: null,
    fbclid: 'IwAR3Q8kXpZ_9f1Y24b809a741f021e',
    utm_source: 'fb',
    utm_campaign: 'vip_broad_scale_india',
    link_source: 'bot',
    join_requests: [{ id: 'jr-1' }],
  },
  {
    id: 'lead-2',
    created_at: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    country: 'IN',
    tracking_allowed: true,
    block_reason: null,
    fbclid: 'IwAR01jLkA8934v89qL_39d918a209c',
    utm_source: 'ig',
    utm_campaign: 'vip_reels_retargeting',
    link_source: 'bot',
    join_requests: [{ id: 'jr-2' }],
  },
  {
    id: 'lead-3',
    created_at: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
    country: 'IN',
    tracking_allowed: true,
    block_reason: null,
    fbclid: null,
    utm_source: 'direct',
    utm_campaign: 'organic_share',
    link_source: 'bot',
    join_requests: [{ id: 'jr-3' }],
  },
  {
    id: 'lead-4',
    created_at: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
    country: 'AE',
    tracking_allowed: true,
    block_reason: null,
    fbclid: 'IwAR7vC8934kLa9_p1124a87123bf01',
    utm_source: 'fb',
    utm_campaign: 'vip_broad_scale_india',
    link_source: 'bot',
    join_requests: [],
  },
  {
    id: 'lead-5',
    created_at: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    country: 'GB',
    tracking_allowed: false,
    block_reason: 'consent_region',
    fbclid: 'IwAR89d12Lkd_81726a8c919d771',
    utm_source: 'ig',
    utm_campaign: 'vip_europe_exp',
    link_source: 'bot',
    join_requests: [],
  },
  {
    id: 'lead-6',
    created_at: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    country: 'IN',
    tracking_allowed: true,
    block_reason: null,
    fbclid: 'IwAR219LkAm18934d781290bb0a71',
    utm_source: 'fb',
    utm_campaign: 'vip_broad_scale_india',
    link_source: 'bot',
    join_requests: [{ id: 'jr-4' }],
  },
];

export const INITIAL_JOIN_REQUESTS: JoinRequest[] = [
  {
    id: 'jr-1',
    lead_id: 'lead-1',
    tg_user_id: 591823901,
    tg_first_name: 'Rajesh',
    tg_last_name: 'Meena',
    tg_username: 'rajesh_meena99',
    created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    request_date: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    status: 'pending',
    meta_status: 'sent',
    leads: {
      utm_campaign: 'vip_broad_scale_india',
      utm_source: 'fb',
      country: 'IN',
      fbclid: 'IwAR3Q8kXpZ_9f1Y24b809a741f021e',
    },
  },
  {
    id: 'jr-2',
    lead_id: 'lead-2',
    tg_user_id: 610923841,
    tg_first_name: 'Aman',
    tg_last_name: 'Verma',
    tg_username: 'aman_v77',
    created_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    request_date: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    status: 'joined',
    meta_status: 'sent',
    leads: {
      utm_campaign: 'vip_reels_retargeting',
      utm_source: 'ig',
      country: 'IN',
      fbclid: 'IwAR01jLkA8934v89qL_39d918a209c',
    },
  },
  {
    id: 'jr-3',
    lead_id: 'lead-3',
    tg_user_id: 578291038,
    tg_first_name: 'Suresh',
    tg_last_name: 'Patel',
    tg_username: 'suresh_p',
    created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    request_date: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    status: 'joined',
    meta_status: 'sent',
    leads: {
      utm_campaign: 'organic_share',
      utm_source: 'direct',
      country: 'IN',
    },
  },
  {
    id: 'jr-4',
    lead_id: 'lead-6',
    tg_user_id: 649102837,
    tg_first_name: 'Vikram',
    tg_last_name: 'Singh Rathore',
    tg_username: 'vikram_rathore',
    created_at: new Date(Date.now() - 170 * 60 * 1000).toISOString(),
    request_date: new Date(Date.now() - 170 * 60 * 1000).toISOString(),
    status: 'joined',
    meta_status: 'sent',
    leads: {
      utm_campaign: 'vip_broad_scale_india',
      utm_source: 'fb',
      country: 'IN',
      fbclid: 'IwAR219LkAm18934d781290bb0a71',
    },
  },
  {
    id: 'jr-5',
    tg_user_id: 520938194,
    tg_first_name: 'Pooja',
    tg_last_name: 'Sharma',
    tg_username: 'pooja_sharma88',
    created_at: new Date(Date.now() - 240 * 60 * 1000).toISOString(),
    request_date: new Date(Date.now() - 240 * 60 * 1000).toISOString(),
    status: 'pending',
    meta_status: 'sent',
    leads: {
      utm_campaign: 'vip_broad_scale_india',
      utm_source: 'fb',
      country: 'IN',
    },
  },
  {
    id: 'jr-6',
    tg_user_id: 692817293,
    tg_first_name: 'Balaji',
    tg_last_name: 'Official',
    tg_username: 'balaji_matka_king',
    created_at: new Date(Date.now() - 320 * 60 * 1000).toISOString(),
    request_date: new Date(Date.now() - 320 * 60 * 1000).toISOString(),
    status: 'joined',
    meta_status: 'sent',
    leads: {
      utm_campaign: 'vip_broad_scale_india',
      utm_source: 'fb',
      country: 'IN',
    },
  },
];

export const INITIAL_META_EVENTS: MetaEventLog[] = [
  {
    id: 'evt-1',
    event_name: 'Subscribe',
    is_test: false,
    ok: true,
    created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    sent_fields: ['client_ip_address', 'client_user_agent', 'fbc', 'fbp'],
    response: { events_received: 1 },
  },
  {
    id: 'evt-2',
    event_name: 'Subscribe',
    is_test: false,
    ok: true,
    created_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    sent_fields: ['client_ip_address', 'client_user_agent', 'fbc', 'fbp'],
    response: { events_received: 1 },
  },
  {
    id: 'evt-3',
    event_name: 'Subscribe',
    is_test: false,
    ok: true,
    created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    sent_fields: ['client_ip_address', 'client_user_agent'],
    response: { events_received: 1 },
  },
  {
    id: 'evt-4',
    event_name: 'Subscribe',
    is_test: false,
    ok: true,
    created_at: new Date(Date.now() - 170 * 60 * 1000).toISOString(),
    sent_fields: ['client_ip_address', 'client_user_agent', 'fbc', 'fbp'],
    response: { events_received: 1 },
  },
  {
    id: 'evt-5',
    event_name: 'Subscribe',
    is_test: true,
    ok: true,
    created_at: new Date(Date.now() - 400 * 60 * 1000).toISOString(),
    sent_fields: ['client_ip_address', 'client_user_agent', 'fbp'],
    response: { events_received: 1 },
  },
];

export interface AppState {
  settings: SiteSettings;
  telegram: TelegramStatus;
  meta: MetaStatus;
  leads: LeadClick[];
  joinRequests: JoinRequest[];
  metaEvents: MetaEventLog[];
  dailyStats: DailyStat[];
  visitsCount: number;
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        settings: { ...INITIAL_SETTINGS, ...(parsed.settings || {}) },
        telegram: { ...INITIAL_TELEGRAM, ...(parsed.telegram || {}) },
        meta: { ...INITIAL_META, ...(parsed.meta || {}) },
        leads: parsed.leads || INITIAL_LEADS,
        joinRequests: parsed.joinRequests || INITIAL_JOIN_REQUESTS,
        metaEvents: parsed.metaEvents || INITIAL_META_EVENTS,
        dailyStats: parsed.dailyStats || generateSeedStats(),
        visitsCount: parsed.visitsCount ?? 4328,
      };
    }
  } catch (err) {
    console.error('Failed to parse stored state:', err);
  }

  return {
    settings: INITIAL_SETTINGS,
    telegram: INITIAL_TELEGRAM,
    meta: INITIAL_META,
    leads: INITIAL_LEADS,
    joinRequests: INITIAL_JOIN_REQUESTS,
    metaEvents: INITIAL_META_EVENTS,
    dailyStats: generateSeedStats(),
    visitsCount: 4328,
  };
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save state:', err);
  }
}
