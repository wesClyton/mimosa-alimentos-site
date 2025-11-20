import type { ICatalogoProdutoData } from '@interfaces/catalogo.interface';
import { APP } from '@utils/app.contants';
import { useEffect, useRef, useState } from 'react';
import { EProdutosCategorias } from 'src/enums/produtos-categorias.enum';
import CatalogoPaginator from './CatalogoPaginator';

const PAGE_SIZE = 18;

function ShimmerCard() {
  return (
    <li className="animate-pulse">
      <div className="relative">
        <div className="absolute top-0 left-0 flex w-full flex-row justify-between text-xs">
          <span className="mt-2 ml-2 h-6 w-20 rounded-sm bg-gray-200" />
          <span className="mt-2 mr-2 h-6 w-14 rounded-sm bg-gray-200" />
        </div>
        <div className="mb-4 h-40 w-full rounded-2xl bg-gray-100 p-10" />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="h-5 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
        <div className="mt-2 flex flex-row flex-wrap gap-2">
          <div className="h-6 w-16 rounded-sm bg-gray-200" />
          <div className="h-6 w-12 rounded-sm bg-gray-200" />
        </div>
      </div>
    </li>
  );
}

export default function CatalogoProducts() {
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [produtos, setProdutos] = useState<ICatalogoProdutoData>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const isFirstLoad = useRef(true);

  useEffect(() => {
    setLoading(true);
    let url = `${APP.BASE_URL}/catalogs`;
    const params = [`page=${page}`, `perPage=${PAGE_SIZE}`];
    if (search) params.push(`description=${encodeURIComponent(search)}`);
    if (brand) params.push(`brand=${encodeURIComponent(brand)}`);
    if (type) params.push(`type=${encodeURIComponent(type)}`);
    if (category) params.push(`category=${encodeURIComponent(category)}`);
    if (params.length > 0) url += `?${params.join('&')}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProdutos(data);
        setLoading(false);
        if (!isFirstLoad.current) {
          topSection();
        } else {
          isFirstLoad.current = false;
        }
      })
      .catch(() => {
        setProdutos({ data: [], meta: null });
        setLoading(false);
      });
  }, [brand, search, type, category, page]);

  useEffect(() => {
    function handleProductsSearch(e: any) {
      setSearch(e.detail);
      setPage(1);
    }
    window.addEventListener('productsSearch', handleProductsSearch);
    return () => window.removeEventListener('productsSearch', handleProductsSearch);
  }, []);

  useEffect(() => {
    function handleCategorySearch(e: any) {
      setCategory(e.detail?.trim());
      setPage(1);
    }
    window.addEventListener('categorySearch', handleCategorySearch);
    return () => window.removeEventListener('categorySearch', handleCategorySearch);
  }, []);

  useEffect(() => {
    function handleBrandChange(e: any) {
      setBrand(e.detail);
      setPage(1);
    }
    window.addEventListener('brandChange', handleBrandChange);
    return () => window.removeEventListener('brandChange', handleBrandChange);
  }, []);

  useEffect(() => {
    function handleTypeChange(e: any) {
      setType(e.detail);
      setPage(1);
    }
    window.addEventListener('typeChange', handleTypeChange);
    return () => window.removeEventListener('typeChange', handleTypeChange);
  }, []);

  const totalPages = produtos?.meta?.total ? Math.ceil(produtos.meta.total / PAGE_SIZE) : 1;

  function topSection(): void {
    const element = document.getElementById('lista-produtos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      {loading ? (
        <ul className="grid grid-cols-1 gap-15 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <ShimmerCard key={idx} />
          ))}
        </ul>
      ) : (
        <>
          {produtos?.data && produtos.data.length === 0 && (
            <div className="col-span-full py-10 text-center text-lg text-gray-500">Nenhum produto encontrado.</div>
          )}

          <ul className="grid grid-cols-1 gap-15 md:grid-cols-2 lg:grid-cols-3">
            {produtos?.data &&
              produtos.data.map((produto) => (
                <li key={produto.id}>
                  <div className="relative">
                    <div className="absolute top-0 left-0 flex w-full flex-row justify-between gap-2 text-xs">
                      <span className="mt-2 ml-2 flex items-center justify-center rounded-sm bg-red-800 px-3 py-1 text-white">
                        {produto.type}
                      </span>
                      <span className="mt-2 mr-2 flex items-center justify-center rounded-sm border-1 border-gray-700 px-3 py-1">
                        #{produto.cod}
                      </span>
                    </div>
                    <img
                      className="rounded-2xl bg-gray-100 p-10"
                      src={APP.S3 + '/' + produto.image}
                      alt={produto.description}
                    />
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <h4 className="paragraph text-sm!">{produto.description}</h4>
                    <p className="paragraph text-sm! text-gray-500!">{produto.brand}</p>
                    <ul className="flex flex-row flex-wrap gap-2">
                      {produto.segment.map((segment, index) => {
                        let bg = 'bg-gray-200 text-gray-800';
                        if (segment === EProdutosCategorias.Bares) bg = 'bg-green-600 text-white';
                        if (segment === EProdutosCategorias.Lanches) bg = 'bg-gray-300 text-gray-800';
                        if (segment === EProdutosCategorias.Pizzarias) bg = 'bg-orange-700 text-white';
                        if (segment === EProdutosCategorias.Restaurantes) bg = 'bg-yellow-300 text-yellow-900';
                        if (segment === EProdutosCategorias.Supermercados) bg = 'bg-blue-800 text-white';

                        return (
                          <li
                            className={`flex items-center justify-center rounded-sm px-3 py-1 text-xs ${bg}`}
                            key={index}
                          >
                            {segment}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}

      {totalPages > 1 && <CatalogoPaginator page={page} totalPages={totalPages} onPageChange={setPage} />}
    </>
  );
}
