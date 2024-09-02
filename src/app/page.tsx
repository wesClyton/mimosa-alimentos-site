import { Poppins } from "next/font/google"
import { Header } from "./(site)/components/header/Header"
import "./globals.css"
import { Footer } from "./(site)/components/footer/Footer"

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
})

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="w-full max-w-screen-xl h-screen flex justify-center items-center">
        <h1>Home page</h1>
      </div>
      <Footer />
    </>
  )
}
