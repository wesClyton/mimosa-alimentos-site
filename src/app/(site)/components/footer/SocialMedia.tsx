import { FaFacebookF } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa6"

export function SocialMedia() {
  return (
    <div className="flex items-center pt-6">
      <a
        href="https://www.facebook.com/mimosaalimentos"
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-500 bg-yellow-500 rounded p-1"
        title="Facebook"
      >
        <FaFacebookF size={22} />
      </a>
      <a
        href="https://www.instagram.com/mimosaalimentos"
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-500 bg-yellow-500 rounded p-1 ml-7"
        title="Instagram"
      >
        <FaInstagram size={22} />
      </a>
    </div>
  )
}
