import React, { useRef } from 'react';
import { PlayCircle, Download, Upload } from 'lucide-react';
import { Button } from '../ui/Button';
import { useStore } from '../../store/workflowStore';

export function TopBar({ onTestClick }) {
  const { nodes, edges } = useStore();
  const fileInputRef = useRef(null);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ nodes, edges }, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "workflow.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result);
          if (parsed.nodes && parsed.edges) {
            useStore.setState({ nodes: parsed.nodes, edges: parsed.edges });
          } else {
            alert('Invalid workflow file format.');
          }
        } catch (err) {
          alert('Error parsing JSON file.');
        }
      };
      reader.readAsText(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <header className="h-14 border-b border-border-color bg-card flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded border border-border-color bg-[#0E0E10] text-primary flex items-center justify-center font-bold text-xs font-mono shadow-[0_0_8px_rgba(29,184,122,0.2)]">HR</div>
        <h1 className="font-semibold text-textMain">HR Workflow Designer</h1>
      </div>
      <div className="flex items-center gap-2">
        <input 
          type="file" 
          accept=".json" 
          style={{ display: 'none' }} 
          ref={fileInputRef}
          onChange={handleImport}
        />
        <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
          <Upload className="w-4 h-4 mr-1" /> Import
        </Button>
        <Button variant="secondary" onClick={handleExport}>
          <Download className="w-4 h-4 mr-1" /> Export
        </Button>
        <Button variant="primary" onClick={onTestClick}>
          <PlayCircle className="w-4 h-4 mr-1" /> Test Workflow
        </Button>
      </div>
    </header>
  );
}
