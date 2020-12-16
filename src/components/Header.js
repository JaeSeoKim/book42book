import Link from "next/link";
import React from "react";

const Header = ({ user }) => {
  return (
    <header>
      {user ? (
        <div>
          <Link href={"/user"}>{user.intra_id}</Link>
          <Link a href={"/logout"}>
            logout
          </Link>
        </div>
      ) : (
        <Link href={"/login"}>login</Link>
      )}
    </header>
  );
};

export default Header;
