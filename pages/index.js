import { useEffect, useState } from "react";
import Link from "next/link";
import tw from "twin.macro";
import { css } from "@emotion/css";
import Header from "../src/components/Header";

const Home = ({ user }) => {
  return (
    <div>
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  if (req.user) return { props: { user: req.user } };
  return { props: { user: null } };
};

export default Home;
