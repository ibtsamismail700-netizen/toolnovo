export default function sitemap() {
  const baseUrl = "https://toolnovo.net";

  const pages = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/tools/word-counter",
    "/tools/password-generator",
    "/tools/qr-code-generator",
    "/tools/case-converter",
    "/tools/lorem-ipsum-generator",
    "/tools/age-calculator",
    "/tools/json-formatter",
    "/tools/base64-encoder",
    "/tools/color-picker",
    "/tools/image-compressor",
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date().toISOString(),
  }));
}
