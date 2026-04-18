import { h } from "preact";
import * as featherIcons from "preact-feather";
import type { Client } from "../client.ts";

export function SettingsModal({
  client,
  onClose,
}: {
  client: Client;
  onClose: () => void;
}) {
  const plugs = Array.from(client.clientSystem.system.loadedPlugs.values());

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "var(--top-background-color)",
          borderRadius: "8px",
          width: "500px",
          maxWidth: "90vw",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          border: "1px solid var(--ui-border-color)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px",
            borderBottom: "1px solid var(--ui-border-color)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
            <featherIcons.Settings size={20} /> Settings
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--text-color)",
              opacity: 0.7,
              display: "flex",
            }}
          >
            <featherIcons.X size={20} />
          </button>
        </div>

        <div style={{ padding: "20px", overflowY: "auto", flex: 1 }}>
          <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "16px", opacity: 0.8 }}>Loaded Plugs</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {plugs.map((plug) => (
              <div
                key={plug.manifest?.name}
                style={{
                  padding: "12px",
                  border: "1px solid var(--ui-border-color)",
                  borderRadius: "6px",
                  backgroundColor: "color-mix(in srgb, var(--top-background-color) 95%, var(--text-color))",
                }}
              >
                <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                  {plug.manifest?.name}
                </div>
              </div>
            ))}
            {plugs.length === 0 && (
              <div style={{ opacity: 0.6, fontStyle: "italic" }}>No plugs currently loaded.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
