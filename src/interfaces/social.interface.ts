export interface ISocial {
  iconColor?: 'red' | 'yellow';
  iconWithBackground?: boolean;
  socialNetworks?: socialNetwork[];
}

interface socialNetwork {
  name: string;
  url: string;
}
