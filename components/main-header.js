import React from "react";
import Link from "next/link";
import classes from "./main-header.module.css";
import logoImg from "@/assets/logo.png";
import Image from "next/image";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";

// In order to not make our whole component a client side rendering,
//we create a NavLink component to keep track of the active class and make that a "use client" component

const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground></MainHeaderBackground>
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          {/* In next js the img we import comes as an object and we need the src attribute, But when using Link, we can simply use name of image imported */}
          <Image src={logoImg} alt="a plate with food in it" priority></Image>
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href={"/meals"}>Browse meals</NavLink>
            </li>

            <li>
              <NavLink href={"/community"}>Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
