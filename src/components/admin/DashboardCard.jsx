// Dashboard Card Component with Stats
export default function DashboardCard({ title, value, icon, description }) {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card__header">
        <span className="dashboard-card__icon">{icon}</span>
        <h3 className="dashboard-card__title">{title}</h3>
      </div>
      <div className="dashboard-card__value">{value}</div>
      {description && (
        <p className="dashboard-card__description">{description}</p>
      )}
    </div>
  )
}
