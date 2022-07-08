import React, { useState } from 'react'
import Head from 'next/head'
import { SSRAuth } from '../../utils/SSRAuth'

import styles from './styles.module.scss'
import { FiX } from 'react-icons/fi';

// Components
import Header from '../../components/Header'
import { VeichlesProps } from '../../components/CardVehicle';

//Api
import { apiConfig } from '../../services/apiConfig'
import { api } from '../../services/api';
import { toast } from 'react-toastify';

export default function Vehicles({ veicles }: VeichlesProps) {
  const [veichlesList, setVeichlesList] = useState(veicles || [])

  async function handleRemove(id: string) {
    await api.delete(`/api/vehicles/remove/${id}`)

    toast.success("Veículo excluido");

    const response = await api.get("/api/vehicles/get")
    setVeichlesList(response.data)
  }

  return (
    <>
      <Head>
        <title>Corelab - Dashboard</title>
      </Head>

      <Header />

      <h1 className={styles.title}>Meus anúncios</h1>

      <div className={styles.container}>
        
        {veichlesList.map((item) => (
          <div key={item.id} style={{background: item.color}} className={styles.card}>
            <div className={styles.config}>
              <button onClick={() => handleRemove(item.id)}>
                <FiX size={22} color='#EA1D2C' />
              </button>
            </div>
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
