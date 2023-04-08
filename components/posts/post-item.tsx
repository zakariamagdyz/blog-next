import Link from "next/link";
import React, { FC } from "react";
import classes from "./post-item.module.css";
import Image from "next/image";
import { Post } from "../types";

type Props = {
  post: Post;
};

const PostItem: FC<Props> = ({
  post: { excerpt, image, slug, title, date },
}) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath = `/images/posts/${slug}/${image}`;

  const linkPath = `/posts/${slug}`;
  return (
    <li className={classes.post}>
      <Link href={linkPath} legacyBehavior>
        <a>
          <div className={classes.image}>
            <Image src={imagePath} alt={title} fill />
          </div>
          <div className={classes.content}>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PostItem;
