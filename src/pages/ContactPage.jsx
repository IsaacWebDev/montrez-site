import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/ContactPage.css'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      
      <motion.div 
        className="contact-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <div className="contact-page__content">
            {/* Info Section */}
            <motion.div 
              className="contact-page__info"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="contact-page__title">Get in Touch</h1>
              <p className="contact-page__subtitle">
                Have questions? Want to collaborate? Reach out.
              </p>

              <div className="contact-page__details">
                <div className="contact-page__detail">
                  <h3>Email</h3>
                  <a href="mailto:info@montrezofficial.com">info@montrezofficial.com</a>
                </div>

                <div className="contact-page__detail">
                  <h3>Instagram</h3>
                  <a href="https://instagram.com/montrezofficial" target="_blank" rel="noopener noreferrer">
                    @montrezofficial
                  </a>
                </div>

                <div className="contact-page__detail">
                  <h3>Location</h3>
                  <p>Paris, France</p>
                </div>
              </div>

              <div className="contact-page__note">
                <p>
                  <strong>Pas pour Tout</strong><br />
                  We respond to serious inquiries only.
                </p>
              </div>
            </motion.div>

            {/* Form Section */}
            <motion.div 
              className="contact-page__form-wrapper"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="contact-page__form">
                <div className="contact-page__form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="contact-page__form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="contact-page__form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="contact-page__form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <button 
                  type="submit" 
                  className="contact-page__submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <p className="contact-page__success">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="contact-page__error">Failed to send. Please try again.</p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </>
  )
}
