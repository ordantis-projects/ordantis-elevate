import { useEffect, useRef } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { gsap } from "gsap";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = () => {
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
      );
    }
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <Navbar />
      <main ref={ref} key={location.pathname} className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
