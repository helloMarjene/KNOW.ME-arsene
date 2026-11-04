import { getProfile } from "@/lib/profiles";
import { buildVCard, vcardFileName } from "@/lib/vcard";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const profile = getProfile(slug);

  if (!profile) {
    return new Response("Profile not found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(buildVCard(profile), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${vcardFileName(profile)}"`,
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
