export enum SlideProdutosKey {
  CHURRASQUITA = 'CHURRASQUITA',
  COM_QUEIJO = 'COM QUEIJO',
  LINGUICA = 'LINGUICA',
}

export interface ISlideProdutos {
  [SlideProdutosKey.CHURRASQUITA]: ISlideProduto[];
  [SlideProdutosKey.COM_QUEIJO]: ISlideProduto[];
  [SlideProdutosKey.LINGUICA]: ISlideProduto[];
}

export interface ISlideProduto {
  id: string;
  category: SlideProdutosKey;
  name: string;
  size: string;
  description: string;
  image: string;
  active: boolean;
}

export interface ISlideProdutosConfig {
  breakpoints?: {
    [key: number]: {
      slidesPerView: number;
    };
  };
}
