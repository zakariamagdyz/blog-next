/* eslint-disable react/no-unescaped-entities */
import React from "react";
import classes from "./hero.module.css";
import Image from "next/image";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src={"/images/site/zakaria.jpeg"}
          alt="zakaria's photo"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm zakaria</h1>
      <p>
        I blog about web developnet - especially frontend framworks like Angular
        or React.
      </p>
    </section>
  );
};

export default Hero;
