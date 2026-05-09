import type { IRecipe, IRecipeData } from '@interfaces/recipe.interface';
import { APP } from '@utils/app.contants';
import { getYoutubeEmbedUrl, getYoutubeThumbnail } from '@utils/youtube';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import CatalogoPaginator from './CatalogoPaginator';

const PAGE_SIZE = 9;

function ShimmerCard() {
  return (
    <li className="animate-pulse">
      <div className="aspect-video w-full rounded-2xl bg-gray-100" />
      <div className="mt-4 flex flex-col gap-2">
        <div className="h-5 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
      </div>
    </li>
  );
}

function openVideoModal(recipe: IRecipe): void {
  const embedUrl = getYoutubeEmbedUrl(recipe.url, true);
  if (!embedUrl) return;

  const embedHtml = `
    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
      <iframe
        src="${embedUrl}"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>
  `;

  const width = typeof window !== 'undefined' && window.innerWidth < 768 ? '95%' : '40%';

  Swal.fire({
    html: embedHtml,
    showConfirmButton: false,
    showCloseButton: true,
    width,
    padding: 0,
    background: '#000',
    color: '#fff',
    backdrop: 'rgba(0,0,0,0.8)',
    customClass: {
      container: 'receitas-video-modal-container',
      popup: 'receitas-video-modal-popup',
    },
  });
}

export default function Receitas() {
  const [recipes, setRecipes] = useState<IRecipeData>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const isFirstLoad = useRef(true);

  useEffect(() => {
    setLoading(true);
    const url = `${APP.BASE_URL}/recipes?page=${page}&perPage=${PAGE_SIZE}&orderBy=DESC&orderProperty=createdAt`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
        if (!isFirstLoad.current) {
          topSection();
        } else {
          isFirstLoad.current = false;
        }
      })
      .catch(() => {
        setRecipes({ data: [], meta: null });
        setLoading(false);
      });
  }, [page]);

  const totalPages = recipes?.meta?.total ? Math.ceil(recipes.meta.total / PAGE_SIZE) : 1;

  function topSection(): void {
    const element = document.getElementById('lista-receitas');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      {loading ? (
        <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <ShimmerCard key={idx} />
          ))}
        </ul>
      ) : (
        <>
          {recipes?.data && recipes.data.length === 0 && (
            <div className="col-span-full py-10 text-center text-lg text-gray-500">Nenhuma receita encontrada.</div>
          )}

          <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {recipes?.data &&
              recipes.data.map((recipe) => {
                const thumbnail = getYoutubeThumbnail(recipe.url) ?? '/social-share.png';
                return (
                  <li key={recipe.id}>
                    <button
                      type="button"
                      onClick={() => openVideoModal(recipe)}
                      className="block w-full cursor-pointer text-left"
                      aria-label={`Assistir: ${recipe.title}`}
                    >
                      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100">
                        <img className="h-full w-full object-cover" src={thumbnail} alt={recipe.title} />
                        <img
                          src="/play.svg"
                          alt=""
                          className="absolute top-1/2 left-1/2 max-w-12 -translate-x-1/2 -translate-y-1/2 md:max-w-15"
                        />
                      </div>
                      <div className="mt-4 flex flex-col gap-2">
                        <h4 className="paragraph text-sm! font-bold">{recipe.title}</h4>
                        {recipe.description && (
                          <p className="paragraph text-sm! line-clamp-3 text-gray-500!">{recipe.description}</p>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
          </ul>
        </>
      )}

      {totalPages > 1 && <CatalogoPaginator page={page} totalPages={totalPages} onPageChange={setPage} />}
    </>
  );
}
