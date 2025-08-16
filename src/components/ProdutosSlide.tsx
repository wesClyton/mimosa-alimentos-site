import type { ISlideProduto, ISlideProdutosConfig } from '@interfaces/slide-produtos.interface';
import { APP } from '@utils/app.contants';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ProdutosSlidesProps {
  slideProdutos: ISlideProduto[] | undefined;
  config: ISlideProdutosConfig;
}

export default function ProdutosSlides({ slideProdutos, config }: ProdutosSlidesProps) {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={slideProdutos && slideProdutos.length > 1}
      spaceBetween={20}
      breakpoints={config.breakpoints}
    >
      {slideProdutos &&
        slideProdutos.map((produto) => (
          <SwiperSlide key={produto.id}>
            <a href="#" className="relative text-center text-xs font-medium">
              <div className="relative before:absolute before:bottom-3 before:left-0 before:z-1 before:h-45 before:w-full before:rounded-2xl before:bg-white">
                <img
                  className="relative z-2 h-80 w-full object-cover"
                  src={APP.S3 + '/' + produto.image}
                  alt={produto.name}
                />
              </div>
              <h3 className="relative z-2 mt-2 text-red-800">{produto.name}</h3>
              <p className="relative z-2">{produto.size}</p>
            </a>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
