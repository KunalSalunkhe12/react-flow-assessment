export function DraggableNode({ type, label, icon: Icon }) {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.currentTarget.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="p-2 group flex flex-col items-center justify-center gap-2 min-w-22 w-fit h-18 rounded-lg border border-gray-200 bg-white cursor-grab transition-all duration-200 hover:scale-105 hover:border-primary text-gray-600 shadow-md"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.currentTarget.style.cursor = "grab")}
      draggable
    >
      <Icon className="w-5 h-5" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}
