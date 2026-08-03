import { MetadataRoute } from 'next';

const LANGUAGES = ["english", "urdu", "roman-urdu", "hindi", "roman-hindi", "german"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nayafix.me';
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
  ];

  for (const source of LANGUAGES) {
    for (const target of LANGUAGES) {
      if (source !== target) {
        routes.push({
          url: `${baseUrl}/translation/${source}-to-${target}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      }
    }
  }

  return routes;
}
