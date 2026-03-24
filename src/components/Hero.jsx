import '../styles/Hero.css'

export default function Hero() {
  return (
    <section className="hero grain">
      {/* Side Fades (for portrait image in wide container) */}
      <div className="hero__side-fade-left" aria-hidden="true"></div>
      <div className="hero__side-fade-right" aria-hidden="true"></div>
      
      {/* Bottom Gradient Fade */}
      <div className="hero__bottom-fade" aria-hidden="true"></div>
      
      <div className="hero__content container">
        <div className="hero__text fade-in">
          <h1 className="hero__title">
            PAS POUR<br/>
            TOUT LE MONDE
          </h1>
          <p className="hero__subtitle">
            European luxury streetwear. Not for everyone.
          </p>
          <div className="hero__cta">
            <a href="#collections" className="btn btn-chrome">
              ENTER COLLECTION
            </a>
            <a href="#about" className="btn">
              DISCOVER MONTRÉZ
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
