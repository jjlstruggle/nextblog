import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_post");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  try {
    data.date && (data.date = data.date.getTime());
    data.updated && (data.updated = data.updated.getTime());
    if (!data.preview) {
      data.preview = content.substring(0, 200);
    }
    if (!data.tags) {
      data.tags = [];
    } else {
      data.tags = data.tags.replace("，", ",").split(",");
    }
  } catch (e) {}

  type Items = {
    [key: string]: string | [];
  };

  const items: Items = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
    if (field === "content") {
      items.content = content;
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
