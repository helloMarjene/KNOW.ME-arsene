import type { Profile } from "./types";

const escapeValue = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/,/g, "\\,");

export function buildVCard(profile: Profile): string {
  const { identity, contact, socials } = profile;
  const website =
    contact.website ??
    socials.find((social) => social.platform === "website")?.href ??
    null;

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeValue(identity.fullName.split(" ").slice(1).join(" "))};${escapeValue(
      identity.firstName,
    )};;;`,
    `FN:${escapeValue(identity.fullName)}`,
    `TITLE:${escapeValue(identity.title)}`,
    `ORG:${escapeValue(identity.company)}`,
  ];

  if (website) lines.push(`URL:${escapeValue(website)}`);
  if (contact.email) lines.push(`EMAIL;TYPE=INTERNET:${escapeValue(contact.email)}`);
  if (contact.phone) lines.push(`TEL;TYPE=CELL:${escapeValue(contact.phone)}`);
  lines.push(`NOTE:${escapeValue(identity.summary)}`);
  lines.push(`ADR;TYPE=WORK:;;${escapeValue(identity.location)};;;;`);
  lines.push("END:VCARD");

  return `${lines.join("\r\n")}\r\n`;
}

export function vcardFileName(profile: Profile): string {
  return `${profile.slug}-know-me.vcf`;
}
