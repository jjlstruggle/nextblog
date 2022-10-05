import { CSSProperties, LegacyRef, useEffect, useRef, useState } from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as xonokai } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { DownOutlined } from "@ant-design/icons";

interface Props {
  value: string;
  language: string | null;
}

export default function CodeBlock({ value, language = null }: Props) {
  function RenderPre({
    style,
    children,
  }: {
    style: CSSProperties;
    children: JSX.Element;
  }) {
    const preRef: LegacyRef<HTMLPreElement> = useRef(null);
    const [showCode, setShowCode] = useState(true);
    const preHeight = useRef(0);
    useEffect(() => {
      preHeight.current = preRef.current?.clientHeight!;
    }, []);
    return (
      <div className="rounded-md mb-2 overflow-hidden">
        <div
          className="flex justify-between items-center px-5 pt-2"
          style={{
            background: "rgb(45,45,45)",
          }}
        >
          <span
            className="rounded-full w-3 h-3 "
            style={{
              backgroundColor: "#ff5f56",
              boxShadow: "25px 0 #ffbd2e, 50px 0 #27c93f",
            }}
          />
          <div className="text-gray-300 flex items-center">
            <div></div>
            <div className="mr-1">{language}</div>
            <div
              className={
                showCode
                  ? "rotate-0 transition-transform"
                  : "rotate-180 transition-transform"
              }
            >
              <DownOutlined
                onClick={() => {
                  setShowCode(!showCode);
                }}
              />
            </div>
          </div>
        </div>
        <pre
          ref={preRef}
          className="overflow-hidden my-0"
          style={{
            ...style,
            transition: "height 0.3s",
            paddingBottom: showCode ? 4 : 0,
            height: showCode
              ? preHeight.current
                ? preHeight.current
                : "unset"
              : 0,
          }}
          children={children}
        />
      </div>
    );
  }
  return (
    <figure className="highlight">
      <SyntaxHighlighter
        PreTag={RenderPre}
        language={language!}
        style={xonokai}
        showLineNumbers
      >
        {value}
      </SyntaxHighlighter>
    </figure>
  );
}
