import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";
import { nav, site } from "../../content/site";

/** Tracks which top-level section is under the middle of the viewport. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const ids = nav.map((n) => n.id);

export function Navigation() {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("is-locked");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("is-locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="label fixed top-3 left-3 z-[70] -translate-y-20 rounded-full bg-charcoal px-5 py-3 text-ivory transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500",
          scrolled || open ? "border-b border-charcoal/10 bg-ivory/95" : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between px-5 md:h-[4.5rem] md:px-10">
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="font-serif text-lg font-medium tracking-[0.22em] uppercase md:text-xl"
          >
            {site.name}
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "true" : undefined}
                    className="label relative py-2 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100 aria-[current=true]:after:scale-x-100"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="label -mr-2 flex items-center gap-3 p-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span className={cn("absolute left-0 h-px w-full bg-current transition-all duration-500", open ? "top-1/2 rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 h-px w-full bg-current transition-all duration-500", open ? "top-1/2 -rotate-45" : "bottom-0")} />
            </span>
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 bg-ivory pt-24 transition-[clip-path,visibility] duration-700 ease-[var(--ease-editorial)] lg:hidden",
          open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <nav aria-label="Mobile" className="flex h-full flex-col justify-between px-6 pb-10">
          <ul>
            {nav.map(({ id, label }, i) => (
              <li key={id} className="overflow-hidden border-b border-charcoal/10">
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === id ? "true" : undefined}
                  style={{ transitionDelay: open ? `${180 + i * 70}ms` : "0ms" }}
                  className={cn(
                    "display flex items-baseline justify-between py-4 text-[2.6rem] uppercase transition-transform duration-700 ease-[var(--ease-editorial)]",
                    open ? "translate-y-0" : "translate-y-full",
                    active === id && "italic",
                  )}
                >
                  {label}
                  <span className="label text-ash">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="label text-ash">{site.descriptor}</p>
        </nav>
      </div>
    </>
  );
}
