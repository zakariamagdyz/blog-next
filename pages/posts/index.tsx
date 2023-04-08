import AllPosts from "@/components/posts/all-posts";
import { Post } from "@/components/types";
import { getAllPosts } from "@/lib/posts-utils";
import { GetStaticProps } from "next";
import React, { FC } from "react";

export const getStaticProps: GetStaticProps = () => {
  const allPosts = getAllPosts();

  return { props: { posts: allPosts } ,revalidate:1800 };
};

type Props = {
  posts: Post[];
};
const Posts: FC<Props> = ({ posts }) => {
  return <AllPosts posts={posts} />;
};

export default Posts;
