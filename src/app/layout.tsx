import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mimosa Alimentos",
  description: "Não da para explicar, tem que experimentar!",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
