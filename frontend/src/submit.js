import { Button } from "./components/ui/Button";
import { useStore } from "./store";
import { toast } from "sonner";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    // Show loading toast
    const loadingToast = toast.loading("Analyzing pipeline...");

    try {
      // Prepare pipeline data
      const pipelineData = {
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data,
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle,
        })),
      };

      // Send to backend
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pipelineData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show success toast with results
      if (result.is_dag) {
        toast.success("Pipeline Analysis Complete", {
          description: (
            <div className="space-y-1">
              <div>✓ Valid Directed Acyclic Graph</div>
              <div className="text-sm opacity-80">
                Nodes: {result.num_nodes} | Edges: {result.num_edges}
              </div>
            </div>
          ),
          duration: 5000,
        });
      } else {
        toast.warning("Pipeline Contains Cycles", {
          description: (
            <div className="space-y-1">
              <div>✗ Not a valid DAG</div>
              <div className="text-sm opacity-80">
                Nodes: {result.num_nodes} | Edges: {result.num_edges}
              </div>
            </div>
          ),
          duration: 5000,
        });
      }
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show error toast
      toast.error("Submission Failed", {
        description: error.message || "Failed to analyze pipeline",
        duration: 5000,
      });
      console.error("Error submitting pipeline:", error);
    }
  };

  return (
    <div>
      <Button
        type="button"
        onClick={handleSubmit}
        variant="default"
        className="cursor-pointer"
      >
        Submit
      </Button>
    </div>
  );
};
