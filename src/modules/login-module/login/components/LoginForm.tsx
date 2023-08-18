import React, { useContext } from 'react'

import { useQuery } from '@apollo/client'
import Cookies from 'js-cookie'
import { FieldValues } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useGlobalForm } from '@/common'
import { useTranslation } from '@/components'
import { GET_DATA, loadingEffect, LoginEffect, schemaLogin } from '@/modules/login-module/login'
import { AuthContext } from '@/store/store'
import { GlobalButton, GlobalInput, InputWithEye, Preloader } from '@/ui'
export const LoginForm = () => {
  const { login, logout, setLoading, auth } = useContext(AuthContext)
  const { refetch, data, loading } = useQuery(GET_DATA, {
    fetchPolicy: 'no-cache',
  })

  const { t } = useTranslation()

  const { handleSubmit, register, errors, setCustomError } = useGlobalForm(schemaLogin)
  const handleFormSubmit = async ({ email, password }: FieldValues) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(`${email}:${password}`)

    // Преобразование байтового массива в строку
    const binaryString = Array.from(data)
      .map(byte => String.fromCharCode(byte))
      .join('')

    // Кодирование строки в base64
    const authorization = btoa(binaryString)

    refetch()
      .then()
      .catch(() => {
        toast.error('Bad request')
        setCustomError(
          'password',
          'The password or the email or Username are incorrect. Try again, please'
        )
      })
    Cookies.set('authToken', authorization)
  }

  LoginEffect({ data, login, logout })

  loadingEffect({ loading, setLoading })
  if (auth) return <Preloader />

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <form
          className="flex flex-col grow gap-[10px] pt-[22px]  pb-[18px] w-full"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <GlobalInput
            type="email"
            id="email"
            value="admin@admin.me"
            className="mb-2"
            placeholder={t.translation.login.email}
            label={t.translation.login.email}
            error={errors?.email?.message}
            {...register('email')}
          />
          <InputWithEye
            id="password"
            placeholder={t.translation.login.password}
            label={t.translation.login.password}
            error={errors?.password?.message}
            {...register('password')}
          />
          <GlobalButton className={'mt-10'} variant="default" type="submit">
            {t.translation.login.signIn}
          </GlobalButton>
        </form>
      )}
    </>
  )
}
