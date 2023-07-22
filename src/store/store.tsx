import React, { useReducer, createContext } from 'react'

import { toast } from 'react-toastify'

import {
  Action,
  AuthContextType,
  AuthProviderType,
  initialState,
  State,
} from '@/store/storeTypes/storeTypes'

const AuthContext = createContext<AuthContextType>({
  auth: false,
  loading: false,
  login: (auth: boolean) => {},
  logout: () => {},
  setLoading: (loading: boolean) => {},
})

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        auth: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        auth: false,
      }
    case 'LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}

const AuthProvider = ({ children, ...props }: AuthProviderType) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = (auth: boolean) => {
    dispatch({
      type: 'LOGIN',
      payload: auth,
    })
    toast.success('success')
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'LOADING', payload: loading })
  }

  return (
    <AuthContext.Provider
      value={{
        auth: state.auth,
        loading: state.loading,
        login,
        logout,
        setLoading,
      }}
      {...props}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
