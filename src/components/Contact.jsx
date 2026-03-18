import { useState } from 'react'
import '../styles/Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setIsSubmitting(true)
    setErrors({})
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    }, 1000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
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
            {submitSuccess && (
              <div className="form-success">
                ✓ Thank you for your message. We will be in touch soon.
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                disabled={isSubmitting}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                disabled={isSubmitting}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                disabled={isSubmitting}
              />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>
            
            <button type="submit" className="btn btn-gold" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
