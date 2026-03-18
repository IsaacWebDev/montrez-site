import Card, { CardHeader, CardTitle, CardContent } from '../../components/admin/Card'
import Button from '../../components/admin/Button'

export default function Settings() {
  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <h2>General Settings</h2>
        <Button variant="gold">Save Settings</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Site Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: 'var(--light-grey)', marginBottom: '2rem' }}>
            Configure general website settings including site title, contact information, 
            social media links, and other global configurations.
          </p>
          
          <div className="placeholder-content">
            <div className="placeholder-icon">⚙️</div>
            <h3>Settings Management Coming Soon</h3>
            <p>Configure site-wide settings, integrations, and preferences from this central control panel.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
