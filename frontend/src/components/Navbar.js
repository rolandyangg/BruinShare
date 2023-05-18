import React from "react";
import Link from "next/link";

function Navbar () {
  return (
    <div>
        <Link href="/">HOME</Link>
        <br></br>
        <Link href="/login">LOGIN</Link>
        <br></br>
        <Link href="/signup">SIGN UP</Link><br></br>
        <Link href="/profile">USER PROFILE</Link><br></br>
    </div>
  );
};

export default Navbar;