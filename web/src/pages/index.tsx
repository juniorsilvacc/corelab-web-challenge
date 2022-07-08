import Head from 'next/head';
import Header from '../components/Header';

import styles from '../styles/Home.module.scss';
import CardVeicle from '../components/CardVeicle';

export default function Home({ veicles }) {
  return (
     <>
      <Head>
        <title>Corelab</title>
      </Head>

      <Header />

      <h1 className={styles.title}>Todos os anúncios</h1>

      <CardVeicle
        veicles={veicles}
      />
    </>
  )
}
