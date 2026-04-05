import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { getAllBooks } from "@/lib/airtable/books";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const books = await getAllBooks();
  const staticPaths = [
    "",
    "/shop",
    "/delivery",
    "/about",
    "/contact",
    "/track-order",
    "/privacy",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const bookEntries: MetadataRoute.Sitemap = books.map((b) => ({
    url: `${SITE_URL}/books/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...bookEntries];
}
