import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";

export default function Home({profile}) {
  
  return (
    <>
      <Navbar profile={profile}/>
    </>
  );

}
