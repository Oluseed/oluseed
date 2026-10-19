import React from 'react';
import { FiMail, FiMapPin, FiPhone, FiArrowUpRight } from 'react-icons/fi';
import { Stagger, StaggerItem, TiltCard } from '../motion';
import { useContent } from '../../content/useContent';
import { useT } from '../../i18n/useLocale';

const ContactDetails: React.FC = () => {
  const { content } = useContent();
  const t = useT();
  const { brand, contact } = content;

  const cards = [
    {
      icon: FiPhone,
      title: t.contact.phone,
      text: contact.phoneText,
      lines: brand.phones.map((p) => ({ label: p, href: `tel:${p.replace(/\s+/g, '')}` })),
    },
    {
      icon: FiMapPin,
      title: t.contact.location,
      text: contact.locationText,
      lines: [{ label: brand.address, href: contact.mapsUrl }],
      featured: true,
    },
    {
      icon: FiMail,
      title: t.contact.email,
      text: contact.emailText,
      lines: [{ label: brand.email, href: `mailto:${brand.email}` }],
    },
  ];

  return (
    <section className="relative bg-white pb-8 pt-4">
      <div className="container-x">
        <Stagger stagger={0.12} className="-mt-10 grid gap-5 md:grid-cols-3">
          {cards.map(({ icon: Icon, title, text, lines, featured }) => (
            <StaggerItem key={title} y={40}>
              <TiltCard
                max={5}
                className={`group card-border-glow relative h-full overflow-hidden rounded-[1.75rem] p-7 transition-all duration-500 hover:-translate-y-1 ${
                  featured ? 'bg-ink text-white shadow-lift' : 'border border-line bg-white text-ink shadow-soft hover:shadow-lift'
                }`}
              >
                {featured && <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand/60 blur-3xl" />}
                <div className="relative">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl transition-all duration-500 ${
                      featured ? 'bg-white/10 text-brand-200' : 'bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold">{title}</h3>
                  <p className={`mt-1 text-[13.5px] ${featured ? 'text-white/60' : 'text-muted'}`}>{text}</p>
                  <ul className="mt-5 space-y-2">
                    {lines.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          target={l.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className={`group/link inline-flex items-start gap-2 break-words text-[14.5px] font-medium leading-relaxed transition-colors ${
                            featured ? 'text-white hover:text-brand-200' : 'text-ink hover:text-brand'
                          }`}
                        >
                          <span>{l.label}</span>
                          <FiArrowUpRight className="mt-1 h-4 w-4 shrink-0 opacity-0 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:opacity-100" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default ContactDetails;
