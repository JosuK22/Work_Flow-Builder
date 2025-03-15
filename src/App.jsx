import { useState } from "react";
import Flow from './components/Flow';
import Sidebar from './components/SideBar/SideBar';
import { WorkflowProvider } from "./context/workflowContext";
import './App.css';

function App() {
  return (
    <WorkflowProvider>
      <div className='app'>
        <div className='sideBar'>
          <Sidebar />
        </div>
        <div className='canvas'>
          <Flow />
        </div>
      </div>
    </WorkflowProvider>
  );
}

export default App;

