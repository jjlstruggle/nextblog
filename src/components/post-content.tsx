import ReactMarkdown from "react-markdown";
import CodeBlock from "@/components/codeBlock";
import PostConfig from "@/interface/post";
import dynamic from "next/dynamic";
import { RefObject, useEffect, useRef, useState } from "react";
import { Affix, Button, Drawer, message, Tag } from "antd";
import {
  ArrowUpOutlined,
  MenuOutlined,
  StarOutlined,
  FileWordOutlined,
} from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ArticleBar = dynamic(() => import("@/components/article-nav"));

const colors = ["#1890ff", "#87d068", "#f50", "cyan", "purple", "gold"];

const getColor = (index: number) => {
  let range = Math.floor(Math.random() * (5 - index));
  return colors.splice(range, 1)[0];
};

export default function PostContent({
  post,
  app,
}: {
  post: PostConfig;
  app: RefObject<HTMLDivElement>;
}) {
  const articleBox = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const affix = useRef<HTMLDivElement>(null);
  const [tagColors, setTagColors] = useState<string[]>([] as Array<string>);
  const { tags } = post;
  useEffect(() => {
    setTagColors(tags.map((item, index) => getColor(index)));
  }, []);

  const wordCount = post.content.length;
  const Copy = () => {
    let [url, setUrl] = useState("");
    useEffect(() => {
      setUrl(window.location.href);
    }, []);
    return (
      <CopyToClipboard text={url}>
        <Button
          className="my-2"
          type="primary"
          size="large"
          shape="circle"
          onClick={() => {
            message.success("文章链接复制成功，分享给你的小伙伴吧~");
          }}
        >
          <StarOutlined />
        </Button>
      </CopyToClipboard>
    );
  };
  console.log(post);

  return (
    <div className="relative bg-blue-50 z-10 post flex px-12">
      <div className="absolute top-0" ref={affix}></div>
      <div
        className="w-4/5 px-6 mx-auto shadow-2xl bg-white -translate-y-12 rounded-xl pt-4 pb-5"
        ref={articleBox}
      >
        <div className="mb-2">
          {tags.map((item, index) => (
            <Tag
              key={index}
              color={tagColors[index]}
              className="mx-1 cursor-pointer"
            >
              {item}
            </Tag>
          ))}
        </div>
        <div className="flex items-center text-gray-400 mt-3 mb-3">
          <div>
            <FileWordOutlined />
            <span className="ml-1">本文共约{wordCount}字</span>
          </div>
        </div>
        <hr className="-mb-2 -mt-1" />
        <ReactMarkdown
          children={post.content}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <CodeBlock
                  value={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
      <Drawer
        closable={false}
        width={600}
        bodyStyle={{
          padding: 12,
        }}
        open={show}
        placement="left"
        footer={null}
        onClose={() => {
          setShow(false);
        }}
      >
        <ArticleBar box={articleBox} />
      </Drawer>
      <Affix offsetTop={0} target={() => app.current!}>
        <div className="flex flex-col pt-6">
          <Button
            className="my-2"
            type="primary"
            size="large"
            shape="circle"
            onClick={() => {
              setShow(true);
            }}
          >
            <MenuOutlined />
          </Button>
          <Copy />
          <Button
            className="my-2"
            type="primary"
            size="large"
            shape="circle"
            onClick={() => {
              affix.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <ArrowUpOutlined />
          </Button>
        </div>
      </Affix>
    </div>
  );
}
