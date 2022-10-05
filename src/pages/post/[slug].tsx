import PostConfig from "@/interface/post";
import { getAllPosts, getPostBySlug } from "@/utils/getAllpost";

import PostHeader from "@/components/post-header";
import PostContent from "@/components/post-content";
import { RefObject, useEffect } from "react";

interface PostPage {
  post: PostConfig;
  morePosts: any;
  app: RefObject<HTMLDivElement>;
}

export default function Post({ post, morePosts, app }: PostPage) {
  useEffect(() => {
    app.current!.scrollTop = 0;
  }, []);

  return (
    <div>
      <PostHeader />
      <PostContent post={post} app={app} />
    </div>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "content",
    "coverImage",
    "tags",
    "keywords",
  ]);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
