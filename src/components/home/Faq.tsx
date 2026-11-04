import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FAQS = [
  {
    question: "Do I need to create an account?",
    answer:
      "No. KNOW ME has no public registration, sign-in or dashboard. Profiles are designed, published and maintained by the KNOW ME team, so there is nothing for you to administer.",
  },
  {
    question: "Can I edit my own profile?",
    answer:
      "Updates are handled for you. Send a new photograph, a role change or a new link to our team and we make the edit — usually within the same working relationship that created the profile. This keeps the layout consistent and every detail accurate.",
  },
  {
    question: "How much does a profile cost?",
    answer:
      "Pricing depends on the scope: how many photographs, whether video is included, and how often you expect to update. Rather than publish a misleading one-size price, we quote after a short conversation. Email us and we will walk you through it.",
  },
  {
    question: "Can I choose what stays private?",
    answer:
      "Yes. Only the channels and contact details you explicitly approve are published. Phone numbers, WhatsApp, birthdays and any social account can be omitted entirely — the layout adapts rather than showing placeholders.",
  },
  {
    question: "Does the QR code contain my personal data?",
    answer:
      "No. It encodes only the permanent profile URL. When your profile changes, the same QR keeps working — no reprinting, no new code. Downloads are available as high-resolution PNG and vector SVG with a print-safe quiet zone.",
  },
  {
    question: "What happens to my photographs?",
    answer:
      "You keep ownership. We optimise copies for the web, serve them responsively and remove any photograph on request. They are not resold or reused on other profiles.",
  },
  {
    question: "Will the TikTok section always play?",
    answer:
      "It uses TikTok's official embeds, loaded one at a time. Some posts are photo carousels rather than videos, and playback can be restricted by the viewer's browser, region or privacy settings. Every card includes a direct link to open the post on TikTok, and we never pretend an unsupported control works.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative py-16 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Questions"
              title={
                <>
                  Honest answers
                  <span className="text-brand-pink">.</span>
                </>
              }
              description="The things people usually ask before starting. If your question isn't here, write to us directly — a person will answer."
            />
            <Reveal delay={0.08} className="mt-7">
              <div className="glass rounded-[24px] p-5">
                <p className="text-[0.82rem] font-semibold text-ink">Still deciding?</p>
                <p className="mt-1.5 text-[0.76rem] leading-relaxed text-ink-muted">
                  Tell us about the person behind the profile. We&rsquo;ll tell you honestly whether
                  KNOW ME is the right fit.
                </p>
                <a
                  href={`mailto:${SITE.company.email}?subject=${encodeURIComponent(
                    "Question about KNOW ME",
                  )}`}
                  className="btn btn-primary mt-4 !min-h-10 !px-4 !text-[0.72rem]"
                >
                  Ask a question
                  <ArrowUpRight size={14} aria-hidden />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <div className="glass overflow-hidden rounded-[26px] px-4 sm:px-6">
              {FAQS.map((item, index) => (
                <details
                  key={item.question}
                  className="group border-b border-ink/[0.08] last:border-b-0"
                  {...(index === 0 ? { open: true } : {})}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-baseline gap-3">
                      <span className="text-[0.58rem] font-semibold tabular-nums tracking-[0.16em] text-ink-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.88rem] font-semibold leading-snug text-ink">
                        {item.question}
                      </span>
                    </span>
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/60 text-ink-soft transition-transform duration-300 group-open:rotate-45">
                      <Plus size={13} aria-hidden />
                    </span>
                  </summary>
                  <div className="pb-5 pl-8 pr-9">
                    <p className="text-[0.79rem] leading-relaxed text-ink-muted">{item.answer}</p>
                    {index === FAQS.length - 1 && (
                      <Link
                        href="/arsene#videos"
                        className="mt-2 inline-flex items-center gap-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-brand-blue"
                      >
                        See the video wall in practice
                        <ArrowUpRight size={12} aria-hidden />
                      </Link>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
