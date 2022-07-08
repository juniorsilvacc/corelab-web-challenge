import Head from "next/head";
import Header from "../components/Header";

import styles from "../styles/Home.module.scss";
import CardVehicle from "../components/CardVehicle";

export default function Home({ veicles }) {
  return (
    <>
      <Head>
        <title>Corelab</title>
      </Head>

      <Header />

      <h1 className={styles.title}>Todos os anúncios</h1>

      <CardVehicle veicles={veicles} />
    </>
  );
}
