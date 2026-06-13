// Reusable option picker — handles both flat arrays and category-grouped arrays

export default function OptionSelector({ title, options, selected, onSelect, noneOption }) {
  const isGrouped = options[0]?.items !== undefined

  const renderItem = (item) => {
    const isSelected = selected?.id === item.id
    return (
      <button
        key={item.id}
        onClick={() => onSelect(isSelected ? null : item)}
        className={`px-3 py-2 rounded-xl text-sm font-semibold border-2 transition-all
          ${isSelected
            ? 'border-amber-400 bg-amber-50 text-amber-700 shadow-sm'
            : 'border-gray-100 bg-white text-gray-600 hover:border-amber-200 hover:text-amber-600'}`}
      >
        {item.label}
      </button>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-100">
      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        {title}
        {selected && (
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
            {selected.label}
          </span>
        )}
      </h3>

      {isGrouped ? (
        <div className="space-y-4">
          {options.map(group => (
            <div key={group.category}>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map(renderItem)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {options.map(renderItem)}
        </div>
      )}
    </div>
  )
}
