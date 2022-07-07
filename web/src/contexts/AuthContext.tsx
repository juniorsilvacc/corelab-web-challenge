import { createContext, ReactNode, useState } from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import {api} from '../services/api'

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

// Função logout
export function signOut() {
  try {
    destroyCookie(undefined, '@corelab.token')
    Router.push('/')
  } catch (error) {
    console.log("Error")
  }
}

export function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;
  
  // Função login
  async function signIn({email, password}: SignInProps) {
    try {

      const response = await api.post('/api/users/login', {
        email, password
      })

      const { id, name, token } = response.data;
      
      setCookie(undefined, '@corelab.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/"
      })

      setUser({
        id,
        name,
        email,
      })

      // Passar para novas requisições o token
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push("/vehicles")
      
    } catch (error) {
      console.log('Error')
    }
  }

  return (
    <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

