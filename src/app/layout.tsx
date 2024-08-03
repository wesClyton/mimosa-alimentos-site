import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mimosa Alimentos",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
