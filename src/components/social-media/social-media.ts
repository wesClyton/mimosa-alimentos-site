import { generateId } from "../../lib/utils"

type socialType = "facebook" | "instagram"

interface SocialMediaItem {
  facebook: SocialMedia
  instagram: SocialMedia
}

interface SocialMedia {
  id: string
  icon: string
  link: string
  type: socialType
}

const SOCIAL_MEDIA: SocialMediaItem = {
  facebook: {
    id: generateId("facebook"),
    icon: "facebook.svg",
    link: "https://www.facebook.com/mimosaalimentos",
    type: "facebook",
  },
  instagram: {
    id: generateId("instagram"),
    icon: "instagram.svg",
    link: "https://www.instagram.com/mimosaalimentos",
    type: "instagram",
  },
}

export const SOCIAL_MEDIA_HEADER: { itens: SocialMedia[] } = {
  itens: [{ ...SOCIAL_MEDIA.facebook }, { ...SOCIAL_MEDIA.instagram }],
}
