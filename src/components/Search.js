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

export default Search;
