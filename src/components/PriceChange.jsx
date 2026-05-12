export default function PriceChange({ value }) {
  if (value == null) return <span className="text-gray-400">—</span>
  return (
    <span className={value >= 0 ? 'text-green-400' : 'text-red-400'}>
      {value >= 0 ? '▲' : '▼'} {Math.abs(value).toFixed(2)}%
    </span>
  )
}