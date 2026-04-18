import { h } from "preact";
import * as featherIcons from "preact-feather";
import type { Client } from "../client.ts";

export function FormattingToolbar({ client }: { client: Client }) {
  if (client.contentManager.isDocumentEditor()) {
    return null; // Don't show toolbar for non-markdown documents
  }

  const execCommand = (cmd: string) => {
    client.runCommandByName(cmd).catch(console.error);
    client.focus();
  };

  const toolbarStyle = {
    display: "flex",
    gap: "8px",
    padding: "8px 10px",
    backgroundColor: "var(--top-background-color)",
    borderBottom: "1px solid var(--ui-border-color)",
    overflowX: "auto" as const,
    justifyContent: "center",
    flexShrink: 0,
  };

  const btnStyle = {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "6px",
    color: "var(--primary-color)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
  };

  const buttons = [
    { icon: featherIcons.Type, command: "Text: Heading 1", title: "Heading 1" },
    { icon: featherIcons.Type, command: "Text: Heading 2", title: "Heading 2" },
    { icon: featherIcons.Bold, command: "Text: Bold", title: "Bold" },
    { icon: featherIcons.Italic, command: "Text: Italic", title: "Italic" },
    { icon: featherIcons.Type, command: "Text: Strikethrough", title: "Strikethrough" },
    { icon: featherIcons.Link, command: "Text: Link Selection", title: "Link" },
    { icon: featherIcons.List, command: "Text: Listify Selection", title: "Bullet List" },
    { icon: featherIcons.Hash, command: "Text: Number Listify Selection", title: "Numbered List" },
    { icon: featherIcons.MessageSquare, command: "Text: Quote Selection", title: "Quote" },
  ];

  return (
    <div className="sb-formatting-toolbar" style={toolbarStyle}>
      {buttons.map((btn, i) => (
        <button
          key={i}
          style={btnStyle}
          title={btn.title}
          onClick={(e) => {
            e.preventDefault();
            execCommand(btn.command);
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--ui-border-color)")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <btn.icon size={16} />
        </button>
      ))}
    </div>
  );
}
