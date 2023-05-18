import Link from "next/link";
import {
  TextField,
} from '@mui/material';
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

      //hash password
      bcrypt.hash(password, 10).then((hashedPassword) => {
        const data = {
          firstname,
          lastname,
          username,
          password: hashedPassword,
        }
        api.createUser(data);
      });
      e.target.reset();
    }

    return (
      <div>
        <h1>Sign Up Page</h1>
        <form onSubmit={(e) => handleSignup(e)}>
          <p>First Name</p>
          <TextField
            name="firstname"
            label="First Name"
            // defaultValue="Enter your username"
            // value="username"
            // onChange={(event) => setUsername(event.target.value)}
            required
            // className={`${styles.textfield} ${styles.full_width}`}
          />
          <p>Last Name</p>
          <TextField
            name="lastname"
            label="Last Name"
            // defaultValue="Enter your username"
            // value="username"
            // onChange={(event) => setUsername(event.target.value)}
            required
            // className={`${styles.textfield} ${styles.full_width}`}
          />
          <p>Username</p>
          <TextField
            name="username"
            label="Username"
            // defaultValue="Enter your username"
            // value="username"
            // onChange={(event) => setUsername(event.target.value)}
            required
            // className={`${styles.textfield} ${styles.full_width}`}
          />
          <p>Password</p>
          <TextField
            name="password"
            label="Password"
            // defaultValue="Enter your username"
            // value="username"
            // onChange={(event) => setUsername(event.target.value)}
            required
            // className={`${styles.textfield} ${styles.full_width}`}
          />
          <br></br>
          <input type="submit" value="SIGN UP" className={styles.login_button}></input>
          <p>Already have an account? <Link className={styles.signup_link} href="/login">Log in</Link></p>
        </form>
      </div>
    );
  }