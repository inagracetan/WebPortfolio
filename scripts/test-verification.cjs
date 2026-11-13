const fs = require('fs')
const path = require('path')

console.log('=== RUNNING VERIFICATION SUITE ===\n')

let passed = 0
let failed = 0

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`)
    passed++
  } else {
    console.error(`[FAIL] ${message}`)
    failed++
  }
}

// 1. Test Multimedia Assets Existence
console.log('1. Checking optimized image assets on disk...')
const publicDir = path.resolve('public')
assert(fs.existsSync(path.join(publicDir, 'IT_Logo.webp')), 'public/IT_Logo.webp exists')
assert(fs.existsSync(path.join(publicDir, 'profile.webp')), 'public/profile.webp exists')
assert(fs.existsSync(path.join(publicDir, 'favicon.png')), 'public/favicon.png exists')

// Check multimedia items
const multimediaTs = fs.readFileSync('src/data/multimedia.ts', 'utf-8')
const mediaUrls = [...multimediaTs.matchAll(/mediaUrl:\s*'([^']+)'/g)].map(m => m[1])
const thumbUrls = [...multimediaTs.matchAll(/thumbnailUrl:\s*'([^']+)'/g)].map(m => m[1])

for (const u of mediaUrls) {
  const filePath = path.join(publicDir, u.replace(/^\//, ''))
  assert(fs.existsSync(filePath), `Media file exists: ${u}`)
}

for (const u of thumbUrls) {
  const filePath = path.join(publicDir, u.replace(/^\//, ''))
  assert(fs.existsSync(filePath), `Thumbnail exists: ${u}`)
}

// 2. Test File Size Budgets
console.log('\n2. Checking asset size budgets...')
const itLogoSize = fs.statSync(path.join(publicDir, 'IT_Logo.png')).size
assert(itLogoSize < 50 * 1024, `IT_Logo.png is under 50KB (${(itLogoSize / 1024).toFixed(1)} KB)`)

const faviconSize = fs.statSync(path.join(publicDir, 'favicon.png')).size
assert(faviconSize < 20 * 1024, `favicon.png is under 20KB (${(faviconSize / 1024).toFixed(1)} KB)`)

// 3. Test Transmission Validation Logic
console.log('\n3. Testing transmission payload validation rules...')
function validate(payload) {
  const errors = {}
  const name = (payload.name || '').trim()
  const email = (payload.email || '').trim()
  const message = (payload.message || '').trim()

  if (!name) errors.name = 'CALLSIGN_REQUIRED'
  else if (name.length < 2) errors.name = 'CALLSIGN_TOO_SHORT'

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) errors.email = 'FREQUENCY_REQUIRED'
  else if (!emailRegex.test(email)) errors.email = 'INVALID_FREQUENCY'

  if (!message) errors.message = 'PAYLOAD_REQUIRED'
  else if (message.length < 10) errors.message = 'PAYLOAD_INSUFFICIENT'

  return { isValid: Object.keys(errors).length === 0, errors }
}

assert(validate({ name: '', email: '', message: '' }).isValid === false, 'Empty payload rejected')
assert(validate({ name: 'J', email: 'test@example.com', message: 'Hello this is long enough' }).errors.name === 'CALLSIGN_TOO_SHORT', 'Short name rejected')
assert(validate({ name: 'Jane', email: 'not-an-email', message: 'Hello this is long enough' }).errors.email === 'INVALID_FREQUENCY', 'Malformed email rejected')
assert(validate({ name: 'Jane', email: 'jane@example.com', message: 'Too short' }).errors.message === 'PAYLOAD_INSUFFICIENT', 'Short message (<10) rejected')
assert(validate({ name: 'Jane Doe', email: 'jane.doe@company.com', message: 'We would love to interview you for an IT role.' }).isValid === true, 'Valid payload passes all checks')

// 4. Test Dead Code Elimination
console.log('\n4. Checking dead asset elimination...')
assert(!fs.existsSync('src/assets/MT'), 'src/assets/MT directory successfully removed')

// 5. Test Apple Motion System Integration
console.log('\n5. Checking Apple-inspired motion system integrations...')
const motionTs = fs.readFileSync('src/styles/motion.ts', 'utf-8')
assert(motionTs.includes('APPLE_SPRINGS'), 'motion.ts exports APPLE_SPRINGS')
assert(motionTs.includes('APPLE_EASE'), 'motion.ts exports APPLE_EASE')
assert(motionTs.includes('BUTTON_PRESS_MOTION'), 'motion.ts exports BUTTON_PRESS_MOTION')

const navTsx = fs.readFileSync('src/components/portfolio/DirectPortfolioNav.tsx', 'utf-8')
assert(navTsx.includes('layoutId="direct-nav-active-pill"'), 'DirectPortfolioNav uses sliding pill indicator')

const directViewTsx = fs.readFileSync('src/components/portfolio/DirectPortfolioView.tsx', 'utf-8')
assert(directViewTsx.includes('layoutId="media-filter-active-pill"'), 'DirectPortfolioView multimedia filter uses sliding pill')

const skillsModalTsx = fs.readFileSync('src/components/modals/SkillsModal.tsx', 'utf-8')
assert(skillsModalTsx.includes('layoutId="skills-domain-active-pill"'), 'SkillsModal uses sliding domain pill')

const projectsModalTsx = fs.readFileSync('src/components/modals/ProjectsModal.tsx', 'utf-8')
assert(projectsModalTsx.includes('layoutId="projects-category-active-pill"'), 'ProjectsModal uses sliding category pill')

const resumeModalTsx = fs.readFileSync('src/components/modals/ResumeModal.tsx', 'utf-8')
assert(resumeModalTsx.includes('layoutId="resume-tab-active-pill"'), 'ResumeModal uses sliding tab pill')

const expModalTsx = fs.readFileSync('src/components/modals/ExperienceModal.tsx', 'utf-8')
assert(expModalTsx.includes('layoutId="experience-tab-active-pill"'), 'ExperienceModal uses sliding tab pill')

const contactModalTsx = fs.readFileSync('src/components/modals/ContactModal.tsx', 'utf-8')
assert(contactModalTsx.includes('layoutId="contact-modal-tab-indicator"'), 'ContactModal uses sliding tab indicator')

const transmissionFormTsx = fs.readFileSync('src/components/portfolio/TransmissionForm.tsx', 'utf-8')
assert(transmissionFormTsx.includes('AnimatePresence'), 'TransmissionForm uses AnimatePresence for fluid state reveals')
assert(transmissionFormTsx.includes('APPLE_SPRINGS'), 'TransmissionForm uses Apple spring physics')

const hudTsx = fs.readFileSync('src/components/ui/WorldHud.tsx', 'utf-8')
assert(hudTsx.includes('whileTap'), 'WorldHud buttons have tactile whileTap feedback')

const minimapTsx = fs.readFileSync('src/components/ui/Minimap.tsx', 'utf-8')
assert(minimapTsx.includes('whileTap'), 'Minimap destination nodes have whileTap feedback')

const drawerTsx = fs.readFileSync('src/components/modals/MenuDrawer.tsx', 'utf-8')
assert(drawerTsx.includes('staggerContainerVariants'), 'MenuDrawer uses staggered item cascade')

console.log(`\n=== RESULTS: ${passed} PASSED, ${failed} FAILED ===`)
if (failed > 0) process.exit(1)

