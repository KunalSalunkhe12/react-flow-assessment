import { useState, useEffect, useRef } from "react";
import { Handle, Position, useUpdateNodeInternals } from "@xyflow/react";
import { useStore } from "../../store";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const extractVariables = (text) => {
  if (!text) return [];

  // Match {{variableName}} pattern where variableName is a valid JS identifier
  const regex = /\{\{(\w+)\}\}/g;
  const variables = [];
  const seen = new Set();

  let match;
  while ((match = regex.exec(text)) !== null) {
    const varName = match[1];
    if (!seen.has(varName)) {
      variables.push(varName);
      seen.add(varName);
    }
  }

  return variables;
};

const calculateDimensions = (text, config) => {
  if (!config.dynamicSize) return null;

  const minWidth = config.minWidth || config.width || 200;
  const maxWidth = config.maxWidth || 300;
  const minHeight = config.minHeight || 100;

  const lines = (text || "").split("\n");
  const longestLine = lines.reduce(
    (max, line) => (line.length > max.length ? line : max),
    ""
  );

  const estimatedWidth = Math.min(
    Math.max(minWidth, longestLine.length * 8 + 60),
    maxWidth
  );

  const lineCount = Math.max(lines.length, 3);
  const estimatedHeight = Math.max(minHeight, lineCount * 24 + 80);

  return {
    width: estimatedWidth,
    height: estimatedHeight,
  };
};

export const BaseNode = ({ id, data, config }) => {
  const textareaRefs = useRef({});

  const [fieldValues, setFieldValues] = useState(() => {
    const initialValues = {};
    config.fields?.forEach((field) => {
      const defaultValue =
        data?.[field.name] ||
        (field.defaultValue
          ? typeof field.defaultValue === "function"
            ? field.defaultValue(id)
            : field.defaultValue
          : "");
      initialValues[field.name] = defaultValue;
    });
    return initialValues;
  });

  const [detectedVariables, setDetectedVariables] = useState(() => {
    const variables = [];
    config.fields?.forEach((field) => {
      if (
        field.enableVariables &&
        (field.type === "textarea" || field.type === "text")
      ) {
        const fieldVars = extractVariables(fieldValues[field.name]);
        variables.push(...fieldVars);
      }
    });
    return [...new Set(variables)];
  });

  const [dynamicDimensions, setDynamicDimensions] = useState(() => {
    if (!config.dynamicSize) return null;

    const textField = config.fields?.find(
      (f) =>
        (f.type === "textarea" || f.type === "text") &&
        f.enableVariables !== false
    );

    if (textField) {
      return calculateDimensions(fieldValues[textField.name], config);
    }
    return null;
  });

  const updateNodeField = useStore((state) => state.updateNodeField);
  const deleteNode = useStore((state) => state.deleteNode);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    if (config.enableVariableHandles) {
      console.log(`[${id}] Updating node internals due to variable changes`);
      updateNodeInternals(id);
    }
  }, [
    detectedVariables,
    id,
    updateNodeInternals,
    config.enableVariableHandles,
  ]);

  const handleFieldChange = (fieldName, value, field) => {
    setFieldValues((prev) => ({ ...prev, [fieldName]: value }));
    updateNodeField(id, fieldName, value);

    if (
      field.enableVariables &&
      (field.type === "textarea" || field.type === "text")
    ) {
      const allVariables = [];

      config.fields?.forEach((f) => {
        if (f.enableVariables && (f.type === "textarea" || f.type === "text")) {
          const text = f.name === fieldName ? value : fieldValues[f.name];
          const vars = extractVariables(text);
          allVariables.push(...vars);
        }
      });

      setDetectedVariables([...new Set(allVariables)]);
    }

    if (
      config.dynamicSize &&
      (field.type === "textarea" || field.type === "text")
    ) {
      const newDimensions = calculateDimensions(value, config);
      if (newDimensions) {
        setDynamicDimensions(newDimensions);
      }
    }
  };

  useEffect(() => {
    config.fields?.forEach((field) => {
      if (
        data?.[field.name] !== undefined &&
        data[field.name] !== fieldValues[field.name]
      ) {
        setFieldValues((prev) => ({ ...prev, [field.name]: data[field.name] }));
      }
    });
  }, [data, config.fields, fieldValues]);

  useEffect(() => {
    Object.keys(textareaRefs.current).forEach((fieldName) => {
      const textarea = textareaRefs.current[fieldName];
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    });
  }, [fieldValues]);

  const renderField = (field) => {
    const value = fieldValues[field.name] || "";

    switch (field.type) {
      case "text":
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) =>
              handleFieldChange(field.name, e.target.value, field)
            }
            placeholder={field.placeholder}
          />
        );

      case "textarea":
        return (
          <Textarea
            ref={(el) => {
              if (el) textareaRefs.current[field.name] = el;
            }}
            value={value}
            onChange={(e) =>
              handleFieldChange(field.name, e.target.value, field)
            }
            placeholder={field.placeholder}
            rows={field.rows || 3}
            className={`resize-vertical ${config.dynamicSize ? "resize-none overflow-hidden" : ""}`}
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(newValue) =>
              handleFieldChange(field.name, newValue, field)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "number":
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) =>
              handleFieldChange(field.name, e.target.value, field)
            }
            min={field.min}
            max={field.max}
            step={field.step}
            className="w-full"
          />
        );

      case "checkbox":
        return (
          <Checkbox
            className="mt-2! ml-2!"
            checked={value}
            onCheckedChange={(checked) =>
              handleFieldChange(field.name, checked, field)
            }
          />
        );

      case "color":
        return (
          <Input
            type="color"
            value={value}
            onChange={(e) =>
              handleFieldChange(field.name, e.target.value, field)
            }
          />
        );

      default:
        return null;
    }
  };

  const nodeStyle = dynamicDimensions
    ? {
        width: dynamicDimensions.width,
        height: "auto",
        minHeight: dynamicDimensions.height,
        backgroundColor: config.backgroundColor || "white",
        ...config.style,
      }
    : {
        width: config.width || 200,
        height: config.height || "auto",
        minHeight: config.minHeight || 80,
        backgroundColor: config.backgroundColor || "white",
        ...config.style,
      };

  const allHandles = [...(config.handles || [])];

  if (config.enableVariableHandles && detectedVariables.length > 0) {
    detectedVariables.forEach((variable, index) => {
      const handleCount = detectedVariables.length;
      const spacing = 100 / (handleCount + 1);
      const topPosition = `${spacing * (index + 1)}%`;

      allHandles.push({
        type: "target",
        position: Position.Left,
        id: variable,
        style: { top: topPosition },
        title: variable,
      });
    });
  }

  return (
    <div
      style={nodeStyle}
      className="bg-white border-2 border-primary/50 rounded-md p-1 relative"
    >
      {allHandles.map((handle, index) => (
        <Handle
          key={`${handle.type}-${handle.id || index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{
            ...handle.style,
            position: "absolute",
          }}
          className={
            handle.className || "w-3! h-3! bg-primary! border-2! border-white!"
          }
        />
      ))}

      {config.title && (
        <div className="bg-primary/20 py-1 px-2 rounded-sm flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <span className="font-medium">{config.title}</span>
            {config.enableVariableHandles && detectedVariables.length > 0 && (
              <span className="text-xs text-blue-600">
                ({detectedVariables.length} variable
                {detectedVariables.length !== 1 ? "s" : ""}:{" "}
                {detectedVariables.join(", ")})
              </span>
            )}
          </div>

          <button
            onClick={() => deleteNode(id)}
            className="cursor-pointer hover:bg-primary/30 rounded p-0.5 transition-colors"
            title="Delete node"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="px-2">
        {config.fields?.map((field) => {
          if (field.showWhen) {
            const { field: dependentField, value: expectedValue } =
              field.showWhen;
            const dependentFieldValue = fieldValues[dependentField];

            if (dependentFieldValue !== expectedValue) {
              return null;
            }
          }

          return (
            <div key={field.name} className="space-y-2 my-2">
              {field.label && (
                <label className="text-xs font-medium">{field.label}</label>
              )}
              {renderField(field)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
