import { MetadataRoute } from "next";
import { getClasses } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const classes = await getClasses();
  const entries: MetadataRoute.Sitemap = [{ url: base, lastModified: new Date() }];
  for (const c of classes) {
    entries.push({ url: `${base}/class-${c.slug}`, lastModified: new Date(c.updated_at) });
  }
  return entries;
}
