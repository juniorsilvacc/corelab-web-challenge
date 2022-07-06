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
        <h1>Corelab</h1>

        <div className={styles.login}>
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
        </div>
      </div>
    </>
  )
}