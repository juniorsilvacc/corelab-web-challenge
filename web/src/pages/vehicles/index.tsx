import React, { useState } from "react";
import Head from "next/head";
import { SSRAuth } from "../../utils/SSRAuth";

import styles from "./styles.module.scss";
import { FiTrash2, FiEdit } from "react-icons/fi";

// Components
import Header from "../../components/Header";
import { IVeichlesProps } from "../../components/CardVehicle";

//Api
import { apiConfig } from "../../services/apiConfig";
import { api } from "../../services/api";
import { toast } from "react-toastify";

import Link from "next/link";

export default function Vehicles({ veicles }: IVeichlesProps) {
  const [veichlesList, setVeichlesList] = useState(veicles || []);

  async function handleRemove(id: string) {
    await api.delete(`/api/vehicles/remove/${id}`);

    toast.success("Veículo excluido");

    const response = await api.get("/api/vehicles/get");
    setVeichlesList(response.data);
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
          <div
            key={item.id}
            style={{ background: item.color }}
            className={styles.card}
          >
            <div className={styles.config}>
              <button onClick={() => handleRemove(item.id)}>
                <FiTrash2 size={20} color="#da1a29" />
              </button>
              <Link href={`/update/${item.id}`}>
                <button>
                  <FiEdit size={20} color="#f9d423" />
                </button>
              </Link>
            </div>
            <span>{item.name}</span>
            <p>Preço: {item.price}</p>
            <p>Descrição: {item.description}</p>
            <p>Ano: {item.year}</p>
            <p>Cor: {item.color}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export const getServerSideProps = SSRAuth(async (ctx) => {
  const api = apiConfig(ctx);

  const response = await api.get("/api/vehicles/get");

  return {
    props: {
      veicles: response.data,
    },
  };
});
