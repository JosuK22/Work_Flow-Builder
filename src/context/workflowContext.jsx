import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';

const WorkflowContext = createContext();

// Custom hook to use the Workflow context
export const useWorkflow = () => {
  return useContext(WorkflowContext);
};

// Provider component to wrap around the app and provide workflow state
export const WorkflowProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]); 
  const [edges, setEdges] = useState([]); 
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false); 
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false); 
  const [workflowName, setWorkflowName] = useState(""); 
  const [workflowList, setWorkflowList] = useState([]); 
  const [currentWorkflowIndex, setCurrentWorkflowIndex] = useState(null); 

  // Load saved workflows from localStorage
  const loadWorkflow = () => {
    const savedWorkflows = JSON.parse(localStorage.getItem("workflows")) || [];
    if (!Array.isArray(savedWorkflows)) {
      setWorkflowList([]); 
    } else {
      setWorkflowList(savedWorkflows);
    }
    setIsLoadModalOpen(true);
  };

  // Save current workflow to localStorage
  const saveWorkflow = () => {
    if (!workflowName.trim()) {
      alert("Please enter a workflow name.");
      return;
    }

    let savedWorkflows = JSON.parse(localStorage.getItem("workflows")) || [];
    const timestamp = new Date().toLocaleString();
    
    // Remove existing workflow if editing, else add new workflow
    if (currentWorkflowIndex !== null) {
      savedWorkflows.splice(currentWorkflowIndex, 1);
    } else if (savedWorkflows.length >= 5) {
      savedWorkflows.shift();
    }

    savedWorkflows.push({ name: workflowName, timestamp, nodes, edges });
    localStorage.setItem("workflows", JSON.stringify(savedWorkflows));
    setCurrentWorkflowIndex(savedWorkflows.length - 1); 
    setIsSaveModalOpen(false);
    alert("Workflow saved successfully!");
  };

  // Load a selected workflow into state
  const handleLoadWorkflow = (workflow, index) => {
    setNodes(workflow.nodes);
    setEdges(workflow.edges);
    setWorkflowName(workflow.name);
    setCurrentWorkflowIndex(index); 
    setIsLoadModalOpen(false);
  };

  // Workflow state changes handlers
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

  // Memoized context value to avoid unnecessary re-renders
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