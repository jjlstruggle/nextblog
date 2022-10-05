import { Divider, Tag } from "antd";
import Image from "next/future/image";
import { CalendarOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import defaultImage from "@image/default.avif";
import dayjs from "dayjs";
import Link from "next/link";

interface CardProps {
  postImg: string;
  title: string;
  desc: string;
  tag: string[];
  pubTime: string;
  slug: string;
}

export default function Card(props: CardProps) {
  let { postImg, title, desc, tag, pubTime, slug } = props;

  let time;
  if (pubTime) {
    time = dayjs(pubTime);
    pubTime = time.year() + "-" + (time.month() + 1) + "-" + time.date();
  }

  const colors = ["#1890ff", "#87d068", "#f50", "cyan", "purple", "gold"];

  const getColor = (index: number) => {
    let range = Math.floor(Math.random() * (5 - index));
    return colors.splice(range, 1)[0];
  };

  const [tagColors, setTagColors] = useState<string[]>([] as Array<string>);
  useEffect(() => {
    setTagColors(tag.map((item, index) => getColor(index)));
  }, []);

  return (
    <div className="shadow-md transition-shadow duration-500 border border-slate-200 px-4 bg-white pt-4 hover:shadow-xl mb-5">
      <div className="flex">
        <Link as={`/post/${slug}`} href="/post/[slug]" passHref={false}>
          <div>
            <Image
              width="0"
              height="0"
              src={postImg || defaultImage}
              className="w-60 h-32 mr-5 cursor-pointer "
              alt="加载失败"
            />
          </div>
        </Link>
        <Link as={`/post/${slug}`} href="/post/[slug]" passHref={false}>
          <div className="flex-1 h-32 text-ellipsis overflow-hidden break-all cursor-pointer">
            <div className="text-xl font-bold mb-1 hover:text-blue-400 transition-colors duration-300">
              {title}
            </div>
            <div className="text-xs hover:text-blue-400 transition-colors duration-300">
              {desc}
            </div>
          </div>
        </Link>
      </div>
      <Divider className="my-2" />
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center">
          {pubTime && (
            <div className="flex items-center hover:text-blue-400 transition-colors duration-500">
              <CalendarOutlined />
              <div className="ml-1 mr-4 ">{pubTime}</div>
            </div>
          )}
          {tag.map((item, index) => (
            <Tag
              key={index}
              color={tagColors[index]}
              className="mx-1 cursor-pointer"
            >
              {item}
            </Tag>
          ))}
        </div>
        <div className="flex items-center hover:text-blue-400 transition-colors duration-500 cursor-pointer">
          <div className="mr-1">阅读全文</div>
          <RightCircleOutlined />
        </div>
      </div>
    </div>
  );
}
