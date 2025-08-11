import type { ICatalogoType } from '@interfaces/catalogo.interface';
import { APP } from '@utils/app.contants';
import { useEffect, useState } from 'react';

export default function CatalogoTypes() {
  const [types, setTypes] = useState<ICatalogoType[]>([]);

  useEffect(() => {
    fetch(`${APP.BASE_URL}/catalog/types`)
      .then((res) => res.json())
      .then((data) => setTypes(data))
      .catch(() => setTypes([]));
  }, []);

  return (
    <>
      <h4 className="mt-5 mb-3 text-xl font-bold text-red-800">Tipos</h4>
      <ul className="flex flex-col">
        {types?.map((type) => (
          <li
            key={type.type}
            className="w-full border-b-1 border-solid border-gray-200 px-2 py-2 last:border-b-0 lg:py-4"
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const type = e.currentTarget.getElementsByTagName('span')[0].textContent;
                window.dispatchEvent(new CustomEvent('typeChange', { detail: type }));
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
