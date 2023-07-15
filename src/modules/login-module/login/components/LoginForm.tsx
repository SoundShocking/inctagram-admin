import React, { useContext } from 'react'

import { useQuery } from '@apollo/client'
import { FieldValues } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useGlobalForm } from '@/common'
import { GET_DATA, loadingEffect, LoginEffect, schemaLogin } from '@/modules/login-module/login'
import { AuthContext } from '@/store/store'
import { GlobalButton, GlobalInput, InputWithEye, Preloader } from '@/ui'

export const LoginForm = () => {
  const { login, logout, setLoading, auth } = useContext(AuthContext)
  const { refetch, data, loading } = useQuery(GET_DATA, {
    fetchPolicy: 'no-cache',
  })
  const { handleSubmit, register, errors } = useGlobalForm(schemaLogin)
  const handleFormSubmit = async ({ email, password }: FieldValues) => {
    const authorization = btoa(email + ':' + password)

    refetch()
      .then()
      .catch(() => toast.error('Bad request'))
    localStorage.setItem('authorization', authorization)
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
            placeholder="Email"
            label="Email"
            error={errors?.email?.message}
            {...register('email')}
          />
          <InputWithEye
            label="Password"
            id="password"
            placeholder="Password"
            error={errors?.password?.message}
            {...register('password')}
          />
          <GlobalButton variant="default" type="submit">
            Sign In
          </GlobalButton>
        </form>
      )}
    </>
  )
}
