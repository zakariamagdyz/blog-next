export type PostMetaData = {
  title: string;
  image: string;
  excerpt: string;
  isFeatured: boolean;
  date: string;
};

export type Post = PostMetaData & { slug: string; content: string };
