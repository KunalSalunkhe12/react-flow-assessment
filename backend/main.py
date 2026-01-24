from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque


app = FastAPI()

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NodeData(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]


class EdgeData(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None


class PipelineData(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]


def is_dag(nodes: List[NodeData], edges: List[EdgeData]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses Kahn's algorithm (topological sort) to detect cycles.
    """
    # Create adjacency list and calculate in-degrees
    graph = defaultdict(list)
    in_degree = {node.id: 0 for node in nodes}
    
    # Build the graph
    for edge in edges:
        graph[edge.source].append(edge.target)
        in_degree[edge.target] += 1
    
    # Find all nodes with no incoming edges
    queue = deque([node_id for node_id, degree in in_degree.items() if degree == 0])
    
    # Process nodes with no incoming edges
    processed_count = 0
    
    while queue:
        current = queue.popleft()
        processed_count += 1
        
        # For each neighbor, reduce in-degree
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we processed all nodes, it's a DAG
    # If we couldn't process all nodes, there's a cycle
    return processed_count == len(nodes)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    """
    Parse the pipeline and return:
    - num_nodes: number of nodes in the pipeline
    - num_edges: number of edges in the pipeline
    - is_dag: whether the pipeline forms a valid DAG
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    
    # Check if it's a DAG
    dag_status = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag_status
    }