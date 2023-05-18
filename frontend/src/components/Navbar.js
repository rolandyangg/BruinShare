import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Stack, Typography } from '@mui/material';

function Navbar (props, {user}) {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push('/login');
  }

  return (
    <>
      <AppBar position='static' color="transparent" style={{ backgroundColor: 'transparent' }}>
          <Toolbar >
              <Link href="/"><img src="icons/logo.svg" alt="Logo" height="30" /></Link>
              <Typography sx={{flexGrow:1}}></Typography>
              <Stack direction='row' spacing={5}>
                  <Link href="/"><Typography variant='h6'>Home</Typography></Link>
                  <Link href="/"><Typography variant='h6'>MyRides</Typography></Link>
                  <Link href="/"><Typography variant='h6'>Profile</Typography></Link>
                  <Link href="/"><Typography variant='h6'>Logout</Typography></Link>
              </Stack>
          </Toolbar>
      </AppBar>
    </>
    // <div>
    //   <Button variant="contained">MaterialUI Test Button</Button>
    //   <Typography>Test</Typography>
    //     {props.profile && 
    //       <div>
    //         <Link href="/">HOME</Link>
    //         <br></br>
    //         <Link href="/profile">USER PROFILE</Link>
    //         <br></br>
    //         <Link href="/login" onClick={logout}>LOG OUT</Link>
    //       </div>
    //       }
    //       {!props.profile && 
    //       <div>
    //         <Link href="/login">LOGIN</Link>
    //         <br></br>
    //         <Link href="/signup">SIGN UP</Link>
    //         <br></br>
    //       </div>
    //       }
    // </div>
  );
};

export default Navbar;