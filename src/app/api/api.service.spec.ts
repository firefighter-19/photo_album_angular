import { IPhotoAlbum } from './api.types';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import {
  ApiService,
  PLACEHOLDER_ALBUM_URL,
  PLACEHOLDER_PHOTOS_URL,
} from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  const mockData: IPhotoAlbum[] = [
    {
      id: 1,
      photos: [
        {
          albumId: 1,
          id: 1,
          thumbnailUrl: 'url',
          title: 'title',
          url: 'url',
        },
      ],
      title: 'Album title',
      userId: 1,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Get photos and albums', () => {
    it('should get from placeholder API data', (done: DoneFn) => {
      service.getPhotoAlbums().subscribe((value) => {
        expect(value).toEqual(mockData);
      });

      const requestAlbums = httpMock.expectOne(PLACEHOLDER_ALBUM_URL);
      const requestPhotos = httpMock.expectOne(PLACEHOLDER_PHOTOS_URL);

      expect(requestAlbums.request.method).toBe('GET');
      expect(requestPhotos.request.method).toBe('GET');

      done();
    });
  });
});
