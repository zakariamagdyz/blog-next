import React from "react";
import classes from "./posts-grid.module.css";
import PostItem from "./post-item";
import { Post } from "../types";

const PostGrid = ({ posts }: { posts: Post[] }) => {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};

export default PostGrid;
