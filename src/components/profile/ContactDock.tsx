import { ContactRound, Mail } from "lucide-react";
import type { Profile } from "@/lib/types";
import { SocialIcon } from "@/components/social/SocialIcon";

export function ContactDock({ profile }: { profile: Profile }) {
  const { contact, identity, slug } = profile;

  const requestHref = `mailto:${contact.email ?? "hello@marjenesoftwaredev.com"}?subject=${encodeURIComponent(
    `Contact request for ${identity.fullName}`,
  )}&body=${encodeURIComponent(
    "Hi KNOW ME team, I would like to request call and WhatsApp details for this profile.",
  )}`;

  const whatsappDigits = contact.whatsapp?.replace(/\D/g, "") ?? "";
  const whatsappHref = whatsappDigits
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
        `Hi ${identity.firstName}, I found your KNOW ME profile.`,
      )}`
    : requestHref;

  const emailHref = contact.email ? `mailto:${contact.email}` : requestHref;

  const secondary =
    "flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full px-2.5 text-[0.68rem] font-semibold text-ink-soft transition-colors hover:bg-white/15 hover:text-ink sm:gap-2 sm:px-4 sm:text-[0.74rem]";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))] print:hidden">
      <nav
        aria-label="Quick contact"
        className="glass pointer-events-auto flex w-full max-w-[33rem] items-center gap-1 rounded-full p-1.5 shadow-[0_24px_60px_-28px_rgba(9,14,55,0.65)]"
      >
        <a
          href={`/api/vcard/${slug}`}
          download
          className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-[linear-gradient(112deg,#0a1cb4_0%,#3a199e_52%,#c11074_100%)] px-2.5 text-[0.68rem] font-semibold text-white shadow-[0_12px_28px_-14px_rgba(10,28,180,0.8),inset_0_1px_0_rgba(255,255,255,0.3)] transition-transform active:scale-[0.99] sm:gap-2 sm:px-4 sm:text-[0.74rem]"
        >
          <ContactRound size={15} aria-hidden />
          Add contact
        </a>

        <a
          href={whatsappHref}
          aria-label={
            whatsappDigits
              ? `Chat with ${identity.firstName} on WhatsApp`
              : `Request WhatsApp details for ${identity.firstName} by email`
          }
          title={whatsappDigits ? "WhatsApp" : "WhatsApp — details shared on request"}
          {...(whatsappDigits
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className={secondary}
        >
          <SocialIcon platform="whatsapp" size={15} colored />
          WhatsApp
        </a>

        <a
          href={emailHref}
          aria-label={`Email ${identity.firstName}`}
          title="Email"
          className={secondary}
        >
          <Mail size={15} className="text-brand-pink" aria-hidden />
          Email
        </a>
      </nav>
    </div>
  );
}
