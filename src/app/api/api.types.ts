export interface IAlbum {
  userId: number;
  id: number;
  title: string;
}

export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface State {
  data: IAlbum[];
  loading: boolean;
  error: any;
}
