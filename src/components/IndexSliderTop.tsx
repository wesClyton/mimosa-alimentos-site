import { useEffect, useRef } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const slides = [
  {
    src: '/home/banner-01.png',
    alt: 'Não dá para explicar, tem que experimentar',
  },
  {
    src: '/home/banner-01.png',
    alt: 'Não dá para explicar, tem que experimentar',
  },
];

export default function IndexSliderTop() {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!swiperRef.current) return;
    // eslint-disable-next-line no-new
    new Swiper(swiperRef.current, {
      loop: true,
      autoplay: { delay: 4000 },
      pagination: { el: '.swiper-pagination', clickable: true },
    });
  }, []);

  return (
    <div className="swiper overflow-hidden rounded-2xl" ref={swiperRef} id="banner-swiper">
      <div className="swiper-wrapper">
        {slides.map((slide, idx) => (
          <div className="swiper-slide" key={idx}>
            <img src={slide.src} alt={slide.alt} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
