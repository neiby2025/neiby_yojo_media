import DOMPurify from "isomorphic-dompurify";

interface SafeHtmlProps {
  htmlContent: string;
  className?: string;
}

export function SafeHtml({ htmlContent, className }: SafeHtmlProps) {
  const sanitizedHtml = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "a",
    ],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
