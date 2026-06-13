import axios from 'axios'

const GAS_URL = import.meta.env.VITE_GAS_URL

export function buildPrompt({ background, expression, pose, outfit, accessory, photoStyle, customPrompt }) {
  const parts = [
    `A highly realistic, photorealistic photograph of the exact same pet from the uploaded photo.`,
    `Preserve ALL original characteristics: exact breed, fur color, fur texture, fur pattern, body size, face shape, eye color.`,
    `Do NOT change the pet's appearance in any way — only apply the specified scene and styling.`,
    `Output must look like a real photograph, not a painting, illustration, or cartoon.`,
  ]
  if (background?.prompt) parts.push(`Background/Scene: ${background.prompt}`)
  if (expression?.prompt) parts.push(`Expression: ${expression.prompt}`)
  if (pose?.prompt) parts.push(`Pose: ${pose.prompt}`)
  if (outfit?.prompt) parts.push(`Outfit: ${outfit.prompt}`)
  if (accessory?.prompt) parts.push(`Accessories: ${accessory.prompt}`)
  if (photoStyle?.prompt) parts.push(`Photography style: ${photoStyle.prompt}`)
  if (customPrompt) parts.push(`Additional details: ${customPrompt}`)
  parts.push(`Ultra high resolution, sharp focus, professional pet photography, photorealistic.`)
  return parts.join(' ')
}

// POST to GAS using text/plain to avoid CORS preflight
async function gasPost(payload) {
  const res = await axios.post(GAS_URL, JSON.stringify(payload), {
    headers: { 'Content-Type': 'text/plain' },
  })
  return res.data
}

// Generate image via GAS middleware (hides API key from browser)
export async function generateImage(images, prompt) {
  const data = await gasPost({
    action: 'generateImage',
    images: images.map(img => ({ base64: img.base64, mimeType: img.mimeType })),
    prompt,
    petCount: images.length,
  })
  if (!data.success) throw new Error(`Gemini API 錯誤：${data.error}`)
  return { base64: data.base64, mimeType: data.mimeType }
}

// Refine generated image via GAS middleware
export async function refineImage(generatedBase64, generatedMimeType, refineText) {
  const data = await gasPost({
    action: 'generateImage',
    images: [{ base64: generatedBase64, mimeType: generatedMimeType }],
    prompt: `This is an AI-generated photorealistic pet photo. Apply the following refinement while keeping the photorealistic style and all pet features intact: ${refineText}. Ultra high resolution, sharp focus, photorealistic.`,
    petCount: 1,
  })
  if (!data.success) throw new Error(`微調失敗：${data.error}`)
  return { base64: data.base64, mimeType: data.mimeType }
}

// Save confirmed image to Google Drive via GAS
export async function saveToGoogleDrive(base64, mimeType, filename) {
  if (!GAS_URL) return null
  const data = await gasPost({ action: 'saveImage', base64, mimeType, filename })
  return data?.fileUrl || null
}

// Fetch gallery from Google Drive via GAS
export async function fetchGallery() {
  if (!GAS_URL) return []
  const res = await axios.get(`${GAS_URL}?action=getGallery`)
  return res.data?.images || []
}
