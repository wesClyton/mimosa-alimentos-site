export interface ISlideProdutos {
  id: string;
  urlImage: string;
  name: string;
  description: string;
}

export interface ISlideProdutosConfig {
  breakpoints?: {
    [key: number]: {
      slidesPerView: number;
    };
  };
}
