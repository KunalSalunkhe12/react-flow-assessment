import { useState, useEffect } from "react";
import { Handle } from "@xyflow/react";
import { useStore } from "../store";

export const BaseNode = ({ id, data, config }) => {
  // Initialize state for all fields defined in config
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

  const updateNodeField = useStore((state) => state.updateNodeField);

  // Handle field changes
  const handleFieldChange = (fieldName, value) => {
    setFieldValues((prev) => ({ ...prev, [fieldName]: value }));
    updateNodeField(id, fieldName, value);
  };

  // Sync with external data changes
  useEffect(() => {
    config.fields?.forEach((field) => {
      if (
        data?.[field.name] !== undefined &&
        data[field.name] !== fieldValues[field.name]
      ) {
        setFieldValues((prev) => ({ ...prev, [field.name]: data[field.name] }));
      }
    });
  }, [data, config.fields]);

  // Render field based on type
  const renderField = (field) => {
    const value = fieldValues[field.name] || "";

    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            style={{ width: "100%", ...field.style }}
          />
        );

      case "textarea":
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            style={{ width: "100%", resize: "vertical", ...field.style }}
          />
        );

      case "select":
        return (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            style={{ width: "100%", ...field.style }}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "number":
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            min={field.min}
            max={field.max}
            step={field.step}
            style={{ width: "100%", ...field.style }}
          />
        );

      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleFieldChange(field.name, e.target.checked)}
            style={field.style}
          />
        );

      case "color":
        return (
          <input
            type="color"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            style={field.style}
          />
        );

      default:
        return null;
    }
  };

  const nodeStyle = {
    width: config.width || 200,
    height: config.height || "auto",
    minHeight: config.minHeight || 80,
    border: config.border || "1px solid black",
    borderRadius: config.borderRadius || "4px",
    padding: config.padding || "10px",
    backgroundColor: config.backgroundColor || "white",
    ...config.style,
  };

  return (
    <div style={nodeStyle}>
      {/* Render handles */}
      {config.handles?.map((handle, index) => (
        <Handle
          key={`${handle.type}-${handle.id || index}`}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style}
        />
      ))}

      {/* Render title */}
      {config.title && (
        <div
          style={{
            fontWeight: "bold",
            marginBottom: "8px",
            fontSize: "14px",
            ...config.titleStyle,
          }}
        >
          {config.title}
        </div>
      )}

      {/* Render custom content if provided */}
      {config.content && (
        <div style={{ marginBottom: "8px", ...config.contentStyle }}>
          {typeof config.content === "function"
            ? config.content(fieldValues, id)
            : config.content}
        </div>
      )}

      {/* Render fields */}
      {config.fields?.map((field) => (
        <div
          key={field.name}
          style={{ marginBottom: "8px", ...field.containerStyle }}
        >
          {field.label && (
            <label
              style={{
                display: "block",
                fontSize: "12px",
                marginBottom: "4px",
                ...field.labelStyle,
              }}
            >
              {field.label}
            </label>
          )}
          {renderField(field)}
        </div>
      ))}
    </div>
  );
};
