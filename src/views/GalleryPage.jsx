import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { fetchGallery } from '../data/api'

export default function GalleryPage() {
  const { generatedImages } = useApp()
  const [driveImages, setDriveImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [lightbox, setLightbox] = useState(null) // url string

  useEffect(() => {
    setLoading(true)
    fetchGallery()
      .then(setDriveImages)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Merge: session-generated (base64) + drive (url), deduplicate by driveUrl
  const sessionCards = generatedImages.map(img => ({
    src: `data:${img.mimeType};base64,${img.base64}`,
    driveUrl: img.driveUrl,
    timestamp: img.timestamp,
  }))

  const driveCards = driveImages
    .filter(d => !sessionCards.some(s => s.driveUrl === d.url))
    .map(d => ({ src: d.url, driveUrl: d.url, timestamp: d.timestamp }))

  const allCards = [...sessionCards, ...driveCards].sort((a, b) => b.timestamp - a.timestamp)

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-1">相片庫 🖼️</h1>
        <p className="text-sm text-gray-400">所有已生成的寵物照片</p>
      </div>

      {loading && (
        <p className="text-center text-gray-400 text-sm">載入 Google Drive 相片中…</p>
      )}

      {allCards.length === 0 && !loading && (
        <div className="text-center py-20 text-gray-300">
          <div className="text-6xl mb-4">🐾</div>
          <p className="font-semibold">相片庫是空的，快去製作第一張吧！</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {allCards.map((card, i) => (
          <motion.div
            key={card.driveUrl || i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="aspect-square rounded-2xl overflow-hidden shadow-sm border border-warm-100 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all"
            onClick={() => setLightbox(card.src)}
          >
            <img src={card.src} alt={`pet ${i}`} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="preview"
            className="max-w-full max-h-full rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white bg-black/40 rounded-full w-10 h-10 flex items-center justify-center text-xl hover:bg-black/60"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
