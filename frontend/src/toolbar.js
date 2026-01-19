import { useState } from "react";
import {
  Search,
  ArrowDownToLine,
  ArrowUpFromLine,
  FileText,
  Workflow,
  Shuffle,
  Brain,
  MessageSquare,
  Database,
  Library,
} from "lucide-react";
import { DraggableNode } from "./draggableNode";

const tabs = [
  { id: "general", label: "General" },
  { id: "llms", label: "LLMs" },
  { id: "knowledge-base", label: "Knowledge Base" },
];

const generalNodes = [
  { type: "customInput", label: "Input", icon: ArrowDownToLine },
  { type: "customOutput", label: "Output", icon: ArrowUpFromLine },
  { type: "text", label: "Text", icon: FileText },
  { type: "pipeline", label: "Pipeline", icon: Workflow },
  { type: "transform", label: "Transform", icon: Shuffle },
];

const llmNodes = [
  { type: "openAI", label: "OpenAI", icon: Brain },
  { type: "customAI", label: "Custom", icon: MessageSquare },
];

const knowledgeBaseNodes = [
  { type: "vectorStore", label: "Vector Store", icon: Database },
  { type: "document", label: "Document", icon: Library },
];

const nodesByTab = {
  general: generalNodes,
  llms: llmNodes,
  "knowledge-base": knowledgeBaseNodes,
};

export function PipelineToolbar() {
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  const currentNodes = nodesByTab[activeTab] || [];

  const filteredNodes = searchQuery
    ? currentNodes.filter((node) =>
        node.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentNodes;

  return (
    <div className="border-b border-gray-200 bg-gray-50/50">
      <div className="flex items-center gap-4 px-4 pt-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-35 h-8 pl-8 pr-3 text-sm bg-white border border-gray-200 rounded-md outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex items-center gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "border-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-3">
          {filteredNodes.map((node) => (
            <DraggableNode
              key={node.type}
              type={node.type}
              label={node.label}
              icon={node.icon}
            />
          ))}
        </div>
        {filteredNodes.length === 0 && (
          <p className="text-sm text-gray-400">No nodes found</p>
        )}
      </div>
    </div>
  );
}
