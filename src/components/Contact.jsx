import { useState } from 'react'
import '../styles/Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your message. We will be in touch soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="contact section grain">
      <div className="container">
        <div className="contact__content">
          <div className="contact__info fade-in">
            <h2>Get in Touch</h2>
            <p>
              For inquiries about private collections, collaborations, or custom orders,
              reach out to our team.
            </p>
            <div className="contact__details">
              <div className="contact__detail">
                <strong>Email</strong>
                <a href="mailto:contact@montrez.com">contact@montrez.com</a>
              </div>
              <div className="contact__detail">
                <strong>Instagram</strong>
                <a href="https://instagram.com/montrez" target="_blank" rel="noopener noreferrer">
                  @montrez
                </a>
              </div>
            </div>
          </div>

          <form className="contact__form fade-in" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-gold">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
