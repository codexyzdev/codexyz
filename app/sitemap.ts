import { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE.URL

    // Only include canonical, indexable URLs (no hash fragments — search engines don't index them as separate pages)
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
    ]
}
