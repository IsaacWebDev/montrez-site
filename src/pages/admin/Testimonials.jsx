import Card, { CardHeader, CardTitle, CardContent } from '../../components/admin/Card'
import Button from '../../components/admin/Button'

export default function Testimonials() {
  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <h2>Testimonials Management</h2>
        <Button variant="gold">Add New Testimonial</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Customer Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: 'var(--light-grey)', marginBottom: '2rem' }}>
            Review, approve, and manage customer testimonials and reviews. 
            Control what appears on your website to showcase social proof.
          </p>
          
          <div className="placeholder-content">
            <div className="placeholder-icon">💬</div>
            <h3>Testimonials Management Coming Soon</h3>
            <p>Approve pending testimonials, feature the best reviews, and manage customer feedback display.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
