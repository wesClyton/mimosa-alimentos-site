import {
  DownloadTabKey,
  type IDownloadContent,
  type IDownloadData,
  type IDownloadTab,
} from '@interfaces/downloads.interface';
import { APP } from '@utils/app.contants';
import { useEffect, useState } from 'react';
import '../styles/downloads.css';

const TABS: IDownloadTab[] = [
  { label: 'Linguiças', key: DownloadTabKey.Linguicas },
  // { label: 'Frios', key: DownloadTabKey.Frios },
  { label: 'Diversos', key: DownloadTabKey.Diversos },
];

function ShimmerCard() {
  return (
    <li className="flex animate-pulse flex-col items-center rounded-2xl bg-gray-100 p-6">
      <div className="mb-4 h-32 w-32 rounded-xl bg-gray-200" />
      <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />
      <div className="h-4 w-1/2 rounded bg-gray-200" />
      <div className="mt-4 h-8 w-24 rounded bg-gray-200" />
    </li>
  );
}

export default function DownloadTabs() {
  const [activeTab, setActiveTab] = useState<DownloadTabKey>(TABS[0].key as DownloadTabKey);
  const [downloads, setDownloads] = useState<IDownloadData>({ data: [], meta: null });
  const [linguicas, setLinguicas] = useState<IDownloadContent[]>([]);
  const [frios, setFrios] = useState<IDownloadContent[]>([]);
  const [diversos, setDiversos] = useState<IDownloadContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${APP.BASE_URL}/downloads?page=1&perPage=999&category=${activeTab}`)
      .then((response) => response.json())
      .then((response: IDownloadData) => {
        setDownloads(response);
        setLinguicas(response.data.filter((item) => item.category === DownloadTabKey.Linguicas));
        setFrios(response.data.filter((item) => item.category === DownloadTabKey.Frios));
        setDiversos(response.data.filter((item) => item.category === DownloadTabKey.Diversos));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching downloads:', error);
        setLoading(false);
      });
  }, [activeTab]);

  return (
    <main className="container-center">
      <div className="mt-8 mb-10 flex justify-center gap-3">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`cursor-pointer rounded-2xl border-1 border-solid border-red-800 px-5 py-3 text-xs text-red-800 uppercase ${
              activeTab === tab.key ? 'bg-red-800 text-white' : ''
            }`}
            onClick={() => setActiveTab(tab.key as DownloadTabKey)}
            aria-pressed={activeTab === tab.key}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {loading ? (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <ShimmerCard key={idx} />
            ))}
          </ul>
        ) : (
          (() => {
            let content: IDownloadContent[] | undefined;
            if (activeTab === DownloadTabKey.Linguicas) content = linguicas;
            if (activeTab === DownloadTabKey.Frios) content = frios;
            if (activeTab === DownloadTabKey.Diversos) content = diversos;

            if (!content || content.length === 0) {
              return <p className="text-center">Nenhum produto encontrado.</p>;
            }

            return (
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {content.map((item) => (
                  <li key={item.id} className="download-item flex flex-col items-center rounded-2xl">
                    <img
                      src={`${APP.S3}/${item.image}`}
                      alt={item.title}
                      className="download-item-img transition-transform duration-300"
                    />
                    <div className="download-item-text -mt-10 w-full text-center text-red-800 lg:opacity-0">
                      <div className="mb-3 text-sm font-bold uppercase">{item.title}</div>
                      <a href={`${APP.S3}/${item.file}`} download className="btn --red">
                        Download
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            );
          })()
        )}
      </div>
    </main>
  );
}
