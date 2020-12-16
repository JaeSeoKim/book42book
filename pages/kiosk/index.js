import { useEffect, useState } from "react";
import Link from "next/link";
import tw from "twin.macro";
import { css } from "@emotion/css";
import Search from "../../src/components/Search";

const Home = ({ user }) => {
  return (
    <div css={tw`w-full h-full`}>
      <Search />
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  if (req.user) return { props: { user: req.user } };
  return { props: { user: null } };
};

export default Home;
