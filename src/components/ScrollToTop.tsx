import { useEffect, useState } from "react";

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      onClick={handleClick}
      className={`fixed z-40 bottom-6 right-6 md:bottom-10 md:right-10 inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground shadow-[0_20px_60px_-20px_hsl(192_81%_43%/0.6)] hover:shadow-[0_20px_60px_-10px_hsl(192_81%_43%/0.8)] hover:-translate-y-0.5 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <span aria-hidden className="text-lg leading-none">↑</span>
    </button>
  );
};
