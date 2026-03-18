import DashboardCard from '../../components/admin/DashboardCard'

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Leads',
      value: '247',
      icon: '📈',
      description: '+12% from last month'
    },
    {
      title: 'Total Services',
      value: '8',
      icon: '⚙️',
      description: '3 active campaigns'
    },
    {
      title: 'Total Testimonials',
      value: '42',
      icon: '💬',
      description: '8 pending approval'
    },
    {
      title: 'Recent Activity',
      value: '156',
      icon: '🔔',
      description: 'Last 7 days'
    }
  ]

  const recentActivities = [
    { action: 'New lead received', time: '2 hours ago', type: 'lead' },
    { action: 'Service updated: Shadow Series', time: '5 hours ago', type: 'service' },
    { action: 'New testimonial submitted', time: '1 day ago', type: 'testimonial' },
    { action: 'Media uploaded: collection-hero.jpg', time: '2 days ago', type: 'media' },
    { action: 'SEO settings updated', time: '3 days ago', type: 'seo' }
  ]

  return (
    <div className="admin-dashboard">
      <div className="dashboard-grid">
        {stats.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
          />
        ))}
      </div>

      <div className="admin-section" style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Recent Activity</h2>
        <div className="activity-list">
          {recentActivities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-content">
                <span className="activity-action">{activity.action}</span>
                <span className="activity-time">{activity.time}</span>
              </div>
              <span className={`activity-badge activity-badge--${activity.type}`}>
                {activity.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
