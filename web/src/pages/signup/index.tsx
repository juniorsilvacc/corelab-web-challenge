import Head from 'next/head'
import styles from '../../styles/Home.module.scss'

// Components
import Button from '../../components/Button'
import Input from '../../components/Input'

import Link from 'next/link'

export default function Signup() {
  return (
    <>
      <Head>
        <title>Corelab - Cadastrar</title>
      </Head>

      <div className={styles.container}>
        

        <div className={styles.login}>
          <h1>Cadastre-se</h1>

          <form>
            <Input
              placeholder="Digite seu nome"
              type="password"
            />

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
              Cadastrar
            </Button>
          </form>

          <p>Já tem conta? <Link href="/"><a>Acessar</a></Link></p>
        </div>
      </div>
    </>
  )
}