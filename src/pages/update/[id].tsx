import Head from "next/head";
import React, { FormEvent, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { SSRAuth } from "../../utils/SSRAuth";
import { toast } from "react-toastify";

import styles from "../vehicle/styles.module.scss";

// Component
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";

// API
import { api } from "../../services/api";

type VeiclesProps = {
  id: string;
  name: string;
  plate: string;
  color: string;
  year: number;
  price: number;
  description: string;
};

interface IVehicleProps {
  vehicleData: VeiclesProps | any;
}

export default function Update({ vehicleData }: IVehicleProps) {
  const [vehicle, setVehicle] = useState(vehicleData || {});

  function handleChange(e: any) {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  }

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    api.get(`/api/vehicles/show/${id}`).then((response) => {
      setVehicle(response.data);
    });
  }, [id]);

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    await api.patch(`/api/vehicles/update/${id}`, {
      ...vehicle,
    });

    toast.success("Veículo atualizado");

    setLoading(false);
    Router.push("/vehicles");
  }

  return (
    <>
      <Head>
        <title>Corelab - Atualizar Veículo</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <div className={styles.vehicle}>
          <h1>Atualizar</h1>

          <form onSubmit={handleUpdate}>
            <Input
              placeholder="Nome"
              type="text"
              id="name"
              name="name"
              value={vehicle.name || ""}
              onChange={handleChange}
            />

            <Input
              placeholder="Placa"
              type="text"
              id="plate"
              name="plate"
              value={vehicle.plate || ""}
              onChange={handleChange}
            />

            <Input
              placeholder="Cor"
              type="text"
              id="color"
              name="color"
              value={vehicle.color || ""}
              onChange={handleChange}
            />

            <Input
              placeholder="Ano"
              type="number"
              id="year"
              name="year"
              value={vehicle.year || ""}
              onChange={handleChange}
            />

            <Input
              placeholder="Preço"
              type="number"
              id="price"
              name="price"
              value={vehicle.price || ""}
              onChange={handleChange}
            />

            <Textarea
              placeholder="Descrição"
              id="description"
              name="description"
              value={vehicle.description || ""}
              onChange={handleChange}
            />

            <Button type="submit" Loading={loading}>
              Atualizar
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
