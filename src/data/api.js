import axios from 'axios'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GAS_URL = import.meta.env.VITE_GAS_URL

// Build a structured prompt from user selections
export function buildPrompt({ petDescription, background, expression, pose, outfit, accessory, photoStyle, customPrompt }) {
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

const GEMINI_MODEL = 'gemini-3.1-flash-image'
const GEMINI_HEADERS = {
  'Content-Type': 'application/json',
  'x-goog-api-key': GEMINI_API_KEY,
}

function extractImage(res) {
  const candidate = res.data.candidates?.[0]
  console.log('[Gemini] parts:', candidate?.content?.parts?.map(p => p.inlineData ? 'image' : `text(${p.text?.slice(0,50)})`))
  const imagePart = candidate?.content?.parts?.find(p =>
    p.inlineData?.mimeType?.startsWith('image/') || p.inline_data?.mime_type?.startsWith('image/')
  )
  if (!imagePart) throw new Error('Gemini 未返回圖片，請檢查 API Key 及模型權限。')
  const imgData = imagePart.inlineData || imagePart.inline_data
  return { base64: imgData.data, mimeType: imgData.mimeType || imgData.mime_type }
}

// Call Gemini image generation — supports multiple input images
export async function generateImage(images, prompt) {
  // images: [{ base64, mimeType }]
  const url = `/gemini-proxy/v1beta/models/${GEMINI_MODEL}:generateContent`

  const imageParts = images.map(img => ({ inlineData: { mimeType: img.mimeType, data: img.base64 } }))
  const petCount = images.length
  const multiPetNote = petCount > 1
    ? `There are ${petCount} separate pet photos provided. Include ALL ${petCount} pets together in ONE single photorealistic scene. Each pet should be clearly visible and naturally positioned together.`
    : ''

  const body = {
    contents: [{ parts: [{ text: `${multiPetNote} ${prompt}` }, ...imageParts] }],
    generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
  }

  let res
  try {
    res = await axios.post(url, body, { headers: GEMINI_HEADERS })
  } catch (err) {
    const detail = err.response?.data?.error?.message || err.message
    throw new Error(`Gemini API 錯誤：${detail}`)
  }
  return extractImage(res)
}

// Refine a previously generated image with free-text instruction
export async function refineImage(generatedBase64, generatedMimeType, refineText) {
  const url = `/gemini-proxy/v1beta/models/${GEMINI_MODEL}:generateContent`
  const body = {
    contents: [{
      parts: [
        { text: `This is an AI-generated photorealistic pet photo. Apply the following refinement while keeping the photorealistic style and all pet features intact: ${refineText}` },
        { inlineData: { mimeType: generatedMimeType, data: generatedBase64 } },
      ]
    }],
    generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
  }
  let res
  try {
    res = await axios.post(url, body, { headers: GEMINI_HEADERS })
  } catch (err) {
    const detail = err.response?.data?.error?.message || err.message
    throw new Error(`Gemini API 錯誤：${detail}`)
  }
  return extractImage(res)
}

// Save generated image to Google Drive via GAS
export async function saveToGoogleDrive(base64, mimeType, filename) {
  if (!GAS_URL) return null

  const res = await axios.post(GAS_URL, {
    action: 'saveImage',
    base64,
    mimeType,
    filename,
  })

  return res.data?.fileUrl || null
}

// Fetch gallery images from Google Drive via GAS
export async function fetchGallery() {
  if (!GAS_URL) return []

  const res = await axios.get(`${GAS_URL}?action=getGallery`)
  return res.data?.images || []
}
