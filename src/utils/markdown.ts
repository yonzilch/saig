import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: false,
  smartypants: true,
});

export function markdownToHtml(md: string): string {
  if (!md) return "";
  return marked.parse(md) as string;
}
