import '../styles/Hero.css'

export default function Hero() {
  return (
    <section className="hero grain">
      <div className="hero__content container">
        <div className="hero__text fade-in">
          <h1 className="hero__title">
            Luxury<br/>
            Redefined
          </h1>
          <p className="hero__subtitle">
            Premium fashion for those who dare to stand out
          </p>
          <div className="hero__cta">
            <a href="#collections" className="btn btn-gold">
              Explore Collections
            </a>
            <a href="#about" className="btn">
              Our Story
            </a>
          </div>
        </div>
      </div>
      
      <div className="hero__scroll">
        <span>Scroll</span>
        <svg width="20" height="30" viewBox="0 0 20 30">
          <path d="M10 5v15M10 20l-5-5M10 20l5-5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>
    </section>
  )
}
