import AllPosts from "@/components/posts/all-posts";
import { Post } from "@/components/types";
import { getAllPosts } from "@/lib/posts-utils";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { FC, Fragment } from "react";

export const getStaticProps: GetStaticProps = () => {
  const allPosts = getAllPosts();

  return { props: { posts: allPosts }, revalidate: 1800 };
};

type Props = {
  posts: Post[];
};
const Posts: FC<Props> = ({ posts }) => {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-realated tutorials and posts!"
        />
      </Head>
      <AllPosts posts={posts} />;
    </Fragment>
  );
};

export default Posts;
