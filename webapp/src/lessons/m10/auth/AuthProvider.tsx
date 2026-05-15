import React, { createContext, useContext, useMemo, useState, useCallback, useLayoutEffect } from 'react';

import * as authAPI from 'api/auth'
import { setAuthorizationHeader } from './axios-auth-token'

// type AuthState =
//   | {
//     type: "UNAUTHORIZED"
//   }
//   | {
//     type: "DEVICE_UNKNOWN"
//   }
//   | {
//     type: "AUTHORIZED"
//   }

const useAuthToken = () => {
  const [token, setToken] = useState<string>()
  const [error, setError] = useState<unknown>()

  const login = useCallback(async (username: string, password: string) => {
    try {
      setError(undefined)
      const { accessToken } = await authAPI.login({ username, password })
      setToken(accessToken)
    } catch (e: unknown) {
      setError(e)
    }
  }, [])

  // useEffect can't be used here, because effects are executed in child-first order.
  // In order to inject token before any child effects (which may contain api calls)
  // we have to use layout effects (which are executed in FIFO order).
  useLayoutEffect(() => {
    if (token){
      return setAuthorizationHeader(token)
    }
  }, [token])

  const logout = useCallback(async () => {
    await authAPI.logout()
    setToken(undefined)
  }, [])

  const isAuthenticated = Boolean(token)
  const auth = useMemo(() =>
    ({ token, error, isAuthenticated, login, logout }),
    [token, error, isAuthenticated, login, logout ]
  )

  return auth
}

type AuthContextValue = ReturnType<typeof useAuthToken>

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { children } = props

  const value = useAuthToken()

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error('Component beyond AuthContext!')
  }

  return ctx
}
