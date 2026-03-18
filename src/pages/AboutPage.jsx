import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/AboutPage.css'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      
      <motion.div 
        className="about-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          {/* Hero Section */}
          <div className="about-page__hero">
            <h1 className="about-page__title">MONTREZ</h1>
            <p className="about-page__tagline">Pas pour Tout</p>
          </div>

          {/* Story */}
          <div className="about-page__content">
            <motion.section 
              className="about-page__section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Our Philosophy</h2>
              <p>
                MONTREZ embodies the essence of European luxury streetwear—where 
                French aristocratic heritage meets contemporary urban edge. "Pas pour Tout" 
                isn't just our tagline; it's a statement of intent.
              </p>
              <p>
                We create for those who understand that true luxury isn't about 
                accessibility, but about exclusivity, craftsmanship, and the courage 
                to stand apart.
              </p>
            </motion.section>

            <motion.section 
              className="about-page__section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2>Heritage</h2>
              <p>
                Inspired by the grand châteaux of France and the rebellious spirit 
                of punk culture, MONTREZ represents a unique fusion. Our château 
                emblem—reminiscent of Château de Chambord—symbolizes timeless 
                elegance, while studded details and bold graphics inject modern edge.
              </p>
            </motion.section>

            <motion.section 
              className="about-page__section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2>Craftsmanship</h2>
              <p>
                Every MONTREZ piece is crafted with meticulous attention to detail. 
                Premium materials, European manufacturing, and limited production runs 
                ensure that when you wear MONTREZ, you're wearing something truly special.
              </p>
              <p>
                We don't chase trends. We set them.
              </p>
            </motion.section>

            <motion.section 
              className="about-page__section about-page__section--dark"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2>Not for Everyone</h2>
              <p className="about-page__quote">
                "If everyone can have it, we don't make it."
              </p>
              <p>
                MONTREZ is for those who appreciate mystery, quality, and exclusivity. 
                For those who understand that the best things in life are often hidden 
                behind closed gates.
              </p>
            </motion.section>
          </div>

          {/* Image Grid */}
          <motion.div 
            className="about-page__gallery"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-page__gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1535537287769-e5b0709acb6d?w=800" 
                alt="European architecture"
              />
            </div>
            <div className="about-page__gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800" 
                alt="Luxury aesthetic"
              />
            </div>
            <div className="about-page__gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800" 
                alt="Streetwear culture"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </>
  )
}
