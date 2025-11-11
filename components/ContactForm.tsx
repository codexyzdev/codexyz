"use client"
import { texts, Lang } from "@/lib/texts"
import { useMemo } from "react"

type ContactFormProps = {
  lang: Lang
}

export default function ContactForm({ lang }: ContactFormProps) {
  const t = texts[lang]

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`${t.portfolio} - ${t.heroTitle}`)
    const body = encodeURIComponent("Hola Alejandro, me gustaría hablar sobre un proyecto.")
    return `mailto:alejandrobaez@example.com?subject=${subject}&body=${body}`
  }, [t])

  return (
    <section aria-labelledby="contact-title" className="mt-10">
      <h2 id="contact-title" className="text-xl md:text-2xl font-semibold mb-2">
        {t.contact}
      </h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        {t.contactDesc}
      </p>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          window.location.href = mailtoHref
        }}
      >
        <label className="flex flex-col gap-1">
          <span className="text-sm">{t.name}</span>
          <input
            type="text"
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2"
            placeholder={t.name}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm">{t.email}</span>
          <input
            type="email"
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2"
            placeholder={t.email}
          />
        </label>
        <label className="md:col-span-2 flex flex-col gap-1">
          <span className="text-sm">{t.message}</span>
          <textarea
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 min-h-[120px]"
            placeholder={t.message}
          />
        </label>
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition"
          >
            {t.sendGmail}
          </button>
        </div>
      </form>
    </section>
  )
}