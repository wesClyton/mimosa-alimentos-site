import { useEffect } from 'react';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export default function ParallaxHandler() {
  useEffect(() => {
    const loadGSAP = async () => {
      if (typeof window.gsap === 'undefined') {
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        document.head.appendChild(gsapScript);

        await new Promise((resolve) => {
          gsapScript.onload = resolve;
        });
      }

      if (typeof window.ScrollTrigger === 'undefined') {
        const stScript = document.createElement('script');
        stScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        document.head.appendChild(stScript);

        await new Promise((resolve) => {
          stScript.onload = resolve;
        });
      }

      initAnimations();
    };

    const initAnimations = () => {
      window.gsap.registerPlugin(window.ScrollTrigger);

      const folha1 = document.getElementById('parallax-folha-01');
      if (folha1) {
        window.gsap.to(folha1, {
          y: 50,
          x: 500,
          rotation: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: 'section', // Elemento que aciona a animação
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }

      const pimenta1 = document.getElementById('parallax-pimenta-01');
      if (pimenta1) {
        window.gsap.to(pimenta1, {
          y: 450,
          x: 0,
          rotation: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: 'section', // Elemento que aciona a animação
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }

      const pimenta2 = document.getElementById('parallax-pimenta-02');
      if (pimenta2) {
        window.gsap.to(pimenta2, {
          y: 450,
          x: 0,
          rotation: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: 'section', // Elemento que aciona a animação
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }

      const pimenta3 = document.getElementById('parallax-pimenta-03');
      if (pimenta3) {
        window.gsap.to(pimenta3, {
          y: 600,
          x: 0,
          rotation: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: 'section', // Elemento que aciona a animação
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }

      const folha2 = document.getElementById('parallax-folha-02');
      if (folha2) {
        window.gsap.to(folha2, {
          y: 450,
          x: -200,
          rotation: 100,
          ease: 'none',
          scrollTrigger: {
            trigger: '.parallax-start-folha-02', // Elemento que aciona a animação
            start: 'top top',
            end: 'bottom top',
            scrub: 5,
          },
        });
      }

      const pimenta4 = document.getElementById('parallax-pimenta-04');
      if (pimenta4) {
        window.gsap.to(pimenta4, {
          y: 750,
          x: 0,
          rotation: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.parallax-start-folha-02', // Elemento que aciona a animação
            start: 'top top',
            end: 'bottom top',
            scrub: 5,
          },
        });
      }

      const bg01 = document.getElementById('parallax-bg-01');
      if (bg01) {
        window.gsap.to(bg01, {
          y: -150,
          x: 0,
          rotation: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.start-parallax-bg-01', // Elemento que aciona a animação
            start: 'top top',
            end: 'bottom top',
            scrub: 5,
          },
        });
      }
    };

    // Carregar scripts quando o DOM estiver pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadGSAP);
    } else {
      loadGSAP();
    }

    // Cleanup
    return () => {
      document.removeEventListener('DOMContentLoaded', loadGSAP);
    };
  }, []);

  return null;
}
