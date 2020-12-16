import { useEffect, useState } from "react";
import Link from "next/link";
import tw from "twin.macro";
import { css } from "@emotion/css";
import Header from "../src/components/Header";
import Search from "../src/components/Search";
import Objbook from "../src/components/Objbook";
import Checkbtn from "../src/components/Checkbtn";

const Home = ({ user }) => {
  return (
    <div>
      <Header user={user} />
      <Objbook name={"bookname"}/>
      {/* <Checkbtn status={"대출"}/> */}
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  if (req.user) return { props: { user: req.user } };
  return { props: { user: null } };
};

export default Home;
