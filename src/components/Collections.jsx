import '../styles/Collections.css'

const collections = [
  {
    id: 1,
    title: 'Château Collection',
    description: 'Vintage-inspired streetwear excellence',
    image: '/images/collections/collection-1.jpg'
  },
  {
    id: 2,
    title: 'Urban Essentials',
    description: 'Bold graphics, timeless style',
    image: '/images/collections/collection-2.jpg'
  },
  {
    id: 3,
    title: 'Embellished Denim',
    description: 'Luxury meets street culture',
    image: '/images/collections/collection-3.jpg'
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
