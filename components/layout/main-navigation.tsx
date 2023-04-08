import React from "react";
import Logo from "./logo";
import Link from "next/link";
import classess from "./main-navigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classess.header}>
      <Link href="/" legacyBehavior>
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
