import { ContactRound, Mail, MapPin, Phone } from "lucide-react";
import type { Profile } from "@/lib/types";
import { profileUrl } from "@/lib/site";
import { ConnectGrid } from "@/components/social/SocialDock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function ConnectSection({ profile }: { profile: Profile }) {
  const { socials, contact, identity } = profile;
  const url = profileUrl(profile.slug);
  const requestHref = `mailto:${contact.email ?? "hello@marjenesoftwaredev.com"}?subject=${encodeURIComponent(
    `Contact request for ${identity.fullName}`,
  )}&body=${encodeURIComponent(
    "Hi KNOW ME team, I would like to request call and WhatsApp details for this profile.",
  )}`;

  return (
    <section id="connect" className="relative py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Connect"
          title={
            <>
              Let&rsquo;s{" "}
              <span className="editorial font-normal normal-case text-brand-blue">connect</span>
              <span className="text-brand-pink">.</span>
            </>
          }
          description="Only the channels Arsene has chosen to publish appear here. Everything else is shared on request."
        />

        <div className="mt-9 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <ConnectGrid socials={socials} url={url} name={identity.fullName} />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass flex h-full flex-col justify-between rounded-[26px] p-5 sm:p-6">
              <div>
                <p className="eyebrow text-ink-muted">Direct contact</p>
                <div className="mt-5 space-y-3">
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/40 p-3 text-[0.8rem] text-ink-soft transition-colors hover:bg-white/70 hover:text-ink"
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/[0.045] text-brand-blue">
                        <Mail size={15} aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                          Email
                        </span>
                        <span className="block truncate">{contact.email}</span>
                      </span>
                    </a>
                  )}
                  <div className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/40 p-3 text-[0.8rem] text-ink-soft">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/[0.045] text-brand-pink">
                      <MapPin size={15} aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                        Based in
                      </span>
                      <span className="block">{identity.location}</span>
                    </span>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-ink/10 bg-white/30 p-4">
                  <p className="inline-flex items-center gap-2 text-[0.72rem] font-semibold text-ink">
                    <Phone size={13} aria-hidden />
                    Call &amp; WhatsApp
                  </p>
                  <p className="mt-1.5 text-[0.72rem] leading-relaxed text-ink-muted">
                    Direct details are not published. Request them and the KNOW ME team will follow
                    up.
                  </p>
                  <a href={requestHref} className="btn btn-glass mt-3 !min-h-9 !px-3.5 !text-[0.68rem]">
                    Request contact details
                  </a>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <a href={`/api/vcard/${profile.slug}`} className="btn btn-primary !min-h-10 !px-4 !text-[0.72rem]" download>
                  <ContactRound size={14} aria-hidden />
                  Add to contact
                </a>
                {contact.website && (
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-glass !min-h-10 !px-4 !text-[0.72rem]"
                  >
                    Company site
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <p className="editorial text-center text-[clamp(1.2rem,2.8vw,1.8rem)] text-ink-soft">
            &ldquo;Don&rsquo;t just exchange contacts. Let people discover you.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}
