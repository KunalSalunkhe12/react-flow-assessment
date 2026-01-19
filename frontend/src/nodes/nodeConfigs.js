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
    content: "This is a LLM.",
    contentStyle: { fontSize: "12px", color: "#666" },
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
    backgroundColor: "#f0f9ff",
    border: "2px solid #3b82f6",
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
    backgroundColor: "#fef3c7",
    border: "2px solid #f59e0b",
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
    backgroundColor: "#f3e8ff",
    border: "2px solid #a855f7",
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
    contentStyle: { fontSize: "11px", color: "#666", marginTop: "5px" },
    content: "Routes to 'true' or 'false' output",
  },

  aggregator: {
    title: "Aggregator",
    width: 220,
    minHeight: 150,
    backgroundColor: "#dcfce7",
    border: "2px solid #22c55e",
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
    backgroundColor: "#fee2e2",
    border: "2px solid #ef4444",
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
    content: "Delays execution by specified time",
    contentStyle: { fontSize: "11px", color: "#666", marginTop: "5px" },
  },
};
