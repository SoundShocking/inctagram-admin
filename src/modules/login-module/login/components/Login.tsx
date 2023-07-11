import React from 'react'

import { FormLayout } from '@/components/form-layout'
import { LoginForm } from '@/modules/login-module/login'
import { NameTitle } from '@/ui'

export const Login = ({}) => {
  return (
    <FormLayout className="mt-[60px]">
      <NameTitle
        nameTitle={'Sign In'}
        className={'font-bold text-light-100 text-xl leading-9 mb-[12px]'}
      />
      <LoginForm />
    </FormLayout>
  )
}
