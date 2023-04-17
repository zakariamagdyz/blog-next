import ContactForm from "@/components/contact/contact-form";
import Head from "next/head";
import React, { Fragment } from "react";

const contact = () => {
  return (
    <Fragment>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Send Me your messages" />
      </Head>
      <ContactForm />;
    </Fragment>
  );
};

export default contact;
