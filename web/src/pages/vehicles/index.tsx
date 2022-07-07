import React from 'react'
import Head from 'next/head'
import { SSRAuth } from '../../utils/SSRAuth'

import styles from './styles.module.scss'
import Header from '../../components/Header'

export default function Vehicles() {
  return (
    <>
      <Head>
        <title>Corelab - Veículo </title>
      </Head>

      <Header />

      <div className={styles.container}>
        <h1>Veículo </h1>
      </div>
    </>
  )
}

export const getServerSideProps = SSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
