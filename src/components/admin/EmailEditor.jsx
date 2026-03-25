import { useState } from 'react'
import * as Switch from '@radix-ui/react-switch'

export default function EmailEditor({ templates, onSave }) {
  const [editedTemplates, setEditedTemplates] = useState(templates)
  const [isSaving, setIsSaving] = useState(false)

  const handleToggle = (templateId) => {
    setEditedTemplates(prev =>
      prev.map(t =>
        t.id === templateId ? { ...t, enabled: !t.enabled } : t
      )
    )
  }

  const handleChange = (templateId, field, value) => {
    setEditedTemplates(prev =>
      prev.map(t =>
        t.id === templateId ? { ...t, [field]: value } : t
      )
    )
  }

  const handleSave = () => {
    setIsSaving(true)
    // Mock save (in real app, would save to backend)
    setTimeout(() => {
      onSave(editedTemplates)
      setIsSaving(false)
    }, 500)
  }

  return (
    <div className="space-y-6">
      {editedTemplates.map((template) => (
        <div key={template.id} className="admin-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">{template.name}</h3>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {template.enabled ? 'Enabled' : 'Disabled'}
              </span>
              <Switch.Root
                checked={template.enabled}
                onCheckedChange={() => handleToggle(template.id)}
                className={`
                  relative w-11 h-6 rounded-full transition-colors
                  ${template.enabled ? 'bg-primary' : 'bg-muted'}
                `}
              >
                <Switch.Thumb
                  className={`
                    block w-5 h-5 bg-white rounded-full transition-transform
                    ${template.enabled ? 'translate-x-6' : 'translate-x-0.5'}
                  `}
                />
              </Switch.Root>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Subject Line
              </label>
              <input
                type="text"
                value={template.subject}
                onChange={(e) => handleChange(template.id, 'subject', e.target.value)}
                disabled={!template.enabled}
                className="admin-input w-full disabled:opacity-50"
                placeholder="Email subject..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Body
              </label>
              <textarea
                value={template.body}
                onChange={(e) => handleChange(template.id, 'body', e.target.value)}
                disabled={!template.enabled}
                rows="8"
                className="admin-input w-full resize-none disabled:opacity-50"
                placeholder="Email body..."
              />
              <p className="text-xs text-muted-foreground mt-2">
                Available variables: {'{customerName}'}, {'{orderId}'}, {'{orderTotal}'}, {'{trackingNumber}'}, {'{productName}'}, {'{cartItems}'}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="admin-button disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save All Templates'}
        </button>
      </div>
    </div>
  )
}
