import React from 'react';
import { useNodeForm } from '../../hooks/useNodeForm';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';

export function TaskNodeForm({ nodeId }) {
  const { formData, setFormData, handleChange, save, reset } = useNodeForm(nodeId);

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input 
          value={formData.title || ''} 
          onChange={(e) => handleChange('title', e.target.value)} 
          placeholder="e.g. Upload Documents"
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <textarea
          className="flex min-h-[80px] w-full rounded border border-border-color bg-background px-3 py-2 text-sm shadow-sm placeholder:text-textMuted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue focus-visible:border-blue text-textMain transition-colors custom-scrollbar"
          value={formData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Instructions for the user..."
        />
      </div>

      <div className="space-y-2">
        <Label>Assignee</Label>
        <Input 
          value={formData.assignee || ''} 
          onChange={(e) => handleChange('assignee', e.target.value)} 
          placeholder="e.g. HR Manager"
        />
      </div>

      <div className="space-y-2">
        <Label>Due Date (e.g., in days)</Label>
        <Input 
          type="text"
          value={formData.dueDate || ''} 
          onChange={(e) => handleChange('dueDate', e.target.value)} 
          placeholder="e.g. 3 Days"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Custom Fields</Label>
          <Button variant="ghost" onClick={() => setFormData(prev => ({ ...prev, customFields: [...(prev.customFields || []), { key: '', value: '' }] }))} className="h-6 w-6 p-0">
            <span className="text-textMuted font-mono font-bold">+</span>
          </Button>
        </div>
        
        <div className="flex flex-col gap-2">
          {formData.customFields?.map((m, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input 
                value={m.key} 
                onChange={(e) => {
                  const newFields = [...(formData.customFields || [])];
                  newFields[i] = { ...newFields[i], key: e.target.value };
                  handleChange('customFields', newFields);
                }} 
                placeholder="Key" 
                className="w-1/2 text-xs h-7"
              />
              <Input 
                value={m.value} 
                onChange={(e) => {
                  const newFields = [...(formData.customFields || [])];
                  newFields[i] = { ...newFields[i], value: e.target.value };
                  handleChange('customFields', newFields);
                }} 
                placeholder="Value" 
                className="w-1/2 text-xs h-7"
              />
              <Button variant="ghost" onClick={() => {
                handleChange('customFields', formData.customFields.filter((_, idx) => idx !== i));
              }} className="h-7 w-7 p-0 flex-shrink-0">
                <span className="text-coral">x</span>
              </Button>
            </div>
          ))}
          {(!formData.customFields || formData.customFields.length === 0) && (
            <p className="text-xs text-textMuted italic">No custom fields added</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border-color">
        <Button variant="secondary" onClick={reset}>Reset</Button>
        <Button variant="primary" onClick={save}>Save</Button>
      </div>
    </div>
  );
}
