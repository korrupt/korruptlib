export type KngxNavbarLayer = {
  id: number;
  button?: string;
  title?: string;
  actions?: {
    action: string;
  }[];
  theme?: {
    color: string;
    background: string;
  }
};
