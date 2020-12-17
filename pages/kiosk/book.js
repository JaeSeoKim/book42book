import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import useRequest from "../../src/lib/useRequest";
import Link from "next/link";
import { Button, Container, Jumbotron, Table } from "reactstrap";

const checkStatus = (status) => {
  switch (status) {
    case 0:
      return "대출 가능";
    case 1:
      return "대출 중";
    case 2:
      return "분실";
    case 3:
      return "파손";
    default:
      return "사서에게 문의";
  }
};

const getReturnDate = (rental_date) => {
  rental_date = Date.parse(rental_date);
  rental_date = new Date(rental_date);
  rental_date.setDate(rental_date.getDate() + 7);
  var dd = rental_date.getDate();
  var mm = rental_date.getMonth();
  var y = rental_date.getFullYear();
  return `${y}-${mm}-${dd}`;
};

const search = ({ id, user }) => {
  const router = useRouter();
  const { data, error } = useRequest(`/api/book?id=${id}`);
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
              <h1>제목 : {data.BookInfo.name}</h1>
              <h2 css={tw`flex space-x-4`}>
                <span>저자 : {data.BookInfo.author}</span>
                <span>출판사 : {data.BookInfo.publisher}</span>
                {user && (
                  <Button
                    onClick={() => {
                      router.push("/add_book?id=" + data.BookInfo._id);
                    }}
                  >
                    재고 추가
                  </Button>
                )}
              </h2>
              <hr />
              <Table hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>바코드</th>
                    <th>상태</th>
                    <th>대여가능 예상날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {data.BookInfo.book.map((book, index) => (
                    <tr key={index}>
                      <th scope="row">{index}</th>
                      <td>{book.book_id}</td>
                      <td>{checkStatus(book.status)}</td>

                      <td>
                        {book.status == 1 && getReturnDate(book.rental_date)}
                        {book.status == 0 && "지금 당장 집현전으로 달려가세요!"}
                      </td>
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
  const { id } = req.query;
  const { user } = req;

  return { props: { id: id || "", user: user || null } };
};

export default search;
