import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <h3 className="footer__logo">MONTREZ</h3>
            <p>Luxury redefined for the modern era</p>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h4>Shop</h4>
              <a href="#collections">Collections</a>
            </div>
            <div className="footer__column">
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href="/admin">Admin</a>
            </div>
            <div className="footer__column">
              <h4>Follow</h4>
              {/* TODO: Replace with actual Montrez social media URLs */}
              <a href="https://instagram.com/montrez_official" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="https://twitter.com/montrez_brand" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href="https://tiktok.com/@montrez_official" target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Montrez. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
