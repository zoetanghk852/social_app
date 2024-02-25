"use client";
import React from "react";
import styles from "@/app/styles/page.module.scss";
import toast, { Toaster } from "react-hot-toast";
const notify = () => toast("Here is your toast.");
function SignInPage() {
  return (
    <div>
      SignInPage
      <form className={styles.form}>
        <h2>login</h2>
        <input className={styles.input} placeholder="username"></input>
        <input className={styles.input} placeholder="password"></input>
        <button className={styles.submit_Btn}>click</button>
      </form>
      <form className={styles.form}>
        <h2>register</h2>
        <input className={styles.input} placeholder="username"></input>
        <input className={styles.input} placeholder="password"></input>
        <button className={styles.submit_Btn}>click</button>
      </form>
      <button
        style={{ marginTop: "2rem" }}
        className={styles.submit_Btn}
        onClick={notify}
      >
        Make me a toast
      </button>
      <Toaster />
    </div>
  );
}

export default SignInPage;
