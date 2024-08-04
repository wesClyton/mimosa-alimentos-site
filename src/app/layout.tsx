import type { Metadata } from "next"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"
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
        <Footer />
      </body>
    </html>
  )
}
