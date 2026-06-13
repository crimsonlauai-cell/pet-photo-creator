import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [uploadedImages, setUploadedImages] = useState([]) // [{ base64, mimeType, preview }]
  const [selections, setSelections] = useState({
    background: null,
    expression: null,
    pose: null,
    outfit: null,
    accessory: null,
    photoStyle: null,
    customPrompt: '',
  })
  const [generatedImages, setGeneratedImages] = useState([]) // results in current session
  const [isGenerating, setIsGenerating] = useState(false)

  function updateSelection(key, value) {
    setSelections(prev => ({ ...prev, [key]: value }))
  }

  function addGeneratedImage(img) {
    setGeneratedImages(prev => [img, ...prev])
  }

  function resetSession() {
    setUploadedImages([])
    setSelections({ background: null, expression: null, pose: null, outfit: null, accessory: null, photoStyle: null, customPrompt: '' })
    setGeneratedImages([])
  }

  return (
    <AppContext.Provider value={{
      uploadedImages, setUploadedImages,
      selections, updateSelection,
      generatedImages, addGeneratedImage,
      isGenerating, setIsGenerating,
      resetSession,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
