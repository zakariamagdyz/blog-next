import Image from "next/image";
import React, { FC } from "react";
import classess from "./post-header.module.css";

type Props = { title: string; image: string };

const PostHeader: FC<Props> = ({ title, image }) => {
  return (
    <header className={classess.header}>
      <h1>{title}</h1>
      <Image src={image} alt={title} width={200} height={150} />
    </header>
  );
};

export default PostHeader;
