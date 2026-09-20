export const brandIntroDuration = 2200;

// Synchronous first-paint gate, following Next's preventing-flash guide.
// No storage, remote requests or user-provided interpolation.
export const brandIntroBootstrap = `(() => {
  const root = document.documentElement;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const navigation = performance.getEntriesByType('navigation')[0];
  if (location.pathname !== '/' || location.hash || motion.matches ||
      document.visibilityState === 'hidden' || navigation?.type === 'back_forward') return;
  root.setAttribute('data-brand-intro-pending', '');
  const finish = () => {
    root.removeAttribute('data-brand-intro-pending');
    clearTimeout(timer);
    document.removeEventListener('click', skip);
    document.removeEventListener('keydown', escape);
    motion.removeEventListener('change', reduced);
    window.removeEventListener('ordantis:intro-finished', finish);
    window.dispatchEvent(new Event('ordantis:intro-release'));
  };
  const skip = event => {
    if (event.target instanceof Element && event.target.closest('[data-intro-skip]')) {
      event.preventDefault(); finish();
    }
  };
  const escape = event => { if (event.key === 'Escape') finish(); };
  const reduced = () => { if (motion.matches) finish(); };
  const timer = setTimeout(finish, 5000);
  document.addEventListener('click', skip);
  document.addEventListener('keydown', escape);
  motion.addEventListener('change', reduced);
  window.addEventListener('ordantis:intro-finished', finish);
})();`;
