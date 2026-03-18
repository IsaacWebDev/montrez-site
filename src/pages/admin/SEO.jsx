import Card, { CardHeader, CardTitle, CardContent } from '../../components/admin/Card'
import Button from '../../components/admin/Button'

export default function SEO() {
  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <h2>SEO Settings</h2>
        <Button variant="gold">Save Changes</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Engine Optimization</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: 'var(--light-grey)', marginBottom: '2rem' }}>
            Optimize your website for search engines. Manage meta tags, descriptions, 
            keywords, and other SEO settings to improve visibility.
          </p>
          
          <div className="placeholder-content">
            <div className="placeholder-icon">🔍</div>
            <h3>SEO Management Coming Soon</h3>
            <p>Configure meta titles, descriptions, Open Graph tags, and other SEO settings for all pages.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
