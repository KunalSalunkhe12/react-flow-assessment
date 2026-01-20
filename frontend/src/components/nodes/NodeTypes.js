// nodeTypes.js
// Wrapper components for each node type using BaseNode abstraction

import { BaseNode } from "./BaseNode";
import { nodeConfigs } from "./nodeConfigs";

export const InputNode = (props) => (
  <BaseNode {...props} config={nodeConfigs.customInput} />
);

export const OutputNode = (props) => (
  <BaseNode {...props} config={nodeConfigs.customOutput} />
);

export const TextNode = (props) => (
  <BaseNode {...props} config={nodeConfigs.text} />
);

export const TransformNode = (props) => (
  <BaseNode {...props} config={nodeConfigs.transform} />
);

export const PipelineNode = (props) => (
  <BaseNode {...props} config={nodeConfigs.pipeline} />
);

export const OpenAINode = (props) => (
  <BaseNode {...props} config={nodeConfigs.openAI} />
);

export const CustomAINode = (props) => (
  <BaseNode {...props} config={nodeConfigs.customAI} />
);

export const VectorStoreNode = (props) => (
  <BaseNode {...props} config={nodeConfigs.vectorStore} />
);

export const DocumentNode = (props) => (
  <BaseNode {...props} config={nodeConfigs.document} />
);
