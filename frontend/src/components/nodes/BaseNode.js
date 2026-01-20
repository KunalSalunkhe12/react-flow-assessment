import { useState, useEffect } from "react";
import { Handle } from "@xyflow/react";
import { useStore } from "../../store";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
          <Input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
          />
        );

      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            className="resize-vertical"
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(newValue) =>
              handleFieldChange(field.name, newValue)
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
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            min={field.min}
            max={field.max}
            step={field.step}
            className="w-full"
          />
        );

      case "checkbox":
        return (
          <Checkbox
            checked={value}
            onCheckedChange={(checked) =>
              handleFieldChange(field.name, checked)
            }
          />
        );

      case "color":
        return (
          <Input
            type="color"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
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
    backgroundColor: config.backgroundColor || "white",
    ...config.style,
  };

  return (
    <div
      style={nodeStyle}
      className="bg-white border-2 border-primary/50 rounded-md p-1"
    >
      {config.handles?.map((handle, index) => (
        <Handle
          key={`${handle.type}-${handle.id || index}`}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          className={`size-3! bg-primary!`}
        />
      ))}

      {config.title && (
        <div className="bg-primary/20 py-1 px-2 rounded-sm">{config.title}</div>
      )}

      <div className="px-2">
        {config.fields?.map((field) => {
          // Check if field should be shown based on showWhen condition
          if (field.showWhen) {
            const { field: dependentField, value: expectedValue } =
              field.showWhen;
            const dependentFieldValue = fieldValues[dependentField];

            // Don't show field if condition isn't met
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
