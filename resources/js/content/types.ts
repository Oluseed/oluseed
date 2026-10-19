export interface PageHeroContent {
  eyebrow: string;
  title: string;
  /** Space-separated words of `title` to render in the accent colour. */
  highlight: string;
  description: string;
  image: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  note: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  desc: string;
  wide: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  category: string;
  description: string;
  image: string;
  link: string;
  featured: boolean;
}

export interface BenefitItem {
  icon: string;
  heading: string;
  description: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  review: string;
  image: string;
  featured: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface JobItem {
  id: string;
  title: string;
  department: string;
  role: string;
  description: string;
  open: boolean;
}

export interface InternshipItem {
  id: string;
  title: string;
  department: string;
  duration: string;
  location: string;
  stipend: string;
  deadline: string;
  description: string;
  requirements: string[];
  open: boolean;
}

export interface PerkItem {
  title: string;
  description: string;
  image: string;
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  spec: string;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
}

export interface BlogComment {
  id: number;
  name: string;
  text: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  author: string;
  day: string;
  month: string;
  year: string;
  comments: BlogComment[];
}

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
    email: string;
    phones: string[];
    address: string;
    whatsapp: string;
    rc: string;
    socials: { instagram: string; x: string; linkedin: string; facebook: string };
  };
  home: {
    hero: {
      badge: string;
      line1: string;
      line2: string;
      line3: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
      image: string;
      imageCaption: string;
      imageEyebrow: string;
      cardOneValue: string;
      cardOneLabel: string;
      cardTwoValue: string;
      cardTwoTitle: string;
      cardTwoLabel: string;
    };
    clients: string[];
  };
  stats: StatItem[];
  services: { eyebrow: string; title: string; highlight: string; description: string; items: ServiceItem[] };
  projectsSection: { eyebrow: string; title: string; highlight: string; description: string };
  projects: ProjectItem[];
  why: {
    eyebrow: string;
    title: string;
    highlight: string;
    image: string;
    rating: string;
    delivered: string;
    benefits: BenefitItem[];
    checks: string[];
  };
  testimonials: { eyebrow: string; title: string; highlight: string; description: string; items: TestimonialItem[] };
  faq: { eyebrow: string; title: string; highlight: string; description: string; items: FaqItem[] };
  pages: {
    about: PageHeroContent;
    work: PageHeroContent;
    contact: PageHeroContent;
    blog: PageHeroContent;
    shop: PageHeroContent;
    careers: PageHeroContent;
    internships: PageHeroContent;
  };
  about: {
    storyEyebrow: string;
    storyTitle: string;
    storyHighlight: string;
    story: string;
    capabilities: string[];
    missionTitle: string;
    mission: string;
    visionTitle: string;
    vision: string;
    howEyebrow: string;
    howTitle: string;
    howHighlight: string;
    howDescription: string;
    imageOne: string;
    imageTwo: string;
    values: { title: string; text: string }[];
  };
  contact: {
    phoneText: string;
    locationText: string;
    emailText: string;
    mapsUrl: string;
    formEyebrow: string;
    formTitle: string;
    formHighlight: string;
    formDescription: string;
    formImage: string;
  };
  careers: {
    departments: string[];
    jobs: JobItem[];
    perksEyebrow: string;
    perksTitle: string;
    perksHighlight: string;
    perksDescription: string;
    perks: PerkItem[];
  };
  internships: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    howEyebrow: string;
    howTitle: string;
    howHighlight: string;
    steps: { title: string; text: string }[];
    items: InternshipItem[];
  };
  shop: { products: ProductItem[] };
  blog: { posts: BlogPost[] };
  footer: { ctaEyebrow: string; ctaTitle: string; ctaHighlight: string; ctaDescription: string; blurb: string };
}

export type ApplicationStatus = 'new' | 'reviewed' | 'shortlisted' | 'rejected';
export type ApplicationType = 'job' | 'internship';

export interface Application {
  id: string;
  type: ApplicationType;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  portfolio: string;
  coverLetter: string;
  cvUrl: string;
  status: ApplicationStatus;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}
