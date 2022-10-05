import React from "react";
import Image from "next/future/image";
import icp from "@image/icp.avif";
export default function Footer() {
  return (
    <div className="flex flex-col items-center py-3 bg-tl-300 text-white">
      <div className="py-[0.125rem] text-gray-500">Copyright © 2022 saga</div>
      <div className="py-[0.125rem]">
        站点总字数：14k | 总访问量：161 | 总访问人数：131
      </div>
      <div className="py-[0.125rem]">本站已运行61天</div>
      <a
        className="flex items-center py-[0.125rem] text-white"
        href="https://www.beianx.cn/search/%e9%84%82ICP%e5%a4%872021017709%e5%8f%b7"
      >
        <Image src={icp} className="w-2 h-2" alt="加载失败" />
        <div className=" ml-1">鄂ICP备2021017709号-1</div>
      </a>
    </div>
  );
}
