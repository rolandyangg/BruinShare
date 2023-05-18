import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

function Navbar (props, {user}) {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push('/login');
  }

  return (
    <div>
      <Button variant="contained">MaterialUI Test Button</Button>
        {props.profile && 
          <div>
            <Link href="/">HOME</Link>
            <br></br>
            <Link href="/profile">USER PROFILE</Link>
            <br></br>
            <Link href="/login" onClick={logout}>LOG OUT</Link>
          </div>
          }
          {!props.profile && 
          <div>
            <Link href="/login">LOGIN</Link>
            <br></br>
            <Link href="/signup">SIGN UP</Link>
            <br></br>
          </div>
          }
    </div>
  );
};

export default Navbar;