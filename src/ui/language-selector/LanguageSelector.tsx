import React, { useState } from 'react'

import { StaticImageData } from 'next/image'
import { useTranslation } from 'react-i18next'

import be from '@/assets/icons/flags/be.png'
import en from '@/assets/icons/flags/en.png'
import ru from '@/assets/icons/flags/ru.png'
import ukraine from '@/assets/icons/flags/ukraine.png'
import wookie from '@/assets/icons/flags/wookie.png'
import { ImageOption } from '@/ui/image-selector/image-option/ImageOption'
import { ImageSelector } from '@/ui/image-selector/ImageSelector'

type LanguageType = {
  language: string
  text: string
  image: string | StaticImageData
}

const languages: LanguageType[] = [
  { language: 'en', text: 'English', image: en },
  { language: 'ru', text: 'Русский', image: ru },
  { language: 'uk', text: 'Українська', image: ukraine },
  { language: 'be', text: 'Беларуская', image: be },
  { language: 'wookie', text: 'Wookie', image: wookie },
]

const defaultLanguage = languages[0].text
const defaultFlag = languages[0].image

export const LanguageSelector = () => {
  const { t, i18n } = useTranslation()

  // const [language, setLanguage] = useState(`${defaultLanguage} ᐯ`)
  const [language, setLanguage] = useState(defaultLanguage)
  const [flag, setFlag] = useState(defaultFlag)
  const [isOpen, setIsOpen] = useState(false)

  const onDropdownClick = () => {
    setIsOpen(!isOpen)
  }
  const onLanguageClick = ({ language, text, image }: LanguageType) => {
    i18n.changeLanguage(language)
    setLanguage(text)
    setFlag(image)
    setIsOpen(false)
  }

  return (
    <ImageSelector
      isOpen={isOpen}
      setIsOpen={onDropdownClick}
      chosenImage={flag}
      chosenText={language}
    >
      {languages.map(({ text, language, image }) => {
        return (
          <ImageOption
            key={language}
            text={text}
            imgSrc={image}
            onOptionClick={() => onLanguageClick({ text, language, image })}
          />
        )
      })}
    </ImageSelector>
  )
}
