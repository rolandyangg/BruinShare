import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Login.module.css";
import * as api from "./api/api.js";
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs';

export default function Login({user}) {
    const [allUsers, setAllUsers] = useState([]);
    const router = useRouter();
    
    useEffect(() => {
        api.getUsers().then((users) => {
            setAllUsers(users.data);
        });
    }, []);
    console.log(allUsers);

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
                if(matches){
                    console.log("password matched!")
                    //set user info in local storage for login persistence
                    localStorage.setItem('user', JSON.stringify(user));
                    //once logged in, immediately go to home page
                    router.push("/");
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
        <div>
            <div className={styles.flex_container}>
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
            </div>
        </div>
    );
  }