import type { ICustumerData } from '@interfaces/custumer.interface';
import { APP } from '@utils/app.contants';
import { MENU_ITEMS } from '@utils/menu.contants';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

let googleMapsScriptLoading: Promise<void> | null = null;
let googleMapInstance: any = null;
let googleMarkers: any[] = [];

interface CardCaminhaoProps {
  showInput: boolean;
}

function loadGoogleMapsScript(libraries: string[] = []) {
  if (window.google && window.google.maps) {
    return Promise.resolve();
  }
  if (googleMapsScriptLoading) {
    return googleMapsScriptLoading;
  }
  googleMapsScriptLoading = new Promise<void>((resolve) => {
    const scriptId = 'google-maps-script';
    if (document.getElementById(scriptId)) {
      resolve();
      return;
    }
    const libString = libraries.length ? `&libraries=${libraries.join(',')}` : '';
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD5zIo8P5PzP_H59qC1CfQhZUd4DqcCPzM${libString}`;
    script.async = true;
    script.onload = () => {
      resolve();
    };
    document.body.appendChild(script);
  });
  return googleMapsScriptLoading;
}

export default function CardCaminhao({ showInput }: CardCaminhaoProps) {
  const [inputValue, setInputValue] = useState('');
  const [locations, setLocations] = useState<ICustumerData | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load locations when input is shown
  useEffect(() => {
    if (!showInput) return;
    fetch(APP.BASE_URL + '/customers?perPage=9999')
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, [showInput]);

  // Load Google Maps (with "places" library for autocomplete) and set up autocomplete
  useEffect(() => {
    if (!showInput || !inputRef.current) return;

    loadGoogleMapsScript(['places']).then(() => {
      if (!inputRef.current) return;

      // Autocomplete for Brazilian cities
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['(cities)'],
        componentRestrictions: { country: 'br' },
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.geometry && place.geometry.location) {
          setInputValue(place.name);

          // Center and zoom map on the selected city
          if (googleMapInstance) {
            googleMapInstance.setCenter(place.geometry.location);
            googleMapInstance.setZoom(12);
          }
        }
      });
    });
  }, [showInput]);

  // Initialize Google Map and set pins with InfoWindow
  useEffect(() => {
    if (!showInput || !locations || !locations.data?.length || !mapRef.current) return;

    loadGoogleMapsScript().then(() => {
      // If map already exists, remove existing markers
      if (googleMapInstance) {
        googleMarkers.forEach((marker) => marker.setMap(null));
        googleMarkers = [];
      }

      // Initial center
      const center = {
        lat: -18.0,
        lng: -51.5,
      };

      // Create map if not exists
      if (!googleMapInstance) {
        googleMapInstance = new window.google.maps.Map(mapRef.current, {
          center,
          zoom: 4,
        });
      } else {
        googleMapInstance.setCenter(center);
        googleMapInstance.setZoom(4);
      }

      // InfoWindow instance (one shared for all markers)
      const infoWindow = new window.google.maps.InfoWindow();

      // Markers
      locations.data.forEach((loc: any) => {
        if (loc.latitude && loc.longitude) {
          const marker = new window.google.maps.Marker({
            position: { lat: parseFloat(loc.latitude), lng: parseFloat(loc.longitude) },
            map: googleMapInstance,
            title: loc.businessName,
            icon: {
              url: '/pin.png',
              scaledSize: new window.google.maps.Size(40, 40),
            },
          });

          // Balão de informações personalizado
          const contentString = `
            <div class="text-base" style="min-width:180px; max-width:260px;">
              <strong class="text-xl">${loc.businessName || 'Local Mimosa'}</strong><br/>
              ${loc.address ? `<span>${loc.address}</span><br/>` : ''}
              ${loc.city ? `<span>${loc.city.name} - ${loc.city.state.name}</span><br/>` : ''}
              ${loc.phone ? `<span>Tel.: ${loc.phone}</span>` : ''}
            </div>
          `;

          marker.addListener('click', () => {
            infoWindow.setContent(contentString);
            infoWindow.open(googleMapInstance, marker);
          });

          googleMarkers.push(marker);
        }
      });
    });
  }, [showInput, locations]);

  // Handle input change (text search)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="relative rounded-tl-2xl rounded-tr-2xl bg-yellow-300 p-5 md:flex-1/2 md:rounded-tr-none md:rounded-bl-2xl lg:flex lg:flex-col lg:justify-center lg:p-10">
          <h1 className="text-2xl leading-7 font-black text-red-800">Mimosa mais próxima de você!</h1>
          <h2 className="my-3 leading-5 text-gray-700">
            Acesse agora a nossa área de Lojas e Parceiros e descubra onde encontrar nossos produtos pertinho da sua
            casa.
          </h2>

          {!showInput && (
            <a className="btn --red inline-block w-full lg:w-75" href={MENU_ITEMS.ondeEncontrar.href}>
              Encontre nossos fornecedores
            </a>
          )}

          {showInput && (
            <input
              ref={inputRef}
              type="text"
              placeholder="Digite o nome da sua cidade"
              className="input mt-3 max-w-100 text-xs lg:max-w-80"
              value={inputValue}
              onChange={handleInputChange}
              autoComplete="off"
            />
          )}

          <img
            className="absolute right-0 bottom-0 z-5 -mr-14 -mb-1 hidden w-45 lg:block xl:-mb-2 xl:w-70 2xl:-mb-4 2xl:w-100"
            src="/home/coracao.png"
            alt="Mimosa Alimentos"
          />
        </div>
        <div className="rounded-br-2xl rounded-bl-2xl bg-red-800 pt-5 md:flex md:flex-1/2 md:items-end md:rounded-tl-none md:rounded-tr-2xl md:rounded-br-2xl md:rounded-bl-none md:pt-0 lg:pt-10">
          <img
            className="lg:relative lg:z-10 lg:-ml-10 xl:-ml-12 2xl:-ml-15"
            src="/home/caminhao.png"
            alt="Caminhão Mimosa"
          />
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border-3 border-solid border-yellow-300 md:mt-10">
        {showInput && <div ref={mapRef} style={{ width: '100%', height: 450 }} id="google-map" />}
      </div>
    </>
  );
}
