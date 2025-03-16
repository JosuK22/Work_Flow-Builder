import { useEffect, useState } from 'react';
import styles from './sidebar.module.css';
import { useWorkflow } from '../../context/workflowContext';
import Modal from '../Modal/Modal';

const Sidebar = () => {
  const {
    nodes,
    loadWorkflow,
    saveWorkflow,
    isSaveModalOpen,
    setIsSaveModalOpen,
    isLoadModalOpen,
    setIsLoadModalOpen,
    workflowName,
    setWorkflowName,
    workflowList,
    handleLoadWorkflow,
  } = useWorkflow();

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

      <div className={styles.loadItems} onClick={loadWorkflow}>Load Workflow</div>

      {showSave && (
        <div className={styles.saveItems} onClick={() => {
          setWorkflowName(workflowName || ""); // Pre-fill if editing
          setIsSaveModalOpen(true);
        }}>
          Save Workflow
        </div>
      )}

      {isSaveModalOpen && (
        <Modal toggleModal={() => setIsSaveModalOpen(false)}>

          <div className={styles.saveModal}>
            <p className={styles.modalTitle}>Save Workflow</p>
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              placeholder="Enter workflow name"
              className={styles.workflowName}
            />
            <div className={styles.modalButtons}>
              <button onClick={saveWorkflow} className={styles.button}>Save</button>
              <button onClick={() => setIsSaveModalOpen(false)} className={styles.button}>Cancel</button>
            </div>
          </div>
         
        </Modal>
      )}

      {isLoadModalOpen && (
        <Modal toggleModal={() => setIsLoadModalOpen(false)}>
        <h3 className={styles.modalTitle}>Load Workflow</h3>
        <div className={styles.workflowList}>
          {workflowList.length === 0 ? (
            <p>No saved workflows.</p>
          ) : (
            workflowList.map((workflow, index) => (
              <div key={index} onClick={() => handleLoadWorkflow(workflow, index)} className={styles.workflowItem}>
                <p>{workflow.name} - {workflow.timestamp}</p>
              </div>
            ))
          )}
        </div>
        <button onClick={() => setIsLoadModalOpen(false)} className={styles.button}>Cancel</button>
      </Modal>
      )}
    </div>
  );
};

export default Sidebar;
