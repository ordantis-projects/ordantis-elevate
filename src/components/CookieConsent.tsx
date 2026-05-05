import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useCookieConsent } from "@/lib/cookie-consent";

const CookieSettingsDialog = () => {
  const { isSettingsOpen, closeSettings, save, categories } = useCookieConsent();
  const [analytics, setAnalytics] = useState(categories.analytics);
  const [marketing, setMarketing] = useState(categories.marketing);

  useEffect(() => {
    if (isSettingsOpen) {
      setAnalytics(categories.analytics);
      setMarketing(categories.marketing);
    }
  }, [isSettingsOpen, categories.analytics, categories.marketing]);

  return (
    <Dialog open={isSettingsOpen} onOpenChange={(open) => (open ? null : closeSettings())}>
      <DialogContent className="max-w-2xl border-hairline bg-background p-0 sm:rounded-none">
        <DialogHeader className="px-8 pt-8">
          <DialogTitle className="text-display text-2xl">Configuración de cookies</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Decide qué categorías de cookies acepta. Las cookies técnicas son imprescindibles para el funcionamiento del
            sitio y no pueden desactivarse.
          </DialogDescription>
        </DialogHeader>

        <div className="px-8 py-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="border border-hairline p-5 flex items-start justify-between gap-6">
            <div>
              <p className="text-eyebrow text-primary mb-2">— Siempre activas</p>
              <h3 className="text-display text-lg mb-2">Técnicas</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Permiten la navegación, identificación de sesión y el funcionamiento básico del sitio. Sin ellas la web
                no opera correctamente.
              </p>
            </div>
            <Switch checked disabled aria-label="Cookies técnicas (siempre activas)" />
          </div>

          <div className="border border-hairline p-5 flex items-start justify-between gap-6">
            <div>
              <p className="text-eyebrow mb-2">— Opcional</p>
              <h3 className="text-display text-lg mb-2">Análisis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nos ayudan a entender cómo se usa la web (páginas más visitadas, recorridos) para mejorar contenidos y
                rendimiento. Datos agregados y anónimos.
              </p>
            </div>
            <Switch
              checked={analytics}
              onCheckedChange={setAnalytics}
              aria-label="Activar cookies de análisis"
            />
          </div>

          <div className="border border-hairline p-5 flex items-start justify-between gap-6">
            <div>
              <p className="text-eyebrow mb-2">— Opcional</p>
              <h3 className="text-display text-lg mb-2">Marketing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Permiten mostrar publicidad relevante en función de su navegación y medir la eficacia de las campañas.
              </p>
            </div>
            <Switch
              checked={marketing}
              onCheckedChange={setMarketing}
              aria-label="Activar cookies de marketing"
            />
          </div>

          <p className="text-xs text-muted-foreground">
            Más información en nuestra{" "}
            <Link to="/cookies" className="text-primary hover:underline" onClick={closeSettings}>
              Política de Cookies
            </Link>
            {" "}y{" "}
            <Link to="/privacy" className="text-primary hover:underline" onClick={closeSettings}>
              Política de Privacidad
            </Link>
            .
          </p>
        </div>

        <div className="border-t border-hairline px-8 py-5 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={closeSettings}
            className="px-5 py-3 border border-hairline text-xs font-medium uppercase tracking-[0.18em] hover:border-primary hover:text-primary transition-all duration-300"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => save({ analytics, marketing })}
            className="px-5 py-3 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-[0.18em] hover:shadow-glow transition-all duration-300"
          >
            Guardar preferencias
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CookieBanner = () => {
  const { decided, acceptAll, rejectAll, openSettings } = useCookieConsent();
  if (decided) return null;
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-hairline bg-background/95 backdrop-blur-md shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.4)]"
    >
      <div className="container-luxe py-6 flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex-1 text-sm text-muted-foreground leading-relaxed">
          <p>
            <span className="text-foreground font-medium">Utilizamos cookies propias y de terceros</span> para fines
            funcionales, analíticos y de marketing. Puede aceptarlas todas, rechazarlas o configurarlas por categoría.
            Más información en nuestra{" "}
            <Link to="/cookies" className="text-primary hover:underline">Política de Cookies</Link>.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
          <button
            type="button"
            onClick={rejectAll}
            className="px-5 py-3 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-[0.18em] hover:shadow-glow transition-all duration-300"
          >
            Rechazar todas
          </button>
          <button
            type="button"
            onClick={openSettings}
            className="px-5 py-3 border border-hairline text-xs font-medium uppercase tracking-[0.18em] hover:border-primary hover:text-primary transition-all duration-300"
          >
            Configurar
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="px-5 py-3 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-[0.18em] hover:shadow-glow transition-all duration-300"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
};

export const CookieConsent = () => (
  <>
    <CookieBanner />
    <CookieSettingsDialog />
  </>
);
