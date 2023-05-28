import '@/styles/globals.css'
import Navbar from "../components/Navbar";
import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // retrieve user information from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (typeof window !== 'undefined' && !storedUser && router.asPath !== '/signup') {
      router.push('/login');
    } else{
      setUser(storedUser);
    }
  }, []);

  console.log(user);

  useEffect(() => {
    const handleRouteChange = (url) => {
      // retrieve updated user information from localStorage
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      setUser(updatedUser);
      console.log(updatedUser);
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
    {user && 
      <>    
        <Navbar profile={user} />
      </>
    }
      <Component {...pageProps} profile={user}/>
    </>
  )
}