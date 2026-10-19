import type { SiteContent } from '../content/types';

export type Field =
  | { type: 'text' | 'textarea' | 'number' | 'url' | 'image' | 'boolean' | 'icon'; key: string; label: string; hint?: string; full?: boolean }
  | { type: 'select'; key: string; label: string; options: string[]; hint?: string; full?: boolean }
  | { type: 'strings'; key: string; label: string; hint?: string; full?: boolean }
  | { type: 'group'; key: string; label: string; fields: Field[]; description?: string }
  | {
      type: 'list';
      key: string;
      label: string;
      fields: Field[];
      itemLabel: (item: Record<string, unknown>, index: number) => string;
      newItem: () => Record<string, unknown>;
      description?: string;
    };

export interface EditorPage {
  slug: string;
  title: string;
  description: string;
  section: keyof SiteContent;
  /** When the section itself is an array, it is wrapped in an object under this key for editing. */
  wrapKey?: string;
  fields: Field[];
}

const heroFields = (): Field[] => [
  { type: 'text', key: 'eyebrow', label: 'Eyebrow' },
  { type: 'text', key: 'title', label: 'Title', full: true },
  { type: 'text', key: 'highlight', label: 'Highlighted words', hint: 'Words from the title to colour' },
  { type: 'image', key: 'image', label: 'Background image', full: true },
  { type: 'textarea', key: 'description', label: 'Description', full: true },
];

const headingFields = (): Field[] => [
  { type: 'text', key: 'eyebrow', label: 'Eyebrow' },
  { type: 'text', key: 'highlight', label: 'Highlighted words', hint: 'Words from the title to colour' },
  { type: 'text', key: 'title', label: 'Title', full: true },
  { type: 'textarea', key: 'description', label: 'Description', full: true },
];

export const editorPages: EditorPage[] = [
  {
    slug: 'brand',
    title: 'Brand & contact details',
    description: 'Company name, contact information and social links used across the site, footer and contact page.',
    section: 'brand',
    fields: [
      { type: 'text', key: 'name', label: 'Company name' },
      { type: 'text', key: 'rc', label: 'Registration number' },
      { type: 'text', key: 'tagline', label: 'Tagline', full: true },
      { type: 'text', key: 'email', label: 'Email' },
      { type: 'text', key: 'whatsapp', label: 'WhatsApp number', hint: 'Digits only, with country code' },
      { type: 'strings', key: 'phones', label: 'Phone numbers', full: true },
      { type: 'textarea', key: 'address', label: 'Address', full: true },
      {
        type: 'group',
        key: 'socials',
        label: 'Social links',
        fields: [
          { type: 'url', key: 'instagram', label: 'Instagram' },
          { type: 'url', key: 'x', label: 'X (Twitter)' },
          { type: 'url', key: 'linkedin', label: 'LinkedIn' },
          { type: 'url', key: 'facebook', label: 'Facebook' },
        ],
      },
    ],
  },
  {
    slug: 'home',
    title: 'Home hero',
    description: 'The first thing visitors see: headline, intro copy, hero image, floating cards and the client marquee.',
    section: 'home',
    fields: [
      {
        type: 'group',
        key: 'hero',
        label: 'Hero',
        fields: [
          { type: 'text', key: 'badge', label: 'Badge text', full: true },
          { type: 'text', key: 'line1', label: 'Headline line 1' },
          { type: 'text', key: 'line2', label: 'Headline line 2' },
          { type: 'text', key: 'line3', label: 'Headline line 3', hint: 'Shown in gradient' },
          { type: 'textarea', key: 'description', label: 'Description', full: true },
          { type: 'text', key: 'primaryCta', label: 'Primary button' },
          { type: 'text', key: 'secondaryCta', label: 'Secondary button' },
          { type: 'image', key: 'image', label: 'Hero image', full: true },
          { type: 'text', key: 'imageEyebrow', label: 'Image eyebrow' },
          { type: 'text', key: 'imageCaption', label: 'Image caption' },
          { type: 'text', key: 'cardOneValue', label: 'Card 1 value' },
          { type: 'text', key: 'cardOneLabel', label: 'Card 1 label' },
          { type: 'text', key: 'cardTwoValue', label: 'Card 2 badge' },
          { type: 'text', key: 'cardTwoTitle', label: 'Card 2 title' },
          { type: 'text', key: 'cardTwoLabel', label: 'Card 2 label' },
        ],
      },
      { type: 'strings', key: 'clients', label: 'Client marquee', hint: 'Names scroll under the hero', full: true },
    ],
  },
  {
    slug: 'stats',
    title: 'Statistics',
    description: 'The animated counters shown under the hero and on the About page.',
    section: 'stats',
    wrapKey: 'items',
    fields: [
      {
        type: 'list',
        key: 'items',
        label: 'Stats',
        itemLabel: (i) => `${i.value ?? ''}${i.suffix ?? ''} ${i.label ?? ''}`.trim() || 'New stat',
        newItem: () => ({ value: 0, suffix: '', label: '', note: '' }),
        fields: [
          { type: 'number', key: 'value', label: 'Value' },
          { type: 'text', key: 'suffix', label: 'Suffix', hint: '+, K, %' },
          { type: 'text', key: 'label', label: 'Label' },
          { type: 'text', key: 'note', label: 'Note' },
        ],
      },
    ],
  },
  {
    slug: 'services',
    title: 'Services',
    description: 'The "What we serve" grid on the home page.',
    section: 'services',
    fields: [
      ...headingFields(),
      {
        type: 'list',
        key: 'items',
        label: 'Service cards',
        itemLabel: (i) => (i.title as string) || 'New service',
        newItem: () => ({ icon: 'box', title: '', desc: '', wide: false }),
        fields: [
          { type: 'text', key: 'title', label: 'Title' },
          { type: 'icon', key: 'icon', label: 'Icon' },
          { type: 'textarea', key: 'desc', label: 'Description', full: true },
          { type: 'boolean', key: 'wide', label: 'Wide card (spans two columns)' },
        ],
      },
    ],
  },
  {
    slug: 'projects-section',
    title: 'Projects section heading',
    description: 'Heading copy for the featured projects on the home page. Manage the projects themselves under Projects.',
    section: 'projectsSection',
    fields: headingFields(),
  },
  {
    slug: 'why',
    title: 'Why choose us',
    description: 'Benefits list, rating badge and checklist on the home page.',
    section: 'why',
    fields: [
      { type: 'text', key: 'eyebrow', label: 'Eyebrow' },
      { type: 'text', key: 'highlight', label: 'Highlighted words' },
      { type: 'text', key: 'title', label: 'Title', full: true },
      { type: 'image', key: 'image', label: 'Illustration', full: true },
      { type: 'text', key: 'rating', label: 'Client rating', hint: 'e.g. 4.9' },
      { type: 'text', key: 'delivered', label: 'Projects delivered', hint: 'e.g. 1,000+' },
      {
        type: 'list',
        key: 'benefits',
        label: 'Benefits',
        itemLabel: (i) => (i.heading as string) || 'New benefit',
        newItem: () => ({ icon: 'star', heading: '', description: '' }),
        fields: [
          { type: 'text', key: 'heading', label: 'Heading' },
          { type: 'icon', key: 'icon', label: 'Icon' },
          { type: 'textarea', key: 'description', label: 'Description', full: true },
        ],
      },
      { type: 'strings', key: 'checks', label: 'Checklist', full: true },
    ],
  },
  {
    slug: 'testimonials',
    title: 'Testimonials',
    description: 'Client quotes shown in the scrolling marquee.',
    section: 'testimonials',
    fields: [
      ...headingFields(),
      {
        type: 'list',
        key: 'items',
        label: 'Testimonials',
        itemLabel: (i) => (i.name as string) || 'New testimonial',
        newItem: () => ({ name: '', role: '', review: '', image: '', featured: false }),
        fields: [
          { type: 'text', key: 'name', label: 'Name' },
          { type: 'text', key: 'role', label: 'Role / company' },
          { type: 'textarea', key: 'review', label: 'Quote', full: true },
          { type: 'image', key: 'image', label: 'Avatar', hint: 'Optional', full: true },
          { type: 'boolean', key: 'featured', label: 'Featured (blue card)' },
        ],
      },
    ],
  },
  {
    slug: 'faq',
    title: 'FAQ',
    description: 'Questions and answers shown on the home and about pages.',
    section: 'faq',
    fields: [
      ...headingFields(),
      {
        type: 'list',
        key: 'items',
        label: 'Questions',
        itemLabel: (i) => (i.q as string) || 'New question',
        newItem: () => ({ q: '', a: '' }),
        fields: [
          { type: 'text', key: 'q', label: 'Question', full: true },
          { type: 'textarea', key: 'a', label: 'Answer', full: true },
        ],
      },
    ],
  },
  {
    slug: 'page-heroes',
    title: 'Page headers',
    description: 'The dark header at the top of each inner page.',
    section: 'pages',
    fields: [
      { type: 'group', key: 'about', label: 'About page', fields: heroFields() },
      { type: 'group', key: 'work', label: 'Work page', fields: heroFields() },
      { type: 'group', key: 'careers', label: 'Careers page', fields: heroFields() },
      { type: 'group', key: 'internships', label: 'Internships page', fields: heroFields() },
      { type: 'group', key: 'shop', label: 'Shop page', fields: heroFields() },
      { type: 'group', key: 'blog', label: 'Blog page', fields: heroFields() },
      { type: 'group', key: 'contact', label: 'Contact page', fields: heroFields() },
    ],
  },
  {
    slug: 'about',
    title: 'About page',
    description: 'Company story, capabilities, mission, vision, photos and values.',
    section: 'about',
    fields: [
      { type: 'text', key: 'storyEyebrow', label: 'Story eyebrow' },
      { type: 'text', key: 'storyHighlight', label: 'Story highlighted words' },
      { type: 'text', key: 'storyTitle', label: 'Story title', full: true },
      { type: 'textarea', key: 'story', label: 'Story', full: true },
      { type: 'strings', key: 'capabilities', label: 'Capabilities', hint: 'Shown as chips', full: true },
      { type: 'text', key: 'missionTitle', label: 'Mission title' },
      { type: 'text', key: 'visionTitle', label: 'Vision title' },
      { type: 'textarea', key: 'mission', label: 'Mission' },
      { type: 'textarea', key: 'vision', label: 'Vision' },
      { type: 'text', key: 'howEyebrow', label: 'How we work eyebrow' },
      { type: 'text', key: 'howHighlight', label: 'How we work highlighted words' },
      { type: 'text', key: 'howTitle', label: 'How we work title', full: true },
      { type: 'textarea', key: 'howDescription', label: 'How we work description', full: true },
      { type: 'image', key: 'imageOne', label: 'Photo one' },
      { type: 'image', key: 'imageTwo', label: 'Photo two' },
      {
        type: 'list',
        key: 'values',
        label: 'Values',
        itemLabel: (i) => (i.title as string) || 'New value',
        newItem: () => ({ title: '', text: '' }),
        fields: [
          { type: 'text', key: 'title', label: 'Title', full: true },
          { type: 'textarea', key: 'text', label: 'Text', full: true },
        ],
      },
    ],
  },
  {
    slug: 'contact',
    title: 'Contact page',
    description: 'Copy for the contact cards and the message form. Contact details live under Brand.',
    section: 'contact',
    fields: [
      { type: 'text', key: 'phoneText', label: 'Phone card text' },
      { type: 'text', key: 'locationText', label: 'Location card text' },
      { type: 'text', key: 'emailText', label: 'Email card text' },
      { type: 'url', key: 'mapsUrl', label: 'Google Maps link' },
      { type: 'text', key: 'formEyebrow', label: 'Form eyebrow' },
      { type: 'text', key: 'formHighlight', label: 'Form highlighted words' },
      { type: 'text', key: 'formTitle', label: 'Form title', full: true },
      { type: 'textarea', key: 'formDescription', label: 'Form description', full: true },
      { type: 'image', key: 'formImage', label: 'Form photo', full: true },
    ],
  },
  {
    slug: 'careers',
    title: 'Careers',
    description: 'Open roles, departments and the benefits section. Applications arrive in the Applications inbox.',
    section: 'careers',
    fields: [
      { type: 'strings', key: 'departments', label: 'Departments', hint: 'Used as filters', full: true },
      {
        type: 'list',
        key: 'jobs',
        label: 'Job openings',
        itemLabel: (i) => (i.title as string) || 'New role',
        newItem: () => ({ id: `job-${Date.now()}`, title: '', department: '', role: '', description: '', open: true }),
        fields: [
          { type: 'text', key: 'title', label: 'Job title' },
          { type: 'text', key: 'department', label: 'Department' },
          { type: 'text', key: 'role', label: 'Type / location', hint: 'e.g. Intern - Remote' },
          { type: 'boolean', key: 'open', label: 'Accepting applications' },
          { type: 'textarea', key: 'description', label: 'Short description', full: true },
        ],
      },
      { type: 'text', key: 'perksEyebrow', label: 'Benefits eyebrow' },
      { type: 'text', key: 'perksHighlight', label: 'Benefits highlighted words' },
      { type: 'text', key: 'perksTitle', label: 'Benefits title', full: true },
      { type: 'textarea', key: 'perksDescription', label: 'Benefits description', full: true },
      {
        type: 'list',
        key: 'perks',
        label: 'Benefits',
        itemLabel: (i) => (i.title as string) || 'New benefit',
        newItem: () => ({ title: '', description: '', image: '' }),
        fields: [
          { type: 'text', key: 'title', label: 'Title', full: true },
          { type: 'textarea', key: 'description', label: 'Description', full: true },
          { type: 'image', key: 'image', label: 'Icon image', full: true },
        ],
      },
    ],
  },
  {
    slug: 'internships',
    title: 'Internships',
    description: 'Internship tracks shown on the Internships page. Applications arrive in the Applications inbox, tagged as internships.',
    section: 'internships',
    fields: [
      ...headingFields(),
      {
        type: 'list',
        key: 'items',
        label: 'Internship openings',
        itemLabel: (i) => (i.title as string) || 'New internship',
        newItem: () => ({
          id: `internship-${Date.now()}`,
          title: '',
          department: '',
          duration: '',
          location: '',
          stipend: '',
          deadline: '',
          description: '',
          requirements: [],
          open: true,
        }),
        fields: [
          { type: 'text', key: 'title', label: 'Title', full: true },
          { type: 'text', key: 'department', label: 'Department' },
          { type: 'text', key: 'duration', label: 'Duration', hint: 'e.g. 3 months' },
          { type: 'text', key: 'location', label: 'Location', hint: 'e.g. Remote / Osogbo' },
          { type: 'text', key: 'stipend', label: 'Stipend', hint: 'e.g. Paid, ₦50,000 / month' },
          { type: 'text', key: 'deadline', label: 'Application deadline', hint: 'e.g. 30 Nov 2026 or Rolling' },
          { type: 'boolean', key: 'open', label: 'Accepting applications' },
          { type: 'textarea', key: 'description', label: 'Description', full: true },
          { type: 'strings', key: 'requirements', label: 'Requirements', hint: 'One per line, press Enter to add', full: true },
        ],
      },
      { type: 'text', key: 'howEyebrow', label: '"How it works" eyebrow' },
      { type: 'text', key: 'howHighlight', label: '"How it works" highlighted words' },
      { type: 'text', key: 'howTitle', label: '"How it works" title', full: true },
      {
        type: 'list',
        key: 'steps',
        label: 'Steps',
        itemLabel: (i) => (i.title as string) || 'New step',
        newItem: () => ({ title: '', text: '' }),
        fields: [
          { type: 'text', key: 'title', label: 'Title', full: true },
          { type: 'textarea', key: 'text', label: 'Text', full: true },
        ],
      },
    ],
  },
  {
    slug: 'shop',
    title: 'Shop products',
    description: 'Products listed in the shop. Orders go through WhatsApp using the number set under Brand.',
    section: 'shop',
    fields: [
      {
        type: 'list',
        key: 'products',
        label: 'Products',
        itemLabel: (i) => (i.name as string) || 'New product',
        newItem: () => ({ id: `product-${Date.now()}`, name: '', price: 0, spec: '', image: '', category: '', description: '', inStock: true }),
        fields: [
          { type: 'text', key: 'name', label: 'Name' },
          { type: 'number', key: 'price', label: 'Price (₦)' },
          { type: 'text', key: 'category', label: 'Category' },
          { type: 'boolean', key: 'inStock', label: 'In stock' },
          { type: 'text', key: 'spec', label: 'Short specification', full: true },
          { type: 'textarea', key: 'description', label: 'Description', full: true },
          { type: 'image', key: 'image', label: 'Product image', full: true },
        ],
      },
    ],
  },
  {
    slug: 'blog',
    title: 'Blog posts',
    description: 'Articles shown on the blog page.',
    section: 'blog',
    fields: [
      {
        type: 'list',
        key: 'posts',
        label: 'Posts',
        itemLabel: (i) => (i.title as string) || 'New post',
        newItem: () => {
          const d = new Date();
          return {
            id: `post-${Date.now()}`,
            category: '',
            title: '',
            subtitle: '',
            description: '',
            image: '',
            author: 'Oluseed Team',
            day: String(d.getDate()).padStart(2, '0'),
            month: d.toLocaleString('en', { month: 'short' }),
            year: String(d.getFullYear()),
            comments: [],
          };
        },
        fields: [
          { type: 'text', key: 'title', label: 'Title', full: true },
          { type: 'text', key: 'category', label: 'Category' },
          { type: 'text', key: 'author', label: 'Author' },
          { type: 'text', key: 'day', label: 'Day' },
          { type: 'text', key: 'month', label: 'Month', hint: 'e.g. Aug' },
          { type: 'text', key: 'year', label: 'Year' },
          { type: 'text', key: 'subtitle', label: 'Subtitle', full: true },
          { type: 'textarea', key: 'description', label: 'Body', full: true },
          { type: 'image', key: 'image', label: 'Cover image', full: true },
        ],
      },
    ],
  },
  {
    slug: 'footer',
    title: 'Footer',
    description: 'The call-to-action band and description in the footer.',
    section: 'footer',
    fields: [
      { type: 'text', key: 'ctaEyebrow', label: 'CTA eyebrow' },
      { type: 'text', key: 'ctaHighlight', label: 'CTA highlighted words' },
      { type: 'text', key: 'ctaTitle', label: 'CTA title', full: true },
      { type: 'textarea', key: 'ctaDescription', label: 'CTA description', full: true },
      { type: 'textarea', key: 'blurb', label: 'Footer blurb', full: true },
    ],
  },
];

export const contentNav = editorPages.map((p) => ({ slug: p.slug, title: p.title }));
