import { useEffect } from "react";

export default function Profile({profile}) {
    
    console.log(profile);
    return <h1>PROFILE PAGE FOR {profile.firstname}</h1>;
  }