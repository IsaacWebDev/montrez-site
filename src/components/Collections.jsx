import '../styles/Collections.css'

const collections = [
  {
    id: 1,
    title: 'Shadow Series',
    description: 'Dark elegance meets urban edge',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Nocturne',
    description: 'Evening wear reimagined',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Monochrome',
    description: 'Timeless black & white',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80'
  }
]

export default function Collections() {
  return (
    <section id="collections" className="collections section">
      <div className="container">
        <div className="collections__header text-center">
          <h2 className="fade-in">Collections</h2>
          <p className="collections__subtitle fade-in">
            Curated pieces for the modern connoisseur
          </p>
        </div>

        <div className="collections__grid">
          {collections.map((collection, index) => (
            <article 
              key={collection.id} 
              className="collection-card fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="collection-card__image-wrapper">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="collection-card__image"
                  loading="lazy"
                />
                <div className="collection-card__overlay grain" />
              </div>
              <div className="collection-card__content">
                <h3 className="collection-card__title">{collection.title}</h3>
                <p className="collection-card__description">{collection.description}</p>
                <button 
                  className="collection-card__link" 
                  onClick={() => alert(`Collection detail pages coming soon!\n\n"${collection.title}" will showcase:\n• Product gallery\n• Detailed descriptions\n• Sizing & availability\n• Purchase options`)}
                  style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', textAlign: 'left' }}
                >
                  View Collection →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
