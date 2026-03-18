import Card, { CardHeader, CardTitle, CardContent } from '../../components/admin/Card'
import Button from '../../components/admin/Button'

export default function Leads() {
  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <h2>Leads Management</h2>
        <Button variant="gold">Export Leads</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Contact Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: 'var(--light-grey)', marginBottom: '2rem' }}>
            View and manage all contact form submissions and customer inquiries. 
            Track lead status, follow-ups, and conversion metrics.
          </p>
          
          <div className="placeholder-content">
            <div className="placeholder-icon">📈</div>
            <h3>Leads Management Coming Soon</h3>
            <p>Track all customer inquiries, manage follow-ups, and analyze lead conversion rates.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
