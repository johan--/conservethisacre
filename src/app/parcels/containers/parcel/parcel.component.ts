import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IParcel } from '../../../core/models/parcel';
import { Store } from '@ngrx/store';
import * as fromParcels from '../../reducers';
import * as fromAuth from '../../../auth/reducers';
import { Lightbox, IAlbum } from 'angular2-lightbox';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.scss']
})
export class ParcelComponent implements OnInit {

  parcel$: Observable<IParcel>;
  isLogged$: Observable<boolean>;

  panoramaPreviewUrl = '';

  images: IAlbum[];

  constructor(private store: Store<fromParcels.ParcelState>, private lightbox: Lightbox) {
    this.parcel$ = store.select(fromParcels.getParcel);
    this.isLogged$ = store.select(fromAuth.isLogged);

    this.parcel$.take(1).subscribe(parcel => {
      this.images = parcel.images.map(image => ({src: image.url, thumb: image.thumbnailUrl}));
    });
  }

  ngOnInit() {
  }

  onPanoramaClick(panorama: any) {
    this.panoramaPreviewUrl = panorama.url;
  }

  onPanoramaClose() {
    this.panoramaPreviewUrl = '';
  }

  /**
   * Handles click on the image
   * @param index
   */
  onImageClick(index) {
    this.lightbox.open(this.images, index);
  }
}
