import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiPlus, FiRotateCcw, FiSave, FiTrash2, FiX } from 'react-icons/fi';
import { editorPages, type Field } from './schemas';
import { useContent } from '../content/useContent';
import { api } from '../content/api';
import type { SiteContent } from '../content/types';
import { Btn, Card, ImageField, Label, PageHeader, Select, TextArea, TextInput, Toast, Toggle, inputClass } from './ui';
import { useFlash } from './hooks';
import { ICON_NAMES, iconFor } from '../components/ui/icons';

type Obj = Record<string, unknown>;

/* ------------------------------------------------------------ helpers */

const getAt = (obj: unknown, path: (string | number)[]): unknown =>
  path.reduce<unknown>((acc, k) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[k as string] : undefined), obj);

const setAt = (obj: unknown, path: (string | number)[], value: unknown): unknown => {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (Array.isArray(obj)) {
    const copy = [...obj];
    copy[head as number] = setAt(copy[head as number], rest, value);
    return copy;
  }
  const base = (obj && typeof obj === 'object' ? obj : {}) as Obj;
  return { ...base, [head]: setAt(base[head as string], rest, value) };
};

/* ------------------------------------------------------------- fields */

interface FieldProps {
  field: Field;
  value: unknown;
  path: (string | number)[];
  onChange: (path: (string | number)[], value: unknown) => void;
}

const StringsField: React.FC<{ value: string[]; onChange: (v: string[]) => void; label: string; hint?: string }> = ({ value, onChange, label, hint }) => {
  const [draft, setDraft] = useState('');
  const add = () => {
    const v = draft.trim();
    if (!v) return;
    onChange([...value, v]);
    setDraft('');
  };
  return (
    <Label label={label} hint={hint}>
      <div className="rounded-xl border border-line bg-white p-2">
        <div className="flex flex-wrap gap-2">
          {value.map((s, i) => (
            <span key={`${s}-${i}`} className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-[13px] text-ink">
              {s}
              <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="text-muted hover:text-red-500" aria-label={`Remove ${s}`}>
                <FiX className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                add();
              }
            }}
            placeholder="Type and press Enter"
            className={`${inputClass} py-2`}
          />
          <Btn type="button" variant="secondary" onClick={add}>
            <FiPlus /> Add
          </Btn>
        </div>
      </div>
    </Label>
  );
};

const FieldRenderer: React.FC<FieldProps> = ({ field, value, path, onChange }) => {
  const full = 'full' in field && field.full ? 'sm:col-span-2' : '';
  switch (field.type) {
    case 'text':
    case 'url':
      return (
        <Label label={field.label} hint={field.hint} className={full}>
          <TextInput value={(value as string) ?? ''} onChange={(e) => onChange(path, e.target.value)} placeholder={field.type === 'url' ? 'https://' : ''} />
        </Label>
      );
    case 'number':
      return (
        <Label label={field.label} hint={field.hint} className={full}>
          <TextInput type="number" value={value === undefined || value === null ? '' : String(value)} onChange={(e) => onChange(path, e.target.value === '' ? 0 : Number(e.target.value))} />
        </Label>
      );
    case 'textarea':
      return (
        <Label label={field.label} hint={field.hint} className={full || 'sm:col-span-2'}>
          <TextArea value={(value as string) ?? ''} onChange={(e) => onChange(path, e.target.value)} />
        </Label>
      );
    case 'image':
      return (
        <div className={full}>
          <ImageField label={field.label} hint={field.hint} value={(value as string) ?? ''} onChange={(v) => onChange(path, v)} />
        </div>
      );
    case 'boolean':
      return (
        <div className={`flex items-end pb-1 ${full}`}>
          <Toggle checked={Boolean(value)} onChange={(v) => onChange(path, v)} label={field.label} />
        </div>
      );
    case 'select':
      return (
        <Label label={field.label} hint={field.hint} className={full}>
          <Select value={(value as string) ?? ''} onChange={(e) => onChange(path, e.target.value)}>
            {field.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </Select>
        </Label>
      );
    case 'icon': {
      const Icon = iconFor((value as string) ?? '');
      return (
        <Label label={field.label} hint={field.hint} className={full}>
          <div className="flex gap-2">
            <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
              <Icon />
            </span>
            <Select value={(value as string) ?? ''} onChange={(e) => onChange(path, e.target.value)}>
              {ICON_NAMES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </Select>
          </div>
        </Label>
      );
    }
    case 'strings':
      return (
        <div className={full || 'sm:col-span-2'}>
          <StringsField label={field.label} hint={field.hint} value={Array.isArray(value) ? (value as string[]) : []} onChange={(v) => onChange(path, v)} />
        </div>
      );
    case 'group':
      return (
        <div className="sm:col-span-2">
          <div className="rounded-2xl border border-line bg-mist/40 p-4 sm:p-5">
            <p className="mb-4 font-display text-[15px] font-semibold text-ink">{field.label}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {field.fields.map((f) => (
                <FieldRenderer key={f.key} field={f} value={getAt(value, [f.key])} path={[...path, f.key]} onChange={onChange} />
              ))}
            </div>
          </div>
        </div>
      );
    case 'list':
      return (
        <div className="sm:col-span-2">
          <ListField field={field} value={Array.isArray(value) ? (value as Obj[]) : []} path={path} onChange={onChange} />
        </div>
      );
    default:
      return null;
  }
};

const ListField: React.FC<{ field: Extract<Field, { type: 'list' }>; value: Obj[]; path: (string | number)[]; onChange: FieldProps['onChange'] }> = ({
  field,
  value,
  path,
  onChange,
}) => {
  const [open, setOpen] = useState<number | null>(null);

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const copy = [...value];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(path, copy);
    setOpen(j);
  };

  const remove = (i: number) => {
    onChange(
      path,
      value.filter((_, j) => j !== i),
    );
    setOpen(null);
  };

  const add = () => {
    onChange(path, [...value, field.newItem()]);
    setOpen(value.length);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="font-display text-[15px] font-semibold text-ink">
            {field.label} <span className="ml-1 text-[12px] font-normal text-muted">{value.length}</span>
          </p>
          {field.description && <p className="text-[12.5px] text-muted">{field.description}</p>}
        </div>
        <Btn type="button" variant="secondary" size="sm" onClick={add}>
          <FiPlus /> Add
        </Btn>
      </div>
      <div className="space-y-2">
        {value.length === 0 && <p className="rounded-xl border border-dashed border-line p-5 text-center text-[13px] text-muted">Nothing here yet.</p>}
        {value.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={`rounded-2xl border transition-colors ${isOpen ? 'border-brand/40 bg-white' : 'border-line bg-white'}`}>
              <div className="flex items-center gap-2 p-2 pl-4">
                <button type="button" onClick={() => setOpen(isOpen ? null : i)} className="flex min-w-0 flex-1 items-center gap-3 py-1.5 text-left">
                  <span className="font-display text-[12px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <span className="truncate text-[14px] font-medium text-ink">{field.itemLabel(item, i)}</span>
                </button>
                <div className="flex shrink-0 items-center gap-1">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-mist disabled:opacity-30">
                    <FiChevronUp />
                  </button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label="Move down" className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-mist disabled:opacity-30">
                    <FiChevronDown />
                  </button>
                  <button type="button" onClick={() => remove(i)} aria-label="Remove" className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-red-50 hover:text-red-500">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="grid gap-4 border-t border-line p-4 sm:grid-cols-2">
                      {field.fields.map((f) => (
                        <FieldRenderer key={f.key} field={f} value={getAt(item, [f.key])} path={[...path, i, f.key]} onChange={onChange} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------- editor */

export const ContentEditor: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = useMemo(() => editorPages.find((p) => p.slug === slug), [slug]);
  const { content, setContent, locale } = useContent();
  const [flash, setFlash] = useFlash();
  const [saving, setSaving] = useState(false);

  const initial = useMemo(() => {
    if (!page) return {};
    const sectionValue = content[page.section] as unknown;
    return page.wrapKey ? { [page.wrapKey]: sectionValue } : (sectionValue as Obj);
  }, [content, page]);

  const [draft, setDraft] = useState<Obj>(initial as Obj);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setDraft(initial as Obj);
    setDirty(false);
  }, [initial]);

  if (!page) return <Navigate to="/admin" replace />;

  const onChange = (path: (string | number)[], value: unknown) => {
    setDraft((d) => setAt(d, path, value) as Obj);
    setDirty(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const value = (page.wrapKey ? draft[page.wrapKey] : draft) as SiteContent[typeof page.section];
      const res = await api.saveSection(page.section, value, locale);
      setContent(res.content);
      setDirty(false);
      setFlash({ kind: 'ok', text: 'Saved. The site has been updated.' });
    } catch (e) {
      setFlash({ kind: 'err', text: e instanceof Error ? e.message : 'Could not save' });
    } finally {
      setSaving(false);
    }
  };

  const discard = () => {
    setDraft(initial as Obj);
    setDirty(false);
  };

  return (
    <div className="pb-24">
      <PageHeader title={page.title} description={page.description} />
      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          {page.fields.map((f) => (
            <FieldRenderer key={f.key} field={f} value={getAt(draft, [f.key])} path={[f.key]} onChange={onChange} />
          ))}
        </div>
      </Card>

      {/* Sticky save bar */}
      <AnimatePresence>
        {dirty && (
          <motion.div
            key="savebar"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed inset-x-3 bottom-3 z-[90] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[380px] lg:right-8"
          >
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-white/95 p-3 pl-4 shadow-lift backdrop-blur">
              <p className="text-[13.5px] font-medium text-ink">Unsaved changes</p>
              <div className="flex gap-2">
                <Btn variant="secondary" size="sm" onClick={discard}>
                  <FiRotateCcw /> Discard
                </Btn>
                <Btn size="sm" onClick={save} disabled={saving}>
                  {saving ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> : <FiSave />} Save
                </Btn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Toast flash={flash} onClose={() => setFlash(null)} />
    </div>
  );
};
