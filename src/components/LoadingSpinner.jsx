import '../styles/LoadingSpinner.css'

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner__container">
        <div className="loading-spinner__circle"></div>
        <p className="loading-spinner__text">{message}</p>
      </div>
    </div>
  )
}
