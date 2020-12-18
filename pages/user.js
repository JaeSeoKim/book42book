import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import useRequest from "../src/lib/useRequest";
import Link from "next/link";
import { Button, Container, Jumbotron, Table } from "reactstrap";

const getReturnDate = (rental_date) => {
  rental_date = Date.parse(rental_date);
  rental_date = new Date(rental_date);
  rental_date.setDate(rental_date.getDate() + 7);
  var dd = rental_date.getDate();
  var mm = rental_date.getMonth();
  var y = rental_date.getFullYear();
  return `${y}-${mm}-${dd}`;
};

const search = ({ user }) => {
  if (!user) return <>redirect...</>;
  const { data, error } = useRequest(`/api/user`);
  return (
    <Container>
      <div css={tw`max-w-screen-lg mx-auto`}>
        <div css={tw`flex content-center`}>
          <Link href={"/kiosk"}>
            <img css={tw`mx-auto`} src={"/img/logo3@2x.png"} />
          </Link>
        </div>
        <div css={tw`container mx-auto`}>
          {data ? (
            <div css={tw`mx-auto p-4`}>
              <h1>{data.user.intra_id}</h1>
              <hr />
              <Table hover>
                <thead>
                  <tr>
                    <th>#BookCode</th>
                    <th>책 제목</th>
                    <th>저자</th>
                    <th>출판사</th>
                    <th>반납대여일</th>
                  </tr>
                </thead>
                <tbody>
                  {data.user.rental_list.map((book, index) => (
                    <tr key={index}>
                      <th scope="row">{book.book_id}</th>
                      <td>{book.book_info.name}</td>
                      <td>{book.book_info.author}</td>
                      <td>{book.book_info.publisher}</td>
                      <td>{getReturnDate(book.rental_date)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </Container>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  if (req.user) return { props: { user: req.user } };
  res.statusCode = 302;
  res.setHeader("Location", `/login`);
  return { props: { user: null } };
};

export default search;
