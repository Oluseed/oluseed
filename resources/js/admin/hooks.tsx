import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Btn, type Flash } from './ui';

export const useFlash = (): [Flash, (f: Flash) => void] => {
  const [flash, setFlashState] = useState<Flash>(null);
  const timer = useRef<number | null>(null);
  const setFlash = (f: Flash) => {
    setFlashState(f);
    if (timer.current) window.clearTimeout(timer.current);
    if (f) timer.current = window.setTimeout(() => setFlashState(null), 3500);
  };
  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);
  return [flash, setFlash];
};

/* -------------------------------------------------------------- confirm */

export const useConfirm = () => {
  const [state, setState] = useState<{ text: string; resolve: (v: boolean) => void } | null>(null);
  const confirm = (text: string) => new Promise<boolean>((resolve) => setState({ text, resolve }));
  const dialog = (
    <AnimatePresence>
      {state && (
        <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[96] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => (state.resolve(false), setState(null))} />
          <motion.div
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-lift"
          >
            <p className="font-display text-lg font-semibold text-ink">Are you sure?</p>
            <p className="mt-2 text-[14px] text-muted">{state.text}</p>
            <div className="mt-6 flex justify-end gap-2">
              <Btn variant="secondary" onClick={() => (state.resolve(false), setState(null))}>
                Cancel
              </Btn>
              <Btn variant="danger" onClick={() => (state.resolve(true), setState(null))}>
                Confirm
              </Btn>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  return { confirm, dialog };
};
