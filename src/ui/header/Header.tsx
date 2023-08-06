import React from 'react'

import { LanguageSwitcher } from '@/components'
import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/images/logo.png'
import { Container } from '@/components/container'

export const Header = () => {
  return (
    <header className="h-[60px] flex items-center text-white bg-dark-700 border-b border-dark-100">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <Link href={'/'} className="block">
              <Image src={logo} alt={'logo'} loading={'eager'} />
            </Link>
          </div>

          <LanguageSwitcher />
        </div>
      </Container>
    </header>
  )
}
