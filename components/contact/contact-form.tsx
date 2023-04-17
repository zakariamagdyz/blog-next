import { useState, useEffect, useRef, FormEvent } from "react";

import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

type RequestStatus = "pending" | "success" | "error";
type ContactDetails = { email: string; name: string; message: string };
type Notification = { status: RequestStatus; title: string; message: string };

async function sendContactData(contactDetails: ContactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

const getNotificationState = (
  status: RequestStatus | undefined,
  err?: string
): Notification | undefined => {
  switch (status) {
    case "pending":
      return {
        status: "pending",
        message: "Your message is on its way!",
        title: "Sending message...",
      };

    case "success":
      return {
        status: "success",
        message: "Message sent successfully",
        title: "Success!",
      };
    case "error":
      return { status: "error", message: err || "", title: "Error!" };

    default:
      return undefined;
  }
};

function ContactForm() {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const [requestStatus, setRequestStatus] = useState<RequestStatus>();
  const [requestError, setRequestError] = useState<string>();

  const sendMessageHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contactDetails = {
      email: emailInputRef.current!.value,
      name: nameInputRef.current!.value,
      message: messageInputRef.current!.value,
    };

    try {
      setRequestStatus("pending");
      const data = await sendContactData(contactDetails);
      setRequestStatus("success");
    } catch (error) {
      if (!(error instanceof Error)) return;

      setRequestError(error.message);
      setRequestStatus("error");
    }
  };

  const notification = getNotificationState(requestStatus, requestError);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (requestStatus === "success" || requestStatus === "error") {
      timer = setTimeout(() => {
        setRequestStatus(undefined);
        setRequestError(undefined);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [requestStatus]);

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" required ref={nameInputRef} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows={5}
            required
            ref={messageInputRef}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>

      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
          title={notification.title}
        />
      )}
    </section>
  );
}

export default ContactForm;
