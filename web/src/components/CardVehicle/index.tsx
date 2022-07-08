import React, { useEffect, useState } from 'react'
import styles from '../../pages/vehicles/styles.module.scss'

import {api} from '../../services/api'

export type ListVeiclesProps = {
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

export interface VeichlesProps{
  veicles: ListVeiclesProps[];
}

export default function CardVehicle({ veicles }: VeichlesProps) {
  const [veichlesList, setVeichlesList] = useState(veicles || [])

  useEffect(() => {
    api.get("/api/vehicles/all").then((response) => {
      setVeichlesList(response.data)
    });
  }, []);

  return (
    <div className={styles.container}>
      {veichlesList.map((item) => (
        <div key={item.id} style={{background: item.color}} className={styles.card}>
          <span>{ item.name }</span>
          <p>Preço: { item.price }</p>
          <p>Descrição: { item.description }</p>
          <p>Ano: { item.year }</p>
          <p>Cor: { item.color }</p>
        </div>
      ))}

      {veichlesList.length === 0 && (
        <p>Carregando...</p>
      )}
    </div>
  )
}