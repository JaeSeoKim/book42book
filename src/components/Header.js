import Link from "next/link";
import React from "react";

const Header = ({ user }) => {
  return (
    <header>
      {user ? (
        <div>
          <Link href={"/user"}>{user.intra_id}</Link>
          <a a href={"/logout"}>
            logout
          </a>
        </div>
      ) : (
        <a href={"/login"}>login</a>
      )}
    </header>
  );
};

export default Header;
