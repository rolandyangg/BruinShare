import React from "react";
import Link from "next/link";
import Button from '@mui/material/Button';

function Navbar () {
  return (
    <div>
        <Button variant="contained">MaterialUI Test Button</Button>
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