import { useRouter } from 'next/router'

import { en, LocaleType, ru, be, wookie, uk } from '@/components'

export const useTranslation = () => {
  const { locale, defaultLocale } = useRouter()

  const translations: Record<string, LocaleType> = {
    en,
    be,
    uk,
    wookie,
    ru,
  }

  const t: LocaleType = locale !== undefined ? translations[locale] : en

  return { t, locale, defaultLocale }
}
