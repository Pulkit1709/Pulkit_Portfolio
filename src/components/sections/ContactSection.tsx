import { type FormEvent, useState } from "react";
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";

const OWNER_EMAIL = "pulkitgambhir1709@gmail.com";

type SocialEntry = {
  label: string;
  Icon: typeof FaGithub;
  href: string;
};

const socialLinks: SocialEntry[] = [
  { label: "GitHub", Icon: FaGithub, href: "https://github.com/Pulkit1709" },
  { label: "LinkedIn", Icon: FaLinkedin, href: "https://www.linkedin.com/in/pulkitgambhir1709/" },
];

function ContactConstellation() {
  const lines = [
    [12, 22, 28, 14],
    [28, 14, 52, 28],
    [52, 28, 68, 12],
    [68, 12, 88, 38],
    [88, 38, 72, 62],
    [72, 62, 42, 48],
    [42, 48, 22, 58],
    [22, 58, 12, 22],
  ];
  const nodes = [
    [12, 22],
    [28, 14],
    [52, 28],
    [68, 12],
    [88, 38],
    [72, 62],
    [42, 48],
    [22, 58],
  ];
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-[#a098cc]"
      viewBox="0 0 100 70"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g stroke="currentColor" strokeOpacity={0.14} strokeWidth={0.12} fill="none">
        {lines.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      <g fill="rgb(160 152 204 / 32%)">
        {nodes.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={0.35} />
        ))}
      </g>
    </svg>
  );
}

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio: message from ${name || "visitor"}`);
    const body = encodeURIComponent(
      `From: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="reveal-section contact-shell relative z-10 overflow-hidden border-t border-[#a098cc]/12 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#0a0a12]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_50%_-10%,rgb(160_152_204/7%),transparent_50%),radial-gradient(ellipse_55%_35%_at_100%_100%,rgb(160_152_204/4%),transparent)]" />
      <ContactConstellation />

      <div className="relative mx-auto max-w-6xl px-5 md:px-10">
        <div className="text-center">
          <h2 className="text-2xl font-semibold uppercase tracking-[0.32em] text-[#a098cc] md:text-3xl md:tracking-[0.35em]">
            Get In Touch
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-14 rounded-full bg-[#a098cc]/85" />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <h3 className="text-xl font-semibold uppercase tracking-[0.2em] text-[#a098cc] md:text-2xl md:tracking-[0.22em]">
              Let&apos;s Connect
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400 md:text-base">
              Have a project in mind or just want to chat? Feel free to reach out!
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 rounded-xl border border-[#a098cc]/10 bg-[#0e0e16] p-4 md:p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#12101c] text-[#a098cc]">
                  <FaPhone className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#a098cc]/75">Phone</p>
                  <p className="mt-1 text-sm text-slate-400">Under process — update soon</p>
                </div>
                <span className="shrink-0 rounded-md border border-[#a098cc]/25 bg-[#a098cc]/10 px-2 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-[#a098cc]">
                  Coming soon
                </span>
              </div>

              <a
                data-magnetic="true"
                href={`mailto:${OWNER_EMAIL}`}
                className="flex items-start gap-4 rounded-xl border border-[#a098cc]/10 bg-[#0e0e16] p-4 transition hover:border-[#a098cc]/28 md:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#12101c] text-[#a098cc]">
                  <FaEnvelope className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#a098cc]/75">Email</p>
                  <p className="mt-1 break-all text-sm text-slate-300">{OWNER_EMAIL}</p>
                </div>
              </a>
            </div>

            <div className="mt-10">
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#a098cc]">Connect with me</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map(({ label, Icon, href }) => (
                  <a
                    key={label}
                    data-magnetic="true"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#a098cc]/12 bg-[#0e0e16] text-slate-200 transition hover:border-[#a098cc]/35 hover:text-[#a098cc]"
                    aria-label={label}
                  >
                    <Icon className="h-[1.1rem] w-[1.1rem]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-[#a098cc]/12 bg-[#0e0e16]/95 p-6 backdrop-blur-sm md:p-8"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="text-sm text-[#a098cc]/80">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="contact-input mt-2 w-full rounded-xl border border-[#a098cc]/12 bg-[#12101c] px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-[#a098cc]/45 focus:outline-none focus:ring-2 focus:ring-[#a098cc]/18"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm text-[#a098cc]/80">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="contact-input mt-2 w-full rounded-xl border border-[#a098cc]/12 bg-[#12101c] px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-[#a098cc]/45 focus:outline-none focus:ring-2 focus:ring-[#a098cc]/18"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="text-sm text-[#a098cc]/80">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="contact-input mt-2 w-full resize-y rounded-xl border border-[#a098cc]/12 bg-[#12101c] px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-[#a098cc]/45 focus:outline-none focus:ring-2 focus:ring-[#a098cc]/18"
                />
              </div>
            </div>
            <button
              type="submit"
              data-magnetic="true"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#a098cc] py-3.5 text-sm font-semibold text-[#0a0a12] transition hover:bg-[#b8b0d4] md:text-base"
            >
              Send Message
              <FaArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
