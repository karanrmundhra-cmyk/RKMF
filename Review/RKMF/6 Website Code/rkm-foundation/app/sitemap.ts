import type { MetadataRoute } from "next";

const BASE = "https://rkm.support";
const routes = ["", "/about", "/donate-now", "/fundraiser", "/fundraiser/create", "/shop", "/csr",
  "/partner-with-us", "/other-ways-to-give", "/faqs", "/careers", "/media", "/blog",
  "/blog/the-dog-who-started-it-all", "/contact", "/legal", "/legal/privacy-policy",
  "/legal/terms-and-conditions", "/legal/website-disclaimer-cookie-policy",
  "/legal/donation-refund-policy", "/legal/shop-refund-policy", "/legal/80g-tax-disclaimer"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    changeFrequency: r === "" || r === "/blog" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r === "/donate-now" ? 0.9 : 0.6,
  }));
}
