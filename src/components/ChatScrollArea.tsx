import { useEffect, useRef, type ReactNode } from 'react';

interface ChatScrollAreaProps {
  children: ReactNode;
  className: string;
  activityKey?: number;
}

const HIDE_AFTER_MS = 1600;

export default function ChatScrollArea({
  children,
  className,
  activityKey,
}: ChatScrollAreaProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let hideTimer: number | undefined;
    let observedContent: Element | null = null;

    const hide = () => {
      viewport.dataset.scrollActivity = 'idle';
    };

    const measure = () => {
      const overflowing = viewport.scrollHeight > viewport.clientHeight + 1;
      viewport.dataset.scrollOverflow = String(overflowing);
      if (!overflowing) {
        window.clearTimeout(hideTimer);
        hide();
      }
      return overflowing;
    };

    const reveal = () => {
      if (!measure()) return;
      window.clearTimeout(hideTimer);
      viewport.dataset.scrollActivity = 'active';
      hideTimer = window.setTimeout(hide, HIDE_AFTER_MS);
    };

    const resizeObserver = new ResizeObserver(measure);
    const observeContent = () => {
      const content = viewport.firstElementChild;
      if (content === observedContent) return;
      if (observedContent) resizeObserver.unobserve(observedContent);
      if (content) resizeObserver.observe(content);
      observedContent = content;
    };

    const contentObserver = new MutationObserver(() => {
      observeContent();
      reveal();
    });

    hide();
    measure();
    revealRef.current = reveal;
    resizeObserver.observe(viewport);
    observeContent();
    contentObserver.observe(viewport, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    viewport.addEventListener('scroll', reveal, { passive: true });

    return () => {
      window.clearTimeout(hideTimer);
      viewport.removeEventListener('scroll', reveal);
      contentObserver.disconnect();
      resizeObserver.disconnect();
      revealRef.current = null;
      hide();
    };
  }, []);

  useEffect(() => {
    if (activityKey !== undefined) revealRef.current?.();
  }, [activityKey]);

  return (
    <div ref={viewportRef} className={`chat-scroll-area ${className}`}>
      {children}
    </div>
  );
}
