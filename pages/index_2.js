import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home = ({ user }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{user && <p>{user.intra_id}</p>}</h1>
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  if (req.user) return { props: { user: req.user } };
  return { props: { user: null } };
};

export default Home;
