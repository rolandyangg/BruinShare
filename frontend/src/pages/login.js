import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// import styles from "@/styles/Login.module.css";

import * as api from "./api/api.js";
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Login({ user }) {
    const [allUsers, setAllUsers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        api.getUsers().then((users) => {
            setAllUsers(users.data);
        });
    }, []);
    console.log(user);

    //when the user clicks log in
    const handleLogin = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        //check for a matching username in firebase
        const userMatch = allUsers.filter((p) => p.data.username === username);
        if (userMatch.length === 0) {
            alert("your username is incorrect! try again!")
        } else {
            console.log("username matched!")
            const user = userMatch[0].data;
            //check if entered password matches hashed password in firebase
            bcrypt.compare(password, user.password).then((matches) => {
                if (matches) {
                    console.log("password matched!")
                    //set user info in local storage for login persistence
                    localStorage.setItem('user', JSON.stringify(user));
                } else {
                    alert("your password is incorrect! try again");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
        e.target.reset();
    }

    //once logged in, immediately go to home page
    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
        router.push("/");
    }

    return (
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
                    <p>Welcome back to BruinShare!</p>
                    <form className={styles.login_form} onSubmit={(e) => handleLogin(e)}>
                        <p>username</p>
                        <input type="text" name="username" className={`${styles.textfield} ${styles.full_width}`} required ></input>
                        <p>password</p>
                        <input type="password" name="password" className={`${styles.textfield} ${styles.full_width}`} required ></input>
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
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1631153127293-8588327c515c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <img src = "/icons/logo.svg" alt="logo"/>
                            {/* <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography> */}
                            <Box component="form" noValidate onSubmit={(e) => handleLogin(e)} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="password"
                                />
                                <Button
                                    fullWidth
                                    type="submit"
                                    size="large"
                                    variant="contained"
                                    sx={{ mt: 2, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container justifyContent="center" alignItems="center">
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {"Don't have an account? Sign Up"}
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