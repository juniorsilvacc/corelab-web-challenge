import Head from 'next/head';
import React from 'react'
import Header from '../components/Header';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
     <>
      <Head>
        <title>Corelab - Veículo </title>
      </Head>

      <Header />

      <div className={styles.container}>
        <h1>HOME VISITANTES Veículo </h1>
      </div>
    </>
  )
}
