import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album.component';
import { PhotoComponent } from '../photo/photo.component';

@NgModule({
  declarations: [AlbumComponent, PhotoComponent],
  imports: [CommonModule],
  exports: [AlbumComponent],
})
export class AlbumModule {}
