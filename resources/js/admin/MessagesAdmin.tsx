import React, { useEffect, useState } from 'react';
import { FiMail, FiRefreshCw, FiTrash2 } from 'react-icons/fi';
import { api } from '../content/api';
import type { ContactMessage } from '../content/types';
import { Badge, Btn, Empty, PageHeader, Toast } from './ui';
import { useConfirm, useFlash } from './hooks';

const fmt = (iso: string) => new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export const MessagesAdmin: React.FC = () => {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useFlash();
  const { confirm, dialog } = useConfirm();

  const load = async () => {
    setLoading(true);
    try {
      setItems(await api.listMessages());
    } catch (e) {
      setFlash({ kind: 'err', text: e instanceof Error ? e.message : 'Could not load messages' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleRead = async (m: ContactMessage) => {
    try {
      const updated = await api.updateMessage(m.id, !m.read);
      setItems((list) => list.map((x) => (x.id === m.id ? updated : x)));
    } catch (e) {
      setFlash({ kind: 'err', text: e instanceof Error ? e.message : 'Could not update' });
    }
  };

  const remove = async (m: ContactMessage) => {
    if (!(await confirm(`Delete the message from ${m.name}?`))) return;
    try {
      await api.deleteMessage(m.id);
      setItems((list) => list.filter((x) => x.id !== m.id));
    } catch (e) {
      setFlash({ kind: 'err', text: e instanceof Error ? e.message : 'Could not delete' });
    }
  };

  return (
    <div>
      <PageHeader
        title="Messages"
        description="Submissions from the contact form."
        actions={
          <Btn variant="secondary" onClick={load}>
            <FiRefreshCw /> Refresh
          </Btn>
        }
      />

      {loading ? (
        <div className="grid place-items-center py-20">
          <span className="h-7 w-7 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />
        </div>
      ) : items.length === 0 ? (
        <Empty title="No messages yet" text="Contact form submissions will show up here." />
      ) : (
        <ul className="space-y-3">
          {items.map((m) => (
            <li key={m.id} className={`rounded-2xl border bg-white p-4 shadow-soft sm:p-5 ${m.read ? 'border-line' : 'border-brand/30'}`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-[16px] font-semibold text-ink">{m.name}</p>
                    {!m.read && <Badge tone="blue">New</Badge>}
                  </div>
                  <a href={`mailto:${m.email}`} className="text-[13px] text-brand hover:underline">
                    {m.email}
                  </a>
                  <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-ink/80">{m.message}</p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                  <span className="text-[12px] text-muted">{fmt(m.createdAt)}</span>
                  <div className="flex gap-2">
                    <a href={`mailto:${m.email}?subject=${encodeURIComponent('Re: your message to Oluseed')}`} className="inline-flex items-center gap-1.5 rounded-xl bg-brand-50 px-3 py-1.5 text-[12.5px] font-semibold text-brand hover:bg-brand hover:text-white">
                      <FiMail /> Reply
                    </a>
                    <Btn variant="secondary" size="sm" onClick={() => toggleRead(m)}>
                      {m.read ? 'Mark unread' : 'Mark read'}
                    </Btn>
                    <Btn variant="danger" size="sm" onClick={() => remove(m)} aria-label="Delete">
                      <FiTrash2 />
                    </Btn>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {dialog}
      <Toast flash={flash} onClose={() => setFlash(null)} />
    </div>
  );
};
