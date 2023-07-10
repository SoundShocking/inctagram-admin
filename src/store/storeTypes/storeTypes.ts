import React from 'react'

export interface State {
  auth: boolean
  loading: boolean
}

export interface Action {
  type: string
  payload?: any
}

export interface AuthContextType {
  auth: boolean
  loading: boolean
  login: (auth: boolean) => void
  logout: () => void
  setLoading: (loading: boolean) => void
}

export const initialState: State = {
  auth: false,
  loading: false,
}

export interface AuthProviderType {
  children: React.ReactNode
  [key: string]: any
}
