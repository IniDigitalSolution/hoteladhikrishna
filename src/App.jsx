import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'

const asset = (name) => `/assets/${name}`
const WHATSAPP_NUMBER = '917330022277'
const HOTEL_PHONE_LINK = '+917330022277'
const HOTEL_PHONE_DISPLAY = '+91 73300 22277'
const MAPS_URL = 'https://maps.app.goo.gl/JoCC5cogbFv8zFxE8'
const MAPS_EMBED_URL = 'https://www.google.com/maps?q=Hotel%20Adhikrishna%20Arcade%2C%20Erode%2C%20Tamil%20Nadu&output=embed'
const PROMO_VIDEO_URL = 'https://www.youtube.com/embed/mt0M7PtS8Zk?autoplay=1'
const PROMO_VIDEO_THUMBNAIL = asset('promo-video-preview.png')
const whatsappUrl = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

const heroSlides = [
  { image: '8f5554b86d1f86b3.jpg', kicker: 'Hotel Adhikrishna Arcade', title: ['Comfortable Stay', 'Near Erode Bus Stand'] },
  { image: 'd5ddf7bd1f02f424.jpg', kicker: 'Hotel Adhikrishna Arcade', title: ['Comfortable Stay', 'Near Erode Bus Stand'] },
  { image: '77a362626ca38286.jpg', kicker: 'Hotel Adhikrishna Arcade', title: ['Comfortable Stay', 'Near Erode Bus Stand'] },
]

const rooms = [
  { name: 'Premium Deluxe Room', price: '₹1,600 – ₹1,800', image: 'room-premium-deluxe.jpeg', rates: ['1 Person — ₹1,600', '2 Persons — ₹1,800'], wide: true },
  { name: 'Premium Twin Room', price: '₹1,800', image: 'room-premium-twin.jpeg', rates: ['Room tariff — ₹1,800'], wide: true },
  { name: 'Suite Room', price: '₹2,000 – ₹2,400', image: 'room-suite.jpeg', rates: ['1 Person — ₹2,000', '2 Persons — ₹2,400'], wide: true },
  { name: 'Family Room', price: '₹3,000 – ₹3,500', image: 'room-family.jpeg', rates: ['3 Persons — ₹3,000', '4 Persons — ₹3,500'], wide: true },
]

const experiences = [
  {
    image: 'restaurant-section.jpg',
    eyebrow: 'Near Bus Stand',
    title: 'Hotel in Erode Near Bus Stand | Hotel Adhikrishna Arcade',
    copy: [
      'Looking for a comfortable hotel in Erode near the bus stand? Hotel Adhikrishna Arcade offers spacious rooms, modern amenities and a convenient location in the heart of Erode City.',
      'Enjoy easy access to Erode Bus Stand, Erode Railway Station, shopping areas and major business locations, making it an ideal stay for families, business travellers and visitors.',
    ],
  },
  {
    image: 'spa-section.jpg',
    eyebrow: 'Near Railway Station',
    title: 'Best Hotel Near Erode Railway Station | Hotel Adhikrishna Arcade',
    copy: [
      'Looking for the best hotel near Erode Railway Station? Hotel Adhikrishna Arcade offers comfortable AC rooms, free Wi-Fi, ample parking and modern facilities for a convenient stay in Erode.',
      'Located just 7 minutes from Erode Railway Station, our hotel is an ideal choice for families, business travellers and visitors seeking easy access to Erode’s major destinations.',
    ],
  },
  {
    image: 'fitness-section.jpg',
    eyebrow: 'Best Hotel in Erode',
    title: 'Best Hotel in Erode | Hotel Adhikrishna Arcade',
    copy: [
      'Looking for the best hotel in Erode? Hotel Adhikrishna Arcade offers spacious, clean rooms with AC, free high-speed Wi-Fi, 24×7 room service, parking, power backup and modern facilities.',
      'Located in the heart of Erode City, our hotel is ideal for families, business travellers and leisure guests, with easy access to Erode Railway Station, Bus Stand and major shopping areas.',
    ],
  },
]

const testimonials = [
  { name: 'Priya Raman', image: 'aaa9c9fc31fccec9.jpg', quote: 'From the moment we arrived, every detail felt effortless. The room was beautifully prepared, the service was warm, and the entire stay felt wonderfully calm.' },
  { name: 'Aravind Kumar', image: '221ea7b2a284e6ad.jpg', quote: 'A beautiful retreat in the heart of the city. The team anticipated everything, and breakfast was worth lingering over each morning.' },
  { name: 'Meenakshi Subramanian', image: '92fadfc96147436c.jpg', quote: 'Elegant interiors, thoughtful hospitality and a peaceful atmosphere made this one of our most memorable hotel stays.' },
]

const facilities = [
  ['A/C', 'Air-Conditioned Rooms', 'Comfortable, well-maintained rooms to help you rest and recharge after a day of travel or work in Erode.'],
  ['⌁', 'Wi-Fi Connectivity', 'Stay connected for work, calls, or everyday browsing with reliable Wi-Fi access throughout your stay.'],
  ['P', 'Parking', 'Convenient on-site parking for guests travelling to Erode by their own vehicle.'],
  ['◇', 'Room Service', 'Enjoy the convenience of room service, available to make your stay more comfortable without stepping out.'],
  ['✦', 'Daily Housekeeping', 'Our housekeeping team ensures your room stays clean and fresh throughout your visit.'],
  ['i', 'Front Desk Assistance', 'Our front desk team is available to help with check-in, local information, or any request during your stay — whenever you need it.'],
]

const aboutLocationReasons = [
  'Travellers arriving in Erode by bus',
  'Business visitors with appointments across the city',
  'Families attending functions or visiting relatives',
  'Short-stay and transit travellers',
  'Anyone searching for a hotel near Erode Bus Stand',
]

const aboutStayEssentials = [
  'Air-conditioned rooms',
  'Wi-Fi connectivity',
  'Parking for guests travelling by their own vehicle',
  'Room service',
  'Daily housekeeping',
  'Front desk assistance, whenever it is needed',
]

const gallery = [
  ['room-premium-deluxe.jpeg', 'Premium Deluxe Room', 'Rooms'],
  ['room-premium-twin.jpeg', 'Premium Twin Room', 'Rooms'],
  ['room-suite.jpeg', 'Suite Room', 'Rooms'],
  ['room-family.jpeg', 'Family Room', 'Rooms'],
  ['gallery-best-hotel-erode-city.jpeg', 'Hotel Adhikrishna Arcade', 'Hotel'],
  ['gallery-couple-friendly-hotels-erode.jpeg', 'Comfortable Stay in Erode', 'Rooms'],
  ['gallery-hotels-erode-tamil-nadu.jpeg', 'Hotel Rooms in Erode', 'Rooms'],
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
  return <a className={`reservation-row${light ? ' light-row' : ''}`} href={`tel:${HOTEL_PHONE_LINK}`}><span>☎</span><span><small>{label}</small><strong>{HOTEL_PHONE_DISPLAY}</strong></span></a>
}

const navItems = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/rooms', 'Rooms & Suites'],
  ['/gallery', 'Gallery'],
  ['/contact-us', 'Contact'],
]

const defaultMeta = {
  title: 'Hotel Near Erode Bus Stand | Hotel Adhikrishna Arcade',
  description: 'Book Hotel Adhikrishna Arcade, a comfortable hotel near Erode Bus Stand with AC rooms, free Wi-Fi & parking. Ideal for business, family & transit stays.',
}

const pageMeta = {
  '/about': {
    title: 'About Us | Hotel Adhikrishna Arcade, Erode',
    description: 'Learn about Hotel Adhikrishna Arcade, a comfortable hotel near Erode Bus Stand offering AC rooms and easy access for business, family & transit travellers.',
  },
  '/about-us': {
    title: 'About Us | Hotel Adhikrishna Arcade, Erode',
    description: 'Learn about Hotel Adhikrishna Arcade, a comfortable hotel near Erode Bus Stand offering AC rooms and easy access for business, family & transit travellers.',
  },
  '/rooms': {
    title: 'Rooms & Rates | Hotel Adhikrishna Arcade, Erode',
    description: 'Explore room categories and rates at Hotel Adhikrishna Arcade — comfortable AC rooms near Erode Bus Stand with Wi-Fi, room service & easy booking.',
  },
  '/gallery': {
    title: 'Photo Gallery | Hotel Adhikrishna Arcade, Erode',
    description: 'Take a look inside Hotel Adhikrishna Arcade — photos of our AC rooms, facilities & hotel near Erode Bus Stand. See where you\'ll stay before you book.',
  },
  '/contact': {
    title: 'Contact Us | Hotel Adhikrishna Arcade, Erode',
    description: 'Get in touch with Hotel Adhikrishna Arcade near Erode Bus Stand for room availability, bookings & enquiries. Call +91 73300 22277 or visit us',
  },
  '/contact-us': {
    title: 'Contact Us | Hotel Adhikrishna Arcade, Erode',
    description: 'Get in touch with Hotel Adhikrishna Arcade near Erode Bus Stand for room availability, bookings & enquiries. Call +91 73300 22277 or visit us',
  },
}

function Header({ scrolled, menuOpen, setMenuOpen }) {
  const closeMenu = () => setMenuOpen(false)
  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-shell">
        <Link className="brand" to="/" aria-label="Hotel Adhikrishna Arcade home" onClick={closeMenu}>
          <img className="brand-logo" src={asset(scrolled ? 'adhikrishna-arcade-logo.png' : 'adhikrishna-arcade-logo-white.png')} alt="Hotel Adhikrishna Arcade Erode" />
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
    <section className="hero" aria-label="Hotel Adhikrishna Arcade introduction">
      {heroSlides.map((slide, index) => <div key={slide.image} className={`hero-slide${activeSlide === index ? ' active' : ''}`} style={{ '--hero': `url('${asset(slide.image)}')` }} />)}
      <div className="hero-shade" />
      <a className="side-reservation" href={`tel:${HOTEL_PHONE_LINK}`}><span className="phone-ring">☎</span><span className="vertical-copy"><b>Call us</b> {HOTEL_PHONE_DISPLAY}</span></a>
      <div className="hero-copy" key={activeSlide}><p className="eyebrow hero-kicker">{current.kicker}</p><h1 className="hero-title">{current.title[0]}<br />{current.title[1]}</h1><p className="hero-description">A convenient city hotel in Erode for business travellers, families, and anyone passing through — with easy access to Erode Bus Stand and everyday comforts that make your stay effortless.</p><div className="hero-actions"><a className="gold-btn" href="#availability">Book Now</a><a className="outline-btn" href={`tel:${HOTEL_PHONE_LINK}`}>Call: {HOTEL_PHONE_DISPLAY}</a></div></div>
      <div className="hero-dots" aria-label="Choose hero slide">{heroSlides.map((slide, index) => <button type="button" key={slide.image} className={activeSlide === index ? 'active' : ''} onClick={() => setActiveSlide(index)} aria-label={`Slide ${index + 1}`} />)}</div>
      <QuickBooking onSubmit={onSubmit} />
    </section>
  )
}

function PageHero({ image, eyebrow = 'Hotel Adhikrishna Arcade', title }) {
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
      <Reveal className="about-copy"><p className="eyebrow">About Hotel Adhikrishna Arcade</p><h2>Comfortable Stay Near<br />Erode Bus Stand</h2><p>Hotel Adhikrishna Arcade is a city hotel in Erode built for travellers who want a stay that&apos;s easy to reach, comfortable, and hassle-free. Located close to Erode Bus Stand on Nachiappa Road, we&apos;re a practical choice whether you&apos;re arriving by bus, passing through Erode, or planning a longer visit for business, family, or personal reasons.</p><p>Every guest comes to Erode with a different purpose — a business meeting, a family function, a shopping trip, a temple visit, or simply an overnight halt before continuing onward. Hotel Adhikrishna Arcade is designed around these everyday travel needs, giving guests a comfortable base to return to at the end of a busy day.</p><Reservation label="Call to book" /></Reveal>
      <Reveal className="about-images"><img className="about-one" src={asset('7276943ee58ea5c6.jpg')} alt="Hotel Adhikrishna Arcade interior" /><img className="about-two" src={asset('eb57c837c55b214b.jpg')} alt="Air-conditioned hotel room" /></Reveal>
    </div></section>
  )
}

function AboutDetails() {
  return (
    <section className="about-details section">
      <div className="container about-details-grid">
        <Reveal className="about-detail-copy">
          <p className="eyebrow">Why Our Location Matters</p>
          <h2>Easy Access for Every Kind of Traveller</h2>
          <p>For anyone new to Erode, the distance between the bus stand and the hotel can make a real difference to how smooth a trip feels. Being close to Erode Bus Stand means our guests can settle in quickly after a journey, and get back to the bus stand without stress when it&apos;s time to leave.</p>
          <ul className="about-check-list">
            {aboutLocationReasons.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Reveal>
        <Reveal className="about-detail-copy">
          <p className="eyebrow">Comfortable Rooms, Genuine Care</p>
          <h2>Focused on What Actually Matters</h2>
          <p>After a long journey or a full day of work, guests need a room where they can simply relax. Our air-conditioned rooms are kept clean and comfortable, and our team is on hand to help with quick check-in, local guidance around Erode, and everyday requests during the stay.</p>
          <ul className="about-check-list">
            {aboutStayEssentials.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function AboutPromise() {
  return (
    <section className="about-promise">
      <div className="container about-promise-inner">
        <Reveal>
          <p className="eyebrow light">Our Promise</p>
          <h2>We keep the stay simple, dependable and comfortable.</h2>
          <p>We don&apos;t believe in overselling. Our focus is on the basics that genuinely shape a guest&apos;s experience — an easy-to-find location, a comfortable room, dependable facilities, and a team that&apos;s ready to help.</p>
          <p className="about-address">Hotel Adhikrishna Arcade, 27, Nachiappa Road, Erode, Tamil Nadu - 638001. Near Erode Bus Stand.</p>
          <a className="outline-btn" href={`tel:${HOTEL_PHONE_LINK}`}>Call: {HOTEL_PHONE_DISPLAY}</a>
        </Reveal>
      </div>
    </section>
  )
}

function Rooms() {
  return (
    <section className="rooms section"><div className="container"><Reveal as="p" className="eyebrow">Hotel Adhikrishna Arcade</Reveal><Reveal as="h2" className="section-title rooms-title">Our Rooms</Reveal><Reveal as="p" className="rooms-intro">Clean, air-conditioned rooms designed for a comfortable rest whether you&apos;re staying for one night or several days. Every room is maintained with fresh housekeeping and equipped with the essentials for a relaxed stay.</Reveal><div className="room-grid">
      {rooms.map((room) => <Reveal as="article" key={room.name} className={`room-card${room.wide ? ' room-wide' : ''}`}><img src={asset(room.image)} alt={room.name} /><a className="booking-ribbon" href={whatsappUrl(`Hello, I would like to check availability for the ${room.name}.`)} target="_blank" rel="noreferrer">WhatsApp</a><div className="room-info"><p>{room.price} / Night</p><h3>{room.name}</h3><span className="room-line" /><ul className="room-rate-list">{room.rates.map((rate) => <li key={rate}>{rate}</li>)}</ul><div className="room-more"><span>Extra person ₹300</span><a href={whatsappUrl(`Hello, I would like to book the ${room.name}.`)} target="_blank" rel="noreferrer">Enquire →</a></div></div></Reveal>)}
    </div><Reveal className="extra-person-note"><span>+</span><div><small>Available in every room</small><strong>Extra bed or extra person — ₹300</strong></div></Reveal></div></section>
  )
}

function VideoBand({ openVideo }) {
  return <section className="video-band parallax" aria-label="Promotional video" style={{ '--video-preview': `url("${PROMO_VIDEO_THUMBNAIL}")` }}><img className="video-poster" src={PROMO_VIDEO_THUMBNAIL} alt="" aria-hidden="true" /><div className="shade" /><Reveal className="video-copy"><p className="eyebrow light">Hotel Adhikrishna Arcade</p><h2>Promotional Video</h2><button className="play-button" type="button" aria-label="Play promotional video" onClick={openVideo}>▷</button></Reveal></section>
}

function Facilities() {
  return <section className="facilities section"><div className="container"><Reveal as="p" className="eyebrow">Our Services</Reveal><Reveal as="h2" className="section-title">Hotel Facilities</Reveal><div className="facility-grid">{facilities.map(([icon, title, copy]) => <Reveal as="article" key={title} className="facility"><i>{icon}</i><h3>{title}</h3><p>{copy}</p></Reveal>)}</div></div></section>
}

function Testimonial() {
  const [activeReview, setActiveReview] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return undefined
    const timer = window.setInterval(() => setActiveReview((value) => (value + 1) % testimonials.length), 6200)
    return () => window.clearInterval(timer)
  }, [paused])
  const review = testimonials[activeReview]
  return (
    <section className="testimonial" aria-label="Guest testimonials" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="shade" />
      <div className="container testimonial-inner">
        <Reveal className="testimonial-copy">
          <p className="eyebrow light">Testimonials</p>
          <h2>What Client&apos;s Say?</h2>
          <span className="testimonial-line" />
          <div className="testimonial-stage" key={review.name}>
            <p className="testimonial-review">{review.quote}</p>
            <span className="testimonial-mark" aria-hidden="true">”</span>
            <div className="guest">
              <img src={asset(review.image)} alt={review.name} />
              <div className="guest-copy"><Stars /><strong>{review.name}</strong><small>Guest review</small></div>
            </div>
          </div>
          <div className="testimonial-dots" aria-label="Choose a testimonial">
            {testimonials.map((item, index) => <button type="button" key={item.name} className={index === activeReview ? 'active' : ''} aria-label={`Show review from ${item.name}`} aria-current={index === activeReview ? 'true' : undefined} onClick={() => setActiveReview(index)} />)}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Experiences() {
  return <section className="experiences section"><div className="container experience-grid">{experiences.map((item, index) => <ExperiencePair key={item.title} item={item} imageFirst={index % 2 === 0} />)}</div></section>
}

function ExperiencePair({ item, imageFirst }) {
  const image = <Reveal as="img" src={asset(item.image)} alt={item.title} />
  const copyBlocks = Array.isArray(item.copy) ? item.copy : [item.copy]
  const copy = <Reveal className="experience-copy"><p className="eyebrow">{item.eyebrow}</p><h2>{item.title}</h2>{copyBlocks.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Link className="gold-btn" to="/contact-us">Learn More</Link></Reveal>
  return <>{imageFirst ? image : copy}{imageFirst ? copy : image}</>
}

function BookingBand({ onSubmit }) {
  const today = new Date().toISOString().split('T')[0]
  return <section className="booking-band parallax" id="availability"><div className="shade" /><div className="container booking-layout"><Reveal className="booking-promise"><Stars /><h2>Share your stay details and continue the booking directly with our team on WhatsApp.</h2><Reservation light /><p>✓ Fast confirmation on WhatsApp.</p></Reveal><Reveal as="form" className="booking-form availability-form" onSubmit={onSubmit}><p className="eyebrow">Rooms &amp; Suites</p><h2>Check Availability</h2><p className="form-intro">Required fields are marked with an asterisk.</p><div className="booking-form-grid"><label><span className="field-label">Guest name *</span><input required autoComplete="name" name="guestName" type="text" placeholder="Your full name" /></label><label><span className="field-label">WhatsApp number *</span><input required autoComplete="tel" inputMode="tel" name="phone" type="tel" pattern="[0-9+() -]{10,18}" placeholder="+91 98765 43210" /></label><label className="field-full"><span className="field-label">Room type *</span><select required name="room" defaultValue="Premium Deluxe Room">{rooms.map((room) => <option key={room.name}>{room.name}</option>)}</select></label><label><span className="field-label">Check-in date *</span><input required name="checkIn" type="date" min={today} /></label><label><span className="field-label">Check-out date *</span><input required name="checkOut" type="date" min={today} /></label><label><span className="field-label">Adults *</span><select required name="adults" defaultValue="2"><option value="1">1 Adult</option><option value="2">2 Adults</option><option value="3">3 Adults</option><option value="4">4 Adults</option></select></label><label><span className="field-label">Children</span><select name="children" defaultValue="0"><option value="0">No children</option><option value="1">1 Child</option><option value="2">2 Children</option><option value="3">3 Children</option></select></label><label><span className="field-label">Number of rooms *</span><select required name="roomCount" defaultValue="1 Room"><option>1 Room</option><option>2 Rooms</option><option>3 Rooms</option><option>4 Rooms</option></select></label><label><span className="field-label">Extra bed / person</span><select name="extraBed" defaultValue="No extra bed"><option>No extra bed</option><option>Extra bed / person (+₹300)</option></select></label><label className="field-full"><span className="field-label">Special requests</span><textarea name="specialRequests" rows="3" placeholder="Arrival time, accessibility needs or other requests" /></label></div><button type="submit">Check Availability on WhatsApp</button><p className="form-privacy">Your details are only used to respond to this booking enquiry.</p></Reveal></div></section>
}

function GalleryPage({ onSubmit }) {
  return <><PageHero image="d5ddf7bd1f02f424.jpg" eyebrow="A Glimpse Inside" title="Gallery" /><section className="gallery-page section"><div className="container"><Reveal className="gallery-intro"><p className="eyebrow">Discover Hotel Adhikrishna Arcade</p><h2 className="section-title">A Story in Every Detail</h2><p>Explore our rooms and comfortable spaces before your arrival.</p></Reveal><div className="gallery-grid">{gallery.map(([image, title, category], index) => <Reveal as="figure" className={`gallery-item gallery-item-${index + 1}`} key={image}><img src={asset(image)} alt={title} /><figcaption><small>{category}</small><h3>{title}</h3></figcaption></Reveal>)}</div></div></section><BookingBand onSubmit={onSubmit} /></>
}

function ContactPage({ onSubmit }) {
  return <><PageHero image="77a362626ca38286.jpg" eyebrow="We’re Here for You" title="Contact" /><section className="contact-page section"><div className="container contact-layout"><Reveal className="contact-copy"><p className="eyebrow">Get in Touch</p><h2 className="section-title">Plan Your Stay</h2><p>Whether you’re visiting Erode for business, attending a family function, or simply passing through, our team will be happy to help with your stay.</p><div className="contact-detail"><span>☎</span><div><small>Reservation</small><a href={`tel:${HOTEL_PHONE_LINK}`}>{HOTEL_PHONE_DISPLAY}</a></div></div><div className="contact-detail"><span>⌖</span><div><small>Address</small><p>Nachiappa Road, near Erode Bus Stand, Erode, Tamil Nadu</p><a className="direction-link" href={MAPS_URL} target="_blank" rel="noreferrer">Get Directions</a></div></div></Reveal><Reveal as="form" className="contact-form" onSubmit={onSubmit}><p className="eyebrow">WhatsApp Message</p><h2>How can we help?</h2><div className="form-row"><label><span className="sr-only">Name</span><input required name="name" placeholder="Your Name *" /></label><label><span className="sr-only">Email</span><input required type="email" name="email" placeholder="Email Address *" /></label></div><div className="form-row"><label><span className="sr-only">Phone</span><input type="tel" name="phone" placeholder="Phone Number" /></label><label><span className="sr-only">Subject</span><input name="subject" placeholder="Subject" /></label></div><label><span className="sr-only">Message</span><textarea required name="message" rows="6" placeholder="Your Message *" /></label><button className="gold-btn" type="submit">Send on WhatsApp</button></Reveal></div></section><section className="map-section section"><div className="container map-layout"><Reveal className="map-copy"><p className="eyebrow">Directions</p><h2 className="section-title">Find Us Near Erode Bus Stand</h2><p>Use the map below for directions to Hotel Adhikrishna Arcade on Nachiappa Road, Erode.</p><a className="gold-btn" href={MAPS_URL} target="_blank" rel="noreferrer">Open in Google Maps</a></Reveal><Reveal className="map-frame"><iframe src={MAPS_EMBED_URL} title="Hotel Adhikrishna Arcade location map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></Reveal></div></section></>
}

function Footer() {
  return <footer className="footer"><div className="container footer-grid"><div><img className="footer-logo" src={asset('adhikrishna-arcade-logo-white.png')} alt="Hotel Adhikrishna Arcade Erode" /><h3>About Hotel</h3><p>Hotel Adhikrishna Arcade is a comfortable city hotel near Erode Bus Stand, well suited to business travellers, families and transit guests.</p><button className="language" type="button">English &nbsp; ◉</button></div><div><h3>Explore</h3><nav aria-label="Footer">{navItems.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</nav></div><div><h3>Contact</h3><p>Nachiappa Road, near Erode Bus Stand<br />Erode, Tamil Nadu</p><a className="footer-phone" href={`tel:${HOTEL_PHONE_LINK}`}>☎ {HOTEL_PHONE_DISPLAY}</a><a className="footer-directions" href={MAPS_URL} target="_blank" rel="noreferrer">Get Directions</a><div className="socials"><a href="#instagram" aria-label="Instagram">◎</a><a href="#twitter" aria-label="Twitter">𝕏</a><a href="#youtube" aria-label="YouTube">▶</a><a href="#facebook" aria-label="Facebook">f</a></div></div></div><div className="copyright">© Copyright {new Date().getFullYear()} by Hotel Adhikrishna Arcade</div></footer>
}

function HomePage({ onSubmit, openVideo }) {
  return <><Hero onSubmit={onSubmit} /><About /><Rooms /><VideoBand openVideo={openVideo} /><Facilities /><Testimonial /><Experiences /><BookingBand onSubmit={onSubmit} /></>
}

function AboutPage() {
  return <><PageHero image="8f5554b86d1f86b3.jpg" eyebrow="Welcome to Hotel Adhikrishna Arcade" title="About Us" /><About /><AboutDetails /><AboutPromise /><Facilities /></>
}

function RoomsPage({ onSubmit }) {
  return <><PageHero image="64239565107bbe44.jpg" eyebrow="Rest in Exceptional Comfort" title="Rooms & Suites" /><Rooms /><BookingBand onSubmit={onSubmit} /></>
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
    const meta = pageMeta[location.pathname] || defaultMeta
    document.title = meta.title
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', meta.description)
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
    if (!menuOpen) return undefined
    const closeOnEscape = (event) => { if (event.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
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
    const data = new FormData(event.currentTarget)
    const message = [
      'Hello, I would like to contact Hotel Adhikrishna Arcade.',
      data.get('name') ? `Name: ${data.get('name')}` : '',
      data.get('email') ? `Email: ${data.get('email')}` : '',
      data.get('phone') ? `Phone: ${data.get('phone')}` : '',
      data.get('subject') ? `Subject: ${data.get('subject')}` : '',
      data.get('message') ? `Message: ${data.get('message')}` : '',
    ].filter(Boolean).join('\n')
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
    event.currentTarget.reset()
    showToast('Opening your message in WhatsApp…')
  }

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <main id="main"><Routes><Route path="/" element={<HomePage onSubmit={handleBookingSubmit} openVideo={() => setVideoOpen(true)} />} /><Route path="/about" element={<AboutPage />} /><Route path="/about-us" element={<AboutPage />} /><Route path="/rooms" element={<RoomsPage onSubmit={handleBookingSubmit} />} /><Route path="/gallery" element={<GalleryPage onSubmit={handleBookingSubmit} />} /><Route path="/contact" element={<ContactPage onSubmit={handleContactSubmit} />} /><Route path="/contact-us" element={<ContactPage onSubmit={handleContactSubmit} />} /><Route path="*" element={<HomePage onSubmit={handleBookingSubmit} openVideo={() => setVideoOpen(true)} />} /></Routes></main>
    <Footer />
    <button className={`to-top${scrolled ? ' visible' : ''}`} type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>⌃</button>
    <div className={`toast${toast ? ' show' : ''}`} role="status" aria-live="polite">{toast || ''}</div>
    {videoOpen && <div className="video-modal" onClick={(event) => { if (event.target === event.currentTarget) setVideoOpen(false) }}><div className="video-dialog"><button type="button" aria-label="Close video" onClick={() => setVideoOpen(false)}>×</button><iframe src={PROMO_VIDEO_URL} title="Hotel Adhikrishna Arcade promotional video" allow="autoplay; encrypted-media" allowFullScreen /></div></div>}
  </>
}

export default App
