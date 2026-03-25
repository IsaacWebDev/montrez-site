import { useState } from 'react'
import EmailEditor from './EmailEditor'
import { mockEmailTemplates } from '../../lib/admin/mockData'

export default function EmailsPage() {
  const [templates, setTemplates] = useState(mockEmailTemplates)

  const handleSave = (updatedTemplates) => {
    setTemplates(updatedTemplates)
    alert('Email templates saved successfully! (Mock operation)')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Email Automation</h1>
        <p className="text-muted-foreground">Configure automated email templates for your customers.</p>
      </div>

      <EmailEditor templates={templates} onSave={handleSave} />
    </div>
  )
}
