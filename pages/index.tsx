import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { Post } from "@/components/types";
import { getFeaturedPosts } from "@/lib/posts-utils";
import { GetStaticProps } from "next";
import Head from "next/head";
import { Fragment } from "react";

export const getStaticProps: GetStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return { props: { posts: featuredPosts }, revalidate: 1800 };
};

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <Fragment>
      <Head>
        <title>{"Zakaria's blog"}</title>
        <meta
          name="description"
          content="I Post about programming and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
}
