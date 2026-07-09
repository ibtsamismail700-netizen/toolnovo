import { MetadataRoute } from 'next'

const BASE_URL = 'https://toolnovo.net'

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    'word-counter',
    'password-generator',
    'qr-code-generator',
    'case-converter',
    'lorem-ipsum-generator',
    'age-calculator',
    'json-formatter',
    'base64-encoder',
    'color-picker',
    'image-compressor'
  ]

  const staticPages = [
    { url: '', priority: 1.0 },
    { url: '/about', priority: 0.7 },
    { url: '/contact', priority: 0.7 },
    { url: '/privacy-policy', priority: 0.3 },
    { url: '/terms', priority: 0.3 }
  ]

  const toolPages = tools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  const staticPagesSitemap = staticPages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: page.priority
  }))

  return [...staticPagesSitemap, ...toolPages]
}
