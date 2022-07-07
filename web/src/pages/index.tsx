import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import {FormEvent, useContext, useState} from 'react';
import {AuthContext} from '../contexts/AuthContext'

// Components
import Button from '../components/Button'
import Input from '../components/Input'

import Link from "next/link";


export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  
  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (email === '' || password === '') {
      return;
    }

    setLoading(true)

    let data = {
      email,
      password
    }

    await signIn(data)

    setLoading(false)
  }
  
  return (
    <>
      <Head>
        <title>Corelab - Login</title>
      </Head>

      <div className={styles.container}>
        

        <div className={styles.login}>
          <h1>Corelab Web</h1>

          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu e-mail"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

             <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              Loading={loading}
            >
              Acessar
            </Button>
          </form>

          <p>Não tem conta? <Link href="/signup"><a>Cadastre-se</a></Link></p>
        </div>
      </div>
    </>
  )
}