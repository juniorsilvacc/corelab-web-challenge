import Head from 'next/head'
import styles from '../styles/Home.module.scss'

// Components
import Button from '../components/Button'
import Input from '../components/Input'

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

          <a>Não tem conta? <span>Cadastre-se</span></a>
        </div>
      </div>
    </>
  )
}