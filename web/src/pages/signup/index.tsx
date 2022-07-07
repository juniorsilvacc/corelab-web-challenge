import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify';
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'

// Components
import Button from '../../components/Button'
import Input from '../../components/Input'

import Link from 'next/link'

export default function Signup() {
  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSignup(e: FormEvent) {
    e.preventDefault()

    if (name === '' || email === '' || password === '') {
      return toast.warning("Preencha todos os campos")
    }

    setLoading(true)

    let data = {
      name,
      email,
      password
    }

    await signUp(data)

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Corelab - Cadastrar</title>
      </Head>

      <div className={styles.container}>
        

        <div className={styles.login}>
          <h1>Cadastre-se</h1>

          <form onSubmit={handleSignup}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              Cadastrar
            </Button>
          </form>

          <p>Já tem conta? <Link href="/"><a>Acessar</a></Link></p>
        </div>
      </div>
    </>
  )
}