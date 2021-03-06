import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, NgZone,
  ViewChild
} from '@angular/core';
import { DialogRef, ModalComponent } from 'ngx-modialog';
import { TwoButtonPreset } from 'ngx-modialog/plugins/bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IForest } from '../../../core/models/forest';
import { Store } from '@ngrx/store';
import * as fromForest from '../../reducers';
import * as forests from '../../actions/forest.actions';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import { ImageUploaderService } from '../../../core/services/image-uploader.service';
import { ForestImage } from '../../../core/models/forest-image';
import { Lightbox, IAlbum } from 'angular2-lightbox';

@Component({
  selector: 'conserve-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements ModalComponent<TwoButtonPreset> {
  form: FormGroup;

  @ViewChild('fileInputRef') fileInputRef: ElementRef;

  @Input() data: IForest;

  images: ForestImage[];

  busy$: Observable<boolean>;

  uploading = false;

  album: IAlbum[];

  constructor(public dialog: DialogRef<TwoButtonPreset>,
              private fb: FormBuilder,
              private imageUploader: ImageUploaderService,
              private changeDetector: ChangeDetectorRef,
              private store: Store<fromForest.ForestState>,
              private lightbox: Lightbox) {

    this.busy$ = store.select(fromForest.isForestsBusy);

    this.form = this.fb.group({
      id: '',
      name : '',
      description: ''
    });

    if (this.dialog.context['data']) {
      this.data = this.dialog.context['data'];
      this.images = this.dialog.context['data'].images;
      this.form.patchValue(this.dialog.context['data']);
      this.updateAlbum();
    }
  }

  /**
   * Dispatches Save action with collected form data
   */
  save() {
    this.store.dispatch(new forests.Save(this.form.value));
    this.store.select(fromForest.isForestsBusy).filter(v => !v).take(1).subscribe(() => this.dialog.close());
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

      this.imageUploader.upload(`/forests/${this.form.controls['id'].value}/upload`, formData).take(1).subscribe(image => {
        this.images = [...this.images, image];
        this.updateAlbum();
        this.uploading = false;
        this.store.dispatch(new forests.Find());
        this.changeDetector.detectChanges();
      });
    }
  }

  /**
   * Handles click on the image at specified index
   * @param {number} index
   */
  imageClick(index: number) {
    this.lightbox.open(this.album, index);
  }

  /**
   * Creates album from images
   */
  updateAlbum() {
    this.album = this.images.map(image => ({src: image.url, thumb: image.thumbnailUrl}));
  }

  /**
   * Removes image from forest
   */
  delete(image: ForestImage, evt: MouseEvent) {
    evt.stopPropagation();
    this.uploading = true;

    this.imageUploader.remove(`/forests/image/${image.id}`).take(1).subscribe(d => {
      this.images = this.images.filter(img => img.id != image.id);
      this.updateAlbum();
      this.store.dispatch(new forests.Find());
      this.uploading = false;

      this.changeDetector.detectChanges();
    });

  }

  /**
   * Tries to close modal dialog
   */
  close() {
    this.dialog.close();
  }
}
