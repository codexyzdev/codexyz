/**
 * Analytics utilities for tracking user events
 * Prepared for future implementation with Google Analytics or similar
 */

export type AnalyticsEvent = {
    action: string
    category: string
    label?: string
    value?: number
}

/**
 * Tracks a custom event
 * Currently logs to console in development, ready for GA integration
 */
export function trackEvent({ action, category, label, value }: AnalyticsEvent): void {
    if (typeof window === "undefined") return

    // Development logging
    if (process.env.NODE_ENV === "development") {
        console.log("📊 Analytics Event:", { action, category, label, value })
    }

    // TODO: Integrate with Google Analytics
    // Example:
    // if (window.gtag) {
    //   window.gtag('event', action, {
    //     event_category: category,
    //     event_label: label,
    //     value: value,
    //   })
    // }
}

/**
 * Tracks page views
 */
export function trackPageView(url: string): void {
    if (typeof window === "undefined") return

    if (process.env.NODE_ENV === "development") {
        console.log("📄 Page View:", url)
    }

    // TODO: Integrate with Google Analytics
    // if (window.gtag) {
    //   window.gtag('config', 'GA_MEASUREMENT_ID', {
    //     page_path: url,
    //   })
    // }
}

/**
 * Common event trackers
 */
export const analytics = {
    projectClick: (projectName: string) => {
        trackEvent({
            action: "click",
            category: "Project",
            label: projectName,
        })
    },

    techClick: (techName: string) => {
        trackEvent({
            action: "click",
            category: "Technology",
            label: techName,
        })
    },

    contactFormSubmit: () => {
        trackEvent({
            action: "submit",
            category: "Contact Form",
        })
    },

    externalLinkClick: (url: string) => {
        trackEvent({
            action: "click",
            category: "External Link",
            label: url,
        })
    },

    languageToggle: (newLang: string) => {
        trackEvent({
            action: "toggle",
            category: "Language",
            label: newLang,
        })
    },

    themeToggle: (newTheme: string) => {
        trackEvent({
            action: "toggle",
            category: "Theme",
            label: newTheme,
        })
    },
}
