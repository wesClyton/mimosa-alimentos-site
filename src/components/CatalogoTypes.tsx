import type { ICatalogoType } from '@interfaces/catalogo.interface';
import { APP } from '@utils/app.contants';
import { useEffect, useState } from 'react';

export default function CatalogoTypes() {
  const [types, setTypes] = useState<ICatalogoType[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${APP.BASE_URL}/catalog/types`)
      .then((res) => res.json())
      .then((data) => setTypes(data))
      .catch(() => setTypes([]));
  }, []);

  // Listener para limpar seleção quando o botão "Limpar filtros" for clicado
  useEffect(() => {
    const handleTypeChange = (e: CustomEvent) => {
      if (!e.detail) {
        setSelectedType(null);
      }
    };

    window.addEventListener('typeChange', handleTypeChange as EventListener);
    return () => {
      window.removeEventListener('typeChange', handleTypeChange as EventListener);
    };
  }, []);

  return (
    <>
      <h4 className="mt-5 text-lg font-bold text-red-800">Tipos</h4>
      <ul className="flex flex-col">
        {types?.map((type) => (
          <li
            key={type.type}
            className={`w-full border-b-1 border-solid border-gray-200 px-2 py-2 last:border-b-0 lg:py-4 ${selectedType === type.type ? 'bg-gray-200' : ''}`}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const typeText = e.currentTarget.getElementsByTagName('span')[0].textContent;
                setSelectedType(typeText);
                window.dispatchEvent(new CustomEvent('typeChange', { detail: typeText }));
              }}
              className="flex justify-between text-xs lg:text-sm"
            >
              <span className="block">{type.type}</span>
              <span className="flex h-5 w-8 items-center justify-center rounded bg-red-800 text-white">
                {type.count}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
