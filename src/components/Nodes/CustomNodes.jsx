import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from './nodestyles.module.css';

function BaseNode({ id, data, isConnectable, setNodes, setEdges, nodeType, hasSource, hasTarget }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(data.label);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  const handleDoubleClick = () => setIsEditing(true);
  const handleChange = (e) => setText(e.target.value);
  const handleBlur = () => {
    setIsEditing(false);
    setNodes((nodes) => nodes.map((node) => (node.id === id ? { ...node, data: { ...node.data, label: text } } : node)));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleBlur();
  };

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
  };

  return (
    <div
      className={`${styles[nodeType]} ${styles.baseNode}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && <button className={styles.nodeDeleteButton} onClick={handleDelete}>✖</button>}
      {hasTarget && <Handle type="target" position={Position.Top} isConnectable={isConnectable} />}
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={styles.nodeInput}
        />
      ) : (
        <div className={styles.nodeLabel} onDoubleClick={handleDoubleClick}>{text}</div>
      )}
      {hasSource && <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />}
    </div>
  );
}

const ProcessNode = (props) => <BaseNode {...props} nodeType="processNode" hasSource hasTarget />;
const DecisionNode = (props) => <BaseNode {...props} nodeType="decisionNode" hasSource hasTarget />;
const StartNode = (props) => <BaseNode {...props} nodeType="startNode" hasSource />;
const StopNode = (props) => <BaseNode {...props} nodeType="stopNode" hasTarget />;

export { ProcessNode, DecisionNode, StartNode, StopNode };
