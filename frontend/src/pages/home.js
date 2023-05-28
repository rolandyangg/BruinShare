import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import * as api from "./api/api.js";
import { useRouter } from 'next/router';
import CustomizedDialogs from "@/components/formDialog.js";


export default function Home() {

    return(
        <>
            <CustomizedDialogs/>
        </>
            
     );

}