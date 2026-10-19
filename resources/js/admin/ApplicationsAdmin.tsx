import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronDown, FiExternalLink, FiFileText, FiMail, FiPhone, FiRefreshCw, FiSearch, FiTrash2 } from 'react-icons/fi';
import { api } from '../content/api';
import type { Application, ApplicationStatus, ApplicationType } from '../content/types';
import { Badge, Btn, Empty, PageHeader, Select, Toast, inputClass } from './ui';
import { useConfirm, useFlash } from './hooks';

const STATUSES: ApplicationStatus[] = ['new', 'reviewed', 'shortlisted', 'rejected'];
const tone = (s: ApplicationStatus) => (s === 'new' ? 'blue' : s === 'shortlisted' ? 'green' : s === 'rejected' ? 'red' : 'gray');
const fmt = (iso: string) => new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export const ApplicationsAdmin: React.FC = () => {
  const [items, setItems] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | ApplicationStatus>('all');
  const [kind, setKind] = useState<'all' | ApplicationType>('all');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const [flash, setFlash] = useFlash();
  const { confirm, dialog } = useConfirm();

  const load = async () => {
    setLoading(true);
    try {
      setItems(await api.listApplications());
    } catch (e) {
      setFlash({ kind: 'err', text: e instanceof Error ? e.message : 'Could not load applications' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (a) => (filter === 'all' || a.status === filter) && (kind === 'all' || (a.type ?? 'job') === kind) && (!q || `${a.name} ${a.email} ${a.jobTitle}`.toLowerCase().includes(q)),
    );
  }, [items, filter, kind, query]);

  const setStatus = async (a: Application, status: ApplicationStatus) => {
    try {
      const updated = await api.updateApplication(a.id, status);
      setItems((list) => list.map((x) => (x.id === a.id ? updated : x)));
    } catch (e) {
      setFlash({ kind: 'err', text: e instanceof Error ? e.message : 'Could not update' });
    }
  };

  const remove = async (a: Application) => {
    if (!(await confirm(`Delete the application from ${a.name}? This cannot be undone.`))) return;
    try {
      await api.deleteApplication(a.id);
      setItems((list) => list.filter((x) => x.id !== a.id));
      setFlash({ kind: 'ok', text: 'Application deleted.' });
    } catch (e) {
      setFlash({ kind: 'err', text: e instanceof Error ? e.message : 'Could not delete' });
    }
  };

  const counts = STATUSES.reduce<Record<string, number>>((acc, s) => ({ ...acc, [s]: items.filter((a) => a.status === s).length }), {});

  return (
    <div>
      <PageHeader
        title="Applications"
        description="Everyone who applied through the careers and internships pages. Update the status as you review, and open CVs directly."
        actions={
          <Btn variant="secondary" onClick={load}>
            <FiRefreshCw /> Refresh
          </Btn>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {(['all', ...STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium capitalize transition-colors ${filter === s ? 'bg-ink text-white' : 'bg-white text-ink/70 hover:text-ink'}`}
            >
              {s} {s !== 'all' && <span className="opacity-60">({counts[s] ?? 0})</span>}
              {s === 'all' && <span className="opacity-60">({items.length})</span>}
            </button>
          ))}
        </div>
        <div className="flex gap-1 rounded-full border border-line bg-white p-1">
          {(['all', 'job', 'internship'] as const).map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`rounded-full px-3 py-1 text-[12.5px] font-medium capitalize transition-colors ${kind === k ? 'bg-brand text-white' : 'text-ink/60 hover:text-ink'}`}
            >
              {k === 'all' ? 'All types' : k === 'job' ? 'Jobs' : 'Internships'}
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto sm:w-72">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email, role" className={`${inputClass} py-2.5 pl-10`} />
        </div>
      </div>

      {loading ? (
        <div className="grid place-items-center py-20">
          <span className="h-7 w-7 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />
        </div>
      ) : visible.length === 0 ? (
        <Empty title={items.length === 0 ? 'No applications yet' : 'Nothing matches'} text={items.length === 0 ? 'Applications submitted on the careers page will show up here.' : 'Try a different filter or search.'} />
      ) : (
        <ul className="space-y-3">
          {visible.map((a) => {
            const isOpen = open === a.id;
            return (
              <li key={a.id} className={`rounded-2xl border bg-white shadow-soft transition-colors ${isOpen ? 'border-brand/40' : 'border-line'}`}>
                <button onClick={() => setOpen(isOpen ? null : a.id)} className="flex w-full flex-col gap-2 p-4 text-left sm:flex-row sm:items-center sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display text-[16px] font-semibold text-ink">{a.name}</p>
                      <Badge tone={tone(a.status)}>{a.status}</Badge>
                      {(a.type ?? 'job') === 'internship' && <Badge tone="amber">Internship</Badge>}
                    </div>
                    <p className="mt-0.5 truncate text-[13px] text-muted">
                      {a.jobTitle} · {a.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-[12.5px] text-muted">
                    {a.cvUrl && (
                      <span className="inline-flex items-center gap-1 text-brand">
                        <FiFileText /> CV
                      </span>
                    )}
                    <span>{fmt(a.createdAt)}</span>
                    <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="grid gap-5 border-t border-line p-4 sm:p-5 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/60">Cover letter</p>
                          <p className="mt-2 whitespace-pre-line text-[14px] leading-relaxed text-ink/80">{a.coverLetter || <span className="text-muted">No cover letter provided.</span>}</p>
                        </div>
                        <div className="space-y-3 text-[14px]">
                          <a href={`mailto:${a.email}`} className="flex items-center gap-2 text-ink hover:text-brand">
                            <FiMail className="text-muted" /> {a.email}
                          </a>
                          {a.phone && (
                            <a href={`tel:${a.phone}`} className="flex items-center gap-2 text-ink hover:text-brand">
                              <FiPhone className="text-muted" /> {a.phone}
                            </a>
                          )}
                          {a.portfolio && (
                            <a href={a.portfolio.startsWith('http') ? a.portfolio : `https://${a.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 truncate text-ink hover:text-brand">
                              <FiExternalLink className="shrink-0 text-muted" /> <span className="truncate">{a.portfolio}</span>
                            </a>
                          )}
                          {a.cvUrl && (
                            <a href={a.cvUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 font-semibold text-brand hover:bg-brand hover:text-white">
                              <FiFileText /> Open CV
                            </a>
                          )}
                          <div className="pt-2">
                            <p className="mb-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/60">Status</p>
                            <Select value={a.status} onChange={(e) => setStatus(a, e.target.value as ApplicationStatus)} className="py-2.5">
                              {STATUSES.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </Select>
                          </div>
                          <Btn variant="danger" size="sm" onClick={() => remove(a)}>
                            <FiTrash2 /> Delete
                          </Btn>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      )}

      {dialog}
      <Toast flash={flash} onClose={() => setFlash(null)} />
    </div>
  );
};
