import Header from "@/components/header/header"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mimosa Alimentos",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
