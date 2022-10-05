import React, {
  LegacyRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  HomeFilled,
  UserOutlined,
  TagFilled,
  EditFilled,
  BranchesOutlined,
} from "@ant-design/icons";
import throttle from "@/utils/throttle";
import Link from "next/link";
import { useRouter } from "next/router";
import register from "@/utils/register";

const header = [
  { icon: <HomeFilled className="mr-1" />, title: "首页", path: "/" },
  { icon: <TagFilled className="mr-1" />, title: "标签" },
  { icon: <EditFilled className="mr-1" />, title: "归档" },
  {
    icon: <UserOutlined className="mr-1" />,
    title: "关于我",
  },
  {
    icon: <BranchesOutlined className="mr-1" />,
    title: "友情链接",
  },
];
export default function Header({ app }: { app: RefObject<HTMLDivElement> }) {
  const headerRef: LegacyRef<HTMLDivElement> = useRef(null);
  const backState = useRef(false);
  const [shouleHasBack, setShouldHasBack] = useState(false);
  const route = useRouter();
  useEffect(() => {
    setShouldHasBack(false);
    let unSub: () => void = () => {};
    if (route.pathname === "/") {
      const { current } = app;
      let height = headerRef.current?.clientHeight;
      if (current?.scrollTop! > height!) {
        setShouldHasBack(true);
        backState.current = true;
      }
      const onScroll = throttle(() => {
        if (current?.scrollTop! > height!) {
          if (!backState.current) {
            setShouldHasBack(true);
            backState.current = true;
          }
        } else {
          if (backState.current) {
            setShouldHasBack(false);
            backState.current = false;
          }
        }
      }, 100);
      unSub = register(current!, "scroll", onScroll);
    }

    return () => {
      unSub();
    };
  }, [route.pathname]);

  return (
    <div
      className={
        route.pathname === "/"
          ? shouleHasBack
            ? "fixed flex items-center justify-between w-full text-white z-50 text-lg px-24 bg-blue-300"
            : "absolute flex items-center justify-between w-full text-white z-50 text-lg px-24 bg-transparent "
          : "sticky flex items-center justify-between w-full text-white z-50 text-lg px-24 bg-blue-300"
      }
      ref={headerRef}
    >
      <div className="cursor-pointer">摸鱼波比の家</div>
      <div className="flex items-center">
        {header.map((item, index) => (
          <Link href={item.path || "/"} key={index}>
            <div className="px-3 cursor-pointer py-2 hover:bg-[rgba(0,0,0,0.1)] flex items-center flex-col">
              <div className="text-xl">{item.icon}</div>
              <div className="text-base">{item.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
