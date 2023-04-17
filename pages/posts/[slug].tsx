import PostContent from "@/components/posts/post-detail/post-content";
import { Post } from "@/components/types";
import {
  getAllPosts,
  getFeaturedPosts,
  getPostData,
  getPostsFiles,
} from "@/lib/posts-utils";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, Fragment } from "react";

export const getStaticPaths: GetStaticPaths = () => {
  const postFileNames = getPostsFiles();
  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));

  const allSlugs = slugs.map((slug) => ({ params: { slug } }));

  return { paths: allSlugs, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = (context) => {
  const currentSlug = context.params?.slug as string;

  let post: Post | undefined;
  try {
    post = getPostData(currentSlug);
  } catch (error) {
    return { notFound: true };
  }

  return { props: { post }, revalidate: 600 };
};

type Props = {
  post: Post;
};
const Post: FC<Props> = ({ post }) => {
  const router = useRouter();
  return (
    <Fragment>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />;
    </Fragment>
  );
};

export default Post;
