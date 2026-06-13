import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { refineImage, saveToGoogleDrive } from '../data/api'

export default function ResultPage() {
  const navigate = useNavigate()
  const { generatedImages, uploadedImages, addGeneratedImage } = useApp()
  const latest = generatedImages[0]

  const [refineText, setRefineText] = useState('')
  const [isRefining, setIsRefining] = useState(false)
  const [refineError, setRefineError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState('')

  if (!latest) {
    navigate('/upload')
    return null
  }

  function downloadImage() {
    const a = document.createElement('a')
    a.href = `data:${latest.mimeType};base64,${latest.base64}`
    a.download = `pet_creation_${Date.now()}.jpg`
    a.click()
  }

  async function handleRefine() {
    if (!refineText.trim()) return
    setRefineError('')
    setIsRefining(true)
    try {
      const result = await refineImage(latest.base64, latest.mimeType, refineText)
      addGeneratedImage({ base64: result.base64, mimeType: result.mimeType, driveUrl: null, timestamp: Date.now(), saved: false })
      setRefineText('')
      setSaved(false)
      setSaveError('')
    } catch (err) {
      setRefineError(err.message || '微調失敗，請重試')
    } finally {
      setIsRefining(false)
    }
  }

  async function handleConfirmSave() {
    if (saved || isSaving) return
    setIsSaving(true)
    setSaveError('')
    try {
      const filename = `pet_${Date.now()}.jpg`
      const driveUrl = await saveToGoogleDrive(latest.base64, latest.mimeType, filename)
      setSaved(true)
      // update the latest image entry with driveUrl
      latest.driveUrl = driveUrl
      latest.saved = true
    } catch (err) {
      setSaveError('儲存至 Google Drive 失敗，請重試')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-1">生成完成！🎉</h1>
        <p className="text-sm text-gray-400">滿意後按「確認儲存」才會加入相片庫</p>
      </div>

      {/* Generated image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={latest.timestamp}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src={`data:${latest.mimeType};base64,${latest.base64}`}
            alt="Generated pet"
            className="w-full object-contain"
          />
        </motion.div>
      </AnimatePresence>

      {/* Confirm Save */}
      <div className={`rounded-2xl p-5 border-2 transition-all ${saved ? 'bg-green-50 border-green-200' : 'bg-white border-amber-200'}`}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-bold text-gray-800">
              {saved ? '✅ 已儲存至相片庫' : '📁 確認並儲存至相片庫'}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {saved ? '圖片已成功儲存至 Google Drive' : '對這張圖片滿意後，按下確認儲存'}
            </p>
          </div>
          {!saved && (
            <button
              onClick={handleConfirmSave}
              disabled={isSaving}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap
                ${isSaving ? 'bg-gray-100 text-gray-400' : 'bg-green-500 hover:bg-green-600 text-white shadow-sm'}`}
            >
              {isSaving ? '儲存中…' : '確認儲存 ✓'}
            </button>
          )}
          {saved && latest.driveUrl && (
            <a href={latest.driveUrl} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-50 text-blue-600 font-semibold rounded-xl text-sm hover:bg-blue-100">
              Drive 查看
            </a>
          )}
        </div>
        {saveError && <p className="text-red-500 text-xs mt-1">{saveError}</p>}
      </div>

      {/* Refine section */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-100">
        <h3 className="font-bold text-gray-800 mb-1">🔧 微調這張圖片</h3>
        <p className="text-xs text-gray-400 mb-3">描述想要調整的細節，可多次微調直到滿意為止</p>
        <textarea
          value={refineText}
          onChange={e => setRefineText(e.target.value)}
          placeholder="例：讓貓咪更靠近鏡頭、背景的光線更暖一點、幫狗狗加一頂藍色帽子…"
          className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 resize-none focus:outline-none focus:border-amber-400 h-24"
          disabled={isRefining}
        />
        {refineError && <p className="text-red-500 text-xs mt-1">{refineError}</p>}
        <button
          onClick={handleRefine}
          disabled={isRefining || !refineText.trim()}
          className={`mt-3 w-full py-3 rounded-xl font-bold text-sm transition-all
            ${isRefining || !refineText.trim()
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-amber-400 hover:bg-amber-500 text-white'}`}
        >
          {isRefining ? '✨ 微調中，請稍候…' : '✨ 套用微調'}
        </button>
      </div>

      {/* Other actions */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={downloadImage}
          className="py-3 bg-amber-50 text-amber-700 font-bold rounded-xl text-sm hover:bg-amber-100 transition-colors border border-amber-200">
          ⬇️ 下載圖片
        </button>
        <button onClick={() => navigate('/upload')}
          className="py-3 bg-warm-100 text-gray-600 font-bold rounded-xl text-sm hover:bg-warm-200 transition-colors">
          🔄 重新製作
        </button>
        <button onClick={() => navigate('/gallery')}
          className="col-span-2 py-3 border border-warm-200 text-gray-500 font-semibold rounded-xl text-sm hover:bg-warm-50 transition-colors">
          🖼️ 瀏覽相片庫
        </button>
      </div>

      {/* Original photos strip */}
      {uploadedImages.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-warm-100">
          <p className="text-xs text-gray-400 font-semibold mb-2">原始上傳照片</p>
          <div className="flex gap-2 flex-wrap">
            {uploadedImages.map((img, i) => (
              <img key={i} src={img.preview} alt={`original ${i+1}`}
                className="h-20 w-20 object-cover rounded-xl border border-warm-100" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
