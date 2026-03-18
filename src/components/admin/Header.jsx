export default function Header({ title }) {
  return (
    <header className="admin__header">
      <div className="admin__header-content">
        <h1>{title}</h1>
        <div className="admin__header-user">
          <span className="admin__user-avatar">A</span>
          <span className="admin__user-name">Admin</span>
        </div>
      </div>
    </header>
  )
}
