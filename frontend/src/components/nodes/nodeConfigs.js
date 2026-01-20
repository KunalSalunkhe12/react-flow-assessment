import { Position } from "@xyflow/react";

const createDefaultName = (id, prefix) =>
  id.replace(`${prefix}-`, `${prefix}_`);

export const nodeConfigs = {
  customInput: {
    title: "Input",
    width: 200,
    minHeight: 120,
    handles: [{ type: "source", position: Position.Right, id: "value" }],
    fields: [
      {
        name: "inputName",
        label: "Name:",
        type: "text",
        defaultValue: (id) => createDefaultName(id, "input"),
      },
      {
        name: "inputType",
        label: "Type:",
        type: "select",
        defaultValue: "Text",
        options: [
          { value: "Text", label: "Text" },
          { value: "File", label: "File" },
        ],
      },
    ],
  },

  customOutput: {
    title: "Output",
    width: 200,
    minHeight: 120,
    handles: [{ type: "target", position: Position.Left, id: "value" }],
    fields: [
      {
        name: "outputName",
        label: "Name:",
        type: "text",
        defaultValue: (id) => createDefaultName(id, "output"),
      },
      {
        name: "outputType",
        label: "Type:",
        type: "select",
        defaultValue: "Text",
        options: [
          { value: "Text", label: "Text" },
          { value: "File", label: "Image" },
        ],
      },
    ],
  },

  llm: {
    title: "LLM",
    width: 200,
    minHeight: 100,
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: "system",
        style: { top: "33%" },
      },
      {
        type: "target",
        position: Position.Left,
        id: "prompt",
        style: { top: "66%" },
      },
      { type: "source", position: Position.Right, id: "response" },
    ],
  },

  text: {
    title: "Text",
    width: 200,
    minHeight: 100,
    handles: [{ type: "source", position: Position.Right, id: "output" }],
    fields: [
      {
        name: "text",
        label: "Text:",
        type: "text",
        defaultValue: "{{input}}",
        placeholder: "Enter text...",
      },
    ],
  },

  filter: {
    title: "Filter",
    width: 220,
    minHeight: 140,
    handles: [
      { type: "target", position: Position.Left, id: "input" },
      { type: "source", position: Position.Right, id: "output" },
    ],
    fields: [
      {
        name: "filterType",
        label: "Filter Type:",
        type: "select",
        defaultValue: "contains",
        options: [
          { value: "contains", label: "Contains" },
          { value: "startsWith", label: "Starts With" },
          { value: "endsWith", label: "Ends With" },
          { value: "regex", label: "Regex" },
        ],
      },
      {
        name: "filterValue",
        label: "Filter Value:",
        type: "text",
        placeholder: "Enter filter value...",
      },
      {
        name: "caseSensitive",
        label: "Case Sensitive",
        type: "checkbox",
        defaultValue: false,
      },
    ],
  },

  transform: {
    title: "Transform",
    width: 220,
    minHeight: 160,
    handles: [
      { type: "target", position: Position.Left, id: "input" },
      { type: "source", position: Position.Right, id: "output" },
    ],
    fields: [
      {
        name: "operation",
        label: "Operation:",
        type: "select",
        defaultValue: "uppercase",
        options: [
          { value: "uppercase", label: "Uppercase" },
          { value: "lowercase", label: "Lowercase" },
          { value: "trim", label: "Trim" },
          { value: "reverse", label: "Reverse" },
          { value: "replace", label: "Replace" },
        ],
      },
      {
        name: "replaceFrom",
        label: "Replace From:",
        type: "text",
        placeholder: "Text to replace...",
      },
      {
        name: "replaceTo",
        label: "Replace To:",
        type: "text",
        placeholder: "Replacement text...",
      },
    ],
  },

  conditional: {
    title: "Conditional",
    width: 240,
    minHeight: 160,
    handles: [
      { type: "target", position: Position.Left, id: "input" },
      {
        type: "source",
        position: Position.Right,
        id: "true",
        style: { top: "40%" },
      },
      {
        type: "source",
        position: Position.Right,
        id: "false",
        style: { top: "70%" },
      },
    ],
    fields: [
      {
        name: "condition",
        label: "Condition:",
        type: "select",
        defaultValue: "equals",
        options: [
          { value: "equals", label: "Equals" },
          { value: "notEquals", label: "Not Equals" },
          { value: "greaterThan", label: "Greater Than" },
          { value: "lessThan", label: "Less Than" },
          { value: "isEmpty", label: "Is Empty" },
        ],
      },
      {
        name: "compareValue",
        label: "Compare Value:",
        type: "text",
        placeholder: "Value to compare...",
      },
    ],
  },

  aggregator: {
    title: "Aggregator",
    width: 220,
    minHeight: 150,
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: "input1",
        style: { top: "25%" },
      },
      {
        type: "target",
        position: Position.Left,
        id: "input2",
        style: { top: "50%" },
      },
      {
        type: "target",
        position: Position.Left,
        id: "input3",
        style: { top: "75%" },
      },
      { type: "source", position: Position.Right, id: "output" },
    ],
    fields: [
      {
        name: "aggregationType",
        label: "Aggregation:",
        type: "select",
        defaultValue: "concat",
        options: [
          { value: "concat", label: "Concatenate" },
          { value: "sum", label: "Sum" },
          { value: "average", label: "Average" },
          { value: "max", label: "Maximum" },
          { value: "min", label: "Minimum" },
        ],
      },
      {
        name: "separator",
        label: "Separator:",
        type: "text",
        defaultValue: ", ",
        placeholder: "Separator for concat...",
      },
    ],
  },

  delay: {
    title: "Delay",
    width: 200,
    minHeight: 120,
    handles: [
      { type: "target", position: Position.Left, id: "input" },
      { type: "source", position: Position.Right, id: "output" },
    ],
    fields: [
      {
        name: "delayAmount",
        label: "Delay (ms):",
        type: "number",
        defaultValue: 1000,
        min: 0,
        max: 10000,
        step: 100,
      },
      {
        name: "delayEnabled",
        label: "Enabled",
        type: "checkbox",
        defaultValue: true,
      },
    ],
  },

  pipeline: {
    title: "Pipeline",
    width: 240,
    minHeight: 180,
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: "input",
        style: { top: "30%" },
      },
      {
        type: "source",
        position: Position.Right,
        id: "output",
        style: { top: "30%" },
      },
      {
        type: "target",
        position: Position.Left,
        id: "control",
        style: { top: "70%" },
      },
    ],
    fields: [
      {
        name: "pipelineName",
        label: "Pipeline Name:",
        type: "text",
        defaultValue: (id) => createDefaultName(id, "pipeline"),
        placeholder: "Enter pipeline name...",
      },
      {
        name: "description",
        label: "Description:",
        type: "textarea",
        rows: 2,
        placeholder: "Describe the pipeline...",
      },
      {
        name: "executionMode",
        label: "Execution Mode:",
        type: "select",
        defaultValue: "sequential",
        options: [
          { value: "sequential", label: "Sequential" },
          { value: "parallel", label: "Parallel" },
          { value: "conditional", label: "Conditional" },
        ],
      },
    ],
  },

  openAI: {
    title: "OpenAI",
    width: 280,
    minHeight: 240,
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: "system",
        style: { top: "25%" },
      },
      {
        type: "target",
        position: Position.Left,
        id: "prompt",
        style: { top: "50%" },
      },
      { type: "source", position: Position.Right, id: "response" },
    ],
    fields: [
      {
        name: "systemInstruction",
        label: "System Instruction:",
        type: "textarea",
        rows: 3,
        placeholder: "You are a helpful assistant...",
        defaultValue: "You are a helpful assistant.",
      },
      {
        name: "prompt",
        label: "Prompt:",
        type: "textarea",
        rows: 3,
        placeholder: "Enter your prompt or use {{variable}}...",
        defaultValue: "{{input}}",
      },
      {
        name: "model",
        label: "Model:",
        type: "select",
        defaultValue: "gpt-4o",
        options: [
          { value: "gpt-4o", label: "GPT-4o" },
          { value: "gpt-4o-mini", label: "GPT-4o Mini" },
          { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
          { value: "gpt-4", label: "GPT-4" },
          { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
        ],
      },
      {
        name: "temperature",
        label: "Temperature:",
        type: "number",
        defaultValue: 0.7,
        min: 0,
        max: 2,
        step: 0.1,
      },
      {
        name: "maxTokens",
        label: "Max Tokens:",
        type: "number",
        defaultValue: 1000,
        min: 1,
        max: 4096,
        step: 1,
      },
      {
        name: "usePersonalKey",
        label: "Use Personal API Key",
        type: "checkbox",
        defaultValue: false,
      },
      {
        name: "apiKey",
        label: "API Key:",
        type: "text",
        placeholder: "sk-...",
        defaultValue: "",
        showWhen: { field: "usePersonalKey", value: true },
      },
    ],
  },

  customAI: {
    title: "Custom AI",
    width: 280,
    minHeight: 260,
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: "system",
        style: { top: "25%" },
      },
      {
        type: "target",
        position: Position.Left,
        id: "prompt",
        style: { top: "50%" },
      },
      { type: "source", position: Position.Right, id: "response" },
    ],
    fields: [
      {
        name: "apiEndpoint",
        label: "API Endpoint:",
        type: "text",
        placeholder: "https://api.example.com/v1/chat/completions",
        defaultValue: "",
      },
      {
        name: "modelName",
        label: "Model Name:",
        type: "text",
        placeholder: "custom-model-name",
        defaultValue: "",
      },
      {
        name: "systemInstruction",
        label: "System Instruction:",
        type: "textarea",
        rows: 3,
        placeholder: "You are a helpful assistant...",
        defaultValue: "You are a helpful assistant.",
      },
      {
        name: "prompt",
        label: "Prompt:",
        type: "textarea",
        rows: 3,
        placeholder: "Enter your prompt or use {{variable}}...",
        defaultValue: "{{input}}",
      },
      {
        name: "apiKey",
        label: "API Key:",
        type: "text",
        placeholder: "Your API key...",
        defaultValue: "",
      },
      {
        name: "temperature",
        label: "Temperature:",
        type: "number",
        defaultValue: 0.7,
        min: 0,
        max: 2,
        step: 0.1,
      },
      {
        name: "maxTokens",
        label: "Max Tokens:",
        type: "number",
        defaultValue: 1000,
        min: 1,
        max: 8192,
        step: 1,
      },
      {
        name: "requestFormat",
        label: "Request Format:",
        type: "select",
        defaultValue: "openai",
        options: [
          { value: "openai", label: "OpenAI Compatible" },
          { value: "anthropic", label: "Anthropic Claude" },
          { value: "custom", label: "Custom JSON" },
        ],
      },
    ],
  },

  vectorStore: {
    title: "Vector Store",
    width: 260,
    minHeight: 220,
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: "query",
        style: { top: "30%" },
      },
      {
        type: "target",
        position: Position.Left,
        id: "documents",
        style: { top: "60%" },
      },
      { type: "source", position: Position.Right, id: "results" },
    ],
    fields: [
      {
        name: "storeName",
        label: "Store Name:",
        type: "text",
        defaultValue: (id) => createDefaultName(id, "vectorstore"),
        placeholder: "my-vector-store",
      },
      {
        name: "embeddingModel",
        label: "Embedding Model:",
        type: "select",
        defaultValue: "text-embedding-3-small",
        options: [
          { value: "text-embedding-3-small", label: "OpenAI Small" },
          { value: "text-embedding-3-large", label: "OpenAI Large" },
          { value: "text-embedding-ada-002", label: "OpenAI Ada-002" },
          { value: "custom", label: "Custom" },
        ],
      },
      {
        name: "collectionName",
        label: "Collection:",
        type: "text",
        placeholder: "default",
        defaultValue: "default",
      },
      {
        name: "topK",
        label: "Top K Results:",
        type: "number",
        defaultValue: 5,
        min: 1,
        max: 100,
        step: 1,
      },
      {
        name: "similarityThreshold",
        label: "Similarity Threshold:",
        type: "number",
        defaultValue: 0.7,
        min: 0,
        max: 1,
        step: 0.05,
      },
      {
        name: "operation",
        label: "Operation:",
        type: "select",
        defaultValue: "search",
        options: [
          { value: "search", label: "Search" },
          { value: "insert", label: "Insert" },
          { value: "delete", label: "Delete" },
        ],
      },
    ],
  },

  document: {
    title: "Document",
    width: 260,
    minHeight: 200,
    handles: [
      { type: "target", position: Position.Left, id: "input" },
      { type: "source", position: Position.Right, id: "content" },
      {
        type: "source",
        position: Position.Right,
        id: "chunks",
        style: { top: "70%" },
      },
    ],
    fields: [
      {
        name: "documentName",
        label: "Document Name:",
        type: "text",
        defaultValue: (id) => createDefaultName(id, "document"),
        placeholder: "my-document",
      },
      {
        name: "documentType",
        label: "Document Type:",
        type: "select",
        defaultValue: "text",
        options: [
          { value: "text", label: "Text" },
          { value: "pdf", label: "PDF" },
          { value: "markdown", label: "Markdown" },
          { value: "html", label: "HTML" },
          { value: "docx", label: "Word Document" },
        ],
      },
      {
        name: "source",
        label: "Source:",
        type: "select",
        defaultValue: "upload",
        options: [
          { value: "upload", label: "File Upload" },
          { value: "url", label: "URL" },
          { value: "text", label: "Direct Text" },
        ],
      },
      {
        name: "content",
        label: "Content:",
        type: "textarea",
        rows: 4,
        placeholder: "Enter text or paste URL...",
        defaultValue: "",
      },
      {
        name: "chunkSize",
        label: "Chunk Size:",
        type: "number",
        defaultValue: 1000,
        min: 100,
        max: 5000,
        step: 100,
      },
      {
        name: "chunkOverlap",
        label: "Chunk Overlap:",
        type: "number",
        defaultValue: 200,
        min: 0,
        max: 1000,
        step: 50,
      },
      {
        name: "enableChunking",
        label: "Enable Chunking",
        type: "checkbox",
        defaultValue: true,
      },
    ],
  },
};
