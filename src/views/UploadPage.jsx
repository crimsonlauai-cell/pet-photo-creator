import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { buildPrompt, generateImage } from '../data/api'
import OptionSelector from '../components/OptionSelector'
import { BACKGROUNDS, EXPRESSIONS, POSES, OUTFITS, ACCESSORIES, PHOTO_STYLES } from '../data/themes'

export default function UploadPage() {
  const navigate = useNavigate()
  const { uploadedImages, setUploadedImages, selections, updateSelection, addGeneratedImage, isGenerating, setIsGenerating } = useApp()
  const fileInputRef = useRef()
  const [error, setError] = useState('')

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64Full = e.target.result
        const [header, base64] = base64Full.split(',')
        const mimeType = header.match(/:(.*?);/)[1]
        resolve({ base64, mimeType, preview: base64Full })
      }
      reader.readAsDataURL(file)
    })
  }

  async function handleFiles(files) {
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'))
    const results = await Promise.all(imageFiles.map(readFile))
    setUploadedImages(prev => [...prev, ...results])
  }

  function removeImage(index) {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  function onDrop(e) {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }

  async function handleGenerate() {
    if (uploadedImages.length === 0) return setError('請先上傳至少一張寵物照片')
    if (!selections.background && !selections.customPrompt) return setError('請至少選擇一個背景主題')
    setError('')
    setIsGenerating(true)
    try {
      const prompt = buildPrompt(selections)
      const result = await generateImage(uploadedImages, prompt)
      addGeneratedImage({ base64: result.base64, mimeType: result.mimeType, driveUrl: null, timestamp: Date.now(), saved: false })
      navigate('/result')
    } catch (err) {
      setError(err.message || '生成失敗，請重試')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-1">製作寵物照片</h1>
        <p className="text-gray-400 text-sm">上傳照片 → 選擇主題 → 生成擬真結果</p>
      </div>

      {/* Upload Zone */}
      <div
        className="border-2 border-dashed border-amber-300 rounded-2xl p-6 text-center cursor-pointer bg-warm-50 hover:bg-amber-50 transition-colors"
        onClick={() => fileInputRef.current.click()}
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
      >
        {uploadedImages.length === 0 ? (
          <>
            <div className="text-5xl mb-3">📷</div>
            <p className="font-bold text-gray-700">點擊或拖放上傳寵物照片</p>
            <p className="text-sm text-gray-400 mt-1">可同時上傳多張，每張一隻寵物，生成時會合照</p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap justify-center gap-3">
              {uploadedImages.map((img, i) => (
                <div key={i} className="relative group">
                  <img src={img.preview} alt={`pet ${i+1}`} className="h-32 w-32 object-cover rounded-xl shadow-md" />
                  <button
                    onClick={e => { e.stopPropagation(); removeImage(i) }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >✕</button>
                  <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded-md">
                    寵物 {i+1}
                  </div>
                </div>
              ))}
            </div>
            <span className="text-sm text-amber-600 font-semibold">點擊繼續新增照片</span>
            {uploadedImages.length > 1 && (
              <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                {uploadedImages.length} 隻寵物將合照生成
              </span>
            )}
          </div>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handleFiles(e.target.files)} />
      </div>

      {/* Options */}
      <OptionSelector title="📍 背景主題" options={BACKGROUNDS} selected={selections.background} onSelect={v => updateSelection('background', v)} />
      <OptionSelector title="😊 表情" options={EXPRESSIONS} selected={selections.expression} onSelect={v => updateSelection('expression', v)} />
      <OptionSelector title="🐾 姿態" options={POSES} selected={selections.pose} onSelect={v => updateSelection('pose', v)} />
      <OptionSelector title="👗 服裝" options={OUTFITS} selected={selections.outfit} onSelect={v => updateSelection('outfit', v)} />
      <OptionSelector title="💎 配件" options={ACCESSORIES} selected={selections.accessory} onSelect={v => updateSelection('accessory', v)} />
      <OptionSelector title="📸 攝影風格" options={PHOTO_STYLES} selected={selections.photoStyle} onSelect={v => updateSelection('photoStyle', v)} />

      {/* Custom Prompt */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-100">
        <h3 className="font-bold text-gray-800 mb-2">✍️ 自訂描述（選填）</h3>
        <p className="text-xs text-gray-400 mb-3">如果上方選項都不符合需求，才在此輸入額外描述</p>
        <textarea
          value={selections.customPrompt}
          onChange={e => updateSelection('customPrompt', e.target.value)}
          placeholder="例：背景加上滿天星星，寵物頭上有一隻小蝴蝶停著…"
          className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 resize-none focus:outline-none focus:border-amber-400 h-24"
        />
      </div>

      {error && <p className="text-red-500 text-sm text-center font-semibold">{error}</p>}

      <button
        onClick={handleGenerate}
        disabled={isGenerating || uploadedImages.length === 0}
        className={`w-full py-4 rounded-2xl font-extrabold text-lg shadow-lg transition-all
          ${isGenerating || uploadedImages.length === 0
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-amber-400 hover:bg-amber-500 text-white hover:scale-[1.01]'}`}
      >
        {isGenerating ? '✨ AI 正在生成，請稍候…' : `✨ 生成照片${uploadedImages.length > 1 ? `（${uploadedImages.length} 隻合照）` : ''}`}
      </button>
    </div>
  )
}
