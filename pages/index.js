import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import tw from "twin.macro";
import {css} from "@emotion/css";
const Test = () => {
  return (
    <div
      css={css`
        color: red;
      `}
    >
      test
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <Test />
    </div>
  );
}
