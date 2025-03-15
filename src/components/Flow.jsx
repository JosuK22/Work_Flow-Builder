import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ProcessNode, DecisionNode, StartNode, StopNode } from './Nodes/CustomNodes';
import CustomEdge from './Edges/CustomEdge';
import { useWorkflow } from '../context/workflowContext';

function Flow() {
    const { nodes, setNodes, edges, setEdges } = useWorkflow(); // Consume context
  
    const onNodesChange = useCallback(
      (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
      [setNodes]
    );
  
    const onEdgesChange = useCallback(
      (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
      [setEdges]
    );
  
    const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge({ ...params, type: 'customEdge' }, eds)),
      [setEdges]
    );
  
    const onDragOver = (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    };
  
    const onDrop = (event) => {
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
    };
  
    const nodeTypes = useMemo(
      () => ({
        process: (props) => <ProcessNode {...props} setNodes={setNodes} setEdges={setEdges} />,
        decision: (props) => <DecisionNode {...props} setNodes={setNodes} setEdges={setEdges} />,
        startNode: (props) => <StartNode {...props} setNodes={setNodes} setEdges={setEdges} />,
        stopNode: (props) => <StopNode {...props} setNodes={setNodes} setEdges={setEdges} />,
      }),
      [setNodes, setEdges]
    );
  
    const edgeTypes = useMemo(
      () => ({
        customEdge: (props) => <CustomEdge {...props} setEdges={setEdges} />,
      }),
      [setEdges]
    );
  
    return (
      <div style={{ height: '100%' }} onDrop={onDrop} onDragOver={onDragOver}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    );
  }
  
  export default Flow;
