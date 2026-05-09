const YOUTUBE_ID_REGEX = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w-]{11})/;

export function getYoutubeId(url: string): string | null {
  return url.match(YOUTUBE_ID_REGEX)?.[1] ?? null;
}

export function getYoutubeThumbnail(
  url: string,
  quality: 'mqdefault' | 'hqdefault' | 'maxresdefault' = 'hqdefault',
): string | null {
  const id = getYoutubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/${quality}.jpg` : null;
}

export function getYoutubeEmbedUrl(url: string, autoplay = false): string | null {
  const id = getYoutubeId(url);
  return id ? `https://www.youtube.com/embed/${id}${autoplay ? '?autoplay=1' : ''}` : null;
}
