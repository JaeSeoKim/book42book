import Link from "next/link";
import React from "react";
import tw from "twin.macro";

const Header = ({ user }) => {
  return (
    <div css={tw`flex max-w-screen-xl mx-auto px-5`}>
      <img css={tw`static w-16`} src={"/img/flag_gun.svg"} />
      <div css={tw`flex w-full flex-row-reverse pt-5`}>
        {user ? (
          <div>
            <Link href={"/user"}>
              <span
                css={tw`text-xl text-gray-600 hover:text-gray-700 cursor-pointer px-2`}
              >
                {user.intra_id}
              </span>
            </Link>
            <Link a href={"/logout"}>
              <span
                css={tw`text-xl text-gray-600 hover:text-gray-700 cursor-pointer px-2`}
              >
                logout
              </span>
            </Link>
          </div>
        ) : (
          <Link href={"/login"}>
            <span
              css={tw`text-xl text-gray-600 hover:text-gray-700 cursor-pointer px-2`}
            >
              login
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
