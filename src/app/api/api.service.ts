import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, zip, map } from 'rxjs';
import { IAlbum, IPhoto, IPhotoAlbum } from './api.types';

const PLACEHOLDER_ALBUM_URL =
  'https://jsonplaceholder.typicode.com/albums?_start=0&_limit=5';

const PLACEHOLDER_PHOTOS_URL =
  'https://jsonplaceholder.typicode.com/photos?_start_0&_limit=60';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public photoAlbum$ = new Observable<IPhotoAlbum[]>();

  constructor(private http: HttpClient) {}

  getPhotoAlbums() {
    return (this.photoAlbum$ = zip(this.getAlbums(), this.getPhotos()).pipe(
      map((photoAlbum) => {
        const [albums, photos] = photoAlbum;
        return albums.reduce((acc: IPhotoAlbum[], cur: IAlbum) => {
          const photographs = photos.filter(
            (photo: IPhoto) => photo.albumId === cur.id
          );
          acc.push({ ...cur, photos: photographs });
          return acc;
        }, []);
      })
    ));
  }

  private getAlbums() {
    return this.http.get(PLACEHOLDER_ALBUM_URL) as Observable<IAlbum[]>;
  }

  private getPhotos() {
    return this.http.get(PLACEHOLDER_PHOTOS_URL) as Observable<IPhoto[]>;
  }
}
