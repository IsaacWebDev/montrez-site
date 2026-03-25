import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, fullName, source = 'unknown' } = req.body

  // Validate input
  if (!email || !fullName) {
    return res.status(400).json({ error: 'Email and full name are required' })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  try {
    // Check if email already exists
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id, email')
      .eq('email', email.toLowerCase())
      .single()

    if (existingLead) {
      // Email already exists - update the record
      const { error: updateError } = await supabase
        .from('leads')
        .update({
          full_name: fullName,
          source: source,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingLead.id)

      if (updateError) {
        console.error('Error updating lead:', updateError)
        return res.status(500).json({ error: 'Failed to update signup' })
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Already subscribed',
        existing: true 
      })
    }

    // Create new lead
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          email: email.toLowerCase(),
          full_name: fullName,
          source: source,
          tags: ['newsletter-signup'],
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Error creating lead:', error)
      return res.status(500).json({ error: 'Failed to save signup' })
    }

    // TODO: Send welcome email with 15% discount code
    // This can be implemented later with your email service (e.g., Resend, SendGrid)
    // await sendWelcomeEmail(email, fullName)

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully signed up',
      data: data[0]
    })

  } catch (error) {
    console.error('Newsletter signup error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
