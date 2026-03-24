import { useNavigate } from 'react-router-dom'
import '../styles/Collections.css'

const collections = [
  {
    id: 1,
    title: 'Château Collection',
    description: 'Vintage-inspired streetwear excellence',
    image: '/products/speak-no-evil-front.jpg'
  },
  {
    id: 2,
    title: 'Urban Essentials',
    description: 'Bold graphics, timeless style',
    image: '/products/money-front.jpg'
  },
  {
    id: 3,
    title: 'Embellished Denim',
    description: 'Luxury meets street culture',
    image: '/products/dazzled-shorts-front.jpg'
  }
]

export default function Collections() {
  const navigate = useNavigate()

  const handleViewCollection = () => {
    navigate('/shop')
  }

  const handleLoadMore = () => {
    navigate('/shop')
  }

  return (
    <section id="collections" className="collections section">
      <div className="container">
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
                <div className="collection-card__overlay" />
              </div>
              <div className="collection-card__content">
                <h3 className="collection-card__title">{collection.title}</h3>
                <p className="collection-card__description">{collection.description}</p>
                <button 
                  className="collection-card__link" 
                  onClick={handleViewCollection}
                >
                  VIEW COLLECTION →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Panther Logo + Load More */}
        <div className="collections__footer">
          <img 
            src="/images/montrez-logo-panther.jpg" 
            alt="MONTRÉZ"
            className="collections__logo"
          />
          <button 
            className="collections__load-more btn btn-chrome"
            onClick={handleLoadMore}
          >
            LOAD MORE
          </button>
        </div>
      </div>
    </section>
  )
}
