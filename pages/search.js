import { useEffect, useState } from "react";
import Link from "next/link";
import tw from "twin.macro";
import { css } from "@emotion/css";
import Header from "../src/components/Header";
import { array } from "prop-types";
import useRequest from "../src/lib/useRequest";

const SearchPage = ({ user }) => {
  const { data, error } = useRequest(`/api/search?q=`);
  console.log(data);
  return (
    <div>
      <Header user={user} />
      {data ? (
        Array.isArray(data.bookList) &&
        data.bookList.map((book, index) => (
          <div key={`book_key_${index}`} style={{ padding: "10px" }}>
            <p>{book.name}</p>
            <p>{book.author}</p>
            <p>{book.publisher}</p>
          </div>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  if (req.user) return { props: { user: req.user } };
  return { props: { user: null } };
};

export default SearchPage;
