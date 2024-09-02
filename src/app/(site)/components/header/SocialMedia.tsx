import { FaFacebookF } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa6"

export function SocialMedia() {
  return (
    <div className="flex items-center">
      <a
        href="https://www.facebook.com/mimosaalimentos"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-yellow-500"
        title="Facebook"
      >
        <FaFacebookF size={22} />
      </a>
      <a
        href="https://www.instagram.com/mimosaalimentos"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-yellow-500 ml-4"
        title="Instagram"
      >
        <FaInstagram size={22} />
      </a>
    </div>
  )
}
