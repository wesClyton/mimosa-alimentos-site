import { APP } from '@utils/app.contants';
import { useEffect, useState } from 'react';

export default function CatalogoBrands() {
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${APP.BASE_URL}/catalog/brands`)
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch(() => setBrands([]));
  }, []);

  return (
    <>
      <h4 className="mt-5 mb-3 text-lg font-bold text-red-800">Marca</h4>
      <select
        id="catalogo-marcas"
        className="input border-1 border-solid border-gray-200"
        name="brands"
        onChange={(e) => {
          const brand = e.target.value;
          window.dispatchEvent(new CustomEvent('brandChange', { detail: brand }));
        }}
      >
        <option value="">Selecione</option>
        {brands?.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
    </>
  );
}
