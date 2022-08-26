import { LoadingService } from './../common/loading.service';
import { Observable, Subscription } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ApiService } from '../api/api.service';
import { IAlbum } from '../api/api.types';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumComponent implements OnInit, OnDestroy {
  albums$!: Observable<IAlbum[]>;
  subscription!: Subscription;
  loading$!: Observable<boolean>;

  constructor(
    private readonly apiService: ApiService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loading$ = this.loadingService.loading$;
    this.subscription = this.apiService.getAlbums().subscribe();
    this.albums$ = this.apiService.albums$;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
