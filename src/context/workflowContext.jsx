import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';

const WorkflowContext = createContext();

export const useWorkflow = () => {
  return useContext(WorkflowContext);
};

export const WorkflowProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState("");
  const [workflowList, setWorkflowList] = useState([]);
  const [currentWorkflowIndex, setCurrentWorkflowIndex] = useState(null); // Track index of the loaded workflow

  const loadWorkflow = () => {
    const savedWorkflows = JSON.parse(localStorage.getItem("workflows")) || [];
    setWorkflowList(savedWorkflows);
    setIsLoadModalOpen(true);
  };

  const saveWorkflow = () => {
    if (!workflowName.trim()) {
      alert("Please enter a workflow name.");
      return;
    }

    let savedWorkflows = JSON.parse(localStorage.getItem("workflows")) || [];
    const timestamp = new Date().toLocaleString();
    
    if (currentWorkflowIndex !== null) {
      // Remove the loaded workflow and add the updated one at the end
      savedWorkflows.splice(currentWorkflowIndex, 1);
    } else if (savedWorkflows.length >= 5) {
      // If new workflow, remove the oldest item
      savedWorkflows.shift();
    }

    // Add the updated or new workflow at the last position
    savedWorkflows.push({ name: workflowName, timestamp, nodes, edges });

    localStorage.setItem("workflows", JSON.stringify(savedWorkflows));
    setCurrentWorkflowIndex(savedWorkflows.length - 1); // Update index to last item
    setIsSaveModalOpen(false);
    alert("Workflow saved successfully!");
  };

  const handleLoadWorkflow = (workflow, index) => {
    setNodes(workflow.nodes);
    setEdges(workflow.edges);
    setWorkflowName(workflow.name);
    setCurrentWorkflowIndex(index); // Track which workflow is loaded
    setIsLoadModalOpen(false);
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'customEdge' }, eds)),
    []
  );

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
    isSaveModalOpen,
    setIsSaveModalOpen,
    isLoadModalOpen,
    setIsLoadModalOpen,
    workflowName,
    setWorkflowName,
    workflowList,
    handleLoadWorkflow,
  }), [nodes, edges, isSaveModalOpen, isLoadModalOpen, workflowName, workflowList]);

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
};
