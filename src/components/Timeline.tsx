import type { ITimelineData } from '@interfaces/timeline.interface';
import { APP } from '@utils/app.contants';
import { useEffect, useState } from 'react';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../styles/timeline.css';

export default function Timeline() {
  const [timeline, setTimeline] = useState<ITimelineData>({ data: [], meta: null });

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await fetch(`${APP.BASE_URL}/timelines?perPage=9999&orderBy=ASC&orderProperty=date`);
        const data = await response.json();
        setTimeline(data);
      } catch (e) {
        console.error('Erro ao carregar timeline', e);
      }
    };
    fetchTimeline();
  }, []);

  const renderCircle = (item: any, year: number) => (
    <div className="timeline-circle relative z-2 flex h-[160px] w-[160px] items-center justify-center overflow-hidden rounded-full bg-black">
      {item.image ? (
        <img
          src={item.image.startsWith('http') ? item.image : `${APP.S3}/${item.image}`}
          alt={item.title || `Ano ${year}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <>
          <span className="absolute h-[2px] w-[60%] bg-white" />
          <span className="absolute h-[60%] w-[2px] bg-white" />
        </>
      )}
    </div>
  );

  return (
    <section className="relative h-[700px] w-full">
      {/* Linha central */}
      <div
        className="pointer-events-none absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 bg-white"
        aria-hidden="true"
      />

      <Swiper
        modules={[Navigation]}
        navigation
        loop={false}
        slidesPerView="auto"
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
        className="timeline-swiper"
      >
        {timeline.data.map((item, idx) => {
          const year = new Date(item.date).getFullYear();
          const position = idx === 0 ? 'center' : idx % 2 === 1 ? 'top' : 'bottom';

          return (
            <SwiperSlide key={item.id ?? idx} className="timeline-slide h-[600px] max-w-[400px]">
              {/* Primeiro item centralizado */}
              {position === 'center' && (
                <div className="flex h-full translate-y-[2rem] flex-col items-center justify-center">
                  {renderCircle(item, year)}
                  <p className="mt-4 text-lg font-bold">{year}</p>
                  <h3 className="text-[16px] font-bold">{item.title}</h3>
                </div>
              )}

              {/* Itens acima da linha */}
              {position === 'top' && (
                <div className="relative flex h-full translate-y-[-9rem] items-start justify-center gap-6 py-40">
                  <div className="flex flex-col items-center">
                    <p className="mb-2 text-lg font-bold">{year}</p>
                    <div className="flex flex-col items-center justify-center after:absolute after:bottom-[29.5%] after:z-1 after:block after:h-50 after:w-[2px] after:bg-white">
                      {renderCircle(item, year)}
                    </div>
                  </div>
                  <div className="mt-[40px] max-w-xs">
                    <h3 className="text-[16px] font-bold">{item.title}</h3>
                    <p className="text-[13px] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              )}

              {/* Itens abaixo da linha */}
              {position === 'bottom' && (
                <div className="relative flex h-full translate-y-[10rem] items-end justify-center gap-6 py-40">
                  <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center after:absolute after:top-[27.3%] after:z-1 after:block after:h-50 after:w-[2px] after:bg-white">
                      {renderCircle(item, year)}
                    </div>
                    <p className="mt-2 text-lg font-bold">{year}</p>
                  </div>
                  <div className="mt-[40px] max-w-xs">
                    <h3 className="text-[16px] font-bold">{item.title}</h3>
                    <p className="text-[13px] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
