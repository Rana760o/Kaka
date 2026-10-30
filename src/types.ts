export interface SiteSettings {
  id: number;
  channel_name: string;
  tagline: string;
  badge_text: string;
  button_text: string;
  helper_text: string;
  footer_label: string;
  logo_text: string;
  logo_url: string | null;
  theme: string;
  fallback_link: string | null;
  privacy_contact: string | null;
  show_member_count: boolean;
  member_count_text: string;
  updated_at: string;
}

export interface TelegramStatus {
  hasToken: boolean;
  botUsername?: string;
  tokenMasked?: string;
  channelChatId?: string;
  channelTitle?: string;
  botCanInvite?: boolean;
  webhook?: {
    url?: string;
    pending?: number;
    lastError?: string;
    lastErrorAt?: string;
  };
  webhookSetAt?: string;
}

export interface MetaStatus {
  pixelId?: string;
  hasToken?: boolean;
  tokenMasked?: string;
  testEventCode?: string;
}

export interface LeadClick {
  id: string;
  created_at: string;
  country: string | null;
  tracking_allowed: boolean;
  block_reason: string | null;
  fbclid: string | null;
  utm_source: string | null;
  utm_medium?: string | null;
  utm_campaign: string | null;
  utm_content?: string | null;
  link_source: 'bot' | 'fallback';
  join_requests?: { id: string }[];
}

export interface JoinRequest {
  id: string;
  lead_id?: string;
  tg_user_id: number;
  tg_first_name: string;
  tg_last_name?: string;
  tg_username?: string;
  created_at: string;
  request_date: string;
  status: 'pending' | 'joined' | 'declined';
  meta_status: 'sent' | 'skipped' | 'failed';
  meta_error?: string;
  leads?: {
    utm_campaign?: string;
    utm_source?: string;
    country?: string;
    fbclid?: string;
  };
}

export interface MetaEventLog {
  id: string;
  event_name: string;
  is_test: boolean;
  ok: boolean;
  created_at: string;
  sent_fields: string[];
  response: {
    events_received?: number;
    error?: { message?: string; error_user_msg?: string };
  };
}

export interface DailyStat {
  day: string;
  clicks: number;
  joins: number;
  subscribes: number;
}
