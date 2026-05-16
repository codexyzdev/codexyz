"use client"
import { texts, Lang } from "@/lib/texts"
import { useCallback, useState } from "react"
import { isValidEmail } from "@/lib/utils"
import { CONTACT } from "@/lib/constants"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/ScrollReveal"
import { Mail, MessageCircle, ArrowRight } from "lucide-react"
import { analytics } from "@/lib/analytics"

type ContactProps = {
  lang: Lang
  id?: string
}

type FormErrors = {
  name?: string
  email?: string
  message?: string
}

export default function Contact({ lang, id }: ContactProps) {
  const t = texts[lang]
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const waNumber = CONTACT.WHATSAPP.replace(/\D/g, "")
  const waText = encodeURIComponent(CONTACT.WHATSAPP_MESSAGE[lang])
  const waUrl = `https://wa.me/${waNumber}?text=${waText}`

  const validateField = useCallback((name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        return value.trim().length === 0 ? t.required : undefined
      case "email":
        if (value.trim().length === 0) return t.required
        return !isValidEmail(value) ? t.invalidEmail : undefined
      case "message":
        if (value.trim().length === 0) return t.required
        return value.trim().length < 10 ? t.messageTooShort : undefined
      default:
        return undefined
    }
  }, [t])

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched(prev => new Set(prev).add(name))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (touched.has(name)) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = (fd.get("name")?.toString() ?? "").trim()
    const email = (fd.get("email")?.toString() ?? "").trim()
    const message = (fd.get("message")?.toString() ?? "").trim()

    const newErrors: FormErrors = {}
    newErrors.name = validateField("name", name)
    newErrors.email = validateField("email", email)
    newErrors.message = validateField("message", message)

    if (newErrors.name || newErrors.email || newErrors.message) {
      setErrors(newErrors)
      setTouched(new Set(["name", "email", "message"]))
      return
    }

    const subject = lang === "en"
      ? `Portfolio Inquiry: ${name}`
      : `Contacto Portafolio: ${name}`

    const bodyContent = lang === "en"
      ? `Hi Alejandro,\n\n${name} (${email}) wants to discuss a project.\n\n${message}`
      : `Hola Alejandro,\n\n${name} (${email}) quiere conversar sobre un proyecto.\n\n${message}`

    const params = new URLSearchParams()
    params.set("subject", subject)
    params.set("body", bodyContent.trim())

    const queryString = params.toString().replace(/\+/g, "%20")

    analytics.contactFormSubmit()
    window.location.href = `mailto:${CONTACT.EMAIL}?${queryString}`
  }, [lang, validateField])

  return (
    <section id={id} className="section-padding">
      <div className="max-w-xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-sm font-medium text-primary mb-4">
            {t.contact}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            {t.contactSub}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t.contactDesc}
          </p>
        </ScrollReveal>

        <ScrollReveal delayMs={100}>
          <form className="mt-10 space-y-5" onSubmit={onSubmit} noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                {t.name} <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                className={`h-12 rounded-xl ${errors.name && touched.has("name") ? "border-destructive focus-visible:ring-destructive" : ""}`}
                placeholder={lang === "en" ? "Your name" : "Tu nombre"}
                required
                aria-required="true"
                aria-invalid={errors.name && touched.has("name") ? "true" : "false"}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.name && touched.has("name") && (
                <p className="mt-1.5 text-sm text-destructive" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                {t.email} <span className="text-destructive">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                className={`h-12 rounded-xl ${errors.email && touched.has("email") ? "border-destructive focus-visible:ring-destructive" : ""}`}
                placeholder="youremail@gmail.com"
                required
                aria-required="true"
                aria-invalid={errors.email && touched.has("email") ? "true" : "false"}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.email && touched.has("email") && (
                <p className="mt-1.5 text-sm text-destructive" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                {t.message} <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                className={`rounded-xl min-h-[140px] ${errors.message && touched.has("message") ? "border-destructive focus-visible:ring-destructive" : ""}`}
                placeholder={lang === "en" ? "Tell me about your project" : "Cuéntame sobre tu proyecto"}
                required
                aria-required="true"
                aria-invalid={errors.message && touched.has("message") ? "true" : "false"}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.message && touched.has("message") && (
                <p className="mt-1.5 text-sm text-destructive" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl font-medium">
              {t.sendGmail}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </ScrollReveal>

        <ScrollReveal delayMs={200}>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href={`mailto:${CONTACT.EMAIL}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
            <span className="text-border">·</span>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
