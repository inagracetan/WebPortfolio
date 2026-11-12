export type MultimediaCategory =
  | 'Graphic Design'
  | 'Photo Editing'
  | 'Digital Artwork'

export interface MultimediaItem {
  id: string
  title: string
  category: MultimediaCategory
  mediaType: 'image'
  mediaUrl: string
  thumbnailUrl?: string
  aspectRatio?: 'portrait' | 'square' | 'wide'
  description: string
  tools: string[]
  date?: string
  externalUrl?: string
}

export const multimediaData: MultimediaItem[] = [
  // ==========================================
  // GRAPHIC DESIGN (CANVA & PRODUCTION ASSETS)
  // ==========================================
  {
    id: 'ojt-graphic-design',
    title: 'OJT Graphic Design',
    category: 'Graphic Design',
    mediaType: 'image',
    mediaUrl: '/documents/OJT_Presentation_Preview.png',
    aspectRatio: 'wide',
    description: 'Official corporate visual layout and branding collateral created during on-the-job training for the Farmers Training Center at the City Agriculture Office (City Government of Malaybalay).',
    tools: ['Canva', 'Graphic Design', 'Corporate Branding'],
    date: 'March 2026',
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
  // GRAPHIC DESIGN (CANVA & PRODUCTION ASSETS)
  // ==========================================
  {
    id: 'agriculture-quality-customer-seminar',
    title: 'Quality Customer Service Seminar & Programme Collateral',
    category: 'Graphic Design',
    mediaType: 'image',
    mediaUrl: '/multimedia/agriculture_seminar.jpeg',
    aspectRatio: 'portrait',
    description: 'Official promotional poster and event programme collateral designed for the City Agriculture Office (LGU Malaybalay City) for "Planting the Seeds of Service Excellence: Quality Customer Service for Agricultural Stakeholders" held at the Farmers Training Center, Casisang.',
    tools: ['Canva', 'Corporate Layout', 'Event Branding & Typography'],
    date: 'March 2026',
  },
  {
    id: 'music-competition-poster',
    title: 'Music Competition Promotional Poster',
    category: 'Graphic Design',
    mediaType: 'image',
    mediaUrl: '/multimedia/Tan_Music_Competition.jpg',
    aspectRatio: 'portrait',
    description: 'High-energy musical event poster utilizing bright neon gradients, doodle art illustrations, and bold typography hierarchy for college festival promotion.',
    tools: ['Canva', 'Graphic Design', 'Promotional Layout'],
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
    tools: ['Canva', 'Brand Identity', 'Packaging Design'],
    date: 'November 2024',
  },
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
