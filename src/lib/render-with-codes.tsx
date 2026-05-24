import type { ReactNode } from "react";

const CODE_TOKEN = /\{\{([^}]+)\}\}/g;

export function renderWithCodes(text: string): ReactNode {
  const parts = text.split(CODE_TOKEN);
  if (parts.length === 1) return text;

  const nodes: ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 1) {
    if (i % 2 === 0) {
      if (parts[i]) nodes.push(parts[i]);
    } else {
      nodes.push(
        <code className="inline-code" key={`${parts[i]}-${i}`}>
          {parts[i]}
        </code>,
      );
    }
  }
  return nodes;
}
