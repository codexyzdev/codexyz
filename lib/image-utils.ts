import { IMAGE } from "./constants"

/**
 * Generates a blur data URL for image placeholders
 * This is a simple gray blur placeholder
 * For production, you might want to generate actual blur hashes
 */
export function getBlurDataURL(): string {
    return IMAGE.BLUR_DATA_URL
}

/**
 * Gets optimized image sizes for responsive images
 * @param type - Type of image (project, tech, etc.)
 * @returns Sizes string for Next.js Image component
 */
export function getImageSizes(type: "project" | "tech"): string {
    switch (type) {
        case "project":
            return IMAGE.SIZES.PROJECT_CARD
        case "tech":
            return IMAGE.SIZES.TECH_ICON
        default:
            return "100vw"
    }
}

/**
 * Image optimization configuration for Next.js Image component
 */
export const imageConfig = {
    quality: IMAGE.QUALITY,
    formats: ["image/webp"] as const,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}

/**
 * Validates if an image URL is external
 * @param url - Image URL to check
 * @returns true if external, false if local
 */
export function isExternalImage(url: string): boolean {
    return url.startsWith("http://") || url.startsWith("https://")
}
