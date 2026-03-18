import '../styles/About.css'

export default function About() {
  return (
    <section id="about" className="about section grain">
      <div className="container">
        <div className="about__content">
          <div className="about__text fade-in">
            <h2>About Montrez</h2>
            <p>
              Born from the intersection of luxury and rebellion, Montrez represents
              a new era in high-fashion streetwear. We create pieces that transcend
              trends, designed for those who dare to define their own style.
            </p>
            <p>
              Each collection is a cinematic experience, meticulously crafted with
              premium materials and timeless aesthetics. From the shadows of urban
              landscapes to the spotlight of exclusive events, Montrez is your
              statement of refined individuality.
            </p>
            <p>
              Our philosophy is simple: luxury should be bold, elegant, and unapologetically
              authentic.
            </p>
          </div>
          
          <div className="about__values fade-in">
            <div className="value-card">
              <h3>Craftsmanship</h3>
              <p>Every piece is a work of art, crafted with precision and care.</p>
            </div>
            <div className="value-card">
              <h3>Exclusivity</h3>
              <p>Limited editions for those who appreciate rarity.</p>
            </div>
            <div className="value-card">
              <h3>Timeless</h3>
              <p>Designs that transcend seasons and trends.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
