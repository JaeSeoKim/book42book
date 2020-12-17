import { useEffect, useState } from "react";
import Link from "next/link";
import tw from "twin.macro";
import { useRouter } from "next/router";
import { css } from "@emotion/css";
import Header from "../../src/components/Header";
import Search from "../../src/components/Input";

import { Container, Row, Col, Button } from "reactstrap";

const Home = ({ user }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  return (
    <Container>
      <Header user={user} />
      <Row css={tw`flex content-center`}>
        <img css={tw`mx-auto`} src={"/img/logo3@2x.png"} />
      </Row>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Search
            value={query}
            onChange={(value) => setQuery(value)}
            onSubmit={() => {
              router.push("/kiosk/search?q=" + query);
            }}
            placeholder={"검색어를 입력해주세요~!"}
            icon={"🔎"}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Link href={"/kiosk/return"}>
            <Button color="secondary" size="lg" block>
              반납
            </Button>
          </Link>
        </Col>
        <Col>
          <Link href={"/kiosk/rent"}>
            <Button color="secondary" size="lg" block>
              대여
            </Button>
          </Link>
        </Col>
        {user && user.level >= 2 && (
          <Col>
            <Link href={"/add_book_info"}>
              <Button color="secondary" size="lg" block>
                책 추가
              </Button>
            </Link>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  if (req.user) return { props: { user: req.user } };
  return { props: { user: null } };
};

export default Home;
