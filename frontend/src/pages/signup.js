import Link from "next/link";
import {
  TextField,
} from '@mui/material';
import Image from "next/image";
import styles from "@/styles/Login.module.css";
import bcrypt from 'bcryptjs';
import * as api from "./api/api.js";

export default function SignUp() {

    const handleSignup = (e) => {
      e.preventDefault();
      const firstname = e.target.firstname.value;
      const lastname = e.target.lastname.value;
      const username = e.target.username.value;
      const password = e.target.password.value;
      const email = e.target.email.value;
      const phone = e.target.phone.value;

      //check validity - duplicate username + ucla email
      api.getUsers().then((users) => {
        const duplicate = (users.data).filter((p) => p.data.username === username);
        console.log(duplicate);
        if (duplicate.length !== 0) {
            alert("your username is taken! pick another one!")
        } else if (email && !email.includes("ucla.edu")){
          alert("Please enter your UCLA email! ");
        }

        //if reached here, entered info is valid
        else {
          //hash chosen password
          bcrypt.hash(password, 10).then((hashedPassword) => {
            const data = {
              firstname,
              lastname,
              username,
              password: hashedPassword,
              email,
              phone,
            }
            //add user into firebase
            api.createUser(data);
          });
          e.target.reset();
        }
      });
    }

    return (
      <div>
        <div className={styles.flex_container}>
          <div className={styles.login_left}>
              <Image
                  src="/icons/carpool.svg"
                  alt="Carpool Logo"
                  width={700}
                  height={700}
                  priority
              />
          </div>
          <div className={styles.login_right}>
            <h1>Sign Up Page</h1>
            <p>BruinShare: Say Goodbye to Expensive Rides! 💸</p>
            <form className={styles.login_form} onSubmit={(e) => handleSignup(e)}>
              <div className={styles.input_block}>
                <div className={styles.text_block}>
                  <p>first name</p>
                  <TextField
                    name="firstname" label="First Name" sx={{ width: '110%' }} required
                  />
                </div>
                <div className={styles.text_block}>
                  <p>last name</p>
                  <TextField
                    name="lastname" label="Last Name" sx={{ width: '110%' }}required
                  />
                </div>
              </div>
              <div className={styles.input_block}>
                <div className={styles.text_block}>
                  <p>username</p>
                  <TextField
                    name="username" label="Username"  sx={{ width: '110%' }} required
                  />
                </div>
                <div className={styles.text_block}> 
                  <p>password</p>
                  <TextField
                    name="password" label="Password" type="password"  sx={{ width: '110%' }} required
                  />
                </div>
              </div>
              <div className={styles.input_block}>
                <div className={styles.text_block}>
                  <p>ucla email</p>
                  <TextField
                    name="email" label="UCLA Email" type="email"  sx={{ width: '110%' }} required
                  />
                </div>
                <div className={styles.text_block}>
                  <p>phone number</p>
                  <TextField
                    name="phone" label="Phone Number" type="tel"  sx={{ width: '110%' }} required
                  />
                </div>
              </div>
              <br></br>
              <input type="submit" value="SIGN UP" className={`${styles.signup_button} ${styles.login_button}`}></input>
              <p>Already have an account? <Link className={styles.signup_link} href="/login">Log in</Link></p>
            </form>
          </div>
        </div>
      </div>
    );
  }