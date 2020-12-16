import { useEffect, useState } from "react";
import Link from "next/link";
import tw from "twin.macro";
import { css } from "@emotion/css";
import axios from "axios";

const Rental = ({ user }) => {
  const [bookCode, setBookCode] = useState("");
  const [rentalList, setRentalList] = useState([]);
  console.log(rentalList, bookCode);

  const removeRental = (index) => {
    setRentalList((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };
  return (
    <>
      <h1 css={tw`text-4xl`}>📚대여!</h1>
      <div>
        책 바코드를 입려해주세요!{" "}
        <input
          css={tw`border`}
          value={bookCode}
          onChange={(e) => setBookCode(e.target.value)}
        />
        <button
          onClick={() => {
            if (bookCode.trim() != "") {
              setRentalList((prev) => [...prev, bookCode]);
              setBookCode("");
            }
          }}
        >
          추가!
        </button>
      </div>
      <div>
        {rentalList.map((code, index) => (
          <div key={`rental_code_${index}`} css={tw`flex`}>
            <h2>{code}</h2>
            <button onClick={() => removeRental(index)}>지우기!</button>
          </div>
        ))}
      </div>
      <button
        onClick={async () => {
          if (rentalList.length == 0) alert("반납할 항목을 스캔 해주세요.");
          else if (confirm("반납 하시겠습니까?")) {
            const data = await axios.delete(`/api/rental`, {
              data: {
                rentalList,
              },
              withCredentials: true,
            });
            console.log(data);
          } else {
            const data = await axios.post(
              `/api/rental`,
              { rentalList },
              {
                withCredentials: true,
              }
            );
            console.log(data);
          }
        }}
      >
        반납!
      </button>
    </>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  if (req.user) return { props: { user: req.user } };
  res.statusCode = 302;
  res.setHeader("Location", `/login?path=${encodeURI(req.path)}`);
  return { props: {} };
};

export default Rental;
