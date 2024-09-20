import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Import a highlight.js theme

export default function Gist({ code }) {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      // Apply syntax highlighting after code updates
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  // Split code into lines and add line numbers
  const formattedCode = code.split("\n").map((line, index) => (
    <div key={index} className="flex">
      <span className="pr-2 text-gray-500 select-none">{index + 1}</span>
      <code
        ref={codeRef}
        style={{ background: "transparent" }}
        className="language-javascript text-white whitespace-pre-wrap"
      >
        {line}
      </code>
    </div>
  ));

  return (
    <div className="border !border-gray-200/25 rounded border-opacity-30 p-2">
      <pre className="rounded">
        {formattedCode}
      </pre>
    </div>
  );
}