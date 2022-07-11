import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Head from "next/head";

// Components
import Header from "../../components/Header";
import styles from "./styles.module.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Textarea from "../../components/Textarea";

import { api } from "../../services/api";
import { SSRAuth } from "../../utils/SSRAuth";

export default function Vehicle() {
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleCreateVehicle(e: FormEvent) {
    e.preventDefault();

    if (
      name === "" ||
      plate === "" ||
      color === "" ||
      year === "" ||
      price === "" ||
      description === ""
    ) {
      return toast.warning("Preencha todos os campos");
    }

    setLoading(true);

    await api.post("/api/vehicles/create", {
      name,
      plate,
      color,
      year,
      price,
      description,
    });

    toast.success("Veículo cadastrado");

    setLoading(false);

    setName("");
    setPlate("");
    setColor("");
    setYear("");
    setPrice("");
    setDescription("");
  }

  return (
    <>
      <Head>
        <title>Corelab - Cadastrar Veículo</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <div className={styles.vehicle}>
          <h1>Cadastrar</h1>

          <form onSubmit={handleCreateVehicle}>
            <Input
              placeholder="Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Placa"
              type="text"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
            />

            <Input
              placeholder="Cor"
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />

            <Input
              placeholder="Ano"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />

            <Input
              placeholder="Preço"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <Textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button type="submit" Loading={loading}>
              Cadastrar
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = SSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
