/*
  Nav — interactive navigation island (Step 3).
  - Desktop: horizontal nav with a "What we do" disclosure dropdown that opens on hover AND on
    keyboard focus. Service lines, then a deliberate <hr> divider, then Consultancy (cross-cutting).
  - Mobile: hamburger toggles a full-height panel; "What we do" expands inline with the same divider.
  - A11y: aria-expanded, aria-current on the active route, Arrow-key navigation in the dropdown,
    Esc closes and restores focus, focus trap + scroll lock for the mobile panel.
  - Motion: quick ease-out reveal; the global prefers-reduced-motion rule zeroes durations.

  Links are plain anchors (a button + list-of-links disclosure pattern), so they work without JS;
  the dropdown/panel toggles are the progressive enhancement.
*/
import { useEffect, useId, useRef, useState } from 'react';
import {
  PRIMARY_NAV,
  HEADER_CTA,
  SERVICE_LINES,
  CONSULTANCY,
  isActive,
  type NavItem,
} from '../config/site';

interface Props {
  pathname: string;
}

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{
      transition: 'transform 150ms ease-out',
      transform: open ? 'rotate(180deg)' : 'none',
    }}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default function Nav({ pathname }: Props) {
  return (
    <>
      <DesktopNav pathname={pathname} />
      <MobileNav pathname={pathname} />
    </>
  );
}

/* ----------------------------- Desktop ----------------------------- */

function DesktopNav({ pathname }: Props) {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
      <ul className="flex items-center gap-1">
        {PRIMARY_NAV.map((item) =>
          item.children ? (
            <li key={item.href}>
              <WhatWeDoDropdown item={item} pathname={pathname} />
            </li>
          ) : (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isActive(item.href, pathname) ? 'page' : undefined}
                className="nx-navlink"
              >
                {item.label}
              </a>
            </li>
          ),
        )}
      </ul>
      <a href={HEADER_CTA.href} className="nx-cta ml-3">
        {HEADER_CTA.label}
      </a>
    </nav>
  );
}

function WhatWeDoDropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const groupRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const menuId = useId();

  const clearClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    clearClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  // Close when focus leaves the whole group.
  const onBlurCapture = (e: React.FocusEvent) => {
    if (!groupRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
  };

  const focusItem = (index: number) => {
    const links = menuRef.current?.querySelectorAll<HTMLAnchorElement>('a');
    if (!links || links.length === 0) return;
    const i = (index + links.length) % links.length;
    links[i]?.focus();
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
      window.requestAnimationFrame(() => focusItem(0));
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    const links = Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []);
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusItem(current + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusItem(current - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusItem(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusItem(links.length - 1);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  const sectionActive = isActive(item.href, pathname);

  return (
    <div
      ref={groupRef}
      className="relative"
      onMouseEnter={() => {
        clearClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onBlurCapture={onBlurCapture}
    >
      <span className="flex items-center">
        <a
          href={item.href}
          aria-current={sectionActive ? 'page' : undefined}
          className="nx-navlink"
        >
          {item.label}
        </a>
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={`${open ? 'Close' : 'Open'} ${item.label} menu`}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={onTriggerKeyDown}
          className="nx-chevron"
        >
          <ChevronDown open={open} />
        </button>
      </span>

      <div
        ref={menuRef}
        id={menuId}
        hidden={!open}
        onKeyDown={onMenuKeyDown}
        className="nx-dropdown"
      >
        <ul>
          {SERVICE_LINES.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                aria-current={isActive(s.href, pathname) ? 'page' : undefined}
                className="nx-dropitem"
              >
                {s.label}
              </a>
            </li>
          ))}
          {/* Deliberate divider: consultancy spans all three lines, it is not a 4th service. */}
          <li aria-hidden="true">
            <hr className="nx-divider" />
          </li>
          <li>
            <a
              href={CONSULTANCY.href}
              aria-current={isActive(CONSULTANCY.href, pathname) ? 'page' : undefined}
              className="nx-dropitem nx-dropitem--consultancy"
            >
              {CONSULTANCY.label}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

/* ----------------------------- Mobile ----------------------------- */

function MobileNav({ pathname }: Props) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const subId = useId();

  // Scroll lock + focus management + focus trap + Esc.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);

    window.requestAnimationFrame(() => focusables()[0]?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={hamburgerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
        className="nx-hamburger"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
        </svg>
      </button>

      {open && (
        <>
          <div className="nx-scrim" onClick={() => setOpen(false)} aria-hidden="true" />
          <div ref={panelRef} id={panelId} role="dialog" aria-modal="true" aria-label="Site menu" className="nx-panel">
            <nav aria-label="Primary" className="flex flex-col gap-1">
              {PRIMARY_NAV.map((item) =>
                item.children ? (
                  <div key={item.href} className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <a
                        href={item.href}
                        aria-current={isActive(item.href, pathname) ? 'page' : undefined}
                        className="nx-mlink flex-1"
                      >
                        {item.label}
                      </a>
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        aria-controls={subId}
                        aria-label={`${servicesOpen ? 'Collapse' : 'Expand'} ${item.label}`}
                        onClick={() => setServicesOpen((v) => !v)}
                        className="nx-chevron nx-chevron--mobile"
                      >
                        <ChevronDown open={servicesOpen} />
                      </button>
                    </div>
                    <div id={subId} hidden={!servicesOpen} className="nx-subnav">
                      {SERVICE_LINES.map((s) => (
                        <a
                          key={s.href}
                          href={s.href}
                          aria-current={isActive(s.href, pathname) ? 'page' : undefined}
                          className="nx-msublink"
                        >
                          {s.label}
                        </a>
                      ))}
                      <hr className="nx-divider" aria-hidden="true" />
                      <a
                        href={CONSULTANCY.href}
                        aria-current={isActive(CONSULTANCY.href, pathname) ? 'page' : undefined}
                        className="nx-msublink nx-dropitem--consultancy"
                      >
                        {CONSULTANCY.label}
                      </a>
                    </div>
                  </div>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href, pathname) ? 'page' : undefined}
                    className="nx-mlink"
                  >
                    {item.label}
                  </a>
                ),
              )}
              <a href={HEADER_CTA.href} className="nx-cta mt-4 justify-center">
                {HEADER_CTA.label}
              </a>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
