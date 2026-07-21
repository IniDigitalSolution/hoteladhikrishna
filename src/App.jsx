import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'

const asset = (name) => `/assets/${name}`
const WHATSAPP_NUMBER = '918551004444'
const whatsappUrl = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

const heroSlides = [
  { image: '8f5554b86d1f86b3.jpg', kicker: 'The Ultimate Luxury Experience', title: ['Enjoy The Best', 'Moments of Life'] },
  { image: 'd5ddf7bd1f02f424.jpg', kicker: 'Unique Place to Relax & Enjoy', title: ['The Perfect Base', 'For You'] },
  { image: '77a362626ca38286.jpg', kicker: 'Luxury Hotel & Best Resort', title: ['Enjoy a Luxury', 'Experience'] },
]

const rooms = [
  { name: 'Premium Deluxe Room', price: '₹1,600 – ₹1,800', image: 'a4a952754dc5ddb8.jpg', rates: ['1 Person — ₹1,600', '2 Persons — ₹1,800'], wide: true },
  { name: 'Premium Twin Room', price: '₹1,800', image: '64239565107bbe44.jpg', rates: ['Room tariff — ₹1,800'], wide: true },
  { name: 'Suite Room', price: '₹2,000 – ₹2,400', image: '6297f281f42886fd.jpg', rates: ['1 Person — ₹2,000', '2 Persons — ₹2,400'], wide: true },
  { name: 'Family Room', price: '₹3,000 – ₹3,500', image: '66ffbf3638e20af4.jpg', rates: ['3 Persons — ₹3,000', '4 Persons — ₹3,500'], wide: true },
]

const facilities = [
  ['✦', 'Pick Up & Drop', 'We’ll pick you up from the airport while you relax and enjoy a seamless arrival.'],
  ['P', 'Parking Space', 'Secure private parking is available for every guest throughout their stay.'],
  ['♢', 'Room Service', 'Thoughtful in-room dining and attentive service are available around the clock.'],
  ['≈', 'Swimming Pool', 'A serene heated pool provides an effortless place to unwind and recharge.'],
  ['⌁', 'Fibre Internet', 'Fast, complimentary wireless internet keeps every room perfectly connected.'],
  ['☕', 'Breakfast', 'Begin the day with fresh local produce, pastries and made-to-order favourites.'],
]

const gallery = [
  ['a4a952754dc5ddb8.jpg', 'Premium Deluxe Room', 'Rooms'],
  ['7276943ee58ea5c6.jpg', 'Fine Dining', 'Restaurant'],
  ['0b9e665057e0f9a6.jpg', 'The Restaurant', 'Dining'],
  ['997ffe4320e77b69.jpg', 'Spa Rituals', 'Wellness'],
  ['66ffbf3638e20af4.jpg', 'Family Room', 'Rooms'],
  ['a9f4d0e211e34fd2.jpg', 'Fitness Center', 'Wellness'],
  ['d3158d2fdaecfda2.jpg', 'Health Club & Pool', 'Experiences'],
  ['eb57c837c55b214b.jpg', 'Suite Room', 'Interiors'],
  ['7dc05d54cf9790b0.jpg', 'Evening Service', 'Hospitality'],
]

function Reveal({ children, className = '', as: Tag = 'div', ...props }) {
  const ref = useRef(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('in-view')
        observer.disconnect()
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${className}`.trim()} {...props}>{children}</Tag>
}

function Stars() {
  return <div className="stars" aria-label="Five star hotel">★★★★★</div>
}

function Reservation({ label = 'Reservation', light = false }) {
  return <a className={`reservation-row${light ? ' light-row' : ''}`} href="tel:8551004444"><span>☎</span><span><small>{label}</small><strong>855 100 4444</strong></span></a>
}

const navItems = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/rooms', 'Rooms & Suites'],
  ['/gallery', 'Gallery'],
  ['/contact', 'Contact'],
]

function Header({ scrolled, menuOpen, setMenuOpen }) {
  const closeMenu = () => setMenuOpen(false)
  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-shell">
        <Link className="brand" to="/" aria-label="The Cappa home" onClick={closeMenu}>
          <img className="brand-light" src={asset('1ec3fa339782fc07.png')} alt="The Cappa Luxury Hotel" />
          <img className="brand-dark" src={asset('e2a859c5d3bd5c27.png')} alt="" aria-hidden="true" />
        </Link>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><span /><span /><span /></button>
        <nav className={`main-nav${menuOpen ? ' open' : ''}`} aria-label="Primary navigation">
          {navItems.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={closeMenu}>{label}</NavLink>)}
        </nav>
      </div>
    </header>
  )
}

function QuickBooking({ onSubmit }) {
  const dateOnFocus = (event) => { event.currentTarget.type = 'date' }
  return (
    <form className="quick-book" onSubmit={onSubmit}>
      <label><span className="sr-only">Check in</span><input required name="checkIn" type="text" placeholder="Check in" onFocus={dateOnFocus} /></label>
      <label><span className="sr-only">Check out</span><input required name="checkOut" type="text" placeholder="Check out" onFocus={dateOnFocus} /></label>
      <label><span className="sr-only">Room type</span><select name="room" defaultValue="Premium Deluxe Room">{rooms.map((room) => <option key={room.name}>{room.name}</option>)}</select></label>
      <label><span className="sr-only">Guests</span><select name="guests" defaultValue="2 Persons"><option>1 Person</option><option>2 Persons</option><option>3 Persons</option><option>4 Persons</option></select></label>
      <label><span className="sr-only">Rooms</span><select name="roomCount" defaultValue="1 Room"><option>1 Room</option><option>2 Rooms</option><option>3 Rooms</option></select></label>
      <button type="submit">Check Now</button>
    </form>
  )
}

function Hero({ onSubmit }) {
  const [activeSlide, setActiveSlide] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((value) => (value + 1) % heroSlides.length), 6200)
    return () => window.clearInterval(timer)
  }, [])
  const current = heroSlides[activeSlide]
  return (
    <section className="hero" aria-label="Luxury hotel introduction">
      {heroSlides.map((slide, index) => <div key={slide.image} className={`hero-slide${activeSlide === index ? ' active' : ''}`} style={{ '--hero': `url('${asset(slide.image)}')` }} />)}
      <div className="hero-shade" />
      <a className="side-reservation" href="tel:8551004444"><span className="phone-ring">☎</span><span className="vertical-copy"><b>Reservation</b> 855 100 4444</span></a>
      <div className="hero-copy" key={activeSlide}><Stars /><p className="eyebrow hero-kicker">{current.kicker}</p><h1 className="hero-title">{current.title[0]}<br />{current.title[1]}</h1><Link className="outline-btn" to="/rooms">Rooms &amp; Suites</Link></div>
      <div className="hero-dots" aria-label="Choose hero slide">{heroSlides.map((slide, index) => <button type="button" key={slide.image} className={activeSlide === index ? 'active' : ''} onClick={() => setActiveSlide(index)} aria-label={`Slide ${index + 1}`} />)}</div>
      <QuickBooking onSubmit={onSubmit} />
    </section>
  )
}

function PageHero({ image, eyebrow = 'The Cappa Luxury Hotel', title }) {
  return (
    <section className="page-hero" style={{ '--page-image': `url('${asset(image)}')` }}>
      <div className="page-hero-shade" />
      <div className="container page-hero-content"><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1><p className="breadcrumbs"><Link to="/">Home</Link><span>/</span>{title}</p></div>
    </section>
  )
}

function About() {
  return (
    <section className="about section"><div className="container about-grid">
      <Reveal className="about-copy"><Stars /><p className="eyebrow">The Cappa Luxury Hotel</p><h2>Enjoy a Luxury<br />Experience</h2><p>Welcome to the best five-star deluxe hotel in New York. Every detail has been considered to create a calm, generous and deeply personal stay.</p><p>Set moments from Broadway, The Cappa brings timeless interiors, thoughtful service and the energy of the city together under one roof.</p><Reservation /></Reveal>
      <Reveal className="about-images"><img className="about-one" src={asset('7276943ee58ea5c6.jpg')} alt="The Cappa restaurant interior" /><img className="about-two" src={asset('eb57c837c55b214b.jpg')} alt="Luxury bedroom interior" /></Reveal>
    </div></section>
  )
}

function Rooms() {
  return (
    <section className="rooms section"><div className="container"><Reveal as="p" className="eyebrow">The Cappa Luxury Hotel</Reveal><Reveal as="h2" className="section-title">Rooms &amp; Suites</Reveal><div className="room-grid">
      {rooms.map((room) => <Reveal as="article" key={room.name} className={`room-card${room.wide ? ' room-wide' : ''}`}><img src={asset(room.image)} alt={room.name} /><a className="booking-ribbon" href={whatsappUrl(`Hello, I would like to check availability for the ${room.name}.`)} target="_blank" rel="noreferrer">WhatsApp</a><div className="room-info"><p>{room.price} / Night</p><h3>{room.name}</h3><span className="room-line" /><ul className="room-rate-list">{room.rates.map((rate) => <li key={rate}>{rate}</li>)}</ul><div className="room-more"><span>Extra person ₹300</span><a href={whatsappUrl(`Hello, I would like to book the ${room.name}.`)} target="_blank" rel="noreferrer">Enquire →</a></div></div></Reveal>)}
    </div><Reveal className="extra-person-note"><span>+</span><div><small>Available in every room</small><strong>Extra bed or extra person — ₹300</strong></div></Reveal></div></section>
  )
}

function ServiceCard({ image, title, price, period, alt }) {
  return <Reveal className="service-card"><img src={asset(image)} alt={alt} /><div><h3>{title}</h3><p className="price"><b>{price}</b><small>/ {period}</small></p><ul><li>✓ Tailored to your stay</li><li>✓ Available on request</li><li className="muted">× Subject to availability</li></ul></div></Reveal>
}

function Services() {
  return (
    <section className="services section"><div className="container services-grid"><Reveal className="services-copy"><p className="eyebrow">Best Prices</p><h2>Extra Services</h2><p>Shape your stay around the moments that matter. From fresh flowers to private transfers, our team will arrange every detail.</p><p>Simply contact the concierge before your arrival or at any time during your stay.</p><Reservation label="For information" /></Reveal><ServiceCard image="a3f6cc9626e29a1c.jpg" title="Room cleaning" price="$50" period="stay" alt="Room cleaning service" /><ServiceCard image="7dc05d54cf9790b0.jpg" title="Drinks included" price="$30" period="daily" alt="Drinks included" /></div></section>
  )
}

function VideoBand({ openVideo }) {
  return <section className="video-band parallax" aria-label="Promotional video"><div className="shade" /><Reveal className="video-copy"><p className="eyebrow light">The Cappa Luxury Hotel</p><h2>Promotional Video</h2><button className="play-button" type="button" aria-label="Play promotional video" onClick={openVideo}>▷</button></Reveal></section>
}

function Facilities() {
  return <section className="facilities section"><div className="container"><Reveal as="p" className="eyebrow">Our Services</Reveal><Reveal as="h2" className="section-title">Hotel Facilities</Reveal><div className="facility-grid">{facilities.map(([icon, title, copy]) => <Reveal as="article" key={title} className="facility"><i>{icon}</i><h3>{title}</h3><p>{copy}</p></Reveal>)}</div></div></section>
}

function Testimonial() {
  return <section className="testimonial parallax"><div className="shade" /><div className="container testimonial-inner"><Reveal className="testimonial-copy"><p className="eyebrow light">Testimonials</p><h2>What Clients Say</h2><Stars /><p>“A beautiful retreat in the heart of New York. The room was immaculate, the team anticipated everything, and breakfast was worth lingering over.”</p><div className="guest"><img src={asset('221ea7b2a284e6ad.jpg')} alt="Nolan White" /><span><strong>Nolan White</strong><small>Guest review</small></span></div></Reveal></div></section>
}

function BookingBand({ onSubmit }) {
  const today = new Date().toISOString().split('T')[0]
  return <section className="booking-band parallax"><div className="shade" /><div className="container booking-layout"><Reveal className="booking-promise"><Stars /><h2>Share your stay details and continue the booking directly with our team on WhatsApp.</h2><Reservation light /><p>✓ Fast confirmation on WhatsApp.</p></Reveal><Reveal as="form" className="booking-form availability-form" onSubmit={onSubmit}><p className="eyebrow">Rooms &amp; Suites</p><h2>Check Availability</h2><p className="form-intro">Required fields are marked with an asterisk.</p><div className="booking-form-grid"><label><span className="field-label">Guest name *</span><input required autoComplete="name" name="guestName" type="text" placeholder="Your full name" /></label><label><span className="field-label">WhatsApp number *</span><input required autoComplete="tel" inputMode="tel" name="phone" type="tel" pattern="[0-9+() -]{10,18}" placeholder="+91 98765 43210" /></label><label className="field-full"><span className="field-label">Room type *</span><select required name="room" defaultValue="Premium Deluxe Room">{rooms.map((room) => <option key={room.name}>{room.name}</option>)}</select></label><label><span className="field-label">Check-in date *</span><input required name="checkIn" type="date" min={today} /></label><label><span className="field-label">Check-out date *</span><input required name="checkOut" type="date" min={today} /></label><label><span className="field-label">Adults *</span><select required name="adults" defaultValue="2"><option value="1">1 Adult</option><option value="2">2 Adults</option><option value="3">3 Adults</option><option value="4">4 Adults</option></select></label><label><span className="field-label">Children</span><select name="children" defaultValue="0"><option value="0">No children</option><option value="1">1 Child</option><option value="2">2 Children</option><option value="3">3 Children</option></select></label><label><span className="field-label">Number of rooms *</span><select required name="roomCount" defaultValue="1 Room"><option>1 Room</option><option>2 Rooms</option><option>3 Rooms</option><option>4 Rooms</option></select></label><label><span className="field-label">Extra bed / person</span><select name="extraBed" defaultValue="No extra bed"><option>No extra bed</option><option>Extra bed / person (+₹300)</option></select></label><label className="field-full"><span className="field-label">Special requests</span><textarea name="specialRequests" rows="3" placeholder="Arrival time, accessibility needs or other requests" /></label></div><button type="submit">Check Availability on WhatsApp</button><p className="form-privacy">Your details are only used to respond to this booking enquiry.</p></Reveal></div></section>
}

function Partners() {
  const logos = ['b9531e6cb8e852e2.png', 'd9d6ee34e077b898.png', '4bed0fe133610f4e.png', '007dcd529fd12208.png', '350ee8e9d0c7e35f.png', '52c9846b5fd6f6a5.png']
  return <section className="partners" aria-label="Partner brands"><div className="container partner-row">{logos.map((logo) => <img src={asset(logo)} alt="Partner logo" key={logo} />)}</div></section>
}

function GalleryPage({ onSubmit }) {
  return <><PageHero image="d5ddf7bd1f02f424.jpg" eyebrow="A Glimpse Inside" title="Gallery" /><section className="gallery-page section"><div className="container"><Reveal className="gallery-intro"><p className="eyebrow">Discover The Cappa</p><h2 className="section-title">A Story in Every Detail</h2><p>Explore our rooms, dining spaces and restorative experiences before your arrival.</p></Reveal><div className="gallery-grid">{gallery.map(([image, title, category], index) => <Reveal as="figure" className={`gallery-item gallery-item-${index + 1}`} key={image}><img src={asset(image)} alt={title} /><figcaption><small>{category}</small><h3>{title}</h3></figcaption></Reveal>)}</div></div></section><BookingBand onSubmit={onSubmit} /><Partners /></>
}

function ContactPage({ onSubmit }) {
  return <><PageHero image="77a362626ca38286.jpg" eyebrow="We’re Here for You" title="Contact" /><section className="contact-page section"><div className="container contact-layout"><Reveal className="contact-copy"><p className="eyebrow">Get in Touch</p><h2 className="section-title">Plan Your Stay</h2><p>Whether you’re arranging a weekend away, a private celebration or a longer New York stay, our reservations team will be delighted to help.</p><div className="contact-detail"><span>☎</span><div><small>Reservation</small><a href="tel:8551004444">855 100 4444</a></div></div><div className="contact-detail"><span>✉</span><div><small>Email</small><a href="mailto:info@luxuryhotel.com">info@luxuryhotel.com</a></div></div><div className="contact-detail"><span>⌖</span><div><small>Address</small><p>1616 Broadway, New York, NY 10001</p></div></div></Reveal><Reveal as="form" className="contact-form" onSubmit={onSubmit}><p className="eyebrow">Send a Message</p><h2>How can we help?</h2><div className="form-row"><label><span className="sr-only">Name</span><input required name="name" placeholder="Your Name *" /></label><label><span className="sr-only">Email</span><input required type="email" name="email" placeholder="Email Address *" /></label></div><div className="form-row"><label><span className="sr-only">Phone</span><input type="tel" name="phone" placeholder="Phone Number" /></label><label><span className="sr-only">Subject</span><input name="subject" placeholder="Subject" /></label></div><label><span className="sr-only">Message</span><textarea required name="message" rows="6" placeholder="Your Message *" /></label><button className="gold-btn" type="submit">Send Message</button></Reveal></div></section><section className="location-band"><div className="location-shade" /><Reveal><p className="eyebrow light">Times Square · New York</p><h2>In the Heart of the City</h2><p>Steps from Broadway, Central Park and the best of Manhattan.</p><a className="outline-btn" href="https://maps.google.com/?q=1616+Broadway+New+York" target="_blank" rel="noreferrer">Get Directions</a></Reveal></section><Partners /></>
}

function Footer() {
  return <footer className="footer"><div className="container footer-grid"><div><h3>About Hotel</h3><p>Welcome to The Cappa, a five-star hideaway in the heart of New York where considered design meets warm, intuitive service.</p><button className="language" type="button">English &nbsp; ◉</button></div><div><h3>Explore</h3><nav aria-label="Footer">{navItems.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</nav></div><div><h3>Contact</h3><p>1616 Broadway, New York 10001<br />United States of America</p><a className="footer-phone" href="tel:8551004444">☎ 855 100 4444</a><a className="footer-email" href="mailto:info@luxuryhotel.com">info@luxuryhotel.com</a><div className="socials"><a href="#instagram" aria-label="Instagram">◎</a><a href="#twitter" aria-label="Twitter">𝕏</a><a href="#youtube" aria-label="YouTube">▶</a><a href="#facebook" aria-label="Facebook">f</a></div></div></div><div className="copyright">© Copyright {new Date().getFullYear()} by The Cappa</div></footer>
}

function HomePage({ onSubmit, openVideo }) {
  return <><Hero onSubmit={onSubmit} /><About /><Rooms /><VideoBand openVideo={openVideo} /><Facilities /><Partners /></>
}

function AboutPage() {
  return <><PageHero image="8f5554b86d1f86b3.jpg" eyebrow="Welcome to The Cappa" title="About Us" /><About /><Testimonial /><Facilities /><Partners /></>
}

function RoomsPage({ onSubmit }) {
  return <><PageHero image="64239565107bbe44.jpg" eyebrow="Rest in Exceptional Comfort" title="Rooms & Suites" /><Rooms /><BookingBand onSubmit={onSubmit} /><Partners /></>
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    setMenuOpen(false)
  }, [location.pathname])
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 90)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])
  useEffect(() => {
    if (!videoOpen) return undefined
    const onKeyDown = (event) => { if (event.key === 'Escape') setVideoOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [videoOpen])

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(false), 3200)
  }

  const handleBookingSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const checkIn = data.get('checkIn')
    const checkOut = data.get('checkOut')
    if (checkIn && checkOut && checkOut <= checkIn) {
      const checkOutField = event.currentTarget.elements.checkOut
      checkOutField.setCustomValidity('Check-out date must be after the check-in date.')
      checkOutField.reportValidity()
      checkOutField.addEventListener('input', () => checkOutField.setCustomValidity(''), { once: true })
      return
    }
    const message = [
      'Hello, I would like to check room availability.',
      data.get('guestName') ? `Guest name: ${data.get('guestName')}` : '',
      data.get('phone') ? `WhatsApp number: ${data.get('phone')}` : '',
      `Room: ${data.get('room') || 'Please suggest'}`,
      data.get('guests') ? `Guests: ${data.get('guests')}` : '',
      data.get('adults') ? `Adults: ${data.get('adults')}` : '',
      data.get('children') ? `Children: ${data.get('children')}` : '',
      `Check-in: ${checkIn || 'Not selected'}`,
      `Check-out: ${checkOut || 'Not selected'}`,
      data.get('roomCount') ? `Number of rooms: ${data.get('roomCount')}` : '',
      data.get('extraBed') ? `Extra bed: ${data.get('extraBed')}` : '',
      data.get('specialRequests') ? `Special requests: ${data.get('specialRequests')}` : '',
    ].filter(Boolean).join('\n')
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
    showToast('Opening your booking request in WhatsApp…')
  }

  const handleContactSubmit = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    showToast('Thank you. We’ll be in touch shortly.')
  }

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <main id="main"><Routes><Route path="/" element={<HomePage onSubmit={handleBookingSubmit} openVideo={() => setVideoOpen(true)} />} /><Route path="/about" element={<AboutPage />} /><Route path="/rooms" element={<RoomsPage onSubmit={handleBookingSubmit} />} /><Route path="/gallery" element={<GalleryPage onSubmit={handleBookingSubmit} />} /><Route path="/contact" element={<ContactPage onSubmit={handleContactSubmit} />} /><Route path="*" element={<HomePage onSubmit={handleBookingSubmit} openVideo={() => setVideoOpen(true)} />} /></Routes></main>
    <Footer />
    <button className={`to-top${scrolled ? ' visible' : ''}`} type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>⌃</button>
    <div className={`toast${toast ? ' show' : ''}`} role="status" aria-live="polite">{toast || ''}</div>
    {videoOpen && <div className="video-modal" onClick={(event) => { if (event.target === event.currentTarget) setVideoOpen(false) }}><div className="video-dialog"><button type="button" aria-label="Close video" onClick={() => setVideoOpen(false)}>×</button><iframe src="https://www.youtube.com/embed/7BGNAGahig8?autoplay=1" title="The Cappa promotional video" allow="autoplay; encrypted-media" allowFullScreen /></div></div>}
  </>
}

export default App
