import { h } from "preact";
import { useState, useMemo } from "preact/hooks";
import * as featherIcons from "preact-feather";
import type { Client } from "../client.ts";
import type { PageMeta } from "@silverbulletmd/silverbullet/type/index";

type TreeNode = {
  name: string;
  path: string;
  isFolder: boolean;
  children?: Record<string, TreeNode>;
  meta?: any;
};

export function FileExplorer({ client, onClose }: { client: Client, onClose: () => void }) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set([""]));

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const tree = useMemo(() => {
    const root: TreeNode = { name: "Root", path: "", isFolder: true, children: {} };

    const allFiles = Array.from(client.clientSystem.allKnownFiles.keys());
    
    // Process paths
    for (const filePath of allFiles) {
      const parts = filePath.split("/");
      let current = root;
      
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const isFile = i === parts.length - 1;
        const currentPath = parts.slice(0, i + 1).join("/");
        
        if (!current.children) current.children = {};
        
        if (!current.children[part]) {
          current.children[part] = {
            name: part,
            path: currentPath,
            isFolder: !isFile,
            children: isFile ? undefined : {},
          };
        }
        current = current.children[part];
      }
    }
    return root;
  }, [client.clientSystem.allKnownFiles]);

  const renderNode = (node: TreeNode, depth = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const paddingLeft = `${depth * 16 + 8}px`;
    const isCurrent = client.currentPath() === node.path;

    const itemStyle = {
      display: "flex",
      alignItems: "center",
      padding: `6px 12px 6px ${paddingLeft}`,
      cursor: "pointer",
      color: isCurrent ? "var(--primary-color)" : "var(--text-color)",
      backgroundColor: isCurrent ? "color-mix(in srgb, var(--primary-color) 15%, transparent)" : "transparent",
      borderRadius: "6px",
      margin: "2px 8px",
      fontSize: "14px",
      transition: "background-color 0.2s, color 0.2s",
      userSelect: "none" as const,
    };

    if (node.isFolder) {
      return (
        <div key={node.path}>
          <div 
            style={itemStyle} 
            onClick={() => toggleFolder(node.path)}
            onMouseOver={(e) => {
              if (!isCurrent) e.currentTarget.style.backgroundColor = "var(--ui-border-color)";
            }}
            onMouseOut={(e) => {
              if (!isCurrent) e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {isExpanded ? <featherIcons.ChevronDown size={14} style={{marginRight: "6px", opacity: 0.7}} /> : <featherIcons.ChevronRight size={14} style={{marginRight: "6px", opacity: 0.7}} />}
            <featherIcons.Folder size={14} style={{marginRight: "8px", opacity: 0.8, color: "var(--primary-color)"}} />
            <span style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{node.name}</span>
          </div>
          {isExpanded && node.children && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {Object.values(node.children)
                .sort((a, b) => {
                  if (a.isFolder && !b.isFolder) return -1;
                  if (!a.isFolder && b.isFolder) return 1;
                  return a.name.localeCompare(b.name);
                })
                .map(child => renderNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    // File
    return (
      <div 
        key={node.path}
        style={itemStyle}
        onClick={() => {
          if (!isCurrent) {
            client.navigate({ path: node.path as any }).catch(console.error);
          } else {
            client.focus();
          }
        }}
        onMouseOver={(e) => {
          if (!isCurrent) e.currentTarget.style.backgroundColor = "var(--ui-border-color)";
        }}
        onMouseOut={(e) => {
          if (!isCurrent) e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <featherIcons.FileText size={14} style={{marginRight: "8px", marginLeft: "20px", opacity: 0.7}} />
        <span style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{node.name}</span>
      </div>
    );
  };

  return (
    <div style={{
      width: "280px",
      height: "100%",
      backgroundColor: "var(--top-background-color)",
      borderRight: "1px solid var(--ui-border-color)",
      display: "flex",
      flexDirection: "column",
      boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
      zIndex: 10,
      flexShrink: 0
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        borderBottom: "1px solid var(--ui-border-color)"
      }}>
        <span style={{fontWeight: 600, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px", opacity: 0.8}}>Explorer</span>
        <button 
          onClick={onClose}
          style={{
            background: "none", border: "none", cursor: "pointer", color: "var(--text-color)", opacity: 0.6,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
          <featherIcons.X size={16} />
        </button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
        {Object.values(tree.children || {})
          .sort((a, b) => {
            if (a.isFolder && !b.isFolder) return -1;
            if (!a.isFolder && b.isFolder) return 1;
            return a.name.localeCompare(b.name);
          })
          .map(child => renderNode(child, 0))}
      </div>
    </div>
  );
}
