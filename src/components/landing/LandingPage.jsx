import React from "react";
import { Link } from "react-router-dom";
import styles from './landingPage.module.css'

export default function LandingPage() {
    return (
        <div className={styles.container}>
            <div className={styles.image}></div>
            <Link to="/home">
                <button className={styles.button}>Welcome!</button>
                <h1 className={styles.h1}>Explore The Dog House</h1>
            </Link>
        </div>
    )
}