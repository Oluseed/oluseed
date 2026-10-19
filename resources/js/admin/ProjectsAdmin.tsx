import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCamera, FiChevronDown, FiChevronUp, FiEdit2, FiExternalLink, FiPlus, FiSave, FiStar, FiTrash2, FiX } from 'react-icons/fi';
import { api } from '../content/api';
import { useContent } from '../content/useContent';
import type { ProjectItem } from '../content/types';
import { Badge, Btn, Card, Empty, ImageField, Label, PageHeader, TextArea, TextInput, Toast, Toggle, inputClass } from './ui';
import { useConfirm, useFlash } from './hooks';
import { EASE } from '../components/motion/variants';

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || `project-${Date.now()}`;

const screenshotUrl = (link: string) => {
  const clean = link.trim().replace(/^https?:\/\//, '');
  return clean ? `https://image.thum.io/get/width/1200/crop/900/noanimate/https://${clean}` : '';
};

const empty = (): ProjectItem => ({ id: '', title: '', tag: '', category: '', description: '', image: '', link: '', featured: false });

export const ProjectsAdmin: React.FC = () => {
  const { content, setContent, locale } = useContent();
  const [projects, setProjects] = useState<ProjectItem[]>(content.projects);
  const [editing, setEditing] = useState<ProjectItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useFlash();
  const { confirm, dialog } = useConfirm();

  useEffect(() => {
    if (!dirty) setProjects(content.projects);
  }, [content.projects, dirty]);

  const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))];

  const persist = async (next: ProjectItem[], message = 'Projects saved.') => {
    setSaving(true);
    try {
      const res = await api.saveSection('projects', next, locale);
      setContent(res.content);
      setProjects(next);
      setDirty(false);
      setFlash({ kind: 'ok', text: message });
    } catch (e) {
      setFlash({ kind: 'err', text: e instanceof Error ? e.message : 'Could not save' });
    } finally {
      setSaving(false);
    }
  };

  const startNew = () => {
    setEditing(empty());
    setIsNew(true);
  };

  const startEdit = (p: ProjectItem) => {
    setEditing({ ...p });
    setIsNew(false);
  };

  const submitEdit = async () => {
    if (!editing) return;
    if (!editing.title.trim() || !editing.link.trim()) {
      setFlash({ kind: 'err', text: 'A title and the project URL are required.' });
      return;
    }
    const link = /^https?:\/\//i.test(editing.link) ? editing.link.trim() : `https://${editing.link.trim()}`;
    const item: ProjectItem = {
      ...editing,
      link,
      id: editing.id || slugify(editing.title),
      image: editing.image || screenshotUrl(link),
      tag: editing.tag || 'Web platform',
      category: editing.category || 'Platforms',
    };
    const exists = projects.some((p) => p.id === item.id);
    const next = isNew && !exists ? [item, ...projects] : projects.map((p) => (p.id === item.id ? item : p));
    if (isNew && exists) item.id = `${item.id}-${Date.now().toString(36)}`;
    await persist(isNew && exists ? [item, ...projects] : next, isNew ? 'Project added to the site.' : 'Project updated.');
    setEditing(null);
  };

  const remove = async (p: ProjectItem) => {
    if (!(await confirm(`Remove "${p.title}" from the site?`))) return;
    await persist(
      projects.filter((x) => x.id !== p.id),
      'Project removed.',
    );
  };

  const toggleFeatured = (p: ProjectItem) => {
    setProjects((list) => list.map((x) => (x.id === p.id ? { ...x, featured: !x.featured } : x)));
    setDirty(true);
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= projects.length) return;
    const copy = [...projects];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    setProjects(copy);
    setDirty(true);
  };

  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <div className="pb-24">
      <PageHeader
        title="Projects"
        description="Add the URL of any project Oluseed has delivered. It appears on the Work page immediately, and featured projects also show on the home page."
        actions={
          <Btn onClick={startNew}>
            <FiPlus /> Add project
          </Btn>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3 text-[13px] text-muted">
        <span>
          <strong className="text-ink">{projects.length}</strong> projects
        </span>
        <span>·</span>
        <span>
          <strong className="text-ink">{featuredCount}</strong> featured on home {featuredCount > 3 && <span className="text-amber-600">(only the first 3 are shown)</span>}
        </span>
      </div>

      {projects.length === 0 ? (
        <Empty title="No projects yet" text="Add the first project URL to populate the Work page.">
          <Btn onClick={startNew}>
            <FiPlus /> Add project
          </Btn>
        </Empty>
      ) : (
        <ul className="grid gap-3">
          {projects.map((p, i) => (
            <li key={p.id} className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-3 shadow-soft sm:flex-row sm:items-center">
              <div className="h-28 w-full shrink-0 overflow-hidden rounded-xl bg-mist sm:h-20 sm:w-32">
                {p.image ? <img src={p.image} alt="" className="h-full w-full object-cover object-top" /> : <div className="grid h-full place-items-center text-muted">No image</div>}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-[16px] font-semibold text-ink">{p.title}</p>
                  {p.featured && <Badge tone="blue">Featured</Badge>}
                  {p.category && <Badge>{p.category}</Badge>}
                </div>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-0.5 inline-flex max-w-full items-center gap-1 truncate text-[13px] text-brand hover:underline">
                  <span className="truncate">{p.link}</span> <FiExternalLink className="shrink-0" />
                </a>
                <p className="mt-1 line-clamp-1 text-[13px] text-muted">{p.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1 self-end sm:self-center">
                <button onClick={() => toggleFeatured(p)} className={`grid h-9 w-9 place-items-center rounded-lg ${p.featured ? 'text-brand' : 'text-muted hover:bg-mist'}`} aria-label="Toggle featured" title="Feature on home page">
                  <FiStar className={p.featured ? 'fill-brand' : ''} />
                </button>
                <button onClick={() => move(i, -1)} disabled={i === 0} className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-mist disabled:opacity-30" aria-label="Move up">
                  <FiChevronUp />
                </button>
                <button onClick={() => move(i, 1)} disabled={i === projects.length - 1} className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-mist disabled:opacity-30" aria-label="Move down">
                  <FiChevronDown />
                </button>
                <button onClick={() => startEdit(p)} className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-mist" aria-label="Edit">
                  <FiEdit2 />
                </button>
                <button onClick={() => remove(p)} className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-red-50 hover:text-red-500" aria-label="Delete">
                  <FiTrash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Order / featured save bar */}
      <AnimatePresence>
        {dirty && (
          <motion.div key="savebar" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }} className="fixed inset-x-3 bottom-3 z-[90] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[380px] lg:right-8">
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-white/95 p-3 pl-4 shadow-lift backdrop-blur">
              <p className="text-[13.5px] font-medium text-ink">Order or featured changed</p>
              <div className="flex gap-2">
                <Btn variant="secondary" size="sm" onClick={() => (setProjects(content.projects), setDirty(false))}>
                  Discard
                </Btn>
                <Btn size="sm" disabled={saving} onClick={() => persist(projects)}>
                  <FiSave /> Save
                </Btn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editor drawer */}
      <AnimatePresence>
        {editing && (
          <motion.div key="editor" className="fixed inset-0 z-[92] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setEditing(null)} />
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-lift sm:rounded-[2rem]"
            >
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <h2 className="font-display text-xl font-semibold">{isNew ? 'Add project' : 'Edit project'}</h2>
                <button onClick={() => setEditing(null)} className="grid h-9 w-9 place-items-center rounded-full border border-line hover:bg-mist" aria-label="Close">
                  <FiX />
                </button>
              </div>
              <div className="grid gap-4 overflow-y-auto p-6 sm:grid-cols-2">
                <Label label="Project URL" hint="Required" className="sm:col-span-2">
                  <div className="flex gap-2">
                    <TextInput value={editing.link} onChange={(e) => setEditing({ ...editing, link: e.target.value })} placeholder="https://example.com" />
                    <Btn
                      type="button"
                      variant="secondary"
                      title="Generate a screenshot preview from the URL"
                      onClick={() => setEditing({ ...editing, image: screenshotUrl(editing.link) })}
                      disabled={!editing.link.trim()}
                    >
                      <FiCamera /> <span className="hidden sm:inline">Screenshot</span>
                    </Btn>
                  </div>
                </Label>
                <Label label="Title" hint="Required">
                  <TextInput value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="Project name" />
                </Label>
                <Label label="Tag" hint="e.g. EdTech · AI">
                  <TextInput value={editing.tag} onChange={(e) => setEditing({ ...editing, tag: e.target.value })} placeholder="Web platform" />
                </Label>
                <Label label="Category" hint="Used as a filter on the Work page">
                  <input list="project-categories" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} placeholder="Platforms" className={inputClass} />
                  <datalist id="project-categories">
                    {categories.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </Label>
                <div className="flex items-end pb-1">
                  <Toggle checked={editing.featured} onChange={(v) => setEditing({ ...editing, featured: v })} label="Feature on home page" />
                </div>
                <Label label="Description" className="sm:col-span-2">
                  <TextArea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="One or two sentences about what was built." />
                </Label>
                <div className="sm:col-span-2">
                  <ImageField label="Preview image" hint="Leave empty to auto-capture from the URL" value={editing.image} onChange={(v) => setEditing({ ...editing, image: v })} />
                </div>
              </div>
              <div className="flex justify-end gap-2 border-t border-line px-6 py-4">
                <Btn variant="secondary" onClick={() => setEditing(null)}>
                  Cancel
                </Btn>
                <Btn onClick={submitEdit} disabled={saving}>
                  {saving ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> : <FiSave />} {isNew ? 'Add project' : 'Save changes'}
                </Btn>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="mt-6" title="How previews work" description="If you leave the image empty, a screenshot of the live URL is captured automatically using a free screenshot service. Upload your own image for full control.">
        <p className="text-[13px] text-muted">Tip: keep 3 projects featured so the home page grid stays balanced.</p>
      </Card>

      {dialog}
      <Toast flash={flash} onClose={() => setFlash(null)} />
    </div>
  );
};
