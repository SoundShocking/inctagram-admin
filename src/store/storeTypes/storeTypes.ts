import React from 'react'

export interface State {
  auth: boolean
  loading: boolean
  postStatusBannedDeleted: boolean
}

export interface Action {
  type: string
  payload?: any
}

export interface AuthContextType {
  auth: boolean
  loading: boolean
  postStatusBannedDeleted: boolean
  login: (auth: boolean) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  setPostStatusBannedDeleted: (status: boolean) => void
}

export const initialState: State = {
  auth: false,
  loading: false,
  postStatusBannedDeleted: false,
}

export interface AuthProviderType {
  children: React.ReactNode
  [key: string]: any
}
