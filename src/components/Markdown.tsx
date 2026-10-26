import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

export default function Markdown({ content }: { content: string }) {
  if (!content) return <p className="text-zinc-500">No content available.</p>;
  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
