import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react';
import styles from './edgestyles.module.css';

function CustomEdge({ id, sourceX, sourceY, targetX, targetY, markerEnd, setEdges }) {
  const [edgePath, labelX, labelY] = getBezierPath({ sourceX, sourceY, targetX, targetY });

  const handleDelete = (event) => {
    event.stopPropagation(); 
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} className={styles.edgeStyle} />
      <EdgeLabelRenderer>
        <div
          className={styles.edgeLabel}
          style={{
            position: 'absolute',
            left: `${labelX}px`,
            top: `${labelY}px`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'all', 
            zIndex: 10, 
          }}
        >
          <button className={styles.edgeDeleteButton} onClick={handleDelete}>
            ✖
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default CustomEdge;
