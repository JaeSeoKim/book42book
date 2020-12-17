import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import useRequest from "../../src/lib/useRequest";
import Input from "../../src/components/Input";
import Link from "next/link";
import { Container } from "reactstrap";

const search = ({ search }) => {
  const router = useRouter();
  const { data, error } = useRequest(`/api/search?q=${search}`);
  const [query, setQuery] = useState(search);

  return (
    <Container>
      <div css={tw`max-w-screen-lg mx-auto`}>
        <Link href={"/kiosk"}>
          <img css={tw`mx-auto`} src={"/img/logo3@2x.png"} />
        </Link>
        <Input
          placeholder={"검색어를 입력해주세요~!"}
          icon={"🔎"}
          value={query}
          onChange={(value) => {
            setQuery(value);
          }}
          onSubmit={() => {
            router.push("/kiosk/search?q=" + query);
          }}
        />
        {data ? (
          Array.isArray(data.bookList) &&
          data.bookList.map((book, index) => (
            <Link href={`/kiosk/book?id=${book._id}`} key={`book_key_${index}`}>
              <div
                css={tw`transition duration-150 ease-in-out max-w-screen-lg mx-auto bg-white bg-opacity-30 hover:bg-opacity-50 rounded px-4 py-2 text-gray-700 hover:text-gray-900`}
              >
                <h1>{book.name}</h1>
                <p>
                  {book.author} - {book.publisher}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </Container>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  if (req.query.q) return { props: { search: req.query.q } };
  return { props: { search: "" } };
};

export default search;
