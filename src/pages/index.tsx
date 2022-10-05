import styles from "@style/index.module.css";
import Image from "next/future/image";
import avatar from "@image/avatar.avif";

import { Fragment, LegacyRef, RefObject, useEffect, useRef } from "react";
import { Divider, Empty, Tooltip } from "antd";
import Card from "@/components/card";
import { getAllPosts } from "@/utils/getAllpost";
import Post from "@/interface/post";
import {
  GithubFilled,
  QqCircleFilled,
  WechatFilled,
  DoubleRightOutlined,
} from "@ant-design/icons";

interface Page {
  allPosts: Post[];
}

interface IconBoxProps {
  content: string;
  href: string;
  Icon: JSX.Element;
}

const IconBox = ({ content, href, Icon }: IconBoxProps) => (
  <Tooltip title={content}>
    <a href={href} className="px-2 text-black hover:text-tl-400 pb-2">
      {Icon}
    </a>
  </Tooltip>
);

const icons = [
  {
    content: "访问我的github",
    href: "https://github.com/jjlstruggle",
    Icon: <GithubFilled />,
  },
  {
    content: "qq联系我：3240124918",
    href: "tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=3240124918",
    Icon: <QqCircleFilled />,
  },
  {
    content: "微信联系我",
    href: "",
    Icon: <WechatFilled />,
  },
];

const Home = ({ allPosts }: Page) => {
  const contentRef: LegacyRef<HTMLDivElement> = useRef(null);
  const titleRef: LegacyRef<HTMLSpanElement> = useRef(null);
  const enTitleRef: LegacyRef<HTMLSpanElement> = useRef(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    (async () => {
      if (isFirstMount.current) {
        isFirstMount.current = false;
        const Typed = (await import("typed.js")).default;
        new Typed(titleRef.current!, {
          strings: ["做自己青春的主角，而不是他人的陪衬"],
          typeSpeed: 60,
        });
        new Typed(enTitleRef.current!, {
          strings: [
            "Be the protagonist of your own youth, rather than a foil for others.",
          ],
          typeSpeed: 12,
        });
      }
    })();
  }, []);

  return (
    <div className="relative">
      <div
        className={
          "w-screen h-screen relative bg-black flex items-center justify-center " +
          styles["tl-bg"]
        }
      >
        <div className="flex flex-col items-center h-full justify-center">
          <div className="text-5xl text-white font-serif py-2 -mt-6 mb-2">
            <span children="welcome to my blog!" />
          </div>
          <div className="text-lg text-white font-serif">
            <span ref={titleRef} />
          </div>
          <div className="text-sm text-white font-serif tracking-widest">
            <span ref={enTitleRef} />
          </div>
        </div>
        <div className="absolute bottom-2  text-2xl font-bold py-5">
          <div
            className={" text-white text-3xl cursor-pointer " + styles.arrow}
            onClick={() => {
              contentRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <DoubleRightOutlined rotate={90} />
          </div>
        </div>
      </div>
      <div className="w-screen bg-tl-100 pt-5" ref={contentRef}>
        <div className="w-full mx-auto  flex " style={{ maxWidth: 1200 }}>
          <div className="mr-5 w-2/3 shadow-xl">
            {!allPosts.length && (
              <div className="w-full flex items-center justify-center h-full">
                <Empty
                  description={
                    <div className="font-serif">懒狗还未发表过一篇文章哦</div>
                  }
                />
              </div>
            )}
            {allPosts.map((item, index) => (
              <Card
                key={index}
                postImg={item.img!}
                title={item.title!}
                desc={item.preview!}
                tag={item.tags || []}
                pubTime={item.date!}
                slug={item.slug}
              />
            ))}
          </div>
          <div className="w-1/3">
            <div className="border border-slate-200 w-full mb-5 shadow-md">
              <div className="h-60 relative bg-white">
                <div className={"h-[7.5rem] " + styles.about}></div>
                <div className={"h-[7.5rem] text-lg relative"}>
                  <div className="absolute bottom-0  w-full">
                    <div className="flex justify-center text-base mb-2">
                      @摸鱼波比
                    </div>
                    <Divider className="my-1" />
                    <div className="flex justify-evenly items-center">
                      <Divider type="vertical" />
                      {icons.map((item, index) => (
                        <Fragment key={index}>
                          <IconBox {...item} />
                          <Divider type="vertical" />
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-white border-4 border-solid">
                    <Image
                      src={avatar}
                      className="w-full h-full"
                      alt="加载失败"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-slate-200 px-4 bg-white">
              <div className="font-bold">导航目录</div>
            </div>
            <Divider />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const allPosts =
    getAllPosts([
      "title",
      "date",
      "tags",
      "img",
      "keywords",
      "preview",
      "slug",
    ]) || [];

  return {
    props: { allPosts },
  };
};

export default Home;
