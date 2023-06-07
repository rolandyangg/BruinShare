import '@/styles/globals.css'
import Navbar from "../components/Navbar";
import Head from "next/head";
import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    // Add coloring here...
  },
  typography: {
    fontFamily: 'Work Sans',
  },
});

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // retrieve user information from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (typeof window !== 'undefined' && !storedUser && router.asPath !== '/signup' && router.asPath !== '/login') {
      router.push('/');
    }
    else if (typeof window !== 'undefined' && !storedUser && router.asPath !== '/signup') {
      router.push('/login');
    } else{
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      // retrieve updated user information from localStorage
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      setUser(updatedUser);
    };

    // listen to route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    // clean up  event listener
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
    <Head>
        <title>BruinShare</title>
        <meta name="description" content="Ridesharing made easy with your fellow bruins!"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    {
      user && 
      <>
        <ThemeProvider theme={theme}>
          <Navbar profile={user} />
          <Component {...pageProps} profile={user}/>
        </ThemeProvider>
      </>
    }
    {
      !user && (router.asPath === '/login' || router.asPath == '/signup') && <Component {...pageProps} profile={user}/>
    }
      
    </>
  )
}