import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import { css } from "@emotion/css";
import {
  Container,
  Row,
  Button,
  ListGroup,
  ListGroupItem,
  Input,
} from "reactstrap";
import axios from "axios";
import Axios from "axios";
import Link from "next/link";

const Rental = ({ user, id }) => {
  const router = useRouter();
  const [newbook, setNewbook] = useState({
    book_id: "",
    donater: "",
  });

  useEffect(() => {
    if (!id) {
      router.push("/kiosk");
    }
  }, []);

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
          <h1 css={tw`mx-auto text-4xl`}>📚 책 재고 추가!</h1>
          <Input
            placeholder={"바코드 입력해주세요"}
            value={newbook.book_id}
            onChange={(e) => {
              setNewbook((prev) => {
                return {
                  ...prev,
                  book_id: e.target.value,
                };
              });
            }}
          />
        </Row>
        <Row>
          <Input
            placeholder={"기부자"}
            value={newbook.donater}
            onChange={(e) => {
              setNewbook((prev) => {
                return {
                  ...prev,
                  donater: e.target.value,
                };
              });
            }}
          />
        </Row>
        <Row>
          <Button
            onClick={async () => {
              const { data } = await Axios.put(
                "/api/book",
                {
                  ...newbook,
                  bookinfo_id: id,
                },
                {
                  withCredentials: true,
                }
              );
              if (data.ok) {
                router.push("/kiosk/book?id=" + id);
              }
            }}
          >
            책 추가!
          </Button>
        </Row>
      </div>
    </Container>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  if (req.user) return { props: { user: req.user, id: req.query.id } };
  res.statusCode = 302;
  res.setHeader("Location", `/login`);
  return { props: { user: null } };
};

export default Rental;
