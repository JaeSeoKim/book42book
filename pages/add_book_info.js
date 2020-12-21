import { useState } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import { Container, Row, Button, Input } from "reactstrap";
import Axios from "axios";
import Link from "next/link";

const Rental = ({ user }) => {
  const router = useRouter();
  const [newbook, setNewbook] = useState({
    name: "",
    author: "",
    publisher: "",
  });

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
          <h1 css={tw`mx-auto text-4xl`}>📚 책 추가!</h1>
          <Input
            placeholder={"책 제목"}
            value={newbook.name}
            onChange={(e) => {
              setNewbook((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              });
            }}
          />
        </Row>
        <Row>
          <Input
            placeholder={"저자"}
            value={newbook.author}
            onChange={(e) => {
              setNewbook((prev) => {
                return {
                  ...prev,
                  author: e.target.value,
                };
              });
            }}
          />
        </Row>
        <Row>
          <Input
            placeholder={"출판사"}
            value={newbook.publisher}
            onChange={(e) => {
              setNewbook((prev) => {
                return {
                  ...prev,
                  publisher: e.target.value,
                };
              });
            }}
          />
        </Row>
        <Row>
          <Button
            onClick={async () => {
              const { data } = await Axios.post(
                "/api/book",
                {
                  ...newbook,
                },
                {
                  withCredentials: true,
                }
              );
              console.log(data);
              if (data.ok) {
                router.push("/kiosk/book?id=" + data.BookInfo._id);
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
  if (req.user) return { props: { user: req.user } };
  res.statusCode = 302;
  res.setHeader("Location", `/login`);
  return { props: { user: null } };
};

export default Rental;
