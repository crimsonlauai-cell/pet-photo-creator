import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const features = [
  { emoji: '📸', title: '上傳寵物照片', desc: '支援貓咪、狗狗，保留所有原始外貌特徵' },
  { emoji: '🎨', title: '自由組合主題', desc: '背景、表情、姿態、服裝、配件，超多選項' },
  { emoji: '✨', title: 'AI 極致擬真生成', desc: '輸出媲美專業攝影的超真實照片' },
  { emoji: '🖼️', title: '相片庫永久保存', desc: '所有生成圖片儲存至 Google Drive 隨時瀏覽' },
]

export default function HomePage() {
  return (
    <div className="text-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-6xl mb-4">🐾</div>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
          Pet Photo Creator
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
          上傳你的貓貓狗狗，選擇心儀主題，AI 幫你生成極致擬真的夢幻寵物照
        </p>
        <Link
          to="/upload"
          className="inline-block bg-amber-400 hover:bg-amber-500 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg transition-all hover:scale-105"
        >
          立即開始製作 ✨
        </Link>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-warm-100 hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-3">{f.emoji}</div>
            <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
            <p className="text-sm text-gray-500">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12">
        <Link to="/gallery" className="text-amber-500 font-semibold hover:underline text-sm">
          瀏覽相片庫 →
        </Link>
      </div>
    </div>
  )
}
