import React from 'react';
import { useNodeForm } from '../../hooks/useNodeForm';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';
import { Plus, Trash2 } from 'lucide-react';

export function StartNodeForm({ nodeId }) {
  const { formData, setFormData, handleChange, save, reset } = useNodeForm(nodeId);

  const addMetadata = () => {
    setFormData(prev => ({
      ...prev,
      metadata: [...(prev.metadata || []), { key: '', value: '' }]
    }));
  };

  const updateMetadata = (index, field, value) => {
    setFormData(prev => {
      const newMeta = [...(prev.metadata || [])];
      newMeta[index] = { ...newMeta[index], [field]: value };
      return { ...prev, metadata: newMeta };
    });
  };

  const removeMetadata = (index) => {
    setFormData(prev => ({
      ...prev,
      metadata: prev.metadata.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input 
          value={formData.startTitle || ''} 
          onChange={(e) => handleChange('startTitle', e.target.value)} 
          placeholder="e.g. Employee Onboarding"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Metadata</Label>
          <Button variant="ghost" onClick={addMetadata} className="h-6 w-6 p-0">
            <Plus className="w-4 h-4 text-textMuted" />
          </Button>
        </div>
        
        <div className="flex flex-col gap-2">
          {formData.metadata?.map((m, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input 
                value={m.key} 
                onChange={(e) => updateMetadata(i, 'key', e.target.value)} 
                placeholder="Key" 
                className="w-1/2 text-xs h-7"
              />
              <Input 
                value={m.value} 
                onChange={(e) => updateMetadata(i, 'value', e.target.value)} 
                placeholder="Value" 
                className="w-1/2 text-xs h-7"
              />
              <Button variant="ghost" onClick={() => removeMetadata(i)} className="h-7 w-7 p-0 flex-shrink-0">
                <Trash2 className="w-3 h-3 text-coral" />
              </Button>
            </div>
          ))}
          {(!formData.metadata || formData.metadata.length === 0) && (
            <p className="text-xs text-textMuted italic">No metadata added</p>
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
