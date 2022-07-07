import React, { useState } from 'react'
import Head from 'next/head';
import Header from '../../components/Header'
import styles from './styles.module.scss';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';

export default function Vehicle() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Head>
        <title>Corelab - Cadastrar Veículo </title>
      </Head>

      <Header />

      <main className={styles.container}>
        <div className={styles.vehicle}>
          <h1>Cadastrar</h1>

          <form>
            <Input
              placeholder="Nome"
              type="text"
            />

            <Input
              placeholder="Placa"
              type="text"
            />

            <Input
              placeholder="Cor"
              type="text"
            />

            <Input
              placeholder="Ano"
              type="text"
            />

            <Input
              placeholder="Preço"
              type="text"
            />

            <Textarea
              placeholder="Descrição"
            />

            <Button
              type="submit"
              Loading={loading}
            >
              Cadastrar
            </Button>
          </form>
        </div>
      </main>
    </>
  )
}
