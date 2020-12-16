import Link from "next/link";
import React from "react";
import tw from "twin.macro";

const Search = ({ value, onChange, onclick }) => {
  return (
    <div css={tw`w-full px-8`}>
      <div css={tw`flex bg-gray-100 shadow rounded text-3xl p-4`}>
        <input
          value={value}
          onChange={onChange}
          css={tw`w-full bg-gray-100 mx-auto`}
          placeholder={"검색어를 입력해주세요!"}
        />
        <button onClick={onclick}>🔎</button>
      </div>
    </div>
  );
};
// import React from 'react';
// import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// const Search = (props) => {
//   return (
//     <FormGroup>
//         <Label for="Search"></Label>
//         <Input
//           type="search"
//           name="search"
//           id="Search"
//           placeholder="도서 검색"
//         />
//       </FormGroup>
//   );
// }

export default Search;
