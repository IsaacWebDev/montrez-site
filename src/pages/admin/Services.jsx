import Card, { CardHeader, CardTitle, CardContent } from '../../components/admin/Card'
import Button from '../../components/admin/Button'

export default function Services() {
  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <h2>Services Management</h2>
        <Button variant="gold">Add New Service</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Services & Collections</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: 'var(--light-grey)', marginBottom: '2rem' }}>
            Create and manage your luxury fashion collections, services, and product offerings. 
            Control pricing, availability, and featured items.
          </p>
          
          <div className="placeholder-content">
            <div className="placeholder-icon">⚙️</div>
            <h3>Service Management Coming Soon</h3>
            <p>Manage your Shadow Series, Nocturne, and all other luxury collections from this interface.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
