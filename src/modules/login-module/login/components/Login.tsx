import React from 'react'

import { useTranslation } from 'react-i18next'

import { FormLayout } from '@/components/form-layout'
import { LoginForm } from '@/modules/login-module/login'
import { NameTitle } from '@/ui'

export const Login = ({}) => {
  const { t } = useTranslation()

  return (
    <FormLayout className="mt-[60px]">
      <NameTitle
        nameTitle={t('login.signIn')}
        className={'font-bold text-light-100 text-xl leading-9 mb-[12px]'}
      />
      <LoginForm />
    </FormLayout>
  )
}
