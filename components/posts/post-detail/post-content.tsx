/* eslint-disable react/no-children-prop */
import React from "react";
import PostHeader from "./post-header";
import classess from "./post-content.module.css";
import ReactMarkDown, { Components } from "react-markdown";
import { Post } from "@/components/types";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const PostContent = ({ post }: { post: Post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const components: Components = {
    // img({ node }) {
    //   return (
    //     <Image
    //       src={`/images/posts/${post.slug}/${src}`}
    //       alt={alt || ""}
    //       width={600} // Set the desired width
    //       height={300} // Set the desired height
    //       title={title}
    //     />
    //   );
    // },

    p({ children }) {
      if (
        typeof children[0] === "object" &&
        "props" in children[0]! &&
        children[0].type === "img"
      ) {
        const { src, alt } = children[0]?.props;

        return (
          <div className={classess.image}>
            {" "}
            <Image
              src={`/images/posts/${post.slug}/${src}`}
              alt={alt || ""}
              width={600} // Set the desired width
              height={300} // Set the desired height
            />
          </div>
        );
      }

      return <p>{children}</p>;
    },

    code({ children, lang, node, className, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return (
        <SyntaxHighlighter
          language={match![1]}
          style={atomDark}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
        />
      );
    },
  };
  return (
    <article className={classess.content}>
      <PostHeader image={imagePath} title={post.title} />
      <ReactMarkDown components={components}>{post.content}</ReactMarkDown>
    </article>
  );
};

export default PostContent;
