import { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import CustomizedDialogs from "@/pages/posts.js";


const inter = Inter({ subsets: ["latin"] });

export default function Home({profile}) {
  
  return (
    <>
    <Head>
        <title>BruinShare</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>

    <CustomizedDialogs profile={profile}/></>

    
  );
}
