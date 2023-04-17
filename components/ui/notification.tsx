import ReactDOM from "react-dom";

import classes from "./notification.module.css";
import { FC } from "react";

type Props = {
  title: string;
  message: string;
  status: string;
};
const Notification: FC<Props> = ({ title, message, status }) => {
  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById("notifications")!
  );
};

export default Notification;
