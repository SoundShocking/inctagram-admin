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
  postStatusBannedDeleted: false,
  setPostStatusBannedDeleted: () => {},
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
    case 'STATUS_BANNED_DELETED_POST':
      return {
        ...state,
        postStatusBannedDeleted: action.payload,
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

  const setPostStatusBannedDeleted = (status: boolean) => {
    dispatch({ type: 'STATUS_BANNED_DELETED_POST', payload: status })
  }

  return (
    <AuthContext.Provider
      value={{
        postStatusBannedDeleted: state.postStatusBannedDeleted,
        setPostStatusBannedDeleted,
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
