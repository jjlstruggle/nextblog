import { Nav } from "@/interface/type";

let match = (node: ChildNode) => {
  switch (node.nodeName.toLocaleLowerCase()) {
    case "h1":
      return 1;
    case "h2":
      return 2;
    case "h3":
      return 3;
    case "h4":
      return 4;
    case "h5":
      return 5;
    case "h6":
      return 6;
    default:
      return 0;
  }
};

function getNav(root: Element) {
  let result: Nav[] = [];
  let get = (root: Element) => {
    if (!root.childNodes.length) return;
    Array.from(root.childNodes).forEach(($node) => {
      let node = $node as unknown as HTMLHeadElement;
      if (match(node)) {
        result.push({
          level: Number(node.nodeName.toLocaleLowerCase().split("h")[1]),
          content: node.innerText,
          move: () =>
            node.scrollIntoView({
              behavior: "smooth",
            }),
        });
      } else {
        get(node as Element);
      }
    });
  };
  get(root);
  return result;
}

export default getNav;
