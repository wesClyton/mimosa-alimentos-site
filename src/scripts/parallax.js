import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar o plugin
gsap.registerPlugin(ScrollTrigger);

// Inicializar parallax quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Configuração para a folha no canto superior direito
  const parallaxFolha = document.getElementById('parallax-folha-01');

  console.log('parallaxFolha>>>>', parallaxFolha);

  if (parallaxFolha) {
    gsap.to(parallaxFolha, {
      y: 50,
      x: -30,
      rotation: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
    });
  }
});
