import React, { useEffect, useState } from "react";
import styles from "../../pages/vehicles/styles.module.scss";

import { api } from "../../services/api";

import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

import { toast } from "react-toastify";

export type ListVeiclesProps = {
  id: string;
  name: string;
  user_id: string;
  description: string;
  plate: string;
  isFavorite: boolean;
  year: number;
  color: string;
  price: number;
};

export interface VeichlesProps {
  veicles: ListVeiclesProps[];
}

export default function CardVehicle({ veicles }: VeichlesProps) {
  const [veichlesList, setVeichlesList] = useState(veicles || []);

  useEffect(() => {
    api.get("/api/vehicles/all").then((response) => {
      setVeichlesList(response.data);
    });
  }, []);

  async function handleFavorite(id: string) {
    try {
      await api.put(`/api/vehicles/favorite/${id}`);

      toast.success("Gostou");

      const response = await api.get("/api/vehicles/all");
      setVeichlesList(response.data);
    } catch (error) {
      console.log("Não foi possível executar essa ação");
    }
  }

  async function handleNoFavorite(id: string) {
    try {
      await api.put(`/api/vehicles/nofavorite/${id}`);

      toast.success("Removido de favoritos");

      const response = await api.get("/api/vehicles/all");
      setVeichlesList(response.data);
    } catch (error) {
      console.log("Não foi possível executar essa ação");
    }
  }

  return (
    <div className={styles.container}>
      {veichlesList.map((item) => (
        <div
          key={item.id}
          style={{ background: item.color }}
          className={styles.card}
        >
          <div className={styles.config}>
            {item.isFavorite ? (
              <>
                <button
                  onClick={() => handleNoFavorite(item.id)}
                  className={styles.button}
                >
                  <FcLike size={28} color="#FF0000" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleFavorite(item.id)}
                  className={styles.button}
                >
                  <FaRegHeart size={22} color="#FFFFFF" />
                </button>
              </>
            )}
          </div>
          <span>{item.name}</span>
          <p>Preço: {item.price}</p>
          <p>Descrição: {item.description}</p>
          <p>Ano: {item.year}</p>
          <p>Cor: {item.color}</p>
        </div>
      ))}

      {veichlesList.length === 0 && <p>Carregando...</p>}
    </div>
  );
}
