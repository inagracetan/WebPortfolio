export type MultimediaCategory =
  | 'Video Editing'
  | 'Graphic Design'
  | 'Photo Editing'
  | 'Digital Artwork'

export interface MultimediaItem {
  id: string
  title: string
  category: MultimediaCategory
  mediaType: 'video' | 'image'
  mediaUrl: string
  thumbnailUrl?: string
  aspectRatio?: 'video' | 'portrait' | 'square' | 'wide'
  description: string
  tools: string[]
  date?: string
  externalUrl?: string
}

export const multimediaData: MultimediaItem[] = [
  // ==========================================
  // VIDEO EDITING
  // ==========================================
  {
    id: 'dream-chaser-video',
    title: 'The Dream Chaser (Narrative A-Roll)',
    category: 'Video Editing',
    mediaType: 'video',
    mediaUrl: '/multimedia/dream_chaser.mp4',
    aspectRatio: 'video',
    description: 'Cinematic narrative short film video production featuring story-driven pacing, natural light capture, audio synchronization, and color grading.',
    tools: ['Adobe Premiere Pro', 'Cinematography', 'Color Grading'],
    date: 'November 2024',
  },
  {
    id: 'lucky-bliss-broll',
    title: 'Lucky Bliss Commercial B-Roll Production',
    category: 'Video Editing',
    mediaType: 'video',
    mediaUrl: '/multimedia/lucky_bliss.mp4',
    aspectRatio: 'video',
    description: 'Commercial beverage B-roll sequence featuring dynamic macro product shots, liquid pours, motion rhythm, and commercial sound design.',
    tools: ['Adobe Premiere Pro', 'Commercial Video', 'Motion Editing'],
    date: 'November 2024',
  },
  {
    id: 'multimedia-info-video',
    title: 'Multimedia Technology Information Showcase',
    category: 'Video Editing',
    mediaType: 'video',
    mediaUrl: '/multimedia/multimedia_info.mp4',
    aspectRatio: 'video',
    description: 'Informational multimedia showcase highlighting digital production workflows, audio editing, and video compilation techniques.',
    tools: ['Video Editing', 'Motion Graphics', 'Audio Mixing'],
    date: 'November 2024',
  },

  // ==========================================
  // DIGITAL ARTWORK
  // ==========================================
  {
    id: 'mt-culmination-2024',
    title: 'Multimedia Technology Culmination 2024',
    category: 'Digital Artwork',
    mediaType: 'image',
    mediaUrl: '/multimedia/Tan_Culmination.jpg',
    aspectRatio: 'portrait',
    description: 'Official exhibition poster embodying a futuristic cyberpunk visual identity with glowing holographic HUD visor optics and traditional Japanese wave motifs.',
    tools: ['Adobe Photoshop', 'Digital Composition', 'Cyberpunk Styling'],
    date: 'September 2024',
  },
  {
    id: 'save-the-turtles',
    title: 'Save The Turtles — Marine Conservation Advocacy',
    category: 'Digital Artwork',
    mediaType: 'image',
    mediaUrl: '/multimedia/Tan_IG_Flyer.jpg',
    aspectRatio: 'portrait',
    description: 'Environmental digital artwork featuring an oceanic sea turtle interwoven through custom typography to champion biodiversity and marine habitat preservation.',
    tools: ['Adobe Photoshop', 'Photo Manipulation', 'Digital Artwork'],
    date: 'September 2024',
  },
  {
    id: 'autumn-landscape-mask',
    title: 'Autumn Mountain & Lake Typographic Window',
    category: 'Digital Artwork',
    mediaType: 'image',
    mediaUrl: '/multimedia/autumn_sign.jpg',
    aspectRatio: 'wide',
    description: 'Typographic landscape composition blending alpine forest reflections and autumn foliage through custom dimensional letterform mask windows.',
    tools: ['Adobe Photoshop', 'Typographic Art', 'Color Grading'],
    date: 'September 2024',
  },

  // ==========================================
  // GRAPHIC DESIGN
  // ==========================================
  {
    id: 'christmas-fest-flyer',
    title: 'Christmas Festival Invitation & Promotional Poster',
    category: 'Graphic Design',
    mediaType: 'image',
    mediaUrl: '/multimedia/Tan_ChristmasFest.jpg',
    aspectRatio: 'portrait',
    description: 'Festive holiday promotional poster created with warm bokeh lighting, elegant script headers, and structured typography hierarchy.',
    tools: ['Adobe Photoshop', 'Typography', 'Promotional Layout'],
    date: 'September 2024',
  },
  {
    id: 'music-competition-poster',
    title: 'Music Competition Promotional Poster',
    category: 'Graphic Design',
    mediaType: 'image',
    mediaUrl: '/multimedia/Tan_Music_Competition.jpg',
    aspectRatio: 'portrait',
    description: 'High-energy musical event poster utilizing bright neon gradients, doodle art illustrations, and bold typography hierarchy for college festival promotion.',
    tools: ['Adobe Photoshop', 'Vector Illustration', 'Graphic Design'],
    date: 'September 2024',
  },
  {
    id: 'cmu-founding-anniversary',
    title: '114th Founding Anniversary & Alumni Homecoming',
    category: 'Graphic Design',
    mediaType: 'image',
    mediaUrl: '/multimedia/Tan_Foundation_day.jpg',
    aspectRatio: 'portrait',
    description: 'Official schedule of activities poster designed for Central Mindanao University celebration featuring university landmarks and festive leaf patterns.',
    tools: ['Adobe Photoshop', 'Editorial Layout', 'Brand Identity'],
    date: 'September 2024',
  },
  {
    id: 'lucky-bliss-brand-badge',
    title: 'Lucky Bliss Fruity Drink Mascot Emblem & Badge',
    category: 'Graphic Design',
    mediaType: 'image',
    mediaUrl: '/multimedia/bliss.png',
    aspectRatio: 'square',
    description: 'Commercial brand badge and packaging sticker design featuring a playful bunny mascot, retro wave scalloped borders, and custom typography.',
    tools: ['Adobe Illustrator', 'Brand Identity', 'Packaging Design'],
    date: 'November 2024',
  },
  {
    id: 'agriculture-seminar-poster',
    title: 'Quality Customer Service Seminar Poster',
    category: 'Graphic Design',
    mediaType: 'image',
    mediaUrl: '/multimedia/agriculture_seminar.jpeg',
    aspectRatio: 'portrait',
    description: 'Official corporate seminar banner created during IT internship at the City Agriculture Office (LGU Malaybalay City) with emerald and gold geometric accents.',
    tools: ['Adobe Photoshop', 'Corporate Layout', 'Branding'],
    date: 'March 2026',
  },
  {
    id: 'agriculture-programme-guide',
    title: 'Seminar Programme & Event Itinerary',
    category: 'Graphic Design',
    mediaType: 'image',
    mediaUrl: '/multimedia/agriculture_programme.jpeg',
    aspectRatio: 'portrait',
    description: 'Executive event itinerary layout for local government agricultural stakeholders, featuring official city seals, schedule milestones, and formal typography.',
    tools: ['Adobe Photoshop', 'Editorial Design', 'Typography'],
    date: 'March 2026',
  },
  {
    id: 'uniform-design-concepts',
    title: 'LGU Malaybalay Corporate Office Uniform Concepts',
    category: 'Graphic Design',
    mediaType: 'image',
    mediaUrl: '/multimedia/uniform_design.jpeg',
    aspectRatio: 'wide',
    description: 'Apparel design options created for agricultural office personnel showcasing three color schemes, geometric body accents, and official embroidery placement.',
    tools: ['Adobe Photoshop', 'Apparel Design', 'Vector Mockups'],
    date: 'April 2026',
  },

  // ==========================================
  // PHOTO EDITING
  // ==========================================
  {
    id: 'item-photography-soap',
    title: 'Artisan Botanical Soap Commercial Product Photography',
    category: 'Photo Editing',
    mediaType: 'image',
    mediaUrl: '/multimedia/Tan_IG_Item_Photography.jpg',
    aspectRatio: 'wide',
    description: 'Studio commercial product photography, lighting setup, and professional photo retouching featuring natural soap bars with botanical elements.',
    tools: ['Studio Photography', 'Adobe Lightroom', 'Photo Retouching'],
    date: 'September 2024',
  },
  {
    id: 'fencing-action-typography',
    title: 'Fencing Sports Action & Typography Composition',
    category: 'Photo Editing',
    mediaType: 'image',
    mediaUrl: '/multimedia/Tan_sport_sign.jpg',
    aspectRatio: 'wide',
    description: 'High-speed sports action photo composite capturing fencers in motion, masked through bold typographic letterforms with clean studio lighting.',
    tools: ['Adobe Photoshop', 'Action Photography', 'Photo Manipulation'],
    date: 'September 2024',
  },
  {
    id: 'justice-for-all-portrait',
    title: 'Justice For All Sculptural Editorial Typography',
    category: 'Photo Editing',
    mediaType: 'image',
    mediaUrl: '/multimedia/Tan_IG_Customized.jpg',
    aspectRatio: 'wide',
    description: 'Editorial photo composition combining high-contrast golden hour statue lighting with vertical cut text masking on justice and equality themes.',
    tools: ['Adobe Photoshop', 'Photo Retouching', 'Editorial Typography'],
    date: 'September 2024',
  },
]

