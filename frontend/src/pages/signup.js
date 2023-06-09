import Link from "next/link";
import Image from "next/image";
import bcrypt from 'bcryptjs';
import * as api from "./api/api.js";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from "@/components/Navbar.js";
import { useRouter } from 'next/router';

export default function SignUp({profile}) {
  const router = useRouter();
  
  // Prevent access to signup page when logged in already
  if (profile)
      router.push('/posts')

  const handleSignup = (e) => {
    e.preventDefault();
    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;

    //check validity - duplicate username + ucla email
    api.getUsers().then((users) => {
      const duplicate = (users.data).filter((p) => p.data.username === username);
      if (duplicate.length !== 0) {
        alert("your username is taken! pick another one!")
      } else if (email && !email.includes("ucla.edu")) {
        alert("Please enter your UCLA email! ");
      }

      //if reached here, entered info is valid
      else {
        //hash chosen password
        bcrypt.hash(password, 10).then((hashedPassword) => {
          const data = {
            firstname,
            lastname,
            username,
            password: hashedPassword,
            email,
            phone,
          }
          //add user into firebase
          api.createUser(data);
          alert("Successfully created account: " + username);
          router.push('/login')
        });
        e.target.reset();
      }
    });
  }

  return (
    <Box>
      <Navbar profile={profile}/>
      <CssBaseline/>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={6.2}
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'white',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Image
            src="/icons/carpool.svg"
            alt="Carpool Logo"
            width={700}
            height={700}
            priority
            />
        </Grid>
        <Grid item xs={12} sm={8} md={5.5} elevation={10} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <img src="/icons/logo.svg" alt="logo" /> */}
            <Box component="form" onSubmit={(e) => handleSignup(e)} sx={{ mt: 1 }}>
            <Box pb={4}>
                <Typography variant="h2" fontFamily="Work Sans" sx={{fontWeight: 1000}}>Sign Up</Typography>
                <Typography fontFamily="Work Sans">BruinShare: Say Goodbye to Expensive Rides! 💸</Typography>
            </Box>
              <Grid container columnSpacing={2}>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    name="firstname"
                    autoComplete="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="Last Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="E-mail"
                    id="email"
                    autoComplete="email"
                    type="email"
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><AlternateEmailIcon/></InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    id="phone"
                    autoComplete="phone"
                    type="tel"
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><PhoneIcon/></InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="username"
                    label="User Name"
                    id="username"
                    autoComplete="Username"
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><PersonIcon/></InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    autoComplete="Password"
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><LockIcon/></InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                type="submit"
                size="large"
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}