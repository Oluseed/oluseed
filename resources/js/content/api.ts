import type { Application, ApplicationStatus, ContactMessage, SiteContent } from './types';
import type { Locale } from '../i18n/context';

const q = (locale?: Locale) => (locale ? `?locale=${locale}` : '');

const TOKEN_KEY = 'oluseed_admin_token';

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY) || '';
  } catch {
    return '';
  }
};

export const setToken = (token: string) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
};

const authHeaders = (): Record<string, string> => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/** Laravel returns `{ message, errors }` for validation and `{ error }` for app errors. */
const extractMessage = (data: unknown, fallback: string) => {
  if (!data || typeof data !== 'object') return fallback;
  const d = data as { error?: string; message?: string; errors?: Record<string, string[]> };
  if (d.errors) {
    const first = Object.values(d.errors).flat()[0];
    if (first) return first;
  }
  return d.error || d.message || fallback;
};

async function request<T>(url: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...authHeaders(),
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    let message = res.statusText || 'Request failed';
    try {
      message = extractMessage(await res.json(), message);
    } catch {
      /* ignore */
    }
    if (res.status === 401) setToken('');
    if (res.status === 429) message = 'Too many requests. Please wait a moment and try again.';
    throw new ApiError(res.status, message);
  }
  return res.json() as Promise<T>;
}

export interface Overview {
  projects: number;
  openJobs: number;
  openInternships: number;
  internshipApplications: number;
  applications: number;
  newApplications: number;
  messages: number;
  unreadMessages: number;
  products: number;
  posts: number;
  subscribers: number;
}

export const api = {
  // public
  getContent: (locale?: Locale) => request<SiteContent>(`/api/content${q(locale)}`),
  submitApplication: (data: Omit<Application, 'id' | 'status' | 'createdAt'>) =>
    request<{ ok: true; id: string }>('/api/applications', { method: 'POST', body: JSON.stringify(data) }),
  submitMessage: (data: { name: string; email: string; message: string }) =>
    request<{ ok: true }>('/api/messages', { method: 'POST', body: JSON.stringify(data) }),
  subscribe: (email: string) => request<{ ok: true }>('/api/subscribers', { method: 'POST', body: JSON.stringify({ email }) }),
  uploadCv: (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    return request<{ url: string }>('/api/upload/cv', { method: 'POST', body: fd });
  },

  // admin
  login: (email: string, password: string) =>
    request<{ token: string; user: { name: string; email: string } }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  me: () => request<{ ok: true; user: { name: string; email: string } }>('/api/auth/me'),
  logout: () => request<{ ok: true }>('/api/auth/logout', { method: 'POST' }),
  saveContent: (content: SiteContent, locale?: Locale) =>
    request<{ ok: true }>(`/api/content${q(locale)}`, { method: 'PUT', body: JSON.stringify(content) }),
  saveSection: <K extends keyof SiteContent>(section: K, value: SiteContent[K], locale?: Locale) =>
    request<{ ok: true; content: SiteContent }>(`/api/content/${section}${q(locale)}`, { method: 'PATCH', body: JSON.stringify(value) }),
  resetContent: (locale?: Locale) => request<{ ok: true; content: SiteContent }>(`/api/content/reset${q(locale)}`, { method: 'POST' }),
  uploadImage: (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    return request<{ url: string }>('/api/upload', { method: 'POST', body: fd });
  },
  listApplications: () => request<Application[]>('/api/applications'),
  updateApplication: (id: string, status: ApplicationStatus) =>
    request<Application>(`/api/applications/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteApplication: (id: string) => request<{ ok: true }>(`/api/applications/${id}`, { method: 'DELETE' }),
  listMessages: () => request<ContactMessage[]>('/api/messages'),
  updateMessage: (id: string, read: boolean) =>
    request<ContactMessage>(`/api/messages/${id}`, { method: 'PATCH', body: JSON.stringify({ read }) }),
  deleteMessage: (id: string) => request<{ ok: true }>(`/api/messages/${id}`, { method: 'DELETE' }),
  listSubscribers: () => request<{ id: number; email: string; createdAt: string }[]>('/api/subscribers'),
  deleteSubscriber: (id: number) => request<{ ok: true }>(`/api/subscribers/${id}`, { method: 'DELETE' }),
  overview: (locale?: Locale) => request<Overview>(`/api/admin/overview${q(locale)}`),
};

export { ApiError };
