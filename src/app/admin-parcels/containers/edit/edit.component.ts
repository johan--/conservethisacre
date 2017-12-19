import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DialogRef, ModalComponent } from 'ngx-modialog';
import { TwoButtonPreset } from 'ngx-modialog/plugins/bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IParcel } from '../../../core/models/parcel';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromParcel from '../../reducers';
import * as parcels from '../../actions/parcel.actions';
import 'rxjs/add/operator/filter';
import { IForest } from '../../../core/models/forest';
import { ParcelImage } from '../../../core/models/parcel-image';
import { Lightbox, IAlbum } from 'angular2-lightbox';
import { ImageUploaderService } from '../../../core/services/image-uploader.service';
import { ParcelPanorama } from '../../../core/models/parcel-panorama';

@Component({
  selector: 'conserve-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements ModalComponent<TwoButtonPreset> {
  form: FormGroup;

  @ViewChild('fileInputRef') fileInputRef: ElementRef;

  @Input() data: IParcel;

  busy$: Observable<boolean>;
  forests$: Observable<IForest[]>;

  images: ParcelImage[];
  panoramas: ParcelPanorama[];

  uploading = false;
  album: IAlbum[];

  panoramaPreview = '';

  constructor(public dialog: DialogRef<TwoButtonPreset>,
              private fb: FormBuilder,
              private imageUploader: ImageUploaderService,
              private changeDetector: ChangeDetectorRef,
              private store: Store<fromParcel.ParcelState>,
              private lightbox: Lightbox) {

    this.busy$ = store.select(fromParcel.isParcelBusy);
    this.forests$ = store.select(fromParcel.getAllForests)
    this.form = this.fb.group({
      id: '',
      cost: '',
      area: '',
      forestId: ''
    });

    if (this.dialog.context['data']) {
      this.data = this.dialog.context['data'];
      this.images = this.dialog.context['data'].images;
      this.panoramas = this.dialog.context['data'].panoramas;
      this.form.patchValue(this.dialog.context['data']);
      this.updateAlbum();
    }
  }

  /**
   * Dispatches Save action with collected form data
   */
  save() {
    this.store.dispatch(new parcels.Save(this.form.value));
    this.store.select(fromParcel.isParcelBusy).filter(v => !v).take(1).subscribe(() => this.dialog.close());
  }

  /**
   * Tries to close modal dialog
   */
  close() {
    this.dialog.close();
  }

  /**
   * Removes image from forest
   */
  delete(image: ParcelImage, evt: MouseEvent) {
    evt.stopPropagation();
    this.uploading = true;

    this.imageUploader.remove(`/parcels/image/${image.id}`).take(1).subscribe(d => {
      this.images = this.images.filter(img => img.id != image.id);
      this.updateAlbum();
      this.store.dispatch(new parcels.Find());
      this.uploading = false;

      this.changeDetector.detectChanges();
    });

  }

  /**
   * Removes image from forest
   */
  deletePanorama(image: ParcelPanorama, evt: MouseEvent) {
    evt.stopPropagation();
    this.uploading = true;

    this.imageUploader.remove(`/parcels/panorama/${image.id}`).take(1).subscribe(d => {
      this.uploading = false;
      this.panoramas = this.panoramas.filter(img => img.id != image.id);
    });
  }

  onPanoramaUploaded(image) {
    this.uploading = false;
    this.panoramas = [...this.panoramas, image];
  }

  onPanoramaStarted() {
    this.uploading = true;
  }

  panoramaClick(image: ParcelPanorama, evt: MouseEvent) {
    console.log('clicked: ', image);
    this.panoramaPreview = image.url;
  }

  choose() {
    this.fileInputRef.nativeElement.click();
  }

  upload() {
    const files = this.fileInputRef.nativeElement.files;
    if (files && files[0]) {
      const formData = new FormData();
      formData.append('image', files[0]);

      this.uploading = true;

      this.imageUploader.upload(`/parcels/${this.form.controls['id'].value}/upload`, formData).take(1).subscribe(image => {
        this.images = [...this.images, image];
        this.updateAlbum();
        this.uploading = false;
        this.store.dispatch(new parcels.Find());
        this.changeDetector.detectChanges();
      });
    }
  }


  /**
   * Creates album from images
   */
  updateAlbum() {
    this.album = this.images.map(image => ({src: image.url, thumb: image.thumbnailUrl}));
  }

  /**
   * Handles click on the image at specified index
   * @param {number} index
   */
  imageClick(index: number) {
    this.lightbox.open(this.album, index);
  }


}
