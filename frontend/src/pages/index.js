import Navbar from "@/components/Navbar";
import Image from "next/image"
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import Link from "next/link"

export default function Home({profile}) {
  
  return (
    <>
      <Navbar profile={profile}/>
      {/* HERO */}
      <Box display="flex" width="100%" height="80vh">
        <Grid container>
          <Grid item xs={12} md={6} p={7} display="flex">
            <Stack display="flex" alignItems="left" justifyContent="center" spacing={2}>
              <Typography variant="h2" sx={{fontWeight:1000}}>Ride together, thrive together</Typography>
              <Typography variant="h6">Connecting Bruins for hassle-free & affordable journeys! 🐻</Typography>
              <Link href="/login"><Button variant="contained">Get Started</Button></Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} p={5} display="flex" justifyContent="center">
            <Box display="flex" alignItems="center" justifyContent="center">
              <Image
                    src="/icons/carpool_landing.svg"
                    alt="Carpool Logo"
                    width={550}
                    height={550}
                    priority
                    />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* FOOTER */}
      <Stack height="10vh" display="flex" justifyContent="center" alignItems="center" width="100%">
        <Typography color="gray">❤️ BruinShare © 2023 (CS35L Project) ❤️</Typography>
      </Stack>
    </>
  );

}
