import React, { useState, useEffect } from 'react';
import { useNodeForm } from '../../hooks/useNodeForm';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';
import { getAutomations } from '../../api';

export function AutomatedStepNodeForm({ nodeId }) {
  const { formData, handleChange, setFormData, save, reset } = useNodeForm(nodeId);
  const [automations, setAutomations] = useState([]);
  
  useEffect(() => {
    let active = true;
    getAutomations().then((res) => {
      if (active) setAutomations(res);
    });
    return () => { active = false; };
  }, []);

  const selectedAction = automations.find(a => a.id === formData.actionId);

  const handleActionChange = (actionId) => {
    setFormData(prev => ({ ...prev, actionId, actionParams: {} }));
  };

  const handleParamChange = (param, value) => {
    setFormData(prev => ({
      ...prev,
      actionParams: {
        ...(prev.actionParams || {}),
        [param]: value
      }
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input 
          value={formData.title || ''} 
          onChange={(e) => handleChange('title', e.target.value)} 
          placeholder="e.g. Notify Slack"
        />
      </div>

      <div className="space-y-2">
        <Label>Action</Label>
        <select
          className="flex h-9 w-full rounded border border-border-color bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue focus-visible:border-blue text-textMain transition-colors"
          value={formData.actionId || ''}
          onChange={(e) => handleActionChange(e.target.value)}
        >
          <option value="" disabled>Select an action</option>
          {automations.map(a => (
            <option key={a.id} value={a.id}>{a.label}</option>
          ))}
        </select>
      </div>

      {selectedAction && selectedAction.params.length > 0 && (
        <div className="space-y-3 mt-2">
          <Label className="text-xs font-mono uppercase tracking-widest text-textMuted">Action Parameters</Label>
          <div className="pl-3 border-l-2 border-border-color space-y-3">
            {selectedAction.params.map(param => (
              <div key={param} className="space-y-1">
                <Label className="text-xs text-[#cbc4d2]">{param}</Label>
                <Input 
                  value={formData.actionParams?.[param] || ''} 
                  onChange={(e) => handleParamChange(param, e.target.value)} 
                  className="h-8 text-xs"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border-color">
        <Button variant="secondary" onClick={reset}>Reset</Button>
        <Button variant="primary" onClick={save}>Save</Button>
      </div>
    </div>
  );
}
