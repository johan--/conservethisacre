import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ImageUploaderService } from '../../../core/services/image-uploader.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'conserve-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  @ViewChild('fileInputRef') fileInputRef: ElementRef;

  @Input() url = '';

  @Output() uploaded = new Subject<any>();
  @Output() started = new Subject<any>();

  constructor(private imageUploader: ImageUploaderService) { }

  ngOnInit() {
  }

  choose() {
    this.fileInputRef.nativeElement.click();
  }

  upload() {
    const files = this.fileInputRef.nativeElement.files;
    if (files && files[0]) {
      const formData = new FormData();
      formData.append('image', files[0]);

      this.started.next(true);

      this.imageUploader.upload(this.url, formData).take(1).subscribe(image => {
        this.uploaded.next(image);
      });
    }
  }
}
