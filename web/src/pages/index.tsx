import Head from 'next/head'
import styles from '../styles/Home.module.scss'

// Components
import Button from '../components/Button'
import Input from '../components/Input'

import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Corelab - Login</title>
      </Head>

      <div className={styles.container}>
        

        <div className={styles.login}>
          <h1>Corelab Web</h1>

          <form>
            <Input
              placeholder="Digite seu e-mail"
              type="text"
            />

             <Input
              placeholder="Digite sua senha"
              type="password"
            />

            <Button
              type="submit"
              Loading={false}
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