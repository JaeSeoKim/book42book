import { useEffect, useState } from "react";
import Link from "next/link";
import tw from "twin.macro";
import { css } from "@emotion/css";
import Header from "../../src/components/Header";

const Home = ({ user }) => {
  return (
    <>
      <div css={tw`table w-full`}>
        <div css={tw`table-row-group`}>
          <div css={tw`table-row`}>
            <div css={tw`table-cell`}>A cell with more content</div>
            <div css={tw`table-cell`}>Cell 2</div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  if (req.user) return { props: { user: req.user } };
  return { props: { user: null } };
};

export default Home;
