import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <PipelineToolbar />
        <div className="flex-1">
          <PipelineUI />
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
