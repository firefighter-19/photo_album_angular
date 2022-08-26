import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IAlbum } from './api.types';

const PLACEHOLDER_ALBUM_URL =
  'https://jsonplaceholder.typicode.com/albums?_start=0&_limit=5';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private albums = new BehaviorSubject<IAlbum[]>([]);
  readonly albums$ = this.albums.asObservable();

  constructor(private http: HttpClient) {}

  getAlbums() {
    return this.http
      .get(PLACEHOLDER_ALBUM_URL)
      .pipe(tap((data) => this.albums.next(data as IAlbum[])));
  }
}
