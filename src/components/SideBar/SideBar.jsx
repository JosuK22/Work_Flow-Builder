import { useEffect, useState } from 'react';
import styles from './sidebar.module.css';
import { useWorkflow } from '../../context/workflowContext';

const Sidebar = () => {
    const { nodes, edges, loadWorkflow, saveWorkflow } = useWorkflow(); // Consume context
    const [showSave, setShowSave] = useState(nodes.length > 0);
  
    useEffect(() => {
      setShowSave(nodes.length > 0);
    }, [nodes]);
  
    return (
      <div className={styles.sidebar}>
        <h3>Drag Nodes</h3>
        <div className={styles.nodeItem} onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'startNode')} draggable>
          Start Node
        </div>
        <div className={styles.nodeItem} onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'process')} draggable>
          Process Node
        </div>
        <div className={styles.nodeItem} onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'decision')} draggable>
          Decision Node
        </div>
        <div className={styles.nodeItem} onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'stopNode')} draggable>
          Stop Node
        </div>
  
        {/* Button to load workflow from Local Storage */}
        <div className={styles.loadItems} onClick={loadWorkflow}>
          Load Workflow
        </div>
  
        {showSave && (
          <div className={styles.saveItems} onClick={saveWorkflow}>
            Save Workflow
          </div>
        )}
      </div>
    );
  };
  
  export default Sidebar;
