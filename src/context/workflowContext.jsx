import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react'; // Import missing functions

const WorkflowContext = createContext();

export const useWorkflow = () => {
  return useContext(WorkflowContext);
};

export const WorkflowProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const loadWorkflow = () => {
    const savedNodes = JSON.parse(localStorage.getItem("workflowNodes")) || [];
    const savedEdges = JSON.parse(localStorage.getItem("workflowEdges")) || [];
    setNodes(savedNodes);
    setEdges(savedEdges);
  };

  const saveWorkflow = () => {
    localStorage.setItem("workflowNodes", JSON.stringify(nodes));
    localStorage.setItem("workflowEdges", JSON.stringify(edges));
    alert("Workflow saved successfully!");
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)), // This uses applyNodeChanges
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), // This uses applyEdgeChanges
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'customEdge' }, eds)), // This uses addEdge
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData('application/reactflow');

    if (!nodeType) return;

    const position = { x: event.clientX - 250, y: event.clientY - 50 }; // Adjust drop position

    const newNode = {
      id: `${nodes.length + 1}`,
      type: nodeType,
      position,
      data: { label: nodeType.charAt(0).toUpperCase() + nodeType.slice(1) },
    };

    setNodes((nds) => [...nds, newNode]);
  }, [nodes]);

  const value = useMemo(() => ({
    nodes,
    edges,
    setNodes,
    setEdges,
    loadWorkflow,
    saveWorkflow,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDragOver,
    onDrop,
  }), [nodes, edges, onNodesChange, onEdgesChange, onConnect, onDragOver, onDrop]);

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
};

