import Link from "next/link"

export function MainNav() {
  return (
    <nav className="flex items-center space-x-6">
      <Link href="/" className="text-sm font-medium hover:text-red-500">
        Home
      </Link>
      <Link href="/marketplace" className="text-sm font-medium hover:text-red-500">
        Marketplace
      </Link>
      <Link href="/dashboard" className="text-sm font-medium hover:text-red-500">
        Dashboard
      </Link>
      <Link href="/intents" className="text-sm font-medium hover:text-red-500">
        Intents
      </Link>
      <Link href="/matching" className="text-sm font-medium hover:text-red-500">
        Matching
      </Link>
      <Link href="/execution" className="text-sm font-medium hover:text-red-500">
        Execution
      </Link>
      <Link href="/dao" className="text-sm font-medium hover:text-red-500">
        DAO Hub
      </Link>
    </nav>
  )
}
