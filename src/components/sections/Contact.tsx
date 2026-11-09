import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Download, Mail, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import { contact } from "../../content/site";
import { useReveals } from "../../lib/useReveals";
import { Placeholder } from "../ui/Placeholder";
import { SectionHeader } from "../ui/SectionHeader";

interface Channel {
  label: string;
  value: string;
  placeholder: string;
  href: (value: string) => string;
  icon: ComponentType<LucideProps>;
  download?: boolean;
}

/** Real details go in src/content/site.ts; empty values render as labelled placeholders. */
const channels: Channel[] = [
  { label: "Email", value: contact.email, placeholder: "your-email@example.com", href: (v) => `mailto:${v}`, icon: Mail },
  { label: "LinkedIn", value: contact.linkedin, placeholder: "linkedin.com/in/your-profile", href: (v) => v, icon: ArrowUpRight },
  { label: "Instagram", value: contact.instagram, placeholder: "instagram.com/your-handle", href: (v) => v, icon: ArrowUpRight },
  { label: "Portfolio download", value: contact.portfolioPdf, placeholder: "Add a link to your portfolio PDF", href: (v) => v, icon: Download, download: true },
];

const field =
  "w-full border-0 border-b border-ivory/40 bg-transparent py-3 text-lg text-ivory placeholder:text-ivory/40 focus:border-butter focus:outline-none";

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  useReveals(root);

  // No backend yet: be honest about it instead of pretending the message was sent.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={root} className="on-dark bg-cocoa py-28 text-ivory md:py-40" aria-label="Contact">
      <div className="mx-auto grid max-w-[1800px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <SectionHeader tone="dark" kicker="09 — Contact" title={contact.headline} />
          <p data-reveal="" className="mt-10 max-w-lg text-xl leading-relaxed text-ivory/85">
            {contact.text}
          </p>

          <ul data-stagger="" className="mt-14 divide-y divide-ivory/20 border-y border-ivory/20">
            {channels.map(({ label, value, placeholder, href, icon: Icon, download }) => (
              <li key={label}>
                {value ? (
                  <a
                    href={href(value)}
                    {...(download ? { download: true } : { target: "_blank", rel: "noreferrer" })}
                    className="group flex items-center justify-between gap-6 py-5 transition-colors hover:text-butter"
                  >
                    <span className="label text-ivory/75 group-hover:text-butter">{label}</span>
                    <span className="flex items-center gap-3 font-serif text-2xl">
                      {value} <Icon size={18} aria-hidden="true" />
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center justify-between gap-6 py-5">
                    <span className="label text-ivory/75">{label}</span>
                    <span className="font-serif text-xl text-ivory/70 md:text-2xl">
                      <Placeholder>{placeholder}</Placeholder>
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ivory/70">Contact details are placeholders until real ones are added in src/content/site.ts.</p>
        </div>

        <form onSubmit={onSubmit} data-reveal="" data-delay="0.1" className="lg:col-span-5 lg:pt-16" aria-label="Contact form (demo)">
          <p className="label border border-butter/60 px-4 py-3 text-butter">{contact.formNotice}</p>

          <div className="mt-8 space-y-7">
            {(
              [
                ["name", "Name", "text", "name"],
                ["email", "Email", "email", "email"],
                ["subject", "Subject", "text", "off"],
              ] as const
            ).map(([id, label, type, autoComplete]) => (
              <div key={id}>
                <label htmlFor={`contact-${id}`} className="label text-ivory/75">
                  {label}
                </label>
                <input id={`contact-${id}`} name={id} type={type} required autoComplete={autoComplete} className={field} />
              </div>
            ))}
            <div>
              <label htmlFor="contact-message" className="label text-ivory/75">
                Message
              </label>
              <textarea id="contact-message" name="message" rows={4} required className={`${field} resize-none`} />
            </div>
          </div>

          <button
            type="submit"
            className="label mt-10 border border-butter bg-butter px-9 py-4 text-charcoal transition-colors hover:bg-transparent hover:text-butter"
          >
            Send message (demo)
          </button>

          <p role="status" className="mt-5 min-h-6 text-butter">
            {submitted ? "This is a frontend demonstration, so your message has not been sent." : ""}
          </p>
        </form>
      </div>
    </section>
  );
}
