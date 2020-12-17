import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import { css } from "@emotion/css";
import Input from "../../src/components/Input";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import axios from "axios";
import Link from "next/link";

const Rental = ({ user }) => {
  const router = useRouter();
  const [bookCode, setBookCode] = useState({
    code: "",
    status: 0,
  });
  const [rentalList, setRentalList] = useState([]);

  const removeRental = (index) => {
    setRentalList((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };
  if (!user) return <div>login required</div>;
  return (
    <Container>
      <div css={tw`max-w-screen-lg mx-auto`}>
        <Row css={tw`flex content-center mb-4`}>
          <Link href={"/kiosk"}>
            <img css={tw`mx-auto`} src={"/img/logo3@2x.png"} />
          </Link>
        </Row>
        <Row>
          <Col>
            <h1 css={tw`mx-auto text-4xl`}>📚대여! - 바코드를 입력해주세요!</h1>
            <Input
              placeholder={"바코드를 입력해주세요!"}
              icon={"📋"}
              value={bookCode.code}
              onChange={(v) => {
                setBookCode((prev) => {
                  return { ...prev, code: v };
                });
              }}
              onSubmit={() => {
                if (bookCode.code.trim() != "") {
                  setRentalList((prev) => [...prev, bookCode]);
                  setBookCode({
                    code: "",
                    status: 0,
                  });
                }
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup flush>
              {rentalList.map((book, index) => (
                <ListGroupItem key={`rental_code_${index}`} css={tw`flex`}>
                  <h4 css={tw`w-full`}>{book.code}</h4>
                  <Button close onClick={() => removeRental(index)} />
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <Row css={tw`flex content-center`}>
              <h1 css={tw`mx-auto`}>{user.intra_id}</h1>
            </Row>
            <Row css={tw`flex content-center`}>
              <div css={tw`flex mx-auto`}>
                <img
                  css={tw`rounded-full`}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "240px",
                    maxHeight: "240px",
                  }}
                  src={`https://cdn.intra.42.fr/users/medium_${user.intra_id}.jpg`}
                />
              </div>
            </Row>
            <Row css={tw`flex content-center mt-12`}>
              <Button
                color="secondary"
                size="lg"
                block
                onClick={async () => {
                  if (rentalList.length == 0)
                    alert("대여할 항목을 스캔 해주세요.");
                  else if (confirm("대여 하시겠습니까?")) {
                    const rentalListCode = rentalList.map((book) => {
                      return book.code;
                    });
                    const { data } = await axios.post(
                      `/api/rental`,
                      {
                        rentalList: rentalListCode,
                      },
                      {
                        withCredentials: true,
                      }
                    );
                    if (data.ok) {
                      let result = "";
                      console.log(data);
                      data.BookInfo.map((book) => {
                        result += `${book.book_id} : ${
                          book.ok ? "대여 성공" : "대여 실패"
                        }\n`;
                      });
                      alert(result);
                      router.push("/logout");
                      // setRentalList((prev) => {
                      //   const result = prev.map((book) => {
                      //     const index = data.BookInfo.findIndex({
                      //       book_id: book.code,
                      //     });
                      //     return {
                      //       ...prev,
                      //       status: data.BookInfo[index] ? 1 : 2,
                      //     };
                      //   });
                      // });
                    } else {
                      alert("로그인을 해주세요.");
                      router.push("/login");
                    }
                  }
                }}
              >
                대여
              </Button>
            </Row>
          </Col>
        </Row>
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

export default Rental;
