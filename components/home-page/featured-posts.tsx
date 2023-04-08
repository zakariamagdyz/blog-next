import React from "react";
import classes from "./featured-posts.module.css";
import PostGrid from "../posts/posts-grid";
import { Post } from "../types";

const FeaturedPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
