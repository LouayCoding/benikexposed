export function Logo(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="flex items-center" {...props}>
      <svg
        className="h-10 w-10"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="20" fill="#2563EB" />
        <path
          d="M20 8L12 28H16L20 18L24 28H28L20 8Z"
          fill="white"
        />
      </svg>
      <span className="ml-3 text-xl font-bold text-slate-900">benikexposed</span>
    </div>
  )
}
