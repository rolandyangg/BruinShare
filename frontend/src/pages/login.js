import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import * as api from "./api/api.js";
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Navbar from "@/components/Navbar.js";

export default function Login({ profile }) {
    const [allUsers, setAllUsers] = useState([]);
    const router = useRouter();

    // Prevent access to login page when logged in already
    // BUGGED TRY TO FIX LATER
    if (profile)
        router.push('/posts')

    useEffect(() => {
        api.getUsers().then((profile) => {
            setAllUsers(profile.data);
        });
    }, []);

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
            const user = userMatch[0].data;
            //check if entered password matches hashed password in firebase
            bcrypt.compare(password, user.password).then((matches) => {
                if (matches) {
                    //set user info in local storage for login persistence
                    localStorage.setItem('user', JSON.stringify(user));
                    //once logged in, immediately go to home page
                    router.push("/posts");
                } else {
                    alert("your password is incorrect! try again");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
        e.target.reset();
    }

    return (
        <>
        <Navbar profile={profile}/>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline/>
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
                }}>
                <Image
                src="/icons/carpool.svg"
                alt="Carpool Logo"
                width={700}
                height={700}
                priority
                />
            </Grid>
            <Grid item xs={12} sm={8} md={5.5} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* <img src = "/icons/logo.svg" alt="logo"/> */}
                    <Box component="form" noValidate onSubmit={(e) => handleLogin(e)} sx={{ mt: 1 }}>
                        <Box pb={5}>
                            <Typography variant="h2" fontFamily="Work Sans" sx={{fontWeight: 1000}}>Login</Typography>
                            <Typography fontFamily="Work Sans">Welcome back to BruinShare! 🚙</Typography>
                        </Box>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PersonIcon/></InputAdornment>,
                            }}
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
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><LockIcon/></InputAdornment>,
                            }}
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
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
        </>
    );
}