import React, { useState } from 'react'
import Head from 'next/head'
import { SSRAuth } from '../../utils/SSRAuth'

import styles from './styles.module.scss'

// Components
import Header from '../../components/Header'

import { apiConfig } from '../../services/apiConfig'

type ListVeiclesProps = {
  id: string;
	name: string
	user_id: string;
  description: string;
	plate: string
	isFavorite: boolean;
	year: number
  color: string;
  price: number;
}

interface VeichlesProps{
  veicles: ListVeiclesProps[];
}

export default function Vehicles({ veicles }: VeichlesProps) {
  const [veichlesList, setVeichlesList] = useState(veicles || [])

  return (
    <>
      <Head>
        <title>Corelab - Dashboard</title>
      </Head>

      <Header />

      <h1 className={styles.title}>Meus anúncios</h1>

      <div className={styles.container}>
        
        {veichlesList.map((item) => (
          <div key={item.id} className={styles.card}>
            <span>{ item.name }</span>
            <p>Preço: { item.price }</p>
            <p>Descrição: { item.description }</p>
            <p>Ano: { item.year }</p>
            <p>Cor: { item.color }</p>
          </div>
        ))}

      </div>
    </>
  )
}

export const getServerSideProps = SSRAuth(async (ctx) => {
  const api = apiConfig(ctx)

  const response = await api.get("/api/vehicles/get");

  return {
    props: {
      veicles: response.data
    }
  }
})
