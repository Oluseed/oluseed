import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { EASE } from './motion/variants';
import { useT } from '../i18n/useLocale';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber = '2348066859951', message }) => {
  const t = useT();
  const [show, setShow] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setShow(true), 2200);
    const h = setTimeout(() => setHint(true), 4500);
    const hh = setTimeout(() => setHint(false), 9500);
    return () => {
      clearTimeout(a);
      clearTimeout(h);
      clearTimeout(hh);
    };
  }, []);

  const url = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message ?? t.whatsapp.message)}`;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="wa"
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="fixed bottom-6 right-6 z-[60] flex items-center gap-3"
        >
          <AnimatePresence>
            {hint && (
              <motion.span
                initial={{ opacity: 0, x: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 12, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, ease: EASE }}
                className="hidden rounded-full border border-line bg-white px-4 py-2 text-[13px] font-medium text-ink shadow-soft sm:block"
              >
                {t.whatsapp.hint}
              </motion.span>
            )}
          </AnimatePresence>
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.whatsapp.label}
            whileHover={{ scale: 1.08, rotate: 6 }}
            whileTap={{ scale: 0.94 }}
            className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_-10px_rgba(37,211,102,0.7)]"
          >
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]/50" />
            <FaWhatsapp className="relative h-7 w-7" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppButton;
