export const INITIAL_EVENTS = [
  {
    id: 'evt-001',
    title: 'Lagos Tech Fest 2026',
    organizer: '3MTT Lagos Chapter & TechNation',
    category: 'Tech',
    city: 'Lagos',
    venue: 'Landmark Centre, Water Corporation Drive, Victoria Island, Lagos',
    date: '2026-08-15',
    time: '09:00 AM - 05:00 PM',
    description: 'The largest gathering of software engineers, AI developers, and tech innovators in West Africa. Keynote presentations, product showcases, career fair, and pitch competitions.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    tickets: [
      { id: 't-reg', name: 'Regular Pass', price: 5000, totalQuantity: 300, soldQuantity: 184 },
      { id: 't-vip', name: 'VIP Developer Pass', price: 25000, totalQuantity: 100, soldQuantity: 72 },
      { id: 't-vvip', name: 'Executive/Investor Pass', price: 75000, totalQuantity: 30, soldQuantity: 21 },
    ]
  },
  {
    id: 'evt-002',
    title: 'Afrobeats Beach Fest',
    organizer: 'Eko Live & Vibes Entertainment',
    category: 'Music',
    city: 'Lagos',
    venue: 'Eko Atlantic Beach Grounds, Ahmadu Bello Way, Lagos',
    date: '2026-08-22',
    time: '06:00 PM - 02:00 AM',
    description: 'Unforgettable outdoor music experience featuring top Nigerian Afrobeats stars, guest DJs, food stalls, and fireworks by the ocean.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    tickets: [
      { id: 't-early', name: 'Early Bird Regular', price: 10000, totalQuantity: 500, soldQuantity: 412 },
      { id: 't-vip', name: 'VIP Stage Access', price: 45000, totalQuantity: 150, soldQuantity: 110 },
      { id: 't-cabana', name: 'VVIP Cabana (Table of 5)', price: 250000, totalQuantity: 15, soldQuantity: 10 },
    ]
  },
  {
    id: 'evt-003',
    title: '3MTT Graduation Summit',
    organizer: 'NITDA & 3MTT Nigeria',
    category: 'Education',
    city: 'Abuja',
    venue: 'Transcorp Hilton Congress Hall, Maitama, Abuja',
    date: '2026-08-10',
    time: '10:00 AM - 03:00 PM',
    description: 'Celebrating the graduation of 3MTT fellows! Project exhibitions, hackathon finals, tech policy keynotes, and national talent showcase.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    tickets: [
      { id: 't-free', name: 'Fellow / Student RSVP', price: 0, totalQuantity: 1000, soldQuantity: 740 },
      { id: 't-vip', name: 'Guest & Mentor Ticket', price: 15000, totalQuantity: 200, soldQuantity: 125 },
    ]
  },
  {
    id: 'evt-004',
    title: 'Ibadan Startup Expo',
    organizer: 'Oyo State Tech Hubs Network',
    category: 'Business',
    city: 'Ibadan',
    venue: 'International Conference Centre, University of Ibadan, Oyo State',
    date: '2026-08-28',
    time: '09:30 AM - 04:30 PM',
    description: 'Empowering Southwest startups with funding opportunities, government policy insights, venture capital networking, and digital skill workshops.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    tickets: [
      { id: 't-reg', name: 'General Admission', price: 3500, totalQuantity: 400, soldQuantity: 210 },
      { id: 't-booth', name: 'Startup Booth Exhibition', price: 50000, totalQuantity: 25, soldQuantity: 18 },
    ]
  },
  {
    id: 'evt-005',
    title: 'Port Harcourt Food Fest',
    organizer: 'Garden City Culinary Association',
    category: 'Food & Drink',
    city: 'Port Harcourt',
    venue: 'Pleasure Park Amphitheatre, Aba Road, Port Harcourt',
    date: '2026-09-05',
    time: '12:00 PM - 09:00 PM',
    description: 'Taste the rich culinary flavors of the Niger Delta and international cuisine. Cooking competitions, live band, palm wine tasting, and family fun.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    tickets: [
      { id: 't-reg', name: 'Foodie Pass (3 Tasting)', price: 7500, totalQuantity: 600, soldQuantity: 340 },
      { id: 't-family', name: 'Family Pass (4 Persons)', price: 25000, totalQuantity: 100, soldQuantity: 58 },
    ]
  },
  {
    id: 'evt-006',
    title: 'Full-Stack Dev Workshop',
    organizer: '3MTT Masterclass Series',
    category: 'Virtual',
    city: 'Online',
    venue: 'Google Meet / Zoom Live Interactive Stream',
    date: '2026-08-18',
    time: '04:00 PM - 07:00 PM',
    description: 'Hands-on live workshop covering React 18, Node.js microservices, PostgreSQL query optimization, and deploying resilient web apps.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    tickets: [
      { id: 't-free', name: 'Virtual Pass', price: 0, totalQuantity: 2000, soldQuantity: 1420 },
      { id: 't-cert', name: 'Pass + Verified Certificate of Mastery', price: 4000, totalQuantity: 300, soldQuantity: 195 },
    ]
  }
];
