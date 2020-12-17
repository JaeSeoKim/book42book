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

const Rental = () => {
  const router = useRouter();
  const [bookCode, setBookCode] = useState({
    code: "",
    status: 0,
  });
  const [returnList, setReturnList] = useState([]);

  const removeReturn = (index) => {
    setReturnList((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };
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
            <h1 css={tw`mx-auto text-4xl`}>📚반납! - 바코드를 입력해주세요!</h1>
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
                  setReturnList((prev) => [...prev, bookCode]);
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
            <Button
              color="secondary"
              size="lg"
              block
              onClick={async () => {
                if (returnList.length == 0)
                  alert("반납할 항목을 스캔 해주세요.");
                else if (confirm("반납 하시겠습니까?")) {
                  const returnListCode = returnList.map((book) => {
                    return book.code;
                  });
                  const { data } = await axios.delete(`/api/rental`, {
                    data: {
                      returnList: returnListCode,
                    },
                    withCredentials: true,
                  });
                  let result = "";
                  console.log(data);
                  data.BookInfo.map((book) => {
                    result += `${book.book_id} : ${
                      book.ok ? "반납 성공" : "반납 실패"
                    }\n`;
                  });
                  alert(result);
                  router.push("/kiosk");
                  // setReturnList((prev) => {
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
                }
              }}
            >
              반납
            </Button>
            <ListGroup flush>
              {returnList.map((book, index) => (
                <ListGroupItem key={`rental_code_${index}`} css={tw`flex`}>
                  <h4 css={tw`w-full`}>{book.code}</h4>
                  <Button close onClick={() => removeReturn(index)} />
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Rental;
