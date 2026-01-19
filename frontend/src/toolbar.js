// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div style={{ marginBottom: "10px" }}>
        <h3 style={{ margin: "0 0 10px 0", fontSize: "16px", color: "#333" }}>
          Original Nodes
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <DraggableNode type="customInput" label="Input" />
          <DraggableNode type="llm" label="LLM" />
          <DraggableNode type="customOutput" label="Output" />
          <DraggableNode type="text" label="Text" />
          <DraggableNode type="filter" label="Filter" />
          <DraggableNode type="transform" label="Transform" />
          <DraggableNode type="conditional" label="Conditional" />
          <DraggableNode type="aggregator" label="Aggregator" />
          <DraggableNode type="delay" label="Delay" />
        </div>
      </div>
    </div>
  );
};
