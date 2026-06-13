import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: '首頁' },
  { to: '/upload', label: '製作照片' },
  { to: '/gallery', label: '相片庫' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="bg-white shadow-sm border-b border-warm-100">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-amber-600">
          <span className="text-2xl">🐾</span>
          Pet Photo Creator
        </Link>
        <div className="flex gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all
                ${pathname === l.to
                  ? 'bg-amber-400 text-white shadow'
                  : 'text-gray-600 hover:bg-warm-100 hover:text-amber-600'}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
