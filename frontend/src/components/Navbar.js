import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Stack, Typography } from '@mui/material';

function Navbar ({profile}) {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push('/login');
  }

  return (
    <React.Fragment>
      <AppBar position='fixed' color="transparent" style={{ backgroundColor: 'white',  color: 'black'}}>
          <Toolbar>
              <Link href="/"><img src="icons/logo.svg" alt="Logo" height="30" /></Link>
              <Typography sx={{flexGrow:1}}></Typography>
                {profile && 
                <Stack direction='row' spacing={5}>
                    <Link href="/"><Typography variant='h6'>Home</Typography></Link>
                    <Link href="/myrides"><Typography variant='h6'>MyRides</Typography></Link>
                    <Link href="/profile"><Typography variant='h6'>Profile</Typography></Link>
                    <Link href="/login" onClick={logout}><Typography variant='h6'>Logout</Typography></Link>
                </Stack>
                }
                {!profile && 
                <Stack direction='row' spacing={5}>
                    <Link href="/login"><Typography variant='h6'>Login</Typography></Link>
                    <Link href="/signup"><Typography variant='h6'>Sign Up</Typography></Link>
                </Stack>
                }
          </Toolbar>
      </AppBar>
      <Toolbar />
      </React.Fragment>
  );
};

export default Navbar;