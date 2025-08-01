import type { IDownloadContent, IDownloadTab, TabKey } from '@interfaces/downloads.interface';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/downloads.css';

const TABS: IDownloadTab[] = [
  { label: 'Linguiças', key: 'linguicas' },
  { label: 'Frios', key: 'frios' },
  { label: 'Diversos', key: 'diversos' },
];

const CONTENT_DATA: Record<TabKey, IDownloadContent[]> = {
  linguicas: [
    {
      title: 'Linguiça Calabresa',
      url: '/downloads/download-01.png',
      id: uuidv4(),
    },
    {
      title: 'Linguiça Toscana',
      url: '/downloads/download-01.png',
      id: uuidv4(),
    },
    {
      title: 'Linguiça Calabresa',
      url: '/downloads/download-01.png',
      id: uuidv4(),
    },
    {
      title: 'Linguiça Toscana',
      url: '/downloads/download-01.png',
      id: uuidv4(),
    },
  ],
  frios: [
    {
      title: 'Presunto',
      url: '/downloads/download-01.png',
      id: uuidv4(),
    },
    {
      title: 'Queijo Prato',
      url: '/downloads/download-01.png',
      id: uuidv4(),
    },
    {
      title: 'Queijo Prato',
      url: '/downloads/download-01.png',
      id: uuidv4(),
    },
  ],
  diversos: [
    {
      title: 'Catálogo Geral',
      url: '/downloads/download-01.png',
      id: uuidv4(),
    },
    {
      title: 'Tabela de Preços 2025',
      url: '/downloads/download-01.png',
      id: uuidv4(),
    },
  ],
};

export default function DownloadTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>(TABS[0].key as TabKey);

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
            onClick={() => setActiveTab(tab.key as TabKey)}
            aria-pressed={activeTab === tab.key}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {CONTENT_DATA[activeTab] && CONTENT_DATA[activeTab].length === 0 ? (
          <p className="text-center font-bold text-red-800">Nenhum conteúdo disponível.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CONTENT_DATA[activeTab].map((item) => (
              <li key={item.id} className="download-item flex flex-col items-center rounded-2xl">
                <img src={item.url} alt={item.title} className="download-item-img transition-transform duration-300" />
                <div className="download-item-text -mt-10 w-full text-center text-red-800 lg:opacity-0">
                  <div className="mb-3 text-sm font-bold uppercase">{item.title}</div>
                  <a href={item.url} download className="btn --red">
                    Download
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
