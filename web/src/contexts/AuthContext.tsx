import { createContext, ReactNode, useEffect, useState } from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { toast } from 'react-toastify';

import {api} from '../services/api'

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
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

type SignUpProps = {
  name: string;
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

    toast.success('Usuário desconectado')

    Router.push('/')
  } catch (error) {
    console.log("Error")
  }
}

export function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  // Permanecendo Login
  useEffect(() => {
    const { "@corelab.token": token } = parseCookies();

    if (token) {
      api.get('/api/users/details').then((response) => {
        const { id, name, email } = response.data

        setUser({
          id, name, email
        })
      }).catch(() => {
        signOut()
      })
    }
  }, [])
  
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

      // Passar o token para novas requisições
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      toast.success('Usuário autenticado')

      Router.push("/vehicles")
      
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  async function signUp({name, email, password}: SignUpProps) {
    try {

      await api.post('/api/users/register', {
        name, email, password
      })

      toast.success('Conta criada')

      Router.push("/")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <AuthContext.Provider value={{user, isAuthenticated, signIn, signUp, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

