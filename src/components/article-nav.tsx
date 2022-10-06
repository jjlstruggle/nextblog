import { RefObject, useEffect, useState } from "react";
import getNav from "@/utils/getAllNavElement";
import { Nav } from "@/interface/type";
import { Spin, Tree } from "antd";
import { nanoid } from "nanoid";
import { ReadOutlined } from "@ant-design/icons";
interface Collect {
  title: string;
  children: Collect[];
  prev: Collect | null;
  move: () => void;
  level: number;
  key: string;
}

function handleNav(nav: Nav[]) {
  let collect: Collect[] = [];
  function deep(parent: Collect, $nav?: Nav) {
    if (!nav.length && !$nav) return null;
    let curNav = $nav || nav.shift()!;
    if (!parent) {
      collect.push({
        title: curNav.content,
        children: [],
        prev: null,
        move: () => curNav.move(),
        level: curNav.level,
        key: nanoid(),
      });
      deep(collect.at(-1)!);
    } else {
      if (parent.level > curNav.level) {
        if (!parent.prev) {
          collect.push({
            title: curNav.content,
            children: [],
            prev: null,
            move: () => curNav.move(),
            level: curNav.level,
            key: nanoid(),
          });
          deep(collect.at(-1)!);
        } else {
          deep(parent.prev, curNav);
        }
      } else {
        let $collect = {
          title: curNav.content,
          children: [],
          prev: parent,
          move: () => curNav.move(),
          level: curNav.level,
          key: nanoid(),
        };
        parent.children.push($collect);
        deep($collect);
      }
    }
  }
  deep(null as unknown as Collect);
  return collect;
}

function ArticleNavbar({ box }: { box: RefObject<HTMLDivElement> }) {
  const [nav, setNav] = useState<Collect[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let $nav = getNav(box.current!);
    setNav(handleNav($nav));
    setLoading(false);
  }, []);

  if (loading) return <Spin />;

  return (
    <div className="relative">
      <div className="flex items-center text-2xl font-bold font-serif mb-2">
        <ReadOutlined />
        <span className="ml-2">目录</span>
      </div>
      <Tree
        treeData={nav}
        defaultExpandAll
        onSelect={(_, { node }) => {
          node.move();
        }}
      ></Tree>
    </div>
  );
}

export default ArticleNavbar;
