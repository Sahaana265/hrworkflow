import React from 'react';
import { useNodeForm } from '../../hooks/useNodeForm';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';

export function ApprovalNodeForm({ nodeId }) {
  const { formData, handleChange, save, reset } = useNodeForm(nodeId);

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input 
          value={formData.title || ''} 
          onChange={(e) => handleChange('title', e.target.value)} 
          placeholder="e.g. Manager Approval"
        />
      </div>

      <div className="space-y-2">
        <Label>Approver Role</Label>
        <select
          className="flex h-9 w-full rounded border border-border-color bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue focus-visible:border-blue text-textMain transition-colors"
          value={formData.approverRole || ''}
          onChange={(e) => handleChange('approverRole', e.target.value)}
        >
          <option value="" disabled>Select a role</option>
          <option value="Manager">Manager</option>
          <option value="HRBP">HRBP</option>
          <option value="Director">Director</option>
        </select>
        <div className="text-xs text-textMuted mt-1">Or type a custom role below:</div>
        <Input 
          value={formData.approverRole || ''} 
          onChange={(e) => handleChange('approverRole', e.target.value)} 
          placeholder="Custom role..."
        />
      </div>

      <div className="space-y-2">
        <Label>Auto-Approve Threshold ($)</Label>
        <Input 
          type="number"
          value={formData.autoApproveThreshold || 0} 
          onChange={(e) => handleChange('autoApproveThreshold', Number(e.target.value))} 
        />
      </div>

      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border-color">
        <Button variant="secondary" onClick={reset}>Reset</Button>
        <Button variant="primary" onClick={save}>Save</Button>
      </div>
    </div>
  );
}
