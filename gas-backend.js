// Pet Photo Creator — GAS Backend
// Deploy as Web App: Execute as Me, Access: Anyone
//
// Before deploying, set Script Property:
//   Key: GEMINI_API_KEY
//   Value: your AQ.xxx key
// Go to: Project Settings → Script Properties → Add property

const FOLDER_NAME = 'Pet Photo Creator - Generated Photos'
const GEMINI_MODEL = 'gemini-3.1-flash-image'
const ALLOWED_ORIGIN = '*' // restrict to your GitHub Pages URL after deploy

function doPost(e) {
  const headers = {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  try {
    const data = JSON.parse(e.postData.contents)

    if (data.action === 'generateImage') {
      return handleGenerateImage(data, headers)
    }

    if (data.action === 'saveImage') {
      return handleSaveImage(data, headers)
    }

    return makeResponse({ success: false, error: 'Unknown action' }, headers)

  } catch (err) {
    return makeResponse({ success: false, error: err.message }, headers)
  }
}

function doGet(e) {
  const headers = {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Content-Type': 'application/json',
  }

  if (e.parameter.action === 'getGallery') {
    try {
      const folder = getOrCreateFolder()
      const files = folder.getFiles()
      const images = []
      while (files.hasNext()) {
        const file = files.next()
        images.push({
          url: `https://drive.google.com/uc?export=view&id=${file.getId()}`,
          fileId: file.getId(),
          filename: file.getName(),
          timestamp: file.getDateCreated().getTime(),
        })
      }
      images.sort((a, b) => b.timestamp - a.timestamp)
      return makeResponse({ success: true, images }, headers)
    } catch (err) {
      return makeResponse({ success: false, error: err.message }, headers)
    }
  }

  return makeResponse({ success: false, error: 'Unknown action' }, headers)
}

// Handle OPTIONS preflight
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
}

function handleGenerateImage(data, headers) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY')
  if (!apiKey) return makeResponse({ success: false, error: 'API key not configured in Script Properties' }, headers)

  const { images, prompt, petCount } = data
  // images: [{ base64, mimeType }]

  const multiPetNote = petCount > 1
    ? `There are ${petCount} separate pet photos provided. Include ALL ${petCount} pets together in ONE single photorealistic scene.`
    : ''

  const parts = [{ text: `${multiPetNote} ${prompt}` }]
  images.forEach(img => {
    parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } })
  })

  const payload = {
    contents: [{ parts }],
    generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`
  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: { 'x-goog-api-key': apiKey },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  })

  const result = JSON.parse(response.getContentText())
  if (result.error) return makeResponse({ success: false, error: result.error.message }, headers)

  const candidate = result.candidates?.[0]
  const imagePart = candidate?.content?.parts?.find(p => p.inlineData?.mimeType?.startsWith('image/'))

  if (!imagePart) return makeResponse({ success: false, error: 'Gemini did not return an image' }, headers)

  return makeResponse({
    success: true,
    base64: imagePart.inlineData.data,
    mimeType: imagePart.inlineData.mimeType,
  }, headers)
}

function handleSaveImage(data, headers) {
  const folder = getOrCreateFolder()
  const blob = Utilities.newBlob(
    Utilities.base64Decode(data.base64),
    data.mimeType,
    data.filename
  )
  const file = folder.createFile(blob)
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)

  return makeResponse({
    success: true,
    fileUrl: `https://drive.google.com/uc?export=view&id=${file.getId()}`,
    fileId: file.getId(),
  }, headers)
}

function getOrCreateFolder() {
  const folders = DriveApp.getFoldersByName(FOLDER_NAME)
  if (folders.hasNext()) return folders.next()
  return DriveApp.createFolder(FOLDER_NAME)
}

function makeResponse(data, headers) {
  const output = ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
  return output
}
