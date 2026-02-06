import type { MetadataRoute } from "next";
import { getAllTransactions } from "@/lib/transactions";

const BASE_URL = "https://www.sagecreekgroup.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const transactions = getAllTransactions();

  const transactionUrls = transactions.map((tx) => ({
    url: `${BASE_URL}/transactions/${tx.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const teamSlugs = ["tim-van-valin", "pat-mcclatchey", "jeff-verble"];
  const teamUrls = teamSlugs.map((slug) => ({
    url: `${BASE_URL}/about/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/why-sage-creek`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/transactions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tools/mortgage-calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...teamUrls,
    ...transactionUrls,
  ];
}
