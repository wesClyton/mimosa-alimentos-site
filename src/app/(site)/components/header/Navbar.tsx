import Link from "next/link"

interface INavbarProps {
  menuLinks: Array<{
    id: number
    name: string
    url: string
  }>
}

export function Navbar({ menuLinks }: INavbarProps) {
  return (
    <div className="text-sm flex flex-col justify-center items-center mt-8 lg:flex-grow lg:mt-0 lg:flex-row">
      {menuLinks &&
        menuLinks.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            className="block mt-4 lg:inline-block lg:mt-0 text-neutral-50 text-base font-semibold lg:mr-5 xl:mr-10 hover:text-yellow-500 last:mr-0"
          >
            {link.name}
          </Link>
        ))}
    </div>
  )
}
