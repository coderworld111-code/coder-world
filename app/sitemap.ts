import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const paths = ["/","/about","/services","/solutions","/portfolio","/case-studies","/process","/technologies","/blog","/contact","/quote","/login"];
  return paths.map((path) => ({ url: `${base}${path}`, changeFrequency: "monthly", priority: path === "/" ? 1 : 0.7 }));
}
