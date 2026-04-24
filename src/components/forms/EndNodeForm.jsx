import React from 'react';
import { useNodeForm } from '../../hooks/useNodeForm';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';

export function EndNodeForm({ nodeId }) {
  const { formData, handleChange, save, reset } = useNodeForm(nodeId);

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input 
          value={formData.title || ''} 
          onChange={(e) => handleChange('title', e.target.value)} 
          placeholder="e.g. End Event"
        />
      </div>

      <div className="space-y-2">
        <Label>End Message</Label>
        <Input 
          value={formData.endMessage || ''} 
          onChange={(e) => handleChange('endMessage', e.target.value)} 
          placeholder="Message to display on completion"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <Label className="cursor-pointer" onClick={() => handleChange('summaryFlag', !formData.summaryFlag)}>Show Summary Flag</Label>
        <Toggle 
          checked={formData.summaryFlag || false} 
          onChange={(checked) => handleChange('summaryFlag', checked)} 
        />
      </div>

      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border-color">
        <Button variant="secondary" onClick={reset}>Reset</Button>
        <Button variant="primary" onClick={save}>Save</Button>
      </div>
    </div>
  );
}
