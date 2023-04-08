import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { Post } from "@/components/types";
import { getFeaturedPosts } from "@/lib/posts-utils";
import { GetStaticProps } from "next";
import { Fragment } from "react";

export const getStaticProps: GetStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return { props: { posts: featuredPosts },revalidate:1800 };
};

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
}
