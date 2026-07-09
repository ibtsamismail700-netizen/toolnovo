import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://toolnovo.net";

  const tools = [
    "word-counter",
    "password-generator",
    "qr-code-generator",
    "case-converter",
    "lorem-ipsum-generator",
    "age-calculator",
    "json-formatter",
    "base64-encoder",
    "color-picker",
    "image-compressor",
  ];

  const toolUrls = tools.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/about`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/contact`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/privacy-policy`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${baseUrl}/terms`, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return [...staticPages, ...toolUrls];
}
