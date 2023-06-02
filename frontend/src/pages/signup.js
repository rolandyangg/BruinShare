import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Login.module.css";
import bcrypt from 'bcryptjs';
import * as api from "./api/api.js";

import Avatar from '@mui/material/Avatar';
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

export default function SignUp() {

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
      console.log(duplicate);
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
        });
        e.target.reset();
      }
    });
  }

  return (
    // <div>
    //   <div className={styles.flex_container}>
    //     <div className={styles.login_left}>
    //         <Image
    //             src="/icons/carpool.svg"
    //             alt="Carpool Logo"
    //             width={700}
    //             height={700}
    //             priority
    //         />
    //     </div>
    //     <div className={styles.login_right}>
    //       <h1>Sign Up Page</h1>
    //       <p>BruinShare: Say Goodbye to Expensive Rides! 💸</p>
    //       <form className={styles.login_form} onSubmit={(e) => handleSignup(e)}>
    //         <div className={styles.input_block}>
    //           <div className={styles.text_block}>
    //             <p>first name</p>
    //             <TextField
    //               name="firstname" label="First Name" sx={{ width: '110%' }} required
    //             />
    //           </div>
    //           <div className={styles.text_block}>
    //             <p>last name</p>
    //             <TextField
    //               name="lastname" label="Last Name" sx={{ width: '110%' }}required
    //             />
    //           </div>
    //         </div>
    //         <div className={styles.input_block}>
    //           <div className={styles.text_block}>
    //             <p>username</p>
    //             <TextField
    //               name="username" label="Username"  sx={{ width: '110%' }} required
    //             />
    //           </div>
    //           <div className={styles.text_block}> 
    //             <p>password</p>
    //             <TextField
    //               name="password" label="Password" type="password"  sx={{ width: '110%' }} required
    //             />
    //           </div>
    //         </div>
    //         <div className={styles.input_block}>
    //           <div className={styles.text_block}>
    //             <p>ucla email</p>
    //             <TextField
    //               name="email" label="UCLA Email" type="email"  sx={{ width: '110%' }} required
    //             />
    //           </div>
    //           <div className={styles.text_block}>
    //             <p>phone number</p>
    //             <TextField
    //               name="phone" label="Phone Number" type="tel"  sx={{ width: '110%' }} required
    //             />
    //           </div>
    //         </div>
    //         <br></br>
    //         <input type="submit" value="SIGN UP" className={`${styles.signup_button} ${styles.login_button}`}></input>
    //         <p>Already have an account? <Link className={styles.signup_link} href="/login">Log in</Link></p>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div>
      {/* <div className={styles.flex_container}>
          <div className={styles.login_left}>
              <Image
                  src="/icons/carpool.svg"
                  alt="Carpool Logo"
                  // className={styles.vercelLogo}
                  width={700}
                  height={700}
                  priority
              />
          </div>
          <div className={styles.login_right}>
              <h1>Login</h1>
              <p>Welcome back to BruinShare! 🚙</p>
              <form className={styles.login_form} onSubmit={(e) => handleLogin(e)}>
                  <p>username</p>
                  <TextField
                      type="text" name="username" className={`${styles.full_width}`} required
                  />
                  <p>password</p>
                  <TextField
                      type="password" name="password" className={`${styles.full_width}`} required
                  />
                  <br></br>
                  <input type="submit" value="LOG IN" className={styles.login_button}></input>
                  <p>{"Don't"} have an account? <Link className={styles.signup_link} href="/signup">Sign up</Link></p>
              </form>
          </div>
      </div> */}
      {/* <ThemeProvider theme={defaultTheme}> */}
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6.2}
          sx={{
            // backgroundImage: 'url(https://images.unsplash.com/photo-1631153127293-8588327c515c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Image
            src="/icons/carpool.svg"
            alt="Carpool Logo"
            // className={styles.vercelLogo}
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
            <img src="/icons/logo.svg" alt="logo" />
            {/* <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                          <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                          Sign in
                      </Typography> */}
            <Box component="form" onSubmit={(e) => handleSignup(e)} sx={{ mt: 1 }}>
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
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* </ThemeProvider> */}
    </div>
  );
}