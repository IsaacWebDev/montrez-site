import Card, { CardHeader, CardTitle, CardContent } from '../../components/admin/Card'
import Button from '../../components/admin/Button'

export default function Media() {
  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <h2>Media Library</h2>
        <Button variant="gold">Upload Media</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Media Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: 'var(--light-grey)', marginBottom: '2rem' }}>
            Upload and manage all images, videos, and other media assets used across your website. 
            Organize files and optimize for web delivery.
          </p>
          
          <div className="placeholder-content">
            <div className="placeholder-icon">🖼️</div>
            <h3>Media Library Coming Soon</h3>
            <p>Upload, organize, and manage all your website images, videos, and media files from one central location.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
