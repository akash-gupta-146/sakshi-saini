import { site } from "../../content/site";

export function Footer() {
  return (
    <footer className="on-dark bg-cocoa px-5 pb-10 text-ivory md:px-10">
      <div className="mx-auto max-w-[1800px] border-t border-ivory/20 pt-12 text-center">
        <p className="display text-[clamp(2.6rem,10vw,9rem)] tracking-[0.04em] uppercase">{site.name}</p>
        <p className="label mt-4 tracking-[0.4em] text-butter">{site.title}</p>
        <p className="serif-italic mt-10 text-xl text-ivory/85 md:text-2xl">&ldquo;{site.footerQuote.toUpperCase()}&rdquo;</p>
        <p className="mt-12 text-xs text-ivory/65">
          © {new Date().getFullYear()} {site.name}. Collection imagery and specifications are from the Modern Romance SS27 portfolio project.
        </p>
      </div>
    </footer>
  );
}
