import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostMetaData } from "@/components/types";

const postDirectory = path.join(process.cwd(), "content", "posts");

export const getPostsFiles = () => fs.readdirSync(postDirectory);

export const getPostData = (fileName: string) => {
  const postSlug = fileName.replace(/\.md$/, ""); // remove the file extension
  const filePath = path.join(postDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(fileContent);

  const postData = { slug: postSlug, ...(data as PostMetaData), content };

  return postData;
};

export const getAllPosts = () => {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((fileName) => getPostData(fileName));

  const soretdPosts = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));

  return soretdPosts;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  return featuredPosts;
};
