import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { FiArrowUpRight, FiDownload, FiInbox, FiLayers, FiMail, FiRefreshCw, FiShoppingBag, FiUpload } from 'react-icons/fi';
import { api } from '../content/api';
import { useContent } from '../content/useContent';
import type { Application, ContactMessage, SiteContent } from '../content/types';
import { Badge, Btn, Card, Empty, PageHeader, Toast } from './ui';
import { useConfirm, useFlash } from './hooks';

import type { Overview } from '../content/api';

const statusTone = (s: Application['status']) => (s === 'new' ? 'blue' : s === 'shortlisted' ? 'green' : s === 'rejected' ? 'red' : 'gray');

const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.round(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  return `${d}d ago`;
};

export const Dashboard: React.FC = () => {
  const { content, setContent, refresh, locale } = useContent();
  const [overview, setOverview] = useState<Overview | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [flash, setFlash] = useFlash();
  const { confirm, dialog } = useConfirm();
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    try {
      const [o, a, m] = await Promise.all([api.overview(locale), api.listApplications(), api.listMessages()]);
      setOverview(o);
      setApplications(a.slice(0, 5));
      setMessages(m.slice(0, 4));
    } catch (e) {
      setFlash({ kind: 'err', text: e instanceof Error ? e.message : 'Could not load overview' });
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oluseed-content-${locale}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text()) as SiteContent;
      if (!parsed || typeof parsed !== 'object' || !('brand' in parsed)) throw new Error('That file does not look like site content.');
      if (!(await confirm(`Replace all ${locale.toUpperCase()} site content with the imported file?`))) return;
      await api.saveContent(parsed, locale);
      await refresh();
      setFlash({ kind: 'ok', text: 'Content imported.' });
    } catch (e) {
      setFlash({ kind: 'err', text: e instanceof Error ? e.message : 'Import failed' });
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const reset = async () => {
    if (!(await confirm(`Reset every ${locale.toUpperCase()} section to the original defaults? Projects, posts and products you added will be removed.`))) return;
    try {
      const res = await api.resetContent(locale);
      setContent(res.content);
      setFlash({ kind: 'ok', text: 'Content reset to defaults.' });
      load();
    } catch (e) {
      setFlash({ kind: 'err', text: e instanceof Error ? e.message : 'Reset failed' });
    }
  };

  const tiles = [
    { label: 'Projects', value: overview?.projects ?? content.projects.length, to: '/admin/projects', icon: FiLayers, note: 'Published on the work page' },
    { label: 'Applications', value: overview?.applications ?? 0, to: '/admin/applications', icon: FiInbox, note: `${overview?.newApplications ?? 0} new · ${overview?.internshipApplications ?? 0} internship` },
    { label: 'Messages', value: overview?.messages ?? 0, to: '/admin/messages', icon: FiMail, note: `${overview?.unreadMessages ?? 0} unread · ${overview?.subscribers ?? 0} subscribers` },
    { label: 'Products', value: overview?.products ?? content.shop.products.length, to: '/admin/content/shop', icon: FiShoppingBag, note: 'In the shop' },
  ];

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Everything on the public site is editable from the menu. Changes go live as soon as you save."
        actions={
          <>
            <Btn variant="secondary" onClick={load}>
              <FiRefreshCw /> Refresh
            </Btn>
            <Btn onClick={() => (window.location.href = '/admin/projects')}>
              <FiLayers /> Add a project
            </Btn>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map(({ label, value, to, icon: Icon, note }) => (
          <Link key={label} to={to} className="group rounded-2xl border border-line bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <Icon />
              </span>
              <FiArrowUpRight className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="mt-4 font-display text-3xl font-semibold tracking-tight">{value}</p>
            <p className="text-[14px] font-medium text-ink">{label}</p>
            <p className="text-[12.5px] text-muted">{note}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card
          title="Recent applications"
          actions={
            <Link to="/admin/applications" className="text-[13px] font-semibold text-brand">
              View all
            </Link>
          }
        >
          {applications.length === 0 ? (
            <Empty title="No applications yet" text="Submissions from the careers page will appear here." />
          ) : (
            <ul className="divide-y divide-line">
              {applications.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-medium text-ink">{a.name}</p>
                    <p className="truncate text-[12.5px] text-muted">
                      {a.jobTitle} · {timeAgo(a.createdAt)}
                    </p>
                  </div>
                  <Badge tone={statusTone(a.status)}>{a.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card
          title="Recent messages"
          actions={
            <Link to="/admin/messages" className="text-[13px] font-semibold text-brand">
              View all
            </Link>
          }
        >
          {messages.length === 0 ? (
            <Empty title="No messages yet" text="Contact form submissions will appear here." />
          ) : (
            <ul className="divide-y divide-line">
              {messages.map((m) => (
                <li key={m.id} className="py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-[14px] font-medium text-ink">{m.name}</p>
                    <span className="shrink-0 text-[12px] text-muted">{timeAgo(m.createdAt)}</span>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-[13px] text-muted">{m.message}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card className="mt-6" title="Backup & restore" description="Download all site content as a JSON file, restore from a backup, or reset to the original defaults.">
        <div className="flex flex-wrap gap-2">
          <Btn variant="secondary" onClick={exportJson}>
            <FiDownload /> Export JSON
          </Btn>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])} />
          <Btn variant="secondary" onClick={() => fileRef.current?.click()}>
            <FiUpload /> Import JSON
          </Btn>
          <Btn variant="danger" onClick={reset}>
            Reset to defaults
          </Btn>
        </div>
      </Card>

      {dialog}
      <Toast flash={flash} onClose={() => setFlash(null)} />
    </div>
  );
};
