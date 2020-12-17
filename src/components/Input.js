import Link from "next/link";
import React from "react";
import tw from "twin.macro";

const Search = ({ value, onChange, onSubmit, placeholder, icon }) => {
  return (
    <div css={tw`max-w-screen-lg w-full mx-auto`}>
      <div css={tw`flex bg-gray-300 bg-opacity-50 rounded-lg text-2xl p-2 m-2 my-4`}>
        <input
          value={value}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              onSubmit();
            }
          }}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          css={tw`w-full bg-transparent mx-auto`}
          placeholder={placeholder}
        />
        <button onClick={onSubmit}>{icon}</button>
      </div>
    </div>
  );
};

export default Search;
