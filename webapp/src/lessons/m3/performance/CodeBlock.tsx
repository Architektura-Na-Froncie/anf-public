import React, { useRef, useEffect, memo } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import hljs from "highlight.js";

const StyledMarkdown = styled(ReactMarkdown)`
  & code.hljs * {
    font-family: monospace;
    font-size: 14px;
  }
`

interface CodeBlockProps {
  sourceCode: string
}

export const CodeBlock: React.FC<CodeBlockProps> =
  // memo(
    (props) => {
      const { sourceCode } = props

      const rootEl = useRef<HTMLDivElement>(null);

      useEffect(() => {
        if (rootEl.current) {
          rootEl.current.querySelectorAll("pre code").forEach(block => {
            hljs.highlightElement(block as HTMLElement);
          });
        }
      });
      // }, [sourceCode]);

      return <div ref={rootEl}>
        <StyledMarkdown>
          {sourceCode}
        </StyledMarkdown>
      </div>
    }
  // )
