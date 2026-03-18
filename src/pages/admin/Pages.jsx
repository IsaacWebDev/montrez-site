import Card, { CardHeader, CardTitle, CardContent } from '../../components/admin/Card'
import Button from '../../components/admin/Button'

export default function Pages() {
  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <h2>Pages Management</h2>
        <Button variant="gold">Add New Page</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Website Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: 'var(--light-grey)', marginBottom: '2rem' }}>
            Create, edit, and manage all pages on your Montrez website. Control page content, 
            metadata, and visibility settings.
          </p>
          
          <div className="placeholder-content">
            <div className="placeholder-icon">📄</div>
            <h3>Page Management Coming Soon</h3>
            <p>This section will allow you to manage all website pages, including home, about, contact, and custom pages.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
