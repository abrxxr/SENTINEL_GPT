// ═══════════════════════════════════════════════════════
// SentinelGPT — Demo Data Engine
// Generates realistic crisis intelligence data
// ═══════════════════════════════════════════════════════

const CRISIS_TYPES = ['flood', 'earthquake', 'fire', 'disease', 'storm', 'terror', 'accident'];

const CRISIS_ICONS = {
  flood: '🌊', earthquake: '🌍', fire: '🔥', disease: '🦠',
  storm: '🌪️', terror: '🚨', accident: '💥'
};

const CRISIS_COLORS = {
  flood: '#3b82f6', earthquake: '#f97316', fire: '#ef4444', disease: '#10b981',
  storm: '#8b5cf6', terror: '#dc2626', accident: '#f59e0b'
};

const SEVERITIES = ['critical', 'high', 'medium', 'low'];

const LOCATIONS = [
  { name: 'Chennai, India', lat: 13.08, lng: 80.27, country: 'India' },
  { name: 'Tokyo, Japan', lat: 35.68, lng: 139.69, country: 'Japan' },
  { name: 'Los Angeles, USA', lat: 34.05, lng: -118.24, country: 'USA' },
  { name: 'Istanbul, Turkey', lat: 41.01, lng: 28.98, country: 'Turkey' },
  { name: 'Jakarta, Indonesia', lat: -6.21, lng: 106.85, country: 'Indonesia' },
  { name: 'Manila, Philippines', lat: 14.60, lng: 120.98, country: 'Philippines' },
  { name: 'São Paulo, Brazil', lat: -23.55, lng: -46.63, country: 'Brazil' },
  { name: 'Dhaka, Bangladesh', lat: 23.81, lng: 90.41, country: 'Bangladesh' },
  { name: 'Nairobi, Kenya', lat: -1.29, lng: 36.82, country: 'Kenya' },
  { name: 'Sydney, Australia', lat: -33.87, lng: 151.21, country: 'Australia' },
  { name: 'London, UK', lat: 51.51, lng: -0.13, country: 'UK' },
  { name: 'Cairo, Egypt', lat: 30.04, lng: 31.24, country: 'Egypt' },
];

const NEWS_SOURCES = [
  { name: 'Reuters', credibility: 95 },
  { name: 'BBC News', credibility: 93 },
  { name: 'AP News', credibility: 94 },
  { name: 'Al Jazeera', credibility: 88 },
  { name: 'CNN', credibility: 82 },
  { name: 'The Guardian', credibility: 87 },
  { name: 'Twitter/X', credibility: 45 },
  { name: 'Facebook Post', credibility: 35 },
  { name: 'WhatsApp Forward', credibility: 20 },
  { name: 'Local News Blog', credibility: 55 },
  { name: 'Government Alert', credibility: 98 },
  { name: 'NDMA India', credibility: 96 },
];

const EVENT_TITLES = {
  flood: [
    'Severe Flooding Reported — Rescue Operations Underway',
    'Flash Floods Displace Thousands in Coastal Areas',
    'Dam Overflow Warning — Evacuation Orders Issued',
    'Urban Flooding Paralyzes Transportation Network',
    'Rising Water Levels Threaten Agricultural Regions',
  ],
  earthquake: [
    'Major Earthquake Strikes — Magnitude 6.8 Recorded',
    'Aftershocks Continue Following Major Seismic Event',
    'Building Collapses Reported After Strong Tremors',
    'Tsunami Warning Issued Following Submarine Earthquake',
    'Earthquake Damage Assessment Teams Deployed',
  ],
  fire: [
    'Wildfire Spreads Rapidly — Containment at 30%',
    'Industrial Fire Triggers Hazmat Response',
    'Forest Fire Threatens Residential Communities',
    'Multiple Fire Crews Battle Blaze in Urban Area',
    'Air Quality Alert Issued Due to Wildfire Smoke',
  ],
  disease: [
    'New Disease Outbreak Detected — Health Advisory Issued',
    'Spike in Respiratory Cases — Contact Tracing Activated',
    'WHO Monitors Emerging Pathogen Cluster',
    'Hospital Capacity Strained by Surge in Cases',
    'Vaccination Campaign Accelerated in Affected Region',
  ],
  storm: [
    'Category 4 Hurricane Approaches Coastline',
    'Severe Thunderstorm Warning — Hail Expected',
    'Cyclone Makes Landfall — Power Outages Widespread',
    'Tornado Sighted — Take Shelter Immediately',
    'Blizzard Conditions Expected — Travel Advisory',
  ],
  terror: [
    'Security Incident Under Investigation by Authorities',
    'Heightened Security Alert in Metropolitan Area',
    'Suspicious Package Found — Area Evacuated',
    'Security Forces Respond to Reported Threat',
    'Counter-Terrorism Units Deployed to Scene',
  ],
  accident: [
    'Major Transportation Accident — Multiple Casualties',
    'Industrial Accident Triggers Emergency Response',
    'Chemical Spill Reported — Hazmat Team En Route',
    'Train Derailment Blocks Major Transit Route',
    'Bridge Collapse Triggers Emergency Operations',
  ],
};

const SOCIAL_POSTS = {
  flood: [
    'Water levels rising rapidly in our neighborhood. Streets completely submerged. #flood #help',
    'Rescue boats seen in action near the river bank. Stay safe everyone! 🙏',
    'The government needs to act NOW. People are stranded on rooftops! #FloodRelief',
    'Power cut for 12 hours now. Water entered ground floor. Need urgent help.',
    'FAKE: Viral image claiming dam break is from 2019 flood, not current.',
  ],
  earthquake: [
    'Just felt a very strong tremor! Buildings shaking for nearly 30 seconds!',
    'Multiple aftershocks in the last hour. Everyone please stay in open areas.',
    'Reports of building damage in the old city area. Emergency services responding.',
    'USGS confirms 6.8 magnitude. Epicenter located offshore.',
    'People panicking. Need calm and accurate information ONLY. Stop spreading rumors!',
  ],
  fire: [
    'Smoke visible from 20km away. Firefighters battling massive blaze. #Wildfire',
    'Evacuation order for zones 5-8. Pack essentials and leave immediately.',
    'Air quality index at hazardous levels. Wear N95 masks if outdoors.',
    'My family just evacuated. Lost everything. Please donate if you can. 💔',
    'Fire containment improved to 45% overnight. Winds shifting direction.',
  ],
  disease: [
    'Local hospital overwhelmed. Patients waiting 6+ hours in emergency.',
    'New testing sites opened across the city. Get tested if symptomatic.',
    'FAKE: Garlic water does NOT cure this disease. Follow official medical advice.',
    'Schools closed until further notice. Remote learning activated.',
    'Healthcare workers are heroes. Let\'s support them! #ThankYouFrontliners',
  ],
  storm: [
    'Wind speeds recorded at 180 km/h. Stay indoors! This is extremely dangerous.',
    'Power grid collapsed across 3 districts. Generators running out.',
    'Eye of the storm passing over us now. Eerie calm before it resumes.',
    'Coastal areas completely battered. Fishing boats destroyed. Heartbreaking.',
    'National guard deployed for relief operations. Help is on the way.',
  ],
};

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateTimeAgo() {
  const units = [
    { label: 'min', max: 59 },
    { label: 'hr', max: 12 },
  ];
  const unit = randomItem(units);
  const val = randomBetween(1, unit.max);
  return `${val} ${unit.label} ago`;
}

function generateId() {
  return 'evt_' + Math.random().toString(36).substr(2, 9);
}

export function generateEvent(overrides = {}) {
  const type = overrides.type || randomItem(CRISIS_TYPES);
  const location = overrides.location || randomItem(LOCATIONS);
  const severity = overrides.severity || randomItem(SEVERITIES);
  const source = randomItem(NEWS_SOURCES);
  const title = randomItem(EVENT_TITLES[type] || EVENT_TITLES.accident);

  return {
    id: generateId(),
    type,
    title,
    icon: CRISIS_ICONS[type],
    color: CRISIS_COLORS[type],
    severity,
    confidence: randomBetween(72, 99),
    location: location.name,
    lat: location.lat + (Math.random() - 0.5) * 2,
    lng: location.lng + (Math.random() - 0.5) * 2,
    country: location.country,
    source: source.name,
    credibility: source.credibility,
    timestamp: new Date(Date.now() - randomBetween(0, 86400000)).toISOString(),
    timeAgo: generateTimeAgo(),
    affectedPopulation: randomBetween(500, 500000),
    ...overrides,
  };
}

export function generateEvents(count = 15) {
  return Array.from({ length: count }, () => generateEvent());
}

export function generateSentiment() {
  const panic = randomBetween(35, 70);
  const negative = randomBetween(15, 30);
  const neutral = randomBetween(5, 20);
  const positive = 100 - panic - negative - neutral;
  return [
    { name: 'Panic', value: panic, color: '#ef4444' },
    { name: 'Negative', value: negative, color: '#f97316' },
    { name: 'Neutral', value: Math.max(neutral, 3), color: '#64748b' },
    { name: 'Positive', value: Math.max(positive, 2), color: '#10b981' },
  ];
}

export function generateTrendData() {
  const hours = [];
  for (let i = 23; i >= 0; i--) {
    const h = new Date();
    h.setHours(h.getHours() - i);
    hours.push({
      time: `${h.getHours().toString().padStart(2, '0')}:00`,
      events: randomBetween(2, 25),
      alerts: randomBetween(0, 8),
      fakeNews: randomBetween(0, 12),
    });
  }
  return hours;
}

export function generateAlerts() {
  const alerts = [
    {
      id: 'alrt_1',
      severity: 'critical',
      title: 'Category 4 Hurricane — Landfall Imminent',
      description: 'Hurricane approaching eastern coastline. Evacuation mandatory for zones A-C.',
      time: '2 min ago',
      acknowledged: false,
      icon: '🌪️',
    },
    {
      id: 'alrt_2',
      severity: 'high',
      title: 'Flood Warning — Dam Capacity at 98%',
      description: 'Water levels critical. Downstream areas at high risk.',
      time: '15 min ago',
      acknowledged: false,
      icon: '🌊',
    },
    {
      id: 'alrt_3',
      severity: 'high',
      title: 'Misinformation Surge Detected',
      description: '340% spike in unverified claims about disease outbreak.',
      time: '32 min ago',
      acknowledged: false,
      icon: '⚠️',
    },
    {
      id: 'alrt_4',
      severity: 'medium',
      title: 'Earthquake Aftershock Advisory',
      description: 'Series of aftershocks expected in the next 24-48 hours.',
      time: '1 hr ago',
      acknowledged: true,
      icon: '🌍',
    },
    {
      id: 'alrt_5',
      severity: 'low',
      title: 'Air Quality Index Improving',
      description: 'AQI dropped to moderate levels. Wildfire containment at 65%.',
      time: '3 hr ago',
      acknowledged: true,
      icon: '💨',
    },
  ];
  return alerts;
}

export function generateIntelReport() {
  return {
    crisisType: 'Flood',
    icon: '🌊',
    iconBg: 'rgba(59, 130, 246, 0.15)',
    severity: 'High',
    severityColor: '#ef4444',
    confidence: 94,
    location: 'North Chennai, Tamil Nadu, India',
    affectedPop: '~125,000',
    timestamp: new Date().toISOString(),
    summary: 'Heavy rainfall has caused severe flooding in North Chennai and surrounding areas. Water levels in Adyar River have exceeded danger marks. Multiple residential areas are submerged with rescue operations actively underway. NDRF teams deployed. Approximately 125,000 people affected across 45 wards. Power supply disrupted in 12 zones. IMD predicts continued heavy rainfall for the next 48 hours.',
    recommendations: [
      'Evacuate all residents from low-lying areas within 3km radius of Adyar River',
      'Deploy additional NDRF teams and rescue boats to Zones 4, 7, and 12',
      'Activate emergency shelters at government schools and community centers',
      'Issue public advisory to avoid travel and stockpile essential supplies',
      'Monitor dam water levels at Chembarambakkam — controlled release may be needed',
      'Coordinate with military for aerial evacuation if water levels rise further',
    ],
    sources: [
      { name: 'IMD Chennai', credibility: 97, type: 'Government' },
      { name: 'NDMA Alert System', credibility: 96, type: 'Government' },
      { name: 'Reuters India', credibility: 95, type: 'News Agency' },
      { name: 'Twitter/X Analysis', credibility: 45, type: 'Social Media' },
    ],
  };
}

export function generatePipelineStatus() {
  return [
    { name: 'Data Collection', status: 'done', time: '0.8s', icon: '📡' },
    { name: 'Text Preprocessing', status: 'done', time: '1.2s', icon: '🔧' },
    { name: 'NER & Entity Extraction', status: 'done', time: '0.6s', icon: '🏷️' },
    { name: 'Event Detection (BERT)', status: 'active', time: '2.4s', icon: '🎯' },
    { name: 'Fake News Detection', status: 'active', time: '1.8s', icon: '🔍' },
    { name: 'Sentiment Analysis', status: 'waiting', time: '—', icon: '💭' },
    { name: 'AI Summarization', status: 'waiting', time: '—', icon: '📝' },
    { name: 'Report Generation', status: 'waiting', time: '—', icon: '📊' },
  ];
}

export function generateStats() {
  return {
    activeEvents: randomBetween(8, 18),
    articlesScanned: randomBetween(2400, 8500),
    fakeNewsBlocked: randomBetween(120, 450),
    alertsSent: randomBetween(24, 89),
  };
}

export function generateEventCounts() {
  return CRISIS_TYPES.map(type => ({
    type,
    name: type.charAt(0).toUpperCase() + type.slice(1),
    icon: CRISIS_ICONS[type],
    color: CRISIS_COLORS[type],
    count: randomBetween(1, 12),
    trend: randomBetween(-20, 40),
  }));
}

export function generateTimeline() {
  const events = generateEvents(8);
  return events.map((evt, i) => ({
    id: evt.id,
    time: `${randomBetween(1, 12)}:${randomBetween(10, 59)} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
    title: evt.title.split('—')[0].trim(),
    description: `${evt.icon} ${evt.severity.toUpperCase()} severity event detected in ${evt.location}. Confidence: ${evt.confidence}%.`,
    type: evt.type,
    severity: evt.severity,
  }));
}

export function generateSocialPosts(type) {
  const posts = SOCIAL_POSTS[type] || SOCIAL_POSTS.flood;
  return posts.map((text, i) => ({
    id: `post_${i}`,
    text,
    source: randomItem(['Twitter/X', 'Facebook', 'WhatsApp', 'Telegram']),
    sentiment: randomItem(['panic', 'negative', 'neutral', 'positive']),
    isFake: text.startsWith('FAKE'),
    time: generateTimeAgo(),
    likes: randomBetween(10, 5000),
    shares: randomBetween(5, 2000),
  }));
}

export { CRISIS_TYPES, CRISIS_ICONS, CRISIS_COLORS, SEVERITIES };
