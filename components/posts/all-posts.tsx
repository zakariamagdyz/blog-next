import React from "react";
import classess from "./all-posts.module.css";
import PostGrid from "./posts-grid";
import { Post } from "../types";

const AllPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <section className={classess.posts}>
      <h1>All Posts</h1>
      <PostGrid posts={posts} />
    </section>
  );
};

export default AllPosts;
