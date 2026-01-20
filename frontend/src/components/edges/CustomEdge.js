import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from "@xyflow/react";
import { X } from "lucide-react";
import { useStore } from "../../store";

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const deleteEdge = useStore((state) => state.deleteEdge);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = (evt) => {
    evt.stopPropagation();
    deleteEdge(id);
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <button
            className="cursor-pointer w-5 h-5 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-red-50 hover:border-red-400 transition-colors shadow-sm"
            onClick={onEdgeClick}
            title="Delete edge"
          >
            <X className="w-3 h-3 text-gray-600" />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
