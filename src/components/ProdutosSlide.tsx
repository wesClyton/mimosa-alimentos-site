import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { IProduto } from '@interfaces/produto.interface';
import 'swiper/css';

const ProdutosSlides = () => {
  const slides: IProduto[] = [
    {
      id: '123123123',
      name: 'Linguiça Du Cheff',
      description: '1 Kg e 5 Kg',
      urlImage: '/produtos/produto.png',
    },
    {
      id: '123123123',
      name: 'Linguiça Du Cheff',
      description: '1 Kg e 5 Kg',
      urlImage: '/produtos/produto.png',
    },
    {
      id: '123123123',
      name: 'Linguiça Du Cheff',
      description: '1 Kg e 5 Kg',
      urlImage: '/produtos/produto.png',
    },
    {
      id: '123123123',
      name: 'Linguiça Du Cheff',
      description: '1 Kg e 5 Kg',
      urlImage: '/produtos/produto.png',
    },
    {
      id: '123123123',
      name: 'Linguiça Du Cheff',
      description: '1 Kg e 5 Kg',
      urlImage: '/produtos/produto.png',
    },
    {
      id: '123123123',
      name: 'Linguiça Du Cheff',
      description: '1 Kg e 5 Kg',
      urlImage: '/produtos/produto.png',
    },
    {
      id: '123123123',
      name: 'Linguiça Du Cheff',
      description: '1 Kg e 5 Kg',
      urlImage: '/produtos/produto.png',
    },
    {
      id: '123123123',
      name: 'Linguiça Du Cheff',
      description: '1 Kg e 5 Kg',
      urlImage: '/produtos/produto.png',
    },
    {
      id: '123123123',
      name: 'Linguiça Du Cheff',
      description: '1 Kg e 5 Kg',
      urlImage: '/produtos/produto.png',
    },
    {
      id: '123123123',
      name: 'Linguiça Du Cheff',
      description: '1 Kg e 5 Kg',
      urlImage: '/produtos/produto.png',
    },
  ];

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={slides.length > 1}
      spaceBetween={20}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
        1366: {
          slidesPerView: 5,
        },
      }}
    >
      {slides.map((produto) => (
        <SwiperSlide>
          <a key={produto.id} href="#" className="relative text-center text-xs font-medium">
            <div className="relative before:absolute before:bottom-3 before:left-0 before:z-1 before:h-45 before:w-full before:rounded-2xl before:bg-white">
              <img className="relative z-2 h-80 w-full object-cover" src={produto.urlImage} alt={produto.name} />
            </div>
            <h3 className="relative z-2 mt-2 text-red-800">{produto.name}</h3>
            <p className="relative z-2">{produto.description}</p>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProdutosSlides;
