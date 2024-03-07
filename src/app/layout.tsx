import type { Metadata } from "next"
import "./reset.css"

export const metadata: Metadata = {
  title: "Mimosa Alimentos",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
