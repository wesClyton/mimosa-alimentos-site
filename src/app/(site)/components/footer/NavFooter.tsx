import Link from "next/link"

interface INavFooterProps {
  menuLinks: Array<{
    id: number
    name: string
    url: string
  }>
  className?: string
}

export const NavFooter = ({ menuLinks, className }: INavFooterProps) => {
  return (
    <nav className={className}>
      <ul>
        {menuLinks.map((link) => (
          <li key={link.id} className="mb-4 last:mb-0">
            <Link href={link.url} className="block text-sm text-yellow-500 font-semibold uppercase">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
