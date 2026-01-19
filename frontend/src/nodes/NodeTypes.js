// nodeTypes.js
// Wrapper components for each node type using BaseNode abstraction

import { BaseNode } from "./BaseNode";
import { nodeConfigs } from "./nodeConfigs";

// Original nodes
export const InputNode = (props) => (
  <BaseNode {...props} config={nodeConfigs.customInput} />
);

export const OutputNode = (props) => (
  <BaseNode {...props} config={nodeConfigs.customOutput} />
);

export const LLMNode = (props) => (
  <BaseNode {...props} config={nodeConfigs.llm} />
);

export const TextNode = (props) => (
  <BaseNode {...props} config={nodeConfigs.text} />
);

// New nodes
export const FilterNode = (props) => (
  <BaseNode {...props} config={nodeConfigs.filter} />
);

export const TransformNode = (props) => (
  <BaseNode {...props} config={nodeConfigs.transform} />
);

export const ConditionalNode = (props) => (
  <BaseNode {...props} config={nodeConfigs.conditional} />
);

export const AggregatorNode = (props) => (
  <BaseNode {...props} config={nodeConfigs.aggregator} />
);

export const DelayNode = (props) => (
  <BaseNode {...props} config={nodeConfigs.delay} />
);
