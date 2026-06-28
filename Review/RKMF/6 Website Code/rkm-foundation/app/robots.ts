import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin", "/admin/", "/prototype/", "/prototype-v2/"] },
    sitemap: "https://rkm.support/sitemap.xml",
  };
}
